/*
  # AutomateForge - Leads & Templates Schema

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `name` (text) - contact name
      - `email` (text) - contact email
      - `company` (text) - company name
      - `phone` (text, optional) - phone number
      - `service` (text) - interested service (ksef/agents/templates)
      - `message` (text, optional) - additional message
      - `created_at` (timestamptz) - submission timestamp

    - `templates`
      - `id` (uuid, primary key)
      - `title` (text) - template name
      - `description` (text) - template description
      - `category` (text) - category (e-commerce, finance, crm, logistics, marketing)
      - `price` (integer) - price in PLN (grosze)
      - `tools` (text[]) - tools used (Make, n8n, Zapier, etc.)
      - `integrations` (text[]) - Polish integrations (BaseLinker, Allegro, etc.)
      - `popular` (boolean) - featured flag
      - `created_at` (timestamptz) - creation timestamp

  2. Security
    - Enable RLS on both tables
    - leads: anon users can INSERT (submit form), no read access
    - templates: anon users can SELECT (view store), no write access
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL,
  company text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  service text NOT NULL DEFAULT 'general',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'general',
  price integer NOT NULL DEFAULT 0,
  tools text[] DEFAULT '{}',
  integrations text[] DEFAULT '{}',
  popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view templates"
  ON templates
  FOR SELECT
  TO anon
  USING (true);
