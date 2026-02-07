import { Check } from "lucide-react";
import Link from "next/link";

const includedFeatures = [
    "Automatyczny Skan Infrastruktury (Cloud/AD)",
    "Analiza Luk (Gap Analysis) wg wymogów KSC",
    "Plan Zarządzania Ryzykiem (PDCA Strategy)",
    "Playbook Reagowania na Incydenty (PagerDuty/OpsGenie)",
    "Warsztat dla Zarządu (2h) - Odpowiedzialność Prawna",
    "Raport Końcowy 'NIS2 Ready'",
    "30 dni wsparcia po wdrożeniu"
];

export default function PricingSection() {
    return (
        <div className="bg-neutral-900 py-24 sm:py-32 rounded-3xl border border-neutral-800 relative overflow-hidden" id="offer">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">NIS2 Readiness Sprint</h2>
                    <p className="mt-6 text-lg leading-8 text-neutral-400">
                        Dla firm, które potrzebują konkretów, a nie setki stron teoretycznych procedur.
                        Wdrażamy podejście DevSecOps do analizy ryzyka.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-white/10 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="p-8 sm:p-10 lg:flex-auto">
                        <h3 className="text-2xl font-bold tracking-tight text-white">Pełny Audyt + Strategia</h3>
                        <p className="mt-6 text-base leading-7 text-neutral-400">
                            W ciągu 2 tygodni dostarczymy Ci pełny obraz Twojej gotowości na ustawę KSC wraz z gotowymi procedurami technicznymi.
                        </p>
                        <div className="mt-10 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-[var(--neon-green)]">Co otrzymasz?</h4>
                            <div className="h-px flex-auto bg-neutral-800" />
                        </div>
                        <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-neutral-300 sm:grid-cols-2 sm:gap-6">
                            {includedFeatures.map((feature) => (
                                <li key={feature} className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-[var(--neon-green)]" aria-hidden="true" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                        <div className="rounded-2xl bg-neutral-950 py-10 text-center ring-1 ring-inset ring-white/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                            <div className="mx-auto max-w-xs px-8">
                                <p className="text-base font-semibold text-neutral-400">Inwestycja jednorazowa (Netto)</p>
                                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                    <span className="text-5xl font-bold tracking-tight text-white">12,000</span>
                                    <span className="text-sm font-semibold leading-6 tracking-wide text-neutral-400">PLN</span>
                                </p>
                                <Link
                                    href="#"
                                    className="mt-10 block w-full rounded-md bg-[var(--neon-green)] px-3 py-2 text-center text-sm font-semibold text-black shadow-sm hover:bg-[#00ff41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                                >
                                    Zamów Konsultację
                                </Link>
                                <p className="mt-6 text-xs leading-5 text-neutral-500">
                                    Faktura VAT 23%. Gwarancja satysfakcji.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
