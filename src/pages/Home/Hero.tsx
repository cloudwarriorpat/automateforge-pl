import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Shield, Bot, AlertTriangle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-600/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-steel-900/50 via-steel-950 to-steel-950" />
      </div>

      <div className="section-container relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4 animate-fade-in">
            <AlertTriangle className="w-4 h-4" />
            KSeF deadline: 1 kwietnia 2026 dla MSP
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-8 animate-fade-in ml-2">
            <Zap className="w-4 h-4" />
            Kuznia automatyzacji dla polskiego biznesu
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 animate-fade-up">
            Automatyzujemy procesy.{' '}
            <span className="gradient-text">Przyspieszamy wzrost.</span>
          </h1>

          <p className="text-lg sm:text-xl text-steel-400 max-w-2xl mx-auto leading-relaxed mb-4 animate-fade-up animate-delay-200">
            Wdrozenia KSeF, agenci AI dla back-office i gotowe szablony integracji
            z polskimi narzedziami. Wszystko, czego potrzebuje Twoj biznes w 2026.
          </p>

          <p className="text-base text-steel-500 max-w-xl mx-auto mb-10 animate-fade-up animate-delay-200">
            Adopcja AI w Polsce: zaledwie 5.9%. 2.5M+ firm musi wdrozyc KSeF.
            To Twoja szansa -- dzialaj, zanim zrobi to konkurencja.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up animate-delay-300">
            <Link to="/kontakt" className="btn-primary text-base px-8 py-4">
              Bezplatny audyt 30 min
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link to="/ksef" className="btn-secondary text-base px-8 py-4">
              Sprawdz gotowosc KSeF
            </Link>
          </div>
        </div>

        <div className="mt-20 lg:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: Shield,
              label: 'KSeF Studio',
              desc: 'Nigdy wiecej stresu z e-fakturami',
              to: '/ksef',
              delay: 'animate-delay-100',
            },
            {
              icon: Bot,
              label: 'AI Agents',
              desc: 'Zespol ktory nigdy nie spi',
              to: '/agents',
              delay: 'animate-delay-200',
            },
            {
              icon: Zap,
              label: 'Szablony PL',
              desc: 'Gotowe workflow w 10 minut',
              to: '/templates',
              delay: 'animate-delay-300',
            },
          ].map(({ icon: Icon, label, desc, to, delay }) => (
            <Link
              key={to}
              to={to}
              className={`glass-card-hover p-6 flex items-center gap-4 group animate-fade-up ${delay}`}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-colors">
                <Icon className="w-6 h-6 text-brand-400" />
              </div>
              <div>
                <p className="font-semibold text-white">{label}</p>
                <p className="text-sm text-steel-400">{desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-steel-500 ml-auto group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
