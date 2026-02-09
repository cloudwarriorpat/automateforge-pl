import { Link } from 'react-router-dom';
import {
  Handshake, ChevronRight, ArrowRight,
  Users, TrendingUp, Gift, Shield, Zap, Building2
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';

const BENEFITS = [
  {
    icon: TrendingUp,
    title: '15% prowizji recurring',
    description: 'Za kazdego poleconego klienta otrzymujesz 15% prowizji od kazdej platnosci -- nie tylko pierwszej.',
  },
  {
    icon: Gift,
    title: 'Bezplatna integracja KSeF',
    description: 'Twoje biuro rachunkowe dostaje pelna integracje KSeF za darmo. Zero kosztow setup.',
  },
  {
    icon: Shield,
    title: 'Dedykowany opiekun',
    description: 'Twoj klient ma bezposredni kontakt z naszym zespolem. Ty polecasz, my wdrazamy.',
  },
  {
    icon: Users,
    title: 'Materialy sprzedazowe',
    description: 'Dostajesz gotowe prezentacje, case studies i kalkulatory ROI do rozmow z klientami.',
  },
  {
    icon: Zap,
    title: 'Szybki onboarding',
    description: 'Twoi klienci dostaja priorytetowe wdrozenia. Bez czekania w kolejce.',
  },
  {
    icon: Building2,
    title: 'Wspolny branding',
    description: 'Mozliwosc co-brandingu na materialach -- "Polecane przez [Twoje Biuro]".',
  },
];

const STEPS = [
  { number: '01', title: 'Zglos sie', desc: 'Wypelnij formularz partnerski. Sprawdzimy dopasowanie.' },
  { number: '02', title: 'Onboarding', desc: 'Poznasz nasze produkty i proces sprzedazy.' },
  { number: '03', title: 'Polecaj klientow', desc: 'Dziel sie linkiem lub lacz nas z klientami.' },
  { number: '04', title: 'Zarabiaj', desc: '15% prowizji od kazdej platnosci klienta.' },
];

export default function PartnersPage() {
  const { ref: benefitsRef, isInView: benefitsInView } = useInView();
  const { ref: stepsRef, isInView: stepsInView } = useInView();
  const { ref: statsRef, isInView: statsInView } = useInView();

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-orange-500/5 rounded-full blur-[100px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="badge bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-6 inline-flex items-center gap-2">
              <Handshake className="w-3.5 h-3.5" />
              Program partnerski
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Zarabiaj z nami{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">jako partner</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed mb-4 max-w-2xl">
              Jestes biurem rachunkowym, konsultantem IT lub agencja? Polecaj AutomateForge
              swoim klientom i zarabiaj 15% prowizji od kazdej platnosci.
            </p>
            <p className="text-base text-steel-500 mb-8 max-w-2xl">
              Biura rachunkowe obsluguja setki MSP i potrzebuja rozwiazania KSeF.
              Dolacz do naszego programu i zaoferuj swoim klientom cos, czego naprawde potrzebuja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
                Dolacz do programu
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5 border-y border-steel-800/30">
        <div className="section-container">
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { value: '15%', label: 'Prowizji recurring od kazdego klienta' },
              { value: '0 PLN', label: 'Koszt dolaczenia do programu' },
              { value: '5+', label: 'Aktywnych partnerstw -- cel na 60 dni' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center transition-all duration-500 ${
                  statsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 mb-2">{stat.value}</p>
                <p className="text-sm text-steel-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <SectionHeading
            badge="Korzysci"
            title="Dlaczego warto byc"
            highlight="partnerem"
            description="Program partnerski stworzony specjalnie dla biur rachunkowych, konsultantow IT i agencji automatyzacji."
          />
          <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className={`glass-card-hover p-8 transition-all duration-700 ${
                    benefitsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-steel-400 leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-steel-900/20 to-steel-950" />
        <div className="section-container relative z-10">
          <SectionHeading
            badge="Jak to dziala"
            title="4 kroki do"
            highlight="partnerstwa"
          />
          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className={`glass-card p-6 text-center transition-all duration-700 ${
                  stepsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <span className="text-3xl font-bold text-amber-500/30 font-mono">{step.number}</span>
                <h3 className="font-semibold text-white mb-2 mt-2">{step.title}</h3>
                <p className="text-sm text-steel-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example earnings */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6 inline-flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Kalkulator zarobkow
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ile mozesz <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">zarobic?</span>
              </h2>
            </div>

            <div className="glass-card p-8 border-emerald-500/10">
              <div className="space-y-6">
                {[
                  { clients: 5, monthlyPerClient: 3000, label: 'KSeF Studio Pro -- 5 klientow' },
                  { clients: 3, monthlyPerClient: 8000, label: 'AI Agents Growth -- 3 klientow' },
                  { clients: 10, monthlyPerClient: 299, label: 'Template Membership -- 10 klientow' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3 border-b border-steel-800/30 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-white">{row.label}</p>
                      <p className="text-xs text-steel-500">{row.clients} x {row.monthlyPerClient.toLocaleString('pl-PL')} PLN/mies.</p>
                    </div>
                    <p className="text-lg font-bold text-emerald-400">
                      {Math.round(row.clients * row.monthlyPerClient * 0.15).toLocaleString('pl-PL')} PLN/mies.
                    </p>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-4 border-t border-steel-700/50">
                  <p className="text-lg font-semibold text-white">Razem miesieczny przychod</p>
                  <p className="text-2xl font-bold text-emerald-400">6 035 PLN/mies.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="glass-card p-10 lg:p-16 text-center">
            <Handshake className="w-12 h-12 text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Dolacz do programu partnerskiego
            </h2>
            <p className="text-lg text-steel-400 max-w-xl mx-auto mb-8">
              Twoi klienci potrzebuja KSeF i automatyzacji. Zaoferuj im rozwiazanie
              i zarabiaj na tym recurring.
            </p>
            <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
              Wypelnij formularz partnerski
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
