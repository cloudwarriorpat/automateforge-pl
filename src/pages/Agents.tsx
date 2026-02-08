import { Link } from 'react-router-dom';
import {
  Bot, ChevronRight, Mail, Users, Receipt, Brain,
  CheckCircle2, ArrowRight, Eye, Cog, BarChart3,
  MessageSquare, Target, FileSearch
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';

const AGENTS = [
  {
    icon: Mail,
    title: 'Triage maili',
    description: 'Klasyfikuje przychodzace maile (faktury, reklamacje, dostawcy, zapytania), tworzy zadania w Asanie/Jirze, taguje, proponuje odpowiedzi.',
    stats: '15 000+ maili/mies.',
    accuracy: '94% trafnosc',
    tools: ['Gmail', 'Outlook', 'Asana', 'Jira', 'Slack'],
  },
  {
    icon: Target,
    title: 'Kwalifikacja leadow',
    description: 'Research firmy, scoring na bazie ICP, enrichment danych, automatyczny follow-up i routing do handlowca z kontekstem.',
    stats: '3x wiecej SQL',
    accuracy: 'Lead to Call 24h',
    tools: ['Pipedrive', 'HubSpot', 'Apollo', 'LinkedIn', 'Lemlist'],
  },
  {
    icon: Receipt,
    title: 'Kontrola kosztow',
    description: 'Analiza faktur i umow: wykrywanie anomalii, duplikatow, przekroczen budzetow. Automatyczne alerty i raporty.',
    stats: '85% mniej manualnej pracy',
    accuracy: '99.2% detekcja',
    tools: ['ifirma', 'wFirma', 'Google Sheets', 'Slack', 'Power BI'],
  },
  {
    icon: MessageSquare,
    title: 'Obsluga klienta L1',
    description: 'Odpowiada na FAQ, przekierowuje zlozone sprawy, tworzy tickety, eskaluje pilne problemy. Czlowiek w petli na L2+.',
    stats: '70% spraw bez eskalacji',
    accuracy: '< 30s czas reakcji',
    tools: ['Intercom', 'Zendesk', 'Slack', 'Notion'],
  },
  {
    icon: FileSearch,
    title: 'Analiza dokumentow',
    description: 'Ekstrakcja danych z umow, ofert, faktur. Porownywanie warunkow, wykrywanie ryzyk, generowanie podsumoan.',
    stats: '10x szybciej niz recznie',
    accuracy: '97% dokladnosc',
    tools: ['Google Drive', 'SharePoint', 'Notion', 'Slack'],
  },
  {
    icon: Users,
    title: 'Onboarding HR',
    description: 'Automatyczny onboarding nowych pracownikow: dokumenty, dostepy, zadania szkoleniowe, przypomnienia, checklisty.',
    stats: '90% automatyzacji',
    accuracy: '0 pominiectych krokow',
    tools: ['Google Workspace', 'Slack', 'Notion', 'BambooHR'],
  },
];

const PROCESS = [
  { icon: Eye, title: 'Odkrycie', desc: 'Mapujemy procesy, identyfikujemy agentow o najwyzszym ROI.' },
  { icon: Brain, title: 'Projektowanie', desc: 'Definiujemy prompty, flow, metryki jakosci i punkty eskalacji.' },
  { icon: Cog, title: 'Budowa i testy', desc: 'Budujemy agenta, testujemy na realnych danych, iterujemy.' },
  { icon: BarChart3, title: 'Monitoring', desc: 'Sledzenie jakosci, prompt updates, raporty miesieczne.' },
];

const PRICING = [
  {
    name: 'Start',
    price: '15 000',
    monthly: '2 000',
    description: '1 agent AI z podstawowym monitoringiem.',
    features: ['1 agent', 'Setup + szkolenie', 'Monitoring tygodniowy', 'Email wsparcie', 'Dokumentacja'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '45 000',
    monthly: '8 000',
    description: 'Do 3 agentow z zaawansowanym monitoringiem.',
    features: ['Do 3 agentow', 'Custom prompty', 'Monitoring 24/7', 'Slack wsparcie', 'Miesieczne raporty', 'Prompt updates', 'Czlowiek w petli'],
    highlight: true,
  },
  {
    name: 'Managed',
    price: '80 000',
    monthly: '15 000',
    description: 'Pelna obsluga AI agentow dla back-office.',
    features: ['Unlimited agentow', 'Dedykowany team', 'Monitoring proaktywny', 'SLA 2h', 'Custom integracje', 'Kwartalne przeglady', 'Szkolenia zespolu'],
    highlight: false,
  },
];

function AgentCard({ agent, index }: { agent: typeof AGENTS[0]; index: number }) {
  const { ref, isInView } = useInView();
  const Icon = agent.icon;

  return (
    <div
      ref={ref}
      className={`glass-card-hover p-8 transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-sky-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{agent.title}</h3>
          <div className="flex gap-3 mt-1">
            <span className="text-xs text-sky-400 font-medium">{agent.stats}</span>
            <span className="text-xs text-steel-500">|</span>
            <span className="text-xs text-emerald-400 font-medium">{agent.accuracy}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-steel-400 leading-relaxed mb-5">{agent.description}</p>
      <div className="flex flex-wrap gap-2">
        {agent.tools.map((tool) => (
          <span key={tool} className="badge-steel text-[11px]">{tool}</span>
        ))}
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const { ref: procRef, isInView: procInView } = useInView();
  const { ref: priceRef, isInView: priceInView } = useInView();

  return (
    <div className="pt-20 lg:pt-24">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sky-500/8 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="badge bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-6 inline-flex items-center gap-2">
              <Bot className="w-3.5 h-3.5" />
              AI Agents 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Agenci AI dla{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">back-office</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed mb-8 max-w-2xl">
              Nie testujemy -- wdrazamy agentow, ktorzy realnie pracuja. Finanse, HR,
              sprzedaz, obsluga klienta. Z czlowiekiem w petli i pelnym monitoringiem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
                Umow demo agenta
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a href="#cennik" className="btn-secondary text-base px-8 py-4">
                Zobacz cennik
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="section-container">
          <SectionHeading
            badge="Agenci"
            title="Agenci, ktorzy"
            highlight="realnie dzialaja"
            description="Kazdy agent jest dostosowany do Twoich narzedzi, procesow i zespolu. Z czlowiekiem w petli i jasno zdefiniowanymi granicami decyzyjnosci."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {AGENTS.map((agent, i) => (
              <AgentCard key={agent.title} agent={agent} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-steel-900/20 to-steel-950" />
        <div className="section-container relative z-10">
          <SectionHeading
            badge="Proces"
            title="Od pomyslu do"
            highlight="dzialajacego agenta"
          />
          <div ref={procRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {PROCESS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className={`glass-card p-6 text-center transition-all duration-700 ${
                    procInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-steel-400">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="cennik" className="py-24 lg:py-32">
        <div className="section-container">
          <SectionHeading
            badge="Cennik"
            title="Pakiety"
            highlight="AI Agents"
            description="Projekt + abonament miesieczny. Monitoring, prompt updates i wsparcie wliczone."
          />
          <div ref={priceRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative transition-all duration-700 ${
                  priceInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="badge bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs">Najpopularniejszy</span>
                  </div>
                )}
                <div className={`glass-card p-8 h-full flex flex-col ${plan.highlight ? 'border-sky-500/30' : ''}`}>
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-sm text-steel-400 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-steel-400 ml-2">PLN projekt</span>
                    <p className="text-sm text-steel-500 mt-1">+ {plan.monthly} PLN/mies.</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-steel-300">
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
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
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="glass-card p-10 lg:p-16 text-center">
            <Bot className="w-12 h-12 text-sky-400 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Zacznij od jednego agenta
            </h2>
            <p className="text-lg text-steel-400 max-w-xl mx-auto mb-8">
              Wdraz jednego agenta, zmierz ROI, skaluj na kolejne procesy. Bez ryzyka.
            </p>
            <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
              Umow demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
