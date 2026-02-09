import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-32 lg:py-40">
        <div className="section-container">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-8xl font-bold gradient-text mb-6">404</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Strona nie znaleziona
            </h1>
            <p className="text-steel-400 leading-relaxed mb-8">
              Strona, ktorej szukasz, nie istnieje lub zostala przeniesiona.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="btn-primary">
                <Home className="w-4 h-4" />
                Strona glowna
              </Link>
              <button onClick={() => window.history.back()} className="btn-secondary">
                <ArrowLeft className="w-4 h-4" />
                Wstecz
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
