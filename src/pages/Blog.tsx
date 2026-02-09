import {
  BookOpen, ArrowRight, Clock,
  FileText, Shield, Bot, Zap, TrendingUp
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const POSTS = [
  {
    title: 'KSeF 2026: Kompletny przewodnik po integracji dla MSP',
    excerpt: 'Wszystko, co musisz wiedziec o KSeF 2.0 -- harmonogram, wymagania techniczne, koszty wdrozenia i kary za niedostosowanie.',
    category: 'KSeF',
    icon: Shield,
    date: '10 lutego 2026',
    readTime: '12 min',
    slug: '#',
    featured: true,
  },
  {
    title: 'Jak AI Agents redukuja koszty back-office o 85%',
    excerpt: 'Case study: firma e-commerce z 15 pracownikami wdrozyla 3 agentow AI. Wynik? 85% mniej recznej pracy i 3x wiecej leadow.',
    category: 'AI Agents',
    icon: Bot,
    date: '7 lutego 2026',
    readTime: '8 min',
    slug: '#',
    featured: true,
  },
  {
    title: '5 szablonow automatyzacji, ktore kazda firma e-commerce powinna miec',
    excerpt: 'Od BaseLinker-InPost trackera po Allegro Order Processor -- gotowe workflow, ktore zaoszczedza Ci dziesiatki godzin miesiecznie.',
    category: 'Szablony',
    icon: Zap,
    date: '4 lutego 2026',
    readTime: '6 min',
    slug: '#',
    featured: false,
  },
  {
    title: 'JPK-V7M/K: automatyczna walidacja przed wyslaniem do KSeF',
    excerpt: 'Jak uniknac odrzucen faktur i kar od KAS? Automatyczne sprawdzanie spojnosci danych i referencji faktur.',
    category: 'KSeF',
    icon: FileText,
    date: '1 lutego 2026',
    readTime: '10 min',
    slug: '#',
    featured: false,
  },
  {
    title: 'AI Act 2025: co musisz wiedziec o compliance AI w Polsce',
    excerpt: 'Nowe regulacje AI Act wchodza w zycie. Sprawdz, czy Twoja firma musi dostosowac procesy i jakie sa kary.',
    category: 'Compliance',
    icon: Shield,
    date: '28 stycznia 2026',
    readTime: '9 min',
    slug: '#',
    featured: false,
  },
  {
    title: 'Adopcja AI w Polsce: 5.9% -- dlaczego i jak to zmienic',
    excerpt: 'Polska ma jedna z najnizszych adopcji AI w Europie. Analiza przyczyn i praktyczne kroki dla firm, ktore chca to zmienic.',
    category: 'Trendy',
    icon: TrendingUp,
    date: '25 stycznia 2026',
    readTime: '7 min',
    slug: '#',
    featured: false,
  },
];

const CATEGORIES = ['Wszystkie', 'KSeF', 'AI Agents', 'Szablony', 'Compliance', 'Trendy'];

function PostCard({ post, index, featured = false }: { post: typeof POSTS[0]; index: number; featured?: boolean }) {
  const { ref, isInView } = useInView();
  const Icon = post.icon;

  if (featured) {
    return (
      <div
        ref={ref}
        className={`glass-card-hover p-8 lg:p-10 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="badge-brand text-xs">{post.category}</span>
          <span className="flex items-center gap-1 text-xs text-steel-500">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">{post.title}</h2>
        <p className="text-steel-400 leading-relaxed mb-6">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-steel-500">{post.date}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 group cursor-pointer">
            Czytaj dalej
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`glass-card-hover p-6 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-brand-400" />
        </div>
        <span className="text-xs text-steel-500">{post.category}</span>
        <span className="text-xs text-steel-600">|</span>
        <span className="text-xs text-steel-500">{post.readTime}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
      <p className="text-sm text-steel-400 leading-relaxed mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-steel-500">{post.date}</span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-400 cursor-pointer">
          Czytaj
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-[128px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="badge-brand mb-6 inline-flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Wiedza o{' '}
              <span className="gradient-text">automatyzacji</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed max-w-2xl">
              Artykuly, poradniki i case studies o KSeF, AI Agents i automatyzacji procesow
              dla polskiego biznesu.
            </p>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="py-8 border-b border-steel-800/30">
        <div className="section-container">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  i === 0
                    ? 'bg-brand-500 text-white'
                    : 'bg-steel-800/50 text-steel-400 hover:text-white hover:bg-steel-700/50 border border-steel-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured posts */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          <h2 className="text-xl font-semibold text-white mb-8">Wyrozniione</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {POSTS.filter(p => p.featured).map((post, i) => (
              <PostCard key={post.title} post={post} index={i} featured />
            ))}
          </div>

          <h2 className="text-xl font-semibold text-white mb-8">Wszystkie artykuly</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.filter(p => !p.featured).map((post, i) => (
              <PostCard key={post.title} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="glass-card p-10 lg:p-16 text-center glow-brand">
            <BookOpen className="w-12 h-12 text-brand-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Cotygodniowy newsletter
            </h2>
            <p className="text-lg text-steel-400 max-w-xl mx-auto mb-8">
              Tipy automatyzacji, nowosci KSeF i case studies prosto na Twoja skrzynke.
              Dolacz do spolecznosci polskich firm, ktore automatyzuja.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="twoj@email.pl"
                className="input-field flex-1"
              />
              <button className="btn-primary whitespace-nowrap">
                Subskrybuj
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-steel-500 mt-4">Bez spamu. Mozesz zrezygnowac w kazdej chwili.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
