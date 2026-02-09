import { Link } from 'react-router-dom';
import { ChevronRight, Zap } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

export default function CTA() {
  const { ref, isInView } = useInView();

  return (
    <section className="py-24 lg:py-32">
      <div className="section-container">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500/10 via-brand-600/5 to-steel-900 border border-brand-500/20 p-10 lg:p-16 text-center transition-all duration-700 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Zacznij dzis
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Gotowy na <span className="gradient-text">automatyzacje?</span>
            </h2>

            <p className="text-lg text-steel-400 max-w-xl mx-auto mb-8">
              Umow sie na bezplatny 30-minutowy audyt. Pokaz nam swoje procesy,
              a my pokarzemy Ci konkretne mozliwosci automatyzacji.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
                Umow bezplatny audyt
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
