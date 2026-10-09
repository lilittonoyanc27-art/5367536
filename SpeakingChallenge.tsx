import React, { useState, useEffect } from 'react';
import { OPINION_QUESTIONS } from './data.ts';
import { Volume2, Mic, Play, Pause, RotateCcw, CheckSquare, Square, Award, ExternalLink, Sparkles } from 'lucide-react';
import { playSpanishTTS } from './audioUtils.ts';

const CHALLENGE_EXPRESSIONS = [
  '¡Qué va!',
  '¡No me digas!',
  '¡Venga ya!',
  'Me da igual',
  '¡Qué fuerte!',
  '¡Qué guay!',
  '¡Qué rollo!',
  '¡Menos mal!',
  '¡Ni hablar!',
  '¡Vale!',
];

export const SpeakingChallenge: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [showArmenian, setShowArmenian] = useState<Record<number, boolean>>({});

  // 2-minute timer state (120 seconds)
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [usedPhrases, setUsedPhrases] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const togglePhrase = (phrase: string) => {
    setUsedPhrases((prev) => ({
      ...prev,
      [phrase]: !prev[phrase],
    }));
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(120);
    setUsedPhrases({});
  };

  const toggleArmenian = (id: number) => {
    setShowArmenian((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const usedCount = Object.values(usedPhrases).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* 2-Minute Speech Challenge Card */}
      <div className="bg-gradient-to-r from-red-800 via-rose-900 to-amber-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-red-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border border-yellow-400/30">
              <Mic className="w-3.5 h-3.5 text-yellow-300" />
              2 Րոպե Մարտահրավեր • Reto de 2 minutos
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-100">
              ⏱️ Խոսակցական մարտահրավեր
            </h2>
            <p className="text-amber-200/90 text-xs sm:text-sm max-w-xl leading-relaxed">
              Երկու րոպե անդադար խոսիր որևէ հետաքրքիր նորության կամ զվարճալի դեպքի մասին՝ օգտագործելով <span className="text-yellow-300 font-bold">առնվազն հինգ նոր արտահայտություն</span>։
            </p>
          </div>

          {/* Interactive Timer Controls */}
          <div className="bg-black/30 p-4 rounded-2xl border border-white/10 flex flex-col items-center gap-3 w-full md:w-auto min-w-[200px]">
            <div className="text-3xl sm:text-4xl font-black font-mono tracking-wider text-yellow-300">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleStartStop}
                className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Կանգնեցնել
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Սկսել (2 րոպե)
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleResetTimer}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Վերսկսել ժամանակաչափը"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-amber-200 font-semibold">
              Օգտագործված արտահայտություններ՝ {usedCount} / 5
            </div>
          </div>
        </div>

        {/* Phrase Checklist */}
        <div className="mt-5 pt-4 border-t border-white/15">
          <p className="text-xs font-bold text-amber-200 mb-2 uppercase tracking-wide">
            Նշիր այն արտահայտությունները, որոնք հնչեցին քո խոսքում՝
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {CHALLENGE_EXPRESSIONS.map((phrase) => {
              const isUsed = !!usedPhrases[phrase];
              return (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => togglePhrase(phrase)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border text-left ${
                    isUsed
                      ? 'bg-yellow-400 text-stone-950 border-yellow-300 font-extrabold shadow-xs'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                  }`}
                >
                  {isUsed ? (
                    <CheckSquare className="w-4 h-4 text-red-900 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-white/50 shrink-0" />
                  )}
                  <span className="truncate">{phrase}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 8 Opinion Questions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-red-950 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            8. Խոսակցական առաջադրանք — Tu opinión
          </h3>
          <span className="text-sm font-bold text-stone-500">
            8 խորացված հարց
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {OPINION_QUESTIONS.map((q) => {
            const isArmOpen = !!showArmenian[q.id];

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-orange-200/80 p-4 sm:p-5 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                      {q.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => playSpanishTTS(q.es)}
                      className="p-1.5 rounded-lg text-red-700 hover:bg-red-50 transition-colors flex items-center gap-1 text-xs sm:text-sm font-semibold"
                      title="Լսել հարցը"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Լսել</span>
                    </button>
                  </div>

                  {/* Spanish Question (click for Armenian) */}
                  <div
                    onClick={() => toggleArmenian(q.id)}
                    className="p-3.5 rounded-xl bg-amber-50/70 hover:bg-amber-100/50 border border-amber-200/80 cursor-pointer select-none group transition-all"
                    title="Սեղմիր թարգմանության համար"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                      <span className="font-semibold text-red-900">🇪🇸 Pregunta</span>
                      <span className="text-orange-800 group-hover:underline">
                        {isArmOpen ? 'Թաքցնել' : '👆 Թարգմանել'}
                      </span>
                    </div>

                    <p className="font-bold text-stone-900 text-base sm:text-lg leading-relaxed">
                      {q.es}
                    </p>

                    {isArmOpen && (
                      <p className="mt-2.5 text-sm sm:text-base text-stone-800 pt-2 border-t border-amber-200/80 animate-in fade-in">
                        🇦🇲 {q.arm}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hint Card */}
                <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 text-xs sm:text-sm text-stone-700">
                  <span className="font-bold text-orange-950 block mb-0.5">
                    💡 Պատասխանի օրինակ / Ուղեցույց՝
                  </span>
                  <p className="font-semibold text-stone-900">{q.hintEs}</p>
                  <p className="text-stone-700 mt-0.5">{q.hintArm}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cervantes Instituto Badge & Footer Note */}
      <div className="bg-stone-50 border border-orange-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-700 text-yellow-300 flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
            C
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              Instituto Cervantes • Centro Virtual Cervantes
            </h4>
            <p className="text-xs text-stone-600">
              Հատկապես Իսպանիայում հաճախ լսվող այս արտահայտությունները ներկայացված են Սերվանտես Ինստիտուտի խոսակցական իսպաներենի պաշտոնական ծրագրում։
            </p>
          </div>
        </div>

        <a
          href="https://cvc.cervantes.es"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition-colors shadow-2xs shrink-0"
        >
          <span>cvc.cervantes.es</span>
          <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
        </a>
      </div>
    </div>
  );
};
