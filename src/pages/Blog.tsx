import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Bell } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-[128px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <span className="badge-brand mb-6 inline-flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" />
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Wiedza o{' '}
              <span className="gradient-text">automatyzacji</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed max-w-2xl">
              Artykuly, poradniki i case studies o KSeF, AI Agents i automatyzacji procesow
              dla polskiego biznesu.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-10 lg:p-16">
              <Bell className="w-12 h-12 text-brand-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Blog startuje wkrotce
              </h2>
              <p className="text-lg text-steel-400 mb-4">
                Pracujemy nad pierwszymi artykulami o KSeF 2026, automatyzacji procesow
                i praktycznym wykorzystaniu AI w polskim biznesie.
              </p>
              <p className="text-sm text-steel-500 mb-8">
                Tematy w przygotowaniu: przewodnik po KSeF dla MSP, case studies wdrozen,
                porownanie narzedzi automatyzacji, compliance AI Act.
              </p>
              <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
                Powiadom mnie o starcie
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
