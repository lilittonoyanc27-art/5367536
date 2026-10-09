import React, { useState } from 'react';
import { READING_DIALOGUE, READING_QUESTIONS, DialogueLine } from './data.ts';
import { Volume2, BookOpen, MessageCircle, HelpCircle, Eye, ChevronDown, Sparkles } from 'lucide-react';
import { playSpanishTTS } from './audioUtils.ts';

export const ReadingSection: React.FC = () => {
  const [revealedLines, setRevealedLines] = useState<Record<number, boolean>>({});
  const [showAllTranslations, setShowAllTranslations] = useState(false);
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  const toggleLine = (idx: number) => {
    setRevealedLines((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleAllTranslations = () => {
    const nextState = !showAllTranslations;
    setShowAllTranslations(nextState);
    const updated: Record<number, boolean> = {};
    READING_DIALOGUE.forEach((_, idx) => {
      updated[idx] = nextState;
    });
    setRevealedLines(updated);
  };

  const toggleQuestion = (id: number) => {
    setRevealedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Reading Header */}
      <div className="bg-gradient-to-r from-red-900 via-rose-950 to-amber-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-red-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2 border border-yellow-400/30">
              <BookOpen className="w-3.5 h-3.5 text-yellow-300" />
              Ընթերցանություն • B1–B2
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight">
              📖 7. Lectura — Una sorpresa inesperada
            </h2>
            <p className="text-amber-200/90 text-sm sm:text-base mt-1">
              Անսպասելի անակնկալ • Carlos y Lucía
            </p>
          </div>

          <button
            type="button"
            onClick={toggleAllTranslations}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all shadow-sm flex items-center gap-2 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            {showAllTranslations ? 'Թաքցնել բոլոր թարգմանությունները' : 'Բացել բոլոր թարգմանությունները'}
          </button>
        </div>

        <div className="mt-4 p-3.5 bg-black/25 rounded-xl border border-white/10 text-xs sm:text-sm text-amber-100 space-y-1">
          <p className="font-semibold text-yellow-300">
            🇪🇸 Carlos y Lucía son amigos desde hace muchos años. Un sábado por la tarde se encuentran en una cafetería de Madrid.
          </p>
          <p className="text-amber-200/80">
            🇦🇲 Կառլոսն ու Լուսիան երկար տարիների ընկերներ են։ Շաբաթ օրը կեսօրից հետո նրանք հանդիպում են Մադրիդի սրճարաններից մեկում։
          </p>
          <p className="text-xs text-yellow-200/60 pt-1">
            👆 Սեղմիր ցանկացած տողի վրա՝ հայերեն թարգմանությունը տեսնելու համար։
          </p>
        </div>
      </div>

      {/* Dialogue Chat UI */}
      <div className="bg-amber-50/40 rounded-2xl border border-orange-200 p-4 sm:p-6 shadow-xs space-y-3.5">
        <h3 className="text-sm font-extrabold text-stone-700 uppercase tracking-wider flex items-center gap-2 mb-2">
          <MessageCircle className="w-4 h-4 text-red-700" />
          Երկխոսություն Մադրիդի սրճարանում
        </h3>

        <div className="space-y-3">
          {READING_DIALOGUE.map((line, idx) => {
            const isCarlos = line.speaker === 'Carlos';
            const isRevealed = revealedLines[idx] || showAllTranslations;

            return (
              <div
                key={idx}
                className={`flex gap-3 ${isCarlos ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  onClick={() => toggleLine(idx)}
                  className={`max-w-xl rounded-2xl p-4 cursor-pointer select-none border transition-all duration-150 ${
                    isCarlos
                      ? 'bg-white border-amber-200 hover:border-amber-400 text-stone-900 rounded-tl-xs shadow-xs'
                      : 'bg-gradient-to-r from-red-50 to-orange-50 border-orange-200 hover:border-orange-400 text-stone-900 rounded-tr-xs shadow-xs'
                  }`}
                  title="Սեղմիր թարգմանության համար"
                >
                  {/* Speaker tag and actions */}
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span
                      className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isCarlos
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {line.speaker}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-stone-400 font-medium">
                        {isRevealed ? '🇦🇲 Հայ' : '👆 Սեղմիր'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          playSpanishTTS(line.textEs);
                        }}
                        className="p-1 rounded text-red-700 hover:bg-stone-100 transition-colors"
                        title="Լսել իսպաներեն արտասանությունը"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Spanish text */}
                  <p className="text-lg sm:text-xl font-bold text-stone-900 leading-relaxed">
                    {line.highlightPhrase ? (
                      <span>
                        {line.textEs.split(line.highlightPhrase).map((part, i, arr) => (
                          <React.Fragment key={i}>
                            {part}
                            {i < arr.length - 1 && (
                              <mark className="bg-yellow-200 text-red-950 px-1.5 py-0.5 rounded-md font-black mx-0.5 shadow-2xs">
                                {line.highlightPhrase}
                              </mark>
                            )}
                          </React.Fragment>
                        ))}
                      </span>
                    ) : (
                      line.textEs
                    )}
                  </p>

                  {/* Armenian translation reveal */}
                  {isRevealed && (
                    <div className="mt-3 pt-2.5 border-t border-stone-200 text-sm sm:text-base text-stone-800 font-semibold leading-relaxed animate-in fade-in">
                      <span className="text-red-900 font-extrabold block mb-0.5">🇦🇲 Թարգմանություն՝</span>
                      {line.textArm}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-black text-red-950 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-amber-600" />
            Preguntas sobre el texto — Հարցեր տեքստի վերաբերյալ
          </h3>
          <span className="text-sm font-bold text-stone-500">
            8 հարց
          </span>
        </div>

        <div className="space-y-3.5">
          {READING_QUESTIONS.map((q) => {
            const isRevealed = !!revealedQuestions[q.id];

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-orange-200/80 p-4 sm:p-5 shadow-xs space-y-3 hover:border-orange-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5">
                      {q.id}
                    </span>
                    <div>
                      <p className="font-bold text-stone-900 text-base sm:text-lg leading-snug">
                        🇪🇸 {q.questionEs}
                      </p>
                      <p className="text-sm sm:text-base text-stone-600 mt-1">
                        🇦🇲 {q.questionArm}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => playSpanishTTS(q.questionEs)}
                    className="p-1.5 rounded-lg text-amber-800 hover:bg-amber-50 transition-colors shrink-0"
                    title="Լսել հարցը"
                  >
                    <Volume2 className="w-5 h-5 text-red-700" />
                  </button>
                </div>

                {/* Answer reveal button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => toggleQuestion(q.id)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                      isRevealed
                        ? 'bg-amber-100 text-amber-950 border border-amber-300'
                        : 'bg-stone-100 hover:bg-amber-100 text-stone-800'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    {isRevealed ? 'Թաքցնել պատասխանը' : 'Տեսնել ճիշտ պատասխանը'}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isRevealed ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isRevealed && (
                    <div className="mt-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-sm sm:text-base space-y-1.5 animate-in fade-in">
                      <p className="font-bold text-stone-900">
                        🇪🇸 <span className="text-red-950">{q.answerEs}</span>
                      </p>
                      <p className="text-stone-800 font-medium">
                        🇦🇲 {q.answerArm}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
