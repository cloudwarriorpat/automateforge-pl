import { Link } from 'react-router-dom';
import {
  ChevronRight, FileCheck, AlertTriangle, BarChart3,
  RefreshCw, CheckCircle2, Clock, Zap, ArrowRight, Server,
  Bell, FileText, Lock, Gift
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Guarantee from '../components/Guarantee';
import { useInView } from '../hooks/useInView';

const FEATURES = [
  {
    icon: Server,
    title: 'Integracja ERP/Fakturowanie',
    description: 'Laczymy Twoj system (SAP, Comarch, Enova, Symfonia, Fakturownia, wFirma, ifirma) z KSeF 2.0. Dwukierunkowa synchronizacja z pelna walidacja.',
  },
  {
    icon: Bell,
    title: 'Monitoring i alerty',
    description: 'Sledzenie statusow faktur w KSeF w czasie rzeczywistym. Natychmiastowe powiadomienia o odrzutach, bledach i problemach z komunikacja.',
  },
  {
    icon: FileText,
    title: 'Walidacja JPK/VAT',
    description: 'Automatyczne sprawdzanie spojnosci danych przed wyslaniem. Referencje faktur, sumy kontrolne, zgodnosc z aktualnymi schemami.',
  },
  {
    icon: RefreshCw,
    title: 'Ratunek po odrzutach',
    description: 'Automatyczna analiza przyczyn odrzucenia, korekcja danych i ponowna proba wyslania. Bez recznego szukania bledow.',
  },
  {
    icon: Lock,
    title: 'Bezpieczenstwo i audyt',
    description: 'Pelny log operacji, szyfrowanie tokenow, kontrola dostepu. Gotowe na audyt KAS i wewnetrzny compliance.',
  },
  {
    icon: BarChart3,
    title: 'Raporty i BI',
    description: 'Dashboard z metrykami: wolumen faktur, czas przetwarzania, procent odrzutow. Eksport do Power BI, Google Sheets, Looker.',
  },
];

const TIMELINE = [
  { date: '1 lutego 2026', event: 'KSeF obowiazkowy dla duzych podatnikow', status: 'active' },
  { date: '1 kwietnia 2026', event: 'MSP -- Twoj deadline', status: 'upcoming' },
  { date: 'Polowa 2026', event: 'Mikroprzedsiebiorcy i pozostali', status: 'upcoming' },
];

const PRICING = [
  {
    name: 'Start',
    price: '8 000',
    period: 'jednorazowo',
    monthly: '1 000',
    description: 'Dla firm z jednym systemem fakturujacym i prostymi potrzebami.',
    features: ['1 integracja ERP/KSeF', 'Monitoring podstawowy', 'Walidacja JPK', 'Email alerty', 'Dokumentacja wdrozenia'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '9 990',
    period: 'jednorazowo',
    monthly: '3 000',
    description: 'Dla firm z wieloma zrodlami faktur i potrzeba zaawansowanego monitoringu.',
    features: ['Do 3 integracji', 'Monitoring 24/7', 'Auto-korekcja odrzutow', 'Slack/Teams alerty', 'Dashboard BI', 'SLA 4h', 'Aktualizacje schem'],
    highlight: true,
    bonuses: true,
  },
  {
    name: 'Enterprise',
    price: '25 000',
    period: 'jednorazowo',
    monthly: '6 000',
    description: 'Pelna obsluga KSeF. My sie martwimy, Ty sie skupiasz na biznesie.',
    features: ['Unlimited integracji', 'Dedykowany opiekun', 'Auto-korekcja + retry', 'Monitoring proaktywny', 'Custom raporty', 'SLA 1h', 'Kwartalne przeglady'],
    highlight: false,
  },
];

const BONUSES = [
  { title: 'Audyt gotowosci KSeF', value: '1 500' },
  { title: 'Szablon polityki e-fakturowania', value: '800' },
  { title: 'Checklisty walidacji JPK-V7M/K', value: '500' },
];

function PricingCard({ plan, index }: { plan: typeof PRICING[0]; index: number }) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="badge-brand text-xs">Najpopularniejszy</span>
        </div>
      )}
      <div className={`glass-card p-8 h-full flex flex-col ${plan.highlight ? 'border-brand-500/30 glow-brand' : ''}`}>
        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-steel-400 mb-6">{plan.description}</p>

        <div className="mb-6">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          <span className="text-steel-400 ml-2">PLN {plan.period}</span>
          <p className="text-sm text-steel-500 mt-1">+ {plan.monthly} PLN/mies. abonament</p>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-steel-300">
              <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        <Link
          to="/kontakt"
          className={plan.highlight ? 'btn-primary w-full' : 'btn-secondary w-full'}
        >
          Umow rozmowe
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function KSeFPage() {
  const { ref: timelineRef, isInView: timelineInView } = useInView();
  const { ref: featRef, isInView: featInView } = useInView();
  const { ref: bonusRef, isInView: bonusInView } = useInView();

  const totalBonusValue = BONUSES.reduce((sum, b) => sum + parseInt(b.value.replace(/\s/g, '')), 0);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-500/8 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="badge bg-red-500/10 text-red-400 border border-red-500/20 mb-6 inline-flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Deadline MSP: 1 kwietnia 2026 -- zostalo niewiele czasu
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Nigdy wiecej stresu{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">z e-fakturami</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed mb-4 max-w-2xl">
              Twoje faktury wystawiaja sie same, leca do KSeF automatycznie, JPK jest zawsze poprawny.
              Nigdy wiecej nie myslisz o compliance.
            </p>
            <p className="text-base text-steel-500 mb-8 max-w-2xl">
              2.5M+ polskich firm musi wdrozyc KSeF. Adopcja AI w Polsce: zaledwie 5.9%.
              To Twoja szansa, zeby byc krok przed konkurencja.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/skaner-ksef" className="btn-primary text-base px-8 py-4">
                Sprawdz gotowosc KSeF
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/kontakt" className="btn-secondary text-base px-8 py-4">
                Bezplatny audyt KSeF
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-20 bg-gradient-to-r from-red-500/5 via-amber-500/5 to-red-500/5 border-y border-steel-800/30">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Clock className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-semibold text-white">Harmonogram KSeF 2026</h2>
          </div>
          <div ref={timelineRef} className="flex flex-col md:flex-row items-stretch gap-4 max-w-3xl mx-auto">
            {TIMELINE.map((item, i) => (
              <div
                key={item.date}
                className={`flex-1 glass-card p-6 transition-all duration-500 ${
                  item.status === 'active' ? 'border-amber-500/30 bg-amber-500/5' : ''
                } ${timelineInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <p className={`text-sm font-semibold mb-1 ${item.status === 'active' ? 'text-amber-400' : 'text-steel-400'}`}>
                  {item.date}
                </p>
                <p className="text-sm text-steel-300">{item.event}</p>
                {item.status === 'active' && (
                  <span className="inline-flex items-center gap-1 mt-3 text-xs text-amber-400 font-medium">
                    <Zap className="w-3 h-3" /> Aktywne
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <SectionHeading
            badge="Funkcje"
            title="Wszystko, czego potrzebujesz"
            highlight="do KSeF"
            description="Od integracji po monitoring -- kompletne rozwiazanie KSeF 2.0 dla Twojej firmy."
          />
          <div ref={featRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className={`glass-card-hover p-8 transition-all duration-700 ${
                    featInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-steel-400 leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="cennik" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-steel-900/20 to-steel-950" />
        <div className="section-container relative z-10">
          <SectionHeading
            badge="Cennik"
            title="Przejrzyste"
            highlight="pakiety"
            description="Bez ukrytych kosztow. Setup + abonament miesieczny z pelnym wsparciem i aktualizacjami."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bonus Stacking - PRO */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6 inline-flex items-center gap-2">
                <Gift className="w-3.5 h-3.5" />
                Bonusy do pakietu Pro
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Dostajesz o wiele <span className="gradient-text">wiecej niz myslisz</span>
              </h2>
              <p className="text-lg text-steel-400">
                Kazdy klient Pro otrzymuje bonusy o lacznej wartosci {totalBonusValue.toLocaleString('pl-PL')} PLN -- gratis.
              </p>
            </div>

            <div ref={bonusRef} className="space-y-4 mb-8">
              {BONUSES.map((bonus, i) => (
                <div
                  key={bonus.title}
                  className={`glass-card p-6 flex items-center justify-between transition-all duration-500 ${
                    bonusInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                      <Gift className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{bonus.title}</p>
                      <p className="text-xs text-emerald-400 font-medium">GRATIS</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-steel-500 line-through">{bonus.value} PLN</p>
                    <p className="text-sm font-bold text-emerald-400">0 PLN</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-8 text-center border-brand-500/20 glow-brand">
              <p className="text-steel-400 mb-2">Pakiet Pro + wszystkie bonusy</p>
              <p className="text-sm text-steel-500 line-through mb-1">Wartosc: 12 790 PLN</p>
              <p className="text-4xl font-bold text-white mb-2">9 990 PLN <span className="text-lg font-normal text-steel-400">jednorazowo</span></p>
              <p className="text-sm text-steel-500 mb-6">+ 3 000 PLN/mies. abonament</p>
              <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
                Wybierz Pro z bonusami
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <Guarantee />

      {/* Final CTA */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="glass-card p-10 lg:p-16 text-center glow-brand">
            <FileCheck className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Nie czekaj na deadline
            </h2>
            <p className="text-lg text-steel-400 max-w-xl mx-auto mb-8">
              Im blizej terminu, tym wyzsze ceny i dluzsze kolejki.
              KSeF deadline: 1 kwietnia 2026. Dzialaj teraz.
            </p>
            <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
              Umow bezplatny audyt KSeF
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
