import React, { useState } from 'react';
import { TRANSFORM_EXERCISES } from './data.ts';
import { Volume2, Sparkles, Check, ArrowRight, Eye, RefreshCw, HelpCircle } from 'lucide-react';
import { playSpanishTTS } from './audioUtils.ts';

export const TransformGame: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});
  const [showArmenianFormal, setShowArmenianFormal] = useState<Record<number, boolean>>({});

  const toggleReveal = (id: number) => {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleArmenianFormal = (id: number) => {
    setShowArmenianFormal((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const revealAll = () => {
    const all: Record<number, boolean> = {};
    TRANSFORM_EXERCISES.forEach((ex) => (all[ex.id] = true));
    setRevealedIds(all);
  };

  const resetAll = () => {
    setRevealedIds({});
    setUserInputs({});
    setShowArmenianFormal({});
  };

  const completedCount = Object.values(revealedIds).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-amber-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-red-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2 border border-yellow-400/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Խաղ 3 • Փոխակերպում
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight">
              🎮 Juego 3. Cambia la frase
            </h2>
            <p className="text-amber-200/90 text-sm sm:text-base mt-1">
              Դարձրու նախադասությունն ավելի բնական • 8 վարժություն
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={revealAll}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors text-amber-200"
            >
              Բացել բոլորը
            </button>
            <button
              type="button"
              onClick={resetAll}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors text-amber-200"
            >
              Վերսկսել
            </button>
          </div>
        </div>

        {/* Example Banner */}
        <div className="mt-4 p-3 bg-black/20 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs sm:text-sm text-amber-100">
          <span className="font-bold text-yellow-300 shrink-0">Օրինակ՝</span>
          <span>🇪🇸 No te creo. (Ես քեզ չեմ հավատում)</span>
          <ArrowRight className="w-4 h-4 text-yellow-300 hidden sm:inline shrink-0" />
          <span className="font-extrabold text-white bg-red-800/80 px-2 py-0.5 rounded border border-red-400/40">
            🇪🇸 ¡Venga ya! (🇦🇲 Դե լավ էլի)
          </span>
        </div>
      </div>

      {/* Exercises List */}
      <div className="space-y-4">
        {TRANSFORM_EXERCISES.map((item, index) => {
          const isRevealed = !!revealedIds[item.id];
          const isArmenianOpen = !!showArmenianFormal[item.id];

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-orange-200/80 p-4 sm:p-5 shadow-xs hover:border-orange-300 transition-all space-y-3.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-red-800 text-amber-100 flex items-center justify-center font-bold text-xs shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                    Պաշտոնական / Չեզոք ձևակերպում
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => playSpanishTTS(item.formalEs)}
                  className="p-1.5 rounded-lg text-amber-800 hover:bg-amber-100 transition-colors flex items-center gap-1 text-xs"
                  title="Լսել պաշտոնական տարբերակը"
                >
                  <Volume2 className="w-4 h-4 text-red-700" />
                </button>
              </div>

              {/* Formal Box (Click to toggle Armenian) */}
              <div
                onClick={() => toggleArmenianFormal(item.id)}
                className="bg-stone-50 hover:bg-amber-50/50 p-3.5 rounded-xl border border-stone-200 cursor-pointer select-none group transition-all"
                title="Սեղմեք իսպաներենի վրա՝ հայերեն թարգմանության համար"
              >
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-stone-700">🇪🇸 Formal</span>
                  <span className="text-amber-800 group-hover:underline">
                    {isArmenianOpen ? 'Թաքցնել հայերենը' : '👆 Թարգմանել հայերեն'}
                  </span>
                </div>
                <p className="text-stone-900 font-bold text-lg sm:text-xl">
                  {item.formalEs}
                </p>
                {isArmenianOpen && (
                  <p className="mt-2 text-sm sm:text-base text-stone-800 pt-2 border-t border-stone-200 animate-in fade-in">
                    🇦🇲 <span className="font-semibold">{item.formalArm}</span>
                  </p>
                )}
              </div>

              {/* User input box */}
              <div>
                <label className="text-xs sm:text-sm font-bold text-stone-700 block mb-1.5">
                  Գրիր խոսակցական տարբերակը (կամ փորձիր մտքում)՝
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Օրինակ՝ ¡No me digas! / ¡Qué va!"
                    value={userInputs[item.id] || ''}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-base bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => toggleReveal(item.id)}
                    className={`px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      isRevealed
                        ? 'bg-amber-100 text-amber-950 border border-amber-300'
                        : 'bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white shadow-xs'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    {isRevealed ? 'Թաքցնել' : 'Ստուգել'}
                  </button>
                </div>
              </div>

              {/* Colloquial Answer Reveal */}
              {isRevealed && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 space-y-2.5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      Խոսակցական բնական տարբերակ՝
                    </span>
                    <button
                      type="button"
                      onClick={() => playSpanishTTS(item.colloquialEs)}
                      className="p-1.5 rounded-lg text-red-700 hover:bg-amber-100 transition-colors"
                      title="Լսել խոսակցական տարբերակը"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-red-950">
                        🇪🇸 {item.colloquialEs}
                      </p>
                      <p className="text-base sm:text-lg font-semibold text-stone-800 mt-1">
                        🇦🇲 {item.colloquialArm}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 pt-2 border-t border-amber-200 flex items-start gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{item.explanation}</span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
