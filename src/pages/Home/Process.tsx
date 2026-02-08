import { Link } from 'react-router-dom';
import { Phone, Search, Wrench, Rocket, ChevronRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import { useInView } from '../../hooks/useInView';

const STEPS = [
  {
    icon: Phone,
    number: '01',
    title: 'Bezplatny audyt',
    description: '30-minutowa rozmowa, w ktorej poznajemy Twoje procesy i identyfikujemy najwieksze mozliwosci automatyzacji.',
  },
  {
    icon: Search,
    number: '02',
    title: 'Diagnoza 10 automatyzacji',
    description: 'Dostajesz raport z 10 konkretnymi propozycjami automatyzacji z szacunkiem ROI i priorytetami wdrozenia.',
  },
  {
    icon: Wrench,
    number: '03',
    title: 'Wybierasz pakiet',
    description: 'Start, Pro lub Managed -- dopasowujemy zakres do Twoich potrzeb i budzetow. Bez ukrytych kosztow.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Wdrozenie i efekty',
    description: 'Budujemy, testujemy, wdrazamy. Monitorujemy efekty i optymalizujemy. Ty skupiasz sie na biznesie.',
  },
];

export default function Process() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 lg:py-32">
      <div className="section-container">
        <SectionHeading
          badge="Jak dzialamy"
          title="Od audytu do efektow"
          highlight="w 4 krokach"
          description="Prosty, przejrzysty proces. Bez zbednych spotkan, bez overengineeringu. Konkretne efekty w konkretnym czasie."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 mb-12">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="glass-card p-8 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl font-bold text-brand-500/30 font-mono">{step.number}</span>
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-400" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-steel-400 leading-relaxed">{step.description}</p>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-steel-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
            Zacznij od bezplatnego audytu
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
