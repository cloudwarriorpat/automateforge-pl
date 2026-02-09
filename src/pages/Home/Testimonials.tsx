import { Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../components/SectionHeading';
import { useInView } from '../../hooks/useInView';

const REASONS = [
  {
    title: 'Deadline KSeF sie nie cofnie',
    description: 'Od 1 kwietnia 2026 KSeF jest obowiazkowy dla MSP. Firmy, ktore zaczna wczesniej, unikna chaosu i kolejek.',
  },
  {
    title: 'AI adopcja w Polsce: 5.9%',
    description: 'Ogromna luka rynkowa. Firmy, ktore wdroza automatyzacje teraz, beda miec przewage operacyjna nad konkurencja.',
  },
  {
    title: 'Gwarancja rezultatu',
    description: 'Odwracamy ryzyko na siebie: 90-dniowa gwarancja zwrotu, platnosc 50/30/20 powiazana z wynikami.',
  },
];

export default function Testimonials() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-steel-950 via-steel-900/20 to-steel-950" />
      <div className="section-container relative z-10">
        <SectionHeading
          badge="Dlaczego teraz"
          title="Wczesni uzytkownicy"
          highlight="wygrywaja"
          description="Jestesmy na poczatku drogi -- i szukamy firm, ktore chca automatyzowac pierwsze. Oto dlaczego warto zaczac teraz."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className={`glass-card p-8 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <h3 className="text-lg font-semibold text-white mb-3">{r.title}</h3>
              <p className="text-sm text-steel-400 leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto border-brand-500/10">
            <Rocket className="w-10 h-10 text-brand-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Szukamy pierwszych 10 klientow</h3>
            <p className="text-sm text-steel-400 mb-6">
              Jako jeden z pierwszych klientow dostaniesz priorytetowe wdrozenie, bezposredni kontakt
              z founderem i wplyw na kierunek produktu.
            </p>
            <Link to="/kontakt" className="btn-primary text-sm px-6 py-3">
              Dolacz do early adopters
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
