import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, CheckCircle2, Zap, Star, ChevronRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';

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

const CATEGORY_LABELS: Record<string, string> = {
  all: 'Wszystkie',
  finance: 'Finanse',
  'e-commerce': 'E-commerce',
  crm: 'CRM',
  marketing: 'Marketing',
};

function formatPrice(grosze: number): string {
  const pln = Math.floor(grosze / 100);
  return `${pln} PLN`;
}

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`glass-card-hover p-6 lg:p-8 flex flex-col transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="badge-steel text-xs">{CATEGORY_LABELS[template.category] ?? template.category}</span>
          {template.popular && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs font-medium">
              <Star className="w-3 h-3" />
              Popularne
            </span>
          )}
        </div>
        <span className="text-lg font-bold text-white">{formatPrice(template.price)}</span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{template.title}</h3>
      <p className="text-sm text-steel-400 leading-relaxed mb-4 flex-1">{template.description}</p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {template.integrations.map((integration) => (
            <span key={integration} className="px-2 py-0.5 rounded bg-steel-800/50 border border-steel-700/50 text-xs text-steel-400">
              {integration}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-steel-800/50">
        <span className="text-xs text-steel-500">
          {template.tools.join(' / ')}
        </span>
        <Link to="/kontakt" className="inline-flex items-center gap-1 text-sm font-medium text-brand-400 group">
          Zamow
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTemplates() {
      const { data, error } = await supabase.from('templates').select('*').order('popular', { ascending: false });
      if (error) {
        console.error('Blad ladowania szablonow:', error.message);
      } else if (data) {
        setTemplates(data);
      }
      setLoading(false);
    }
    fetchTemplates();
  }, []);

  async function handleWaitlistSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await supabase.from('leads').insert({
      name: '',
      email,
      company: '',
      service: 'templates-waitlist',
      message: 'Zainteresowany nowymi szablonami automatyzacji',
    });
    setSubmitting(false);
    setSubmitted(true);
    setEmail('');
  }

  const categories = ['all', ...new Set(templates.map((t) => t.category))];
  const filtered = activeCategory === 'all' ? templates : templates.filter((t) => t.category === activeCategory);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-[128px]" />
        </div>
        <div className="section-container relative z-10">
          <SectionHeading
            badge="Szablony"
            title="Gotowe workflow"
            highlight="automatyzacji"
            description="Gotowe szablony n8n zaprojektowane pod polski rynek: KSeF, BaseLinker, Allegro, Fakturownia, InPost. Kup, wdraz, dzialaj."
          />
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 border-b border-steel-800/30">
        <div className="section-container">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-500 text-white'
                    : 'bg-steel-800/50 text-steel-400 hover:text-white hover:bg-steel-700/50 border border-steel-700/50'
                }`}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates grid */}
      <section className="py-16 lg:py-20">
        <div className="section-container">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((template, i) => (
                <TemplateCard key={template.id} template={template} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-steel-600 mx-auto mb-4" />
              <p className="text-steel-400">Brak szablonow w tej kategorii.</p>
            </div>
          )}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <div className="glass-card p-10 lg:p-16 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-500/10 mb-6">
              <Zap className="w-7 h-7 text-brand-400" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Nowe szablony w przygotowaniu
            </h2>
            <p className="text-steel-400 leading-relaxed mb-8">
              Pracujemy nad kolejnymi szablonami: Allegro Order Processor, Przelewy24 Reconciler
              i wiele innych. Zostaw email, a powiadomimy Cie jako pierwszego.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 max-w-sm mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <p className="text-white font-medium mb-1">Dziekujemy!</p>
                <p className="text-sm text-steel-400">Powiadomimy Cie o nowych szablonach.</p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field flex-1"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50"
                >
                  {submitting ? 'Wysylanie...' : 'Powiadom mnie'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-sm text-steel-500 mt-8">
              Potrzebujesz dedykowanego szablonu?{' '}
              <Link to="/kontakt" className="text-brand-400 hover:text-brand-300 transition-colors">
                Umow sie na bezplatny audyt
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
