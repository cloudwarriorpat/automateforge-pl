import { ShieldCheck, Undo2, Clock } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: 'Gwarancja rezultatu',
    description: 'Jesli w ciagu 90 dni nie zobaczysz mierzalnych wynikow (redukcja czasu, mniej bledow, wyzsza efektywnosc) -- zwracamy 100% pieniedzy.',
  },
  {
    icon: Undo2,
    title: 'Gwarancja satysfakcji',
    description: 'Jesli po wdrozeniu nie jestes zadowolony z jakosci -- naprawiamy za darmo lub oddajemy pieniadze. Bez pytan, bez procedur.',
  },
  {
    icon: Clock,
    title: 'Gwarancja terminowosci',
    description: 'Jesli nie dotrzymamy ustalonego terminu wdrozenia -- otrzymujesz 20% rabatu na abonament przez 6 miesiecy.',
  },
];

export default function Guarantee() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-emerald-900/5 to-steel-950" />
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6 inline-flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Potrojna gwarancja
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Zero ryzyka. <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">Pelna gwarancja.</span>
          </h2>
          <p className="text-lg text-steel-400 max-w-2xl mx-auto">
            Odwracamy ryzyko na siebie. Placisz tylko za wyniki, ktore widzisz.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
          {GUARANTEES.map((g, i) => {
            const Icon = g.icon;
            return (
              <div
                key={g.title}
                className={`glass-card p-8 text-center border-emerald-500/10 transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{g.title}</h3>
                <p className="text-sm text-steel-400 leading-relaxed">{g.description}</p>
              </div>
            );
          })}
        </div>

        <div className="glass-card p-8 max-w-3xl mx-auto text-center border-emerald-500/10">
          <h3 className="text-lg font-semibold text-white mb-3">Struktura platnosci (Risk Reversal)</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-2xl font-bold text-emerald-400">50%</p>
              <p className="text-xs text-steel-400 mt-1">Przy podpisaniu umowy</p>
              <p className="text-[11px] text-steel-500">Pokrywa setup</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-2xl font-bold text-emerald-400">30%</p>
              <p className="text-xs text-steel-400 mt-1">Po go-live</p>
              <p className="text-[11px] text-steel-500">Po pozytywnych testach</p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-2xl font-bold text-emerald-400">20%</p>
              <p className="text-xs text-steel-400 mt-1">Po 30 dniach</p>
              <p className="text-[11px] text-steel-500">Tylko jesli zadowolony</p>
            </div>
          </div>
          <p className="text-sm text-steel-400">Nie placisz pelnej kwoty, dopoki nie widzisz wynikow.</p>
        </div>
      </div>
    </section>
  );
}
