import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function TemplatesPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await supabase.from('leads').insert({
      name: '',
      email,
      company: '',
      service: 'templates-waitlist',
      message: 'Zainteresowany szablonami automatyzacji - waitlist',
    });
    setSubmitting(false);
    setSubmitted(true);
    setEmail('');
  }

  return (
    <div className="pt-20 lg:pt-24">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-500/8 rounded-full blur-[128px]" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-6">
              <Package className="w-3.5 h-3.5" />
              Wkrotce
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Szablony{' '}
              <span className="gradient-text">automatyzacji</span>
            </h1>
            <p className="text-xl text-steel-400 leading-relaxed mb-4">
              Gotowe workflow dla Make i n8n, zaprojektowane pod polski rynek:
              KSeF, BaseLinker, Allegro, Fakturownia, ifirma, InPost, Przelewy24.
            </p>
            <p className="text-base text-steel-500 mb-10">
              Pracujemy nad pierwszymi szablonami. Zostaw email, a powiadomimy Cie
              jak tylko beda gotowe.
            </p>

            {submitted ? (
              <div className="glass-card p-8 max-w-md mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <p className="text-white font-medium mb-2">Dziekujemy!</p>
                <p className="text-sm text-steel-400">Powiadomimy Cie jak tylko szablony beda gotowe.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-12">
                <input
                  type="email"
                  required
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field flex-1"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary whitespace-nowrap disabled:opacity-50"
                >
                  {submitting ? 'Wysylanie...' : 'Powiadom mnie'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="glass-card p-8 max-w-lg mx-auto text-left">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-400" />
                Planowane szablony
              </h3>
              <ul className="space-y-3">
                {[
                  'KSeF Auto-Sender — automatyczna wysylka faktur do KSeF',
                  'BaseLinker-InPost Tracker — sledzenie przesylek',
                  'Invoice Duplicate Detector — wykrywanie duplikatow faktur',
                  'Lead Enrichment Pipeline — scoring i wzbogacanie leadow',
                  'Daily Slack Digest — poranny raport ze wszystkich zrodel',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-steel-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12">
              <p className="text-sm text-steel-500 mb-4">
                Potrzebujesz automatyzacji juz teraz? Umow sie na bezplatny audyt.
              </p>
              <Link to="/kontakt" className="btn-secondary text-sm">
                Umow bezplatny audyt
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
