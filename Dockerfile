# Multi-stage build for Vite/React SPA
FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Ensure Vite env vars are available during build even if .env is excluded by .dockerignore.
# Supabase "anon" key is public and will be embedded into the client bundle either way.
RUN if [ -f .env.example ] && [ ! -f .env ]; then cp .env.example .env; fi

RUN npm run build

# Production image with nginx (SPA routing via try_files)
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy build output
COPY --from=builder /app/dist ./

# Entrypoint writes config to /tmp so it works with k8s securityContext runAsUser=1000.
RUN cat > /entrypoint.sh << 'SCRIPT' && chmod +x /entrypoint.sh
#!/bin/sh
set -e

if [ "$DISABLE_CACHE" = "true" ]; then
  CACHE_HEADERS="add_header Cache-Control \"no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0\" always;
add_header Pragma \"no-cache\" always;
add_header Expires \"0\" always;"
else
  CACHE_HEADERS=""
fi

cat > /tmp/nginx.conf <<EOF
pid /tmp/nginx.pid;
error_log /dev/stderr warn;
events {
  worker_connections 1024;
}
http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  access_log /dev/stdout;

  client_body_temp_path /tmp;
  proxy_temp_path /tmp;
  fastcgi_temp_path /tmp;
  uwsgi_temp_path /tmp;
  scgi_temp_path /tmp;

  server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    
    location / {
      try_files \$uri \$uri/ /index.html;
      $CACHE_HEADERS
    }
  }
}
EOF

exec nginx -c /tmp/nginx.conf -g "daemon off;"
SCRIPT

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
