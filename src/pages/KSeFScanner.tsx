import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ArrowLeft, AlertTriangle, ShieldCheck, TrendingUp, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Question {
  question: string;
  answers: { label: string; points: number }[];
}

const QUESTIONS: Question[] = [
  {
    question: 'Czy wiesz, kiedy Twoja firma musi wdrozyc KSeF?',
    answers: [
      { label: 'Nie wiem co to KSeF', points: 0 },
      { label: 'Slyszalem, ale nie znam terminu', points: 1 },
      { label: 'Znam termin, ale nie mam planu', points: 2 },
      { label: 'Znam termin i mam plan dzialania', points: 3 },
    ],
  },
  {
    question: 'Jaki system do fakturowania uzywasz?',
    answers: [
      { label: 'Excel / recznie', points: 0 },
      { label: 'Fakturownia, ifirma, wFirma itp.', points: 1 },
      { label: 'Comarch, Symfonia, Enova, Insert', points: 2 },
      { label: 'SAP, Oracle, inny ERP z API', points: 3 },
    ],
  },
  {
    question: 'Czy Twoj system fakturujacy ma integracje z KSeF?',
    answers: [
      { label: 'Nie wiem', points: 0 },
      { label: 'Nie ma', points: 1 },
      { label: 'Planowana / w budowie', points: 2 },
      { label: 'Tak, juz dziala', points: 3 },
    ],
  },
  {
    question: 'Czy testowalas srodowisko testowe KSeF (sandbox)?',
    answers: [
      { label: 'Nie wiem co to', points: 0 },
      { label: 'Nie testowalem', points: 1 },
      { label: 'Wyslalismy testowe faktury', points: 2 },
      { label: 'Mamy pelna integracje na sandbox', points: 3 },
    ],
  },
  {
    question: 'Ile faktur sprzedazowych wystawiasz miesiecznie?',
    answers: [
      { label: 'Do 50', points: 3 },
      { label: '50–200', points: 2 },
      { label: '200–1000', points: 1 },
      { label: 'Ponad 1000', points: 0 },
    ],
  },
  {
    question: 'Kto w firmie odpowiada za wdrozenie KSeF?',
    answers: [
      { label: 'Nikt', points: 0 },
      { label: 'Biuro rachunkowe', points: 1 },
      { label: 'Dzial finansowy', points: 2 },
      { label: 'Dedykowany zespol projektowy', points: 3 },
    ],
  },
  {
    question: 'Czy masz budzet na wdrozenie KSeF?',
    answers: [
      { label: 'Nie myslalem o tym', points: 0 },
      { label: 'Brak budzetu, ale szukam rozwiazania', points: 1 },
      { label: 'Mam wstepny budzet', points: 2 },
      { label: 'Budzet zatwierdzony z harmonogramem', points: 3 },
    ],
  },
  {
    question: 'Ile systemow (ERP, e-commerce, CRM) trzeba zintegrowac z KSeF?',
    answers: [
      { label: 'Nie wiem', points: 0 },
      { label: 'Jeden system', points: 3 },
      { label: '2–3 systemy', points: 2 },
      { label: '4 lub wiecej', points: 1 },
    ],
  },
  {
    question: 'Jak archiwizujesz faktury?',
    answers: [
      { label: 'Papier / brak archiwum', points: 0 },
      { label: 'Pliki na dysku lub w chmurze', points: 1 },
      { label: 'W systemie ksiegowym', points: 2 },
      { label: 'Z pelna kontrola wersji i compliance', points: 3 },
    ],
  },
  {
    question: 'Jaki jest Twoj najwiekszy strach zwiazany z KSeF?',
    answers: [
      { label: 'Nie wiem wystarczajaco duzo, zeby sie bac', points: 0 },
      { label: 'Koszty wdrozenia', points: 1 },
      { label: 'Zaklocenie biezacych procesow', points: 2 },
      { label: 'Nic — jestesmy gotowi', points: 3 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 3;

interface ResultLevel {
  min: number;
  max: number;
  icon: typeof AlertTriangle;
  color: string;
  bgColor: string;
  borderColor: string;
  title: string;
  description: string;
  recommendation: string;
}

const RESULT_LEVELS: ResultLevel[] = [
  {
    min: 0,
    max: 8,
    icon: XCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    title: 'Krytyczny',
    description: 'Twoja firma nie jest gotowa na KSeF. Bez natychmiastowego dzialania ryzykujesz kary i problemy z fakturowaniem po wejsciu przepisow.',
    recommendation: 'Zalecamy pilny audyt gotowosci KSeF i natychmiastowe rozpoczecie wdrozenia.',
  },
  {
    min: 9,
    max: 16,
    icon: AlertTriangle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    title: 'Zagrozony',
    description: 'Masz podstawowa swiadomosc, ale brakuje Ci konkretnego planu i infrastruktury. Czas zaczac wdrozenie.',
    recommendation: 'Zalecamy audyt systemow i rozpoczecie integracji z KSeF w ciagu najblizszych 4 tygodni.',
  },
  {
    min: 17,
    max: 23,
    icon: TrendingUp,
    color: 'text-brand-400',
    bgColor: 'bg-brand-500/10',
    borderColor: 'border-brand-500/20',
    title: 'Na dobrej drodze',
    description: 'Masz solidne podstawy, ale potrzebujesz dopracowania integracji i testow przed deadline.',
    recommendation: 'Zalecamy testy na srodowisku sandbox KSeF i walidacje wszystkich scenariuszy fakturowania.',
  },
  {
    min: 24,
    max: 30,
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    title: 'Gotowy',
    description: 'Gratulacje! Twoja firma jest dobrze przygotowana na KSeF. Potrzebujesz juz tylko wdrozenia technicznego.',
    recommendation: 'Zalecamy finalna walidacje i uruchomienie produkcyjne przed deadline.',
  },
];

function getResultLevel(score: number): ResultLevel {
  return RESULT_LEVELS.find((l) => score >= l.min && score <= l.max) ?? RESULT_LEVELS[0];
}

export default function KSeFScannerPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);

  const score = answers.reduce((sum, pts) => sum + pts, 0);
  const progress = ((currentQuestion) / QUESTIONS.length) * 100;

  function selectAnswer(points: number) {
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  }

  function restart() {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setEmail('');
    setEmailSent(false);
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    const level = getResultLevel(score);
    await supabase.from('leads').insert({
      name: '',
      email,
      company: '',
      service: 'ksef-scanner',
      message: `Wynik skanera KSeF: ${score}/${MAX_SCORE} (${level.title})`,
    });
    setSending(false);
    setEmailSent(true);
  }

  const level = getResultLevel(score);
  const Icon = level.icon;
  const percentage = Math.round((score / MAX_SCORE) * 100);

  if (showResults) {
    return (
      <div className="pt-20 lg:pt-24">
        <section className="py-20 lg:py-28">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              <div className={`glass-card p-8 lg:p-12 border ${level.borderColor}`}>
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${level.bgColor} mb-4`}>
                    <Icon className={`w-8 h-8 ${level.color}`} />
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {level.title}
                  </h1>
                  <p className={`text-lg font-semibold ${level.color}`}>
                    {score}/{MAX_SCORE} punktow ({percentage}%)
                  </p>
                </div>

                {/* Score bar */}
                <div className="w-full bg-steel-800 rounded-full h-3 mb-8">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-steel-300 leading-relaxed">{level.description}</p>
                  <div className={`p-4 rounded-xl ${level.bgColor} border ${level.borderColor}`}>
                    <p className={`text-sm font-medium ${level.color}`}>{level.recommendation}</p>
                  </div>
                </div>

                {/* Lead capture */}
                {emailSent ? (
                  <div className="text-center p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                    <p className="text-white font-medium mb-1">Dziekujemy!</p>
                    <p className="text-sm text-steel-400">
                      Skontaktujemy sie z Toba w ciagu 24h z rekomendacjami.
                    </p>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-steel-800/50 border border-steel-700/50">
                    <p className="text-white font-medium mb-1">
                      Chcesz szczegolowe rekomendacje?
                    </p>
                    <p className="text-sm text-steel-400 mb-4">
                      Zostaw email — przeslemy spersonalizowany plan wdrozenia KSeF.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
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
                        disabled={sending}
                        className="btn-primary whitespace-nowrap disabled:opacity-50"
                      >
                        {sending ? 'Wysylanie...' : 'Wyslij'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button onClick={restart} className="btn-secondary flex-1">
                    <ArrowLeft className="w-4 h-4" />
                    Powtorz test
                  </button>
                  <Link to="/kontakt" className="btn-primary flex-1">
                    Umow bezplatny audyt
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const q = QUESTIONS[currentQuestion];

  return (
    <div className="pt-20 lg:pt-24">
      <section className="py-20 lg:py-28">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 inline-flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                Skaner gotowosci KSeF
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Czy Twoja firma jest gotowa na KSeF?
              </h1>
              <p className="text-steel-400">
                Odpowiedz na 10 pytan — otrzymasz natychmiastowa ocene gotowosci.
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-steel-400 mb-2">
                <span>Pytanie {currentQuestion + 1} z {QUESTIONS.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-steel-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-brand-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="glass-card p-8 lg:p-10">
              <h2 className="text-xl font-semibold text-white mb-6">{q.question}</h2>
              <div className="space-y-3">
                {q.answers.map((answer, i) => (
                  <button
                    key={i}
                    onClick={() => selectAnswer(answer.points)}
                    className="w-full text-left p-4 rounded-xl border border-steel-700/50 bg-steel-800/30 hover:border-brand-500/50 hover:bg-brand-500/5 text-steel-300 hover:text-white transition-all duration-200 text-sm"
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-steel-700/50 text-xs text-steel-400 mr-3">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {answer.label}
                  </button>
                ))}
              </div>

              {currentQuestion > 0 && (
                <button
                  onClick={goBack}
                  className="mt-6 text-sm text-steel-500 hover:text-steel-300 transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Poprzednie pytanie
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
