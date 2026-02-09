import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-brand-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Polityka prywatnosci</h1>
            </div>

            <div className="prose-custom space-y-8">
              <section>
                <p className="text-steel-400 leading-relaxed">
                  Ostatnia aktualizacja: 9 lutego 2026
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Administrator danych</h2>
                <p className="text-steel-400 leading-relaxed">
                  Administratorem Twoich danych osobowych jest AutomateForge (CyberNexus Holdings),
                  z siedziba w Warszawie, Polska. Kontakt: kontakt@automateforge.pl.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Jakie dane zbieramy</h2>
                <p className="text-steel-400 leading-relaxed mb-3">
                  Zbieramy wylacznie dane, ktore sam nam przekazujesz poprzez formularze na stronie:
                </p>
                <ul className="space-y-2 text-steel-400">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span><strong className="text-white">Formularz kontaktowy:</strong> imie, email, firma, telefon (opcjonalnie), wybrany serwis, wiadomosc</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span><strong className="text-white">Waitlist szablonow:</strong> adres email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span><strong className="text-white">Skaner KSeF:</strong> adres email, wynik testu gotowosci</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Cel przetwarzania danych</h2>
                <p className="text-steel-400 leading-relaxed mb-3">Twoje dane przetwarzamy w celu:</p>
                <ul className="space-y-2 text-steel-400">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Odpowiedzi na Twoje zapytanie (art. 6 ust. 1 lit. b RODO)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Informowania o dostepnosci szablonow i uslug (art. 6 ust. 1 lit. a RODO — zgoda)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Dostarczania spersonalizowanych rekomendacji KSeF (art. 6 ust. 1 lit. a RODO)</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Przechowywanie danych</h2>
                <p className="text-steel-400 leading-relaxed">
                  Dane sa przechowywane w bazie Supabase (PostgreSQL) z wlaczonym Row Level Security.
                  Serwery znajduja sie w Unii Europejskiej. Dane przechowujemy przez okres niezbedny
                  do realizacji celu przetwarzania, nie dluzej niz 24 miesiace od ostatniego kontaktu.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Twoje prawa</h2>
                <p className="text-steel-400 leading-relaxed mb-3">Zgodnie z RODO przysluguaja Ci nastepujace prawa:</p>
                <ul className="space-y-2 text-steel-400">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Prawo dostepu do swoich danych</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Prawo do sprostowania danych</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Prawo do usuniecia danych ("prawo do bycia zapomnianym")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Prawo do ograniczenia przetwarzania</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Prawo do przenoszenia danych</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Prawo do cofniecia zgody w dowolnym momencie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span>Prawo do wniesienia skargi do Prezesa UODO</span>
                  </li>
                </ul>
                <p className="text-steel-400 leading-relaxed mt-3">
                  Aby skorzystac z powyzszych praw, napisz do nas na: kontakt@automateforge.pl.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Pliki cookies</h2>
                <p className="text-steel-400 leading-relaxed">
                  Strona automateforge.pl nie uzywa plikow cookies sledzacych ani narzedzi analitycznych
                  stron trzecich. Jedyne cookies mogace byc uzywane to techniczne cookies niezbedne
                  do dzialania strony (np. preferencje sesji).
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Udostepnianie danych</h2>
                <p className="text-steel-400 leading-relaxed">
                  Twoich danych nie sprzedajemy ani nie udostepniamy podmiotom trzecim w celach marketingowych.
                  Dane moga byc udostepniane wylacznie dostawcom infrastruktury (Supabase Inc.) w zakresie
                  niezbednym do swiadczenia uslug, na podstawie umowy powierzenia danych.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Kontakt</h2>
                <p className="text-steel-400 leading-relaxed">
                  W sprawach zwiazanych z ochrona danych osobowych mozesz sie skontaktowac pod adresem:
                  kontakt@automateforge.pl.
                </p>
              </section>

              <div className="pt-8 border-t border-steel-800/50">
                <Link to="/" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                  &larr; Powrot do strony glownej
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
