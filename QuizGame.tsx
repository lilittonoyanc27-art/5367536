import React, { useState } from 'react';
import { QUIZ_1_QUESTIONS, QuizQuestion } from './data.ts';
import { CheckCircle2, XCircle, RotateCcw, Volume2, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { playSpanishTTS } from './audioUtils.ts';

export const QuizGame: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [showArmenianTranslation, setShowArmenianTranslation] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId: number, key: 'A' | 'B' | 'C' | 'D') => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: key,
    }));
  };

  const toggleArmenian = (questionId: number) => {
    setShowArmenianTranslation((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleCheck = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setShowArmenianTranslation({});
  };

  const calculateScore = () => {
    return QUIZ_1_QUESTIONS.reduce((score, q) => {
      return selectedAnswers[q.id] === q.correct ? score + 1 : score;
    }, 0);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const total = QUIZ_1_QUESTIONS.length;
  const score = calculateScore();

  return (
    <div className="space-y-6">
      {/* Game Header Banner */}
      <div className="bg-gradient-to-r from-red-800 via-rose-900 to-amber-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-red-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2 border border-yellow-400/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Խաղ 1 • Ընտրովի պատասխաններ
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight">
              🎮 Juego 1. ¿Qué quiso decir realmente?
            </h2>
            <p className="text-amber-200/90 text-sm sm:text-base mt-1">
              Ի՞նչ նկատի ուներ իսպանացին • 10 իրավիճակ
            </p>
          </div>

          <div className="bg-black/25 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="text-left">
              <span className="text-xs text-amber-200 uppercase tracking-wider block font-semibold">
                Առաջընթաց
              </span>
              <span className="text-lg font-extrabold text-yellow-300">
                {answeredCount}/{total} պատասխան
              </span>
            </div>
            {submitted && (
              <div className="pl-3 border-l border-white/20 text-right">
                <span className="text-xs text-amber-200 uppercase tracking-wider block font-semibold">
                  Արդյունք
                </span>
                <span className={`text-lg font-black ${score >= 8 ? 'text-green-300' : 'text-yellow-300'}`}>
                  {score}/{total} ({Math.round((score / total) * 100)}%)
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-amber-200/80 mt-3 pt-3 border-t border-white/10">
          💡 <span className="font-semibold text-yellow-300">Հրահանգ՝</span> Կարդա իրավիճակը, ընտրիր ճիշտ տարբերակը և բացատրիր, թե ինչ զգացմունք է արտահայտում տվյալ մարդը։ Սեղմիր երկխոսության վրա՝ հայերեն թարգմանությունը տեսնելու համար։
        </p>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {QUIZ_1_QUESTIONS.map((q, index) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isCorrect = submitted && selectedAnswers[q.id] === q.correct;
          const isWrong = submitted && isAnswered && selectedAnswers[q.id] !== q.correct;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-all p-4 sm:p-5 shadow-xs ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : isWrong
                    ? 'bg-rose-50/70 border-rose-300'
                    : 'bg-stone-50 border-stone-200'
                  : isAnswered
                  ? 'bg-amber-50/50 border-amber-300 shadow-sm'
                  : 'bg-white border-orange-200/70 hover:border-orange-300'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-red-700 text-amber-100 flex items-center justify-center font-bold text-xs">
                    {index + 1}
                  </span>
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                    {q.questionEs}
                  </span>
                </div>
                {submitted && (
                  <div>
                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ճիշտ է (+1)
                      </span>
                    )}
                    {isWrong && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-300">
                        <XCircle className="w-3.5 h-3.5" /> Սխալ է
                      </span>
                    )}
                    {!isAnswered && (
                      <span className="text-xs font-medium text-stone-500">
                        Չի նշվել
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Spanish Dialogue Box (Click to toggle Armenian) */}
              <div
                onClick={() => toggleArmenian(q.id)}
                className="bg-gradient-to-r from-amber-50/90 to-orange-50/80 rounded-xl p-3.5 sm:p-4 border border-amber-200/80 cursor-pointer hover:border-amber-400 transition-all select-none group mb-4"
                title="Սեղմեք իսպաներենի վրա՝ հայերեն թարգմանությունը տեսնելու համար"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded">
                      🇪🇸 Իսպաներեն երկխոսություն
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        playSpanishTTS(q.dialogueEs);
                      }}
                      className="p-1 rounded text-amber-800 hover:bg-amber-200/70 transition-colors"
                      title="Լսել աուդիո արտասանությունը"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-orange-800 font-medium group-hover:underline">
                    {showArmenianTranslation[q.id] ? 'Թաքցնել հայերենը' : '👆 Սեղմիր թարգմանության համար'}
                  </span>
                </div>

                <p className="font-bold text-stone-900 text-base sm:text-lg whitespace-pre-line leading-relaxed">
                  {q.dialogueEs}
                </p>

                {/* Armenian Translation Reveal */}
                {showArmenianTranslation[q.id] && (
                  <div className="mt-3.5 pt-3 border-t border-amber-200 text-stone-800 text-sm sm:text-base whitespace-pre-line bg-white/80 p-3 rounded-xl border border-amber-200 animate-in fade-in duration-150">
                    <span className="font-extrabold text-red-900 block mb-1">🇦🇲 Հայերեն թարգմանություն՝</span>
                    {q.dialogueArm}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option) => {
                  const isSelected = selectedAnswers[q.id] === option.key;
                  const isCorrectOption = submitted && option.key === q.correct;
                  const isSelectedWrong = submitted && isSelected && !isCorrectOption;

                  return (
                    <button
                      key={option.key}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, option.key)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm sm:text-base font-semibold transition-all ${
                        isCorrectOption
                          ? 'bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold ring-2 ring-emerald-300'
                          : isSelectedWrong
                          ? 'bg-rose-100 border-rose-300 text-rose-950 line-through'
                          : isSelected
                          ? 'bg-amber-100 border-amber-500 text-stone-950 shadow-xs'
                          : 'bg-stone-50/70 hover:bg-amber-50/50 border-stone-200 text-stone-800'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 ${
                          isCorrectOption
                            ? 'bg-emerald-600 text-white'
                            : isSelectedWrong
                            ? 'bg-rose-600 text-white'
                            : isSelected
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {option.key}
                      </span>
                      <span className="flex-1 pt-0.5 leading-snug">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {submitted && (
                <div className="mt-3.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-stone-800 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-950">Բացատրություն՝ </span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-orange-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4">
        <div className="text-xs sm:text-sm text-stone-600 text-center sm:text-left">
          {submitted ? (
            <span className="font-semibold text-stone-900">
              Քո միավորները՝{' '}
              <span className="text-red-700 font-extrabold text-base">{score}</span> / {total}
              {score === 10 ? ' 🏆 Գերազանց է։' : score >= 7 ? ' 👏 Շատ լավ է։' : ' 💪 Կարող ես կրկնել։'}
            </span>
          ) : (
            <span>
              Պատասխանել ես{' '}
              <span className="font-bold text-amber-800">{answeredCount}</span> / {total} հարցի
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!submitted ? (
            <button
              type="button"
              onClick={handleCheck}
              disabled={answeredCount === 0}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                answeredCount === 0
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white active:scale-98 shadow-orange-500/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" /> Ստուգել պատասխանները
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-sm bg-stone-800 hover:bg-stone-900 text-white shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <RotateCcw className="w-4 h-4" /> Կրկնել խաղը
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
