import { useState, type FormEvent } from 'react';
import {
  Send, CheckCircle2, Phone, Mail, MapPin,
  Clock, ChevronRight, AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useInView } from '../hooks/useInView';

const SERVICES = [
  { value: 'ksef', label: 'KSeF Studio' },
  { value: 'agents', label: 'AI Agents' },
  { value: 'templates', label: 'Szablony automatyzacji' },
  { value: 'managed-n8n', label: 'Managed n8n' },
  { value: 'ai-act', label: 'AI Act Governance' },
  { value: 'nis2', label: 'NIS2 Readiness' },
  { value: 'gtm', label: 'GTM Engineering' },
  { value: 'general', label: 'Inne / Nie wiem jeszcze' },
];

const STEPS = [
  { icon: Phone, title: 'Bezplatny audyt 30 min', desc: 'Poznajemy Twoje procesy i wyzwania.' },
  { icon: Mail, title: 'Diagnoza 10 automatyzacji', desc: 'Dostajesz raport z ROI w 48h.' },
  { icon: CheckCircle2, title: 'Oferta w 3 pakietach', desc: 'Start / Pro / Managed -- bez niespodzianek.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'general',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { ref: stepsRef, isInView: stepsInView } = useInView();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: dbError } = await supabase.from('leads').insert({
      name: form.name,
      email: form.email,
      company: form.company,
      phone: form.phone,
      service: form.service,
      message: form.message,
    });

    setSubmitting(false);
    if (dbError) {
      setError('Cos poszlo nie tak. Sprobuj ponownie.');
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="pt-20 lg:pt-24">
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-brand-500/8 rounded-full blur-[128px]" />
        </div>

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            <div>
              <span className="badge-brand mb-6 inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Odpowiadamy w 24h
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Umow <span className="gradient-text">bezplatny audyt</span>
              </h1>
              <p className="text-lg text-steel-400 leading-relaxed mb-10">
                30 minut, ktore moze zmienic sposob, w jaki prowadzisz biznes.
                Wypelnij formularz, a my skontaktujemy sie w ciagu 24 godzin.
              </p>

              <div ref={stepsRef} className="space-y-6 mb-10">
                {STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className={`flex items-start gap-4 transition-all duration-500 ${
                        stepsInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ transitionDelay: `${i * 150}ms` }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-brand-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{step.title}</p>
                        <p className="text-sm text-steel-400">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="glass-card p-6 space-y-3">
                <a href="mailto:kontakt@automateforge.pl" className="flex items-center gap-3 text-sm text-steel-300 hover:text-brand-400 transition-colors">
                  <Mail className="w-4 h-4 text-steel-500" />
                  kontakt@automateforge.pl
                </a>
                <span className="flex items-center gap-3 text-sm text-steel-300">
                  <MapPin className="w-4 h-4 text-steel-500" />
                  Warszawa, Polska
                </span>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="glass-card p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">Dziekujemy!</h2>
                  <p className="text-steel-400 mb-6">
                    Twoje zgloszenie zostalo wyslane. Skontaktujemy sie w ciagu 24 godzin.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: '', email: '', company: '', phone: '', service: 'general', message: '' });
                    }}
                    className="text-sm text-brand-400 hover:text-brand-300 transition-colors"
                  >
                    Wyslij kolejne zgloszenie
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-steel-300 mb-1.5">Imie i nazwisko *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="input-field"
                        placeholder="Jan Kowalski"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-steel-300 mb-1.5">Email *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="input-field"
                        placeholder="jan@firma.pl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-steel-300 mb-1.5">Firma *</label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                        className="input-field"
                        placeholder="Nazwa firmy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-steel-300 mb-1.5">Telefon</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                        className="input-field"
                        placeholder="+48 123 456 789"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-steel-300 mb-1.5">Czym jestes zainteresowany?</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))}
                      className="input-field appearance-none"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-steel-300 mb-1.5">Wiadomosc</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                      className="input-field resize-none"
                      placeholder="Opisz krotko swoje potrzeby..."
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Wysylanie...
                      </>
                    ) : (
                      <>
                        Wyslij zgloszenie
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-steel-500 text-center">
                    Twoje dane sa bezpieczne. Nie udostepniamy ich osobom trzecim.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
