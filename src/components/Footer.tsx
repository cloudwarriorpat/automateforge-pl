import { Link } from 'react-router-dom';
import { Hammer, Mail, MapPin, ArrowUpRight } from 'lucide-react';

const FOOTER_LINKS = {
  'Uslugi': [
    { to: '/ksef', label: 'KSeF Studio' },
    { to: '/agents', label: 'AI Agents' },
  ],
  'Firma': [
    { to: '/kontakt', label: 'Kontakt' },
    { to: '/partnerzy', label: 'Program partnerski' },
    { to: '/kontakt', label: 'Bezplatny audyt' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-steel-800/50 bg-steel-950">
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-600 rounded-lg flex items-center justify-center">
                <Hammer className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Automate<span className="text-brand-400">Forge</span>
              </span>
            </Link>
            <p className="text-steel-400 max-w-md leading-relaxed mb-6">
              Kuznia automatyzacji dla polskiego biznesu. Wdrazamy KSeF, budujemy agentow AI
              i dostarczamy gotowe szablony integracji z polskimi narzedziami.
            </p>
            <div className="flex flex-col gap-2 text-sm text-steel-400">
              <a href="mailto:kontakt@automateforge.pl" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                <Mail className="w-4 h-4" />
                kontakt@automateforge.pl
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Warszawa, Polska
              </span>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-steel-400 hover:text-brand-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-steel-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-steel-500">
            &copy; {new Date().getFullYear()} AutomateForge. Wszelkie prawa zastrzezone.
          </p>
          <div className="flex items-center gap-6 text-sm text-steel-500">
            <span>Polityka prywatnosci</span>
            <span>Regulamin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
