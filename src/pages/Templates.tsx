import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap, ChevronRight, Search, Filter, ShoppingCart,
  ArrowRight, Star, Package
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { supabase } from '../lib/supabase';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  tools: string[];
  integrations: string[];
  popular: boolean;
}

const CATEGORIES = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'finance', label: 'Finanse' },
  { value: 'e-commerce', label: 'E-commerce' },
  { value: 'crm', label: 'CRM' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'productivity', label: 'Produktywnosc' },
  { value: 'hr', label: 'HR' },
  { value: 'compliance', label: 'Compliance' },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  finance: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'e-commerce': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  crm: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  marketing: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
  productivity: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
  hr: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  compliance: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  general: { bg: 'bg-steel-500/10', text: 'text-steel-400', border: 'border-steel-500/20' },
};

function formatPrice(grosze: number) {
  return (grosze / 100).toLocaleString('pl-PL');
}

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const { ref, isInView } = useInView();
  const colors = CATEGORY_COLORS[template.category] || CATEGORY_COLORS.general;

  return (
    <div
      ref={ref}
      className={`glass-card-hover p-6 flex flex-col transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <span className={`badge ${colors.bg} ${colors.text} border ${colors.border} text-[11px]`}>
          {CATEGORIES.find((c) => c.value === template.category)?.label || template.category}
        </span>
        {template.popular && (
          <span className="flex items-center gap-1 text-xs text-brand-400 font-medium">
            <Star className="w-3 h-3 fill-brand-400" />
            Popular
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{template.title}</h3>
      <p className="text-sm text-steel-400 leading-relaxed mb-4 flex-1">{template.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {template.integrations.map((int) => (
          <span key={int} className="badge-steel text-[10px]">{int}</span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {template.tools.map((tool) => (
          <span key={tool} className="text-[10px] px-2 py-0.5 rounded-md bg-brand-500/10 text-brand-400 border border-brand-500/20">
            {tool}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-steel-700/30">
        <span className="text-2xl font-bold text-white">
          {formatPrice(template.price)} <span className="text-sm font-normal text-steel-400">PLN</span>
        </span>
        <Link
          to="/kontakt"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors group"
        >
          <ShoppingCart className="w-4 h-4" />
          Kup
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchTemplates() {
      const { data } = await supabase
        .from('templates')
        .select('*')
        .order('popular', { ascending: false })
        .order('created_at', { ascending: false });

      if (data) setTemplates(data);
      setLoading(false);
    }
    fetchTemplates();
  }, []);

  const filtered = templates.filter((t) => {
    const matchesSearch = search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.integrations.some((i) => i.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'all' || t.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20 lg:pt-24">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-[128px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="badge-brand mb-6 inline-flex items-center gap-2">
              <Package className="w-3.5 h-3.5" />
              Sklep z szablonami
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Gotowe workflow{' '}
              <span className="gradient-text">w 10 minut</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed mb-4 max-w-2xl">
              Kupujesz szablon, importujesz do Make/n8n/Zapier, podlaczasz konta -- dziala.
              Zero kodowania, zero czekania na devow.
            </p>
            <p className="text-base text-steel-500 mb-8 max-w-2xl">
              Top sellers: KSeF Auto-Sender, BaseLinker-InPost Tracker, Allegro Order Processor,
              Lead Scorer, Invoice Cost Guard.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-steel-500" />
              <input
                type="text"
                placeholder="Szukaj szablonu, integracji..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary sm:hidden"
            >
              <Filter className="w-4 h-4" />
              Filtry
            </button>
          </div>

          <div className={`flex flex-wrap gap-2 mb-10 ${showFilters ? 'block' : 'hidden sm:flex'}`}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  category === cat.value
                    ? 'bg-brand-500 text-white'
                    : 'bg-steel-800/50 text-steel-400 hover:text-white hover:bg-steel-700/50 border border-steel-700/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card p-6 h-72 animate-pulse">
                  <div className="h-4 w-20 bg-steel-700/50 rounded mb-6" />
                  <div className="h-5 w-3/4 bg-steel-700/50 rounded mb-3" />
                  <div className="h-4 w-full bg-steel-700/30 rounded mb-2" />
                  <div className="h-4 w-2/3 bg-steel-700/30 rounded" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-12 h-12 text-steel-600 mx-auto mb-4" />
              <p className="text-steel-400 text-lg">Brak szablonow dla wybranych kryteriow.</p>
              <button
                onClick={() => { setSearch(''); setCategory('all'); }}
                className="mt-4 text-brand-400 text-sm hover:text-brand-300 transition-colors"
              >
                Wyczysc filtry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((t, i) => (
                <TemplateCard key={t.id} template={t} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-20 border-t border-steel-800/30">
        <div className="section-container">
          <SectionHeading
            badge="Membership"
            title="Dostep do wszystkich"
            highlight="szablonow"
            description="Subskrypcja daje Ci dostep do calej biblioteki + nowe szablony co miesiac."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Pojedynczy', price: '149-999', period: '/szablon', desc: 'Kup pojedyncze szablony wedlug potrzeb.', highlight: false },
              { name: 'Membership', price: '299', period: '/mies.', desc: 'Dostep do wszystkich szablonow + nowe co miesiac.', highlight: true },
              { name: 'Wdrozenie', price: 'od 2 000', period: '/szablon', desc: 'Kupujesz szablon + my go wdrazamy i konfigurujemy.', highlight: false },
            ].map((plan) => (
              <div key={plan.name} className={`glass-card p-8 text-center ${plan.highlight ? 'border-brand-500/30 glow-brand' : ''}`}>
                {plan.highlight && (
                  <span className="badge-brand text-xs mb-4 inline-block">Najlepsza wartosc</span>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-steel-400 mb-4">{plan.desc}</p>
                <p className="text-3xl font-bold text-white mb-1">
                  {plan.price} <span className="text-sm font-normal text-steel-400">PLN {plan.period}</span>
                </p>
                <Link to="/kontakt" className={`mt-6 w-full ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}>
                  Wybierz
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="glass-card p-10 lg:p-16 text-center">
            <Zap className="w-12 h-12 text-brand-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Nie znalazles tego, czego szukasz?
            </h2>
            <p className="text-lg text-steel-400 max-w-xl mx-auto mb-8">
              Budujemy tez custom szablony pod Twoje potrzeby. Powiedz nam, co chcesz zautomatyzowac.
            </p>
            <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
              Zamow custom szablon
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
