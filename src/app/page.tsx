import Link from "next/link";
import { ShieldCheck, ArrowRight, FileText, CheckCircle } from "lucide-react";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--neon-green)] opacity-5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[var(--neon-purple)] opacity-5 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex flex-col gap-12 pt-20">

        {/* Badge */}
        <div className="flex items-center gap-2 rounded-full border border-[var(--neon-green)] bg-[var(--neon-green)]/10 px-4 py-1.5 text-[var(--neon-green)] animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-xs font-bold tracking-wider uppercase">Dyrektywa NIS2 / Ustawa KSC</span>
        </div>

        {/* Headline */}
        <div className="text-center space-y-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-glow">
            NIS2 to nie "papierologia".<br />
            To Twoje bezpieczeństwo.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Automatyzujemy audyt zgodności z ustawą o Krajowym Systemie Cyberbezpieczeństwa.
            Dla firm produkcyjnych i logistycznych, które nie mają czasu na biurokrację.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <Link
            href="#audit"
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-[var(--neon-green)] px-8 font-medium text-black transition-all duration-300 hover:bg-[#00ff41] hover:w-full sm:w-auto"
          >
            <span className="mr-2">Rozpocznij Darmowy Audyt</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#offer"
            className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-800 bg-black px-8 font-medium text-neutral-300 transition-colors hover:bg-neutral-900 sm:w-auto"
          >
            Zobacz Ofertę (Readiness Sprint)
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center text-neutral-500 text-sm">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[var(--neon-purple)]" />
            <span>Zgodność z KSC</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FileText className="w-6 h-6 text-[var(--neon-purple)]" />
            <span>Automatyczna Dokumentacja</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[var(--neon-purple)]" />
            <span>DevSecOps Standard</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[var(--neon-purple)]" />
            <span>Zero "Lania Wody"</span>
          </div>
        </div>

      </div>

      <div className="mt-32 w-full max-w-5xl">
        {/* Placeholder for Lead Magnet Component */}
        <div id="audit" className="w-full min-h-[400px] border border-[var(--card-border)] rounded-2xl bg-[var(--card-bg)] p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-green)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full gap-6">
            <h2 className="text-2xl font-bold">Sprawdź czy Twoja firma jest "Podmiotem Kluczowym"</h2>
            <p className="text-neutral-400 max-w-md">Uruchom nasz automatyczny bot diagnostyczny. 3 minuty. Wynik PDF na maila.</p>
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
              Uruchom Diagnostic bota (Demo)
            </button>
          </div>
        </div>
      </div>


      <div className="mt-32 w-full max-w-7xl">
        <PricingSection />
      </div>

    </main >
  );
}
