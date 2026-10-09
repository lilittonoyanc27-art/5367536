import React, { useState } from 'react';
import { REACTION_PROMPTS } from './data.ts';
import { Volume2, Sparkles, Eye, Check, ChevronDown, Mic, MessageSquare } from 'lucide-react';
import { playSpanishTTS } from './audioUtils.ts';

export const ReactionGame: React.FC = () => {
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});
  const [showArmenianPrompt, setShowArmenianPrompt] = useState<Record<number, boolean>>({});
  const [userNotes, setUserNotes] = useState<Record<number, string>>({});

  const toggleReveal = (id: number) => {
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleArmenianPrompt = (id: number) => {
    setShowArmenianPrompt((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNoteChange = (id: number, val: string) => {
    setUserNotes((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const revealedCount = Object.values(revealedIds).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-red-900 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-amber-600">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-2 border border-yellow-400/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              Խաղ 2 • Խոսակցական արձագանք
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight">
              🎮 Juego 2. Reacciona como un español
            </h2>
            <p className="text-amber-200/90 text-sm sm:text-base mt-1">
              Արձագանքիր ինչպես իսպանացին • 8 իրական իրավիճակ
            </p>
          </div>

          <div className="bg-black/25 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-yellow-300">
            Բացված է՝ {revealedCount} / {REACTION_PROMPTS.length}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-amber-100/90 mt-3 pt-3 border-t border-white/10">
          💡 <span className="font-semibold text-yellow-300">Կանոններ՝</span> Այս խաղում պատրաստի տարբերակներ չկան։ Կարդա իրավիճակը, փորձիր ինքդ բարձրաձայն արձագանքել իսպաներենով, այնուհետև բացիր՝ ստուգելու համար ամենաբնական տարբերակները։
        </p>
      </div>

      {/* Prompts Grid */}
      <div className="space-y-4">
        {REACTION_PROMPTS.map((item, index) => {
          const isRevealed = !!revealedIds[item.id];
          const isArmenianOpen = !!showArmenianPrompt[item.id];

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-orange-200/80 p-4 sm:p-5 shadow-xs hover:border-orange-300 transition-all space-y-4"
            >
              {/* Question Number & Scenario */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-orange-700 text-amber-100 flex items-center justify-center font-bold text-xs shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wide">
                    Իրավիճակ {index + 1}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => playSpanishTTS(item.scenarioEs)}
                  className="p-1.5 rounded-lg text-amber-800 hover:bg-amber-100 transition-colors flex items-center gap-1 text-xs font-semibold"
                  title="Լսել իսպաներեն իրավիճակը"
                >
                  <Volume2 className="w-4 h-4 text-red-700" />
                  <span className="hidden sm:inline">Լսել</span>
                </button>
              </div>

              {/* Spanish Scenario Box - click to toggle Armenian */}
              <div
                onClick={() => toggleArmenianPrompt(item.id)}
                className="bg-gradient-to-r from-amber-50 to-orange-50/70 p-3.5 sm:p-4 rounded-xl border border-amber-200 cursor-pointer select-none group hover:border-amber-400 transition-all"
                title="Սեղմեք իսպաներենի վրա՝ հայերեն թարգմանությունը տեսնելու համար"
              >
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span className="font-semibold text-red-900 flex items-center gap-1">
                    <span>🇪🇸</span> {item.questionEs}
                  </span>
                  <span className="text-orange-800 group-hover:underline">
                    {isArmenianOpen ? 'Թաքցնել հայերենը' : '👆 Սեղմիր հայերենի համար'}
                  </span>
                </div>

                <p className="text-stone-900 font-bold text-lg sm:text-xl leading-relaxed">
                  {item.scenarioEs}
                </p>

                {isArmenianOpen && (
                  <div className="mt-3 pt-2.5 border-t border-amber-200 text-stone-800 text-sm sm:text-base animate-in fade-in duration-150">
                    <p className="font-bold text-amber-950 mb-1">🇦🇲 {item.scenarioArm}</p>
                    <p className="text-stone-700 italic">{item.questionArm}</p>
                  </div>
                )}
              </div>

              {/* User Practice Input */}
              <div className="bg-stone-50/80 p-3 rounded-xl border border-stone-200/80">
                <label className="text-xs sm:text-sm font-bold text-stone-700 block mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  Քո տարբերակը (գրիր կամ բարձրաձայն ասա)՝
                </label>
                <input
                  type="text"
                  placeholder="Օրինակ՝ ¡No me digas! կամ ¡Venga ya!"
                  value={userNotes[item.id] || ''}
                  onChange={(e) => handleNoteChange(item.id, e.target.value)}
                  className="w-full px-3.5 py-2.5 text-base bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* Reveal Suggested Answers */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => toggleReveal(item.id)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 ${
                    isRevealed
                      ? 'bg-amber-100 text-amber-950 border border-amber-300'
                      : 'bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white shadow-xs'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {isRevealed ? 'Թաքցնել ճիշտ տարբերակները' : 'Տեսնել բնական պատասխանները'}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isRevealed ? 'rotate-180' : ''}`}
                  />
                </button>

                {isRevealed && (
                  <div className="mt-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-300/80 space-y-2.5 animate-in fade-in duration-200">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-red-900 block">
                      ✨ Առաջարկվող բնական արտահայտություններ՝
                    </span>

                    {item.suggestedAnswers.map((ans, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-3.5 rounded-xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-2xs"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-xl font-black text-stone-900">
                              🇪🇸 {ans.textEs}
                            </span>
                            <button
                              type="button"
                              onClick={() => playSpanishTTS(ans.textEs)}
                              className="p-1.5 rounded-lg text-red-700 hover:bg-red-50 transition-colors"
                              title="Լսել արտասանությունը"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm sm:text-base text-stone-800 font-semibold mt-1">
                            🇦🇲 {ans.textArm}
                          </p>
                          {ans.note && (
                            <p className="text-xs sm:text-sm text-amber-900 font-medium italic mt-1">
                              💡 {ans.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
