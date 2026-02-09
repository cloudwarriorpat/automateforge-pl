import { Link } from 'react-router-dom';
import { Shield, Bot, Zap, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import { useInView } from '../../hooks/useInView';

const SERVICES = [
  {
    icon: Shield,
    title: 'KSeF Studio',
    description: 'Obowiazkowy KSeF to deadline, ktorego nie przesuniesz. Wdrazamy integracje ERP/fakturowanie z KSeF, monitoring odrzutow, walidacje JPK/VAT i automatyczne uzupelnianie danych.',
    features: ['Integracja ERP z KSeF 2.0', 'Monitoring i alerty bledow', 'Walidacja JPK/VAT', 'SLA i aktualizacje schem'],
    to: '/ksef',
    badge: 'Deadline 2026',
    color: 'from-emerald-400 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Agenci AI, ktorzy realnie pracuja w Twoim back-office. Triage maili, kwalifikacja leadow, kontrola kosztow -- z czlowiekiem w petli i pelnym monitoringiem jakosci.',
    features: ['Triage maili i zadan', 'Scoring i kwalifikacja leadow', 'Kontrola kosztow faktur', 'Monitoring i prompt updates'],
    to: '/agents',
    badge: 'Custom AI',
    color: 'from-sky-400 to-blue-500',
    bgColor: 'bg-sky-500/10',
    borderColor: 'border-sky-500/20',
    textColor: 'text-sky-400',
  },
  {
    icon: Zap,
    title: 'Szablony automatyzacji',
    description: 'Gotowe workflowy pod polski rynek: KSeF, BaseLinker, Allegro, Fakturownia, ifirma, InPost, Przelewy24. Kup, wdraz, dzialaj -- bez tygodni konfiguracji.',
    features: ['Make / n8n / Zapier', 'Polskie integracje', 'Dokumentacja PL', 'Wsparcie wdrozeniowe'],
    to: '/templates',
    badge: 'Od 149 PLN',
    color: 'from-brand-400 to-brand-600',
    bgColor: 'bg-brand-500/10',
    borderColor: 'border-brand-500/20',
    textColor: 'text-brand-400',
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const { ref, isInView } = useInView();
  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className={`glass-card p-8 lg:p-10 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex items-start gap-5 mb-6">
        <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center shrink-0`}>
          <Icon className={`w-7 h-7 ${service.textColor}`} />
        </div>
        <div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${service.bgColor} ${service.textColor} border ${service.borderColor} mb-2`}>
            {service.badge}
          </span>
          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
        </div>
      </div>

      <p className="text-steel-400 leading-relaxed mb-6">
        {service.description}
      </p>

      <ul className="space-y-3 mb-8">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm text-steel-300">
            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        to={service.to}
        className={`inline-flex items-center gap-2 ${service.textColor} font-medium text-sm group`}
      >
        Dowiedz sie wiecej
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

export default function Services() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-steel-900/30 to-steel-950" />

      <div className="section-container relative z-10">
        <SectionHeading
          badge="Uslugi"
          title="Trzy sciezki do"
          highlight="automatyzacji"
          description="Kazda firma ma inne potrzeby. Dlatego oferujemy trzy podejscia -- od pilnych wdrozen compliance, przez agentow AI, po gotowe szablony do natychmiastowego uzycia."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
