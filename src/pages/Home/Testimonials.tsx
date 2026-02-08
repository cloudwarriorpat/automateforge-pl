import { Star } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import { useInView } from '../../hooks/useInView';

const TESTIMONIALS = [
  {
    name: 'Marta Kowalska',
    role: 'CFO, TechDistro sp. z o.o.',
    content: 'Wdrozenie KSeF z AutomateForge zajelo 2 tygodnie zamiast planowanych 2 miesiecy. Monitoring odrzutow uratwal nas juz w pierwszym miesiacu.',
    avatar: 'MK',
  },
  {
    name: 'Piotr Nowak',
    role: 'CEO, E-commerce Pro',
    content: 'Szablony integracji Allegro-BaseLinker-InPost zaoszczedzily nam 40h pracy miesiecznie. Najlepsza inwestycja tego roku.',
    avatar: 'PN',
  },
  {
    name: 'Anna Wisniewska',
    role: 'COO, SaaS Solutions',
    content: 'Agent AI do triage maili przetworzyl 15 000 wiadomosci w pierwszym miesiacu z 94% trafnoscia. Zespol wreszcie moze sie skupic na rzeczach waznych.',
    avatar: 'AW',
  },
];

export default function Testimonials() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-steel-900/20 to-steel-950" />
      <div className="section-container relative z-10">
        <SectionHeading
          badge="Opinie"
          title="Zaufali nam"
          highlight="liderzy branz"
          description="Firmy, ktore juz automatyzuja procesy z AutomateForge."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`glass-card p-8 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-400 text-brand-400" />
                ))}
              </div>
              <p className="text-steel-300 leading-relaxed mb-6">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-sm font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-steel-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
