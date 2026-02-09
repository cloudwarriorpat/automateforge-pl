import { useInView } from '../../hooks/useInView';

function daysUntilKSeFDeadline(): number {
  const deadline = new Date('2026-04-01');
  const today = new Date();
  const diff = deadline.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

const STATS = [
  { value: '2.5M+', label: 'Firm objetych obowiazkiem KSeF' },
  { value: `${daysUntilKSeFDeadline()}`, label: 'Dni do deadline KSeF dla MSP' },
  { value: '5.9%', label: 'Adopcja AI w polskim biznesie' },
];

export default function Stats() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-16 lg:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 via-brand-500/10 to-brand-500/5" />
      <div className="section-container relative z-10">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-sm text-steel-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
