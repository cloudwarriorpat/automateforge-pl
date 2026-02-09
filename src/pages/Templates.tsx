import { Link } from 'react-router-dom';
import {
  Zap, ChevronRight, ArrowRight, Package
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';

const TOP_SELLERS = [
  {
    title: 'KSeF Auto-Sender',
    description: 'Automatyczne wysylanie faktur do KSeF z Fakturownia/wFirma/ifirma. Walidacja przed wyslaniem, retry po odrzutach.',
    category: 'KSeF',
    integrations: ['Fakturownia', 'wFirma', 'KSeF API'],
    tools: ['Make', 'n8n'],
    price: 499,
  },
  {
    title: 'BaseLinker-InPost Tracker',
    description: 'Automatyczne sledzenie przesylek InPost z BaseLinker. Powiadomienia dla klientow o statusie, integracja ze Slack.',
    category: 'E-commerce',
    integrations: ['BaseLinker', 'InPost', 'Slack'],
    tools: ['Make'],
    price: 349,
  },
  {
    title: 'Allegro Order Processor',
    description: 'Automatyczne przetwarzanie zamowien z Allegro. Synchronizacja stanow magazynowych, generowanie etykiet.',
    category: 'E-commerce',
    integrations: ['Allegro', 'BaseLinker', 'InPost'],
    tools: ['Make', 'n8n'],
    price: 499,
  },
  {
    title: 'Lead Scorer',
    description: 'Automatyczny scoring leadow na bazie ICP. Enrichment z Apollo, routing do CRM z kontekstem.',
    category: 'CRM',
    integrations: ['Apollo', 'Pipedrive', 'HubSpot'],
    tools: ['Make', 'n8n'],
    price: 399,
  },
  {
    title: 'Invoice Cost Guard',
    description: 'Analiza faktur kosztowych: wykrywanie duplikatow, anomalii cenowych, przekroczen budzetow. Alerty na Slack.',
    category: 'Finanse',
    integrations: ['ifirma', 'Google Sheets', 'Slack'],
    tools: ['Make'],
    price: 299,
  },
  {
    title: 'Przelewy24 Reconciler',
    description: 'Automatyczne uzgadnianie platnosci Przelewy24 z fakturami. Raport rozbieznosci, eksport do ksiegowosci.',
    category: 'Finanse',
    integrations: ['Przelewy24', 'ifirma', 'Google Sheets'],
    tools: ['Make'],
    price: 349,
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'KSeF': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'E-commerce': { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
  'CRM': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  'Finanse': { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/20' },
};

function TemplateCard({ template, index }: { template: typeof TOP_SELLERS[0]; index: number }) {
  const { ref, isInView } = useInView();
  const colors = CATEGORY_COLORS[template.category] || { bg: 'bg-steel-500/10', text: 'text-steel-400', border: 'border-steel-500/20' };

  return (
    <div
      ref={ref}
      className={`glass-card-hover p-6 flex flex-col transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 6) * 80}ms` }}
    >
      <div className="mb-4">
        <span className={`badge ${colors.bg} ${colors.text} border ${colors.border} text-[11px]`}>
          {template.category}
        </span>
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
          {template.price} <span className="text-sm font-normal text-steel-400">PLN</span>
        </span>
        <Link
          to="/kontakt"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors group"
        >
          Zapytaj
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export default function TemplatesPage() {
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
              Szablony automatyzacji
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Gotowe workflow{' '}
              <span className="gradient-text">w 10 minut</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed mb-4 max-w-2xl">
              Kupujesz szablon, importujesz do Make/n8n, podlaczasz konta -- dziala.
              Zero kodowania, zero czekania na devow.
            </p>
            <p className="text-base text-steel-500 mb-8 max-w-2xl">
              Szablony zoptymalizowane pod polskie integracje: KSeF, BaseLinker, Allegro,
              Fakturownia, ifirma, InPost, Przelewy24.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_SELLERS.map((t, i) => (
              <TemplateCard key={t.title} template={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 border-t border-steel-800/30">
        <div className="section-container">
          <SectionHeading
            badge="Wdrozenie"
            title="Potrzebujesz pomocy"
            highlight="z wdrozeniem?"
            description="Kupujesz szablon, a my go wdrazamy i konfigurujemy pod Twoje potrzeby."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { name: 'Pojedynczy szablon', price: '149-499', period: '/szablon', desc: 'Kup pojedyncze szablony wedlug potrzeb. Importujesz i konfigurujesz samodzielnie.', highlight: false },
              { name: 'Szablon + wdrozenie', price: 'od 2 000', period: '/szablon', desc: 'Kupujesz szablon + my go wdrazamy, konfigurujemy i testujemy na Twoich danych.', highlight: true },
            ].map((plan) => (
              <div key={plan.name} className={`glass-card p-8 text-center ${plan.highlight ? 'border-brand-500/30 glow-brand' : ''}`}>
                {plan.highlight && (
                  <span className="badge-brand text-xs mb-4 inline-block">Rekomendowany</span>
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
