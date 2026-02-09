import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-16 lg:py-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-400" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Regulamin</h1>
            </div>

            <div className="prose-custom space-y-8">
              <section>
                <p className="text-steel-400 leading-relaxed">
                  Ostatnia aktualizacja: 9 lutego 2026
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">1. Postanowienia ogolne</h2>
                <p className="text-steel-400 leading-relaxed">
                  Niniejszy regulamin okresla zasady korzystania ze strony internetowej automateforge.pl
                  oraz uslug oferowanych przez AutomateForge (CyberNexus Holdings) z siedziba w Warszawie.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">2. Zakres uslug</h2>
                <p className="text-steel-400 leading-relaxed mb-3">AutomateForge oferuje nastepujace uslugi:</p>
                <ul className="space-y-2 text-steel-400">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span><strong className="text-white">KSeF Studio:</strong> integracja systemow fakturujacych z Krajowym Systemem e-Faktur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span><strong className="text-white">AI Agents:</strong> wdrazanie agentow sztucznej inteligencji do automatyzacji procesow back-office</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span><strong className="text-white">Szablony automatyzacji:</strong> gotowe workflow n8n do integracji z polskimi narzedziami biznesowymi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    <span><strong className="text-white">Program partnerski:</strong> wspolpraca z firmami IT i biurami rachunkowymi</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">3. Formularze kontaktowe</h2>
                <p className="text-steel-400 leading-relaxed">
                  Wyslanie formularza kontaktowego lub zapisanie sie na liste oczekujacych nie stanowi
                  zawarcia umowy. Jest to wylacznie wyrazenie zainteresowania uslugami. Warunki
                  wspolpracy sa ustalane indywidualnie i formalizowane w odrebnej umowie.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">4. Bezplatny audyt</h2>
                <p className="text-steel-400 leading-relaxed">
                  AutomateForge oferuje bezplatna konsultacje diagnostyczna (audyt 30 minut).
                  Audyt nie zobowiazuje do skorzystania z platnych uslug. Raport diagnostyczny
                  przygotowany po audycie jest objety klauzula poufnosci.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">5. Szablony automatyzacji</h2>
                <p className="text-steel-400 leading-relaxed">
                  Szablony automatyzacji sprzedawane sa jako licencja na uzytkowanie. Kupujacy
                  otrzymuje prawo do uzywania i modyfikowania szablonu w ramach wlasnej organizacji.
                  Zabrania sie redystrybucji szablonow bez pisemnej zgody AutomateForge.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">6. Gwarancja i odpowiedzialnosc</h2>
                <p className="text-steel-400 leading-relaxed">
                  AutomateForge doklada starannosci w swiadczeniu uslug najwyzszej jakosci.
                  Szczegoowe warunki gwarancji, SLA oraz odpowiedzialnosci sa okreslane
                  w indywidualnej umowie z klientem. Strona automateforge.pl sluzy celom
                  informacyjnym i nie stanowi oferty w rozumieniu Kodeksu cywilnego.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">7. Wlasnosc intelektualna</h2>
                <p className="text-steel-400 leading-relaxed">
                  Wszystkie materialy opublikowane na stronie automateforge.pl (teksty, grafiki,
                  kod zrodlowy) sa chronione prawem autorskim. Jakiekolwiek kopiowanie, rozpowszechnianie
                  lub wykorzystywanie materialow bez pisemnej zgody jest zabronione.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">8. Zmiany regulaminu</h2>
                <p className="text-steel-400 leading-relaxed">
                  AutomateForge zastrzega sobie prawo do zmiany niniejszego regulaminu.
                  O wszelkich zmianach beda informowani uzytkownicy poprzez aktualizacje daty
                  na niniejszej stronie.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-3">9. Kontakt</h2>
                <p className="text-steel-400 leading-relaxed">
                  W razie pytan dotyczacych regulaminu prosimy o kontakt: kontakt@automateforge.pl.
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
