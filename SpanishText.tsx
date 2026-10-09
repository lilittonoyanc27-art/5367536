import React, { useState } from 'react';
import { Volume2, Sparkles, ChevronDown, Check } from 'lucide-react';
import { playSpanishTTS } from './audioUtils.ts';

interface SpanishTextProps {
  spanish: string;
  armenian: string;
  literal?: string;
  contextNote?: string;
  badge?: string;
  highlight?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showArmenianInitially?: boolean;
}

export const SpanishText: React.FC<SpanishTextProps> = ({
  spanish,
  armenian,
  literal,
  contextNote,
  badge,
  highlight = false,
  size = 'md',
  showArmenianInitially = false,
}) => {
  const [isOpen, setIsOpen] = useState(showArmenianInitially);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    playSpanishTTS(spanish, () => setIsPlaying(false));
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(spanish);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      onClick={toggleOpen}
      className={`group relative rounded-xl border transition-all duration-200 cursor-pointer select-none text-left ${
        highlight
          ? 'bg-amber-50/90 border-amber-300 hover:border-amber-500 shadow-sm'
          : 'bg-white/80 border-orange-200/70 hover:border-orange-400 hover:bg-orange-50/40 shadow-xs'
      } ${size === 'lg' ? 'p-4' : size === 'md' ? 'p-3' : 'p-2.5'}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOpen();
        }
      }}
      title="Սեղմեք իսպաներենի վրա՝ հայերեն թարգմանությունը տեսնելու համար"
    >
      {/* Top Bar / Spanish Line */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold bg-red-700/10 text-red-800">
              <span>🇪🇸</span> ES
            </span>
            {badge && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-100 text-amber-900 border border-amber-200">
                {badge}
              </span>
            )}
            <span className="text-xs text-orange-700/70 ml-auto group-hover:text-orange-800 transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {isOpen ? 'Հայերեն թարգմանություն' : 'Սեղմեք թարգմանության համար'}
            </span>
          </div>

          <div
            className={`font-semibold text-stone-900 leading-snug tracking-tight ${
              size === 'lg'
                ? 'text-xl sm:text-2xl font-bold text-red-950'
                : size === 'md'
                ? 'text-lg sm:text-xl text-stone-900'
                : 'text-base sm:text-lg text-stone-800'
            }`}
          >
            {spanish}
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 self-start pt-1">
          <button
            type="button"
            onClick={handleSpeak}
            className={`p-1.5 rounded-lg text-amber-800 hover:bg-amber-100/80 active:scale-95 transition-all ${
              isPlaying ? 'text-red-700 bg-red-100 ring-2 ring-red-400' : ''
            }`}
            title="Լսել արտասանությունը (Audio)"
          >
            <Volume2 className="w-5 h-5" />
          </button>
          <div
            className={`p-1.5 text-stone-400 group-hover:text-amber-800 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-amber-800' : ''
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Armenian Reveal Drawer / Translation */}
      {isOpen && (
        <div className="mt-3.5 pt-3.5 border-t border-orange-200/60 animate-in fade-in duration-200">
          <div className="flex items-start gap-2.5 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50/50 p-3 sm:p-3.5 rounded-xl border border-amber-200/80">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs sm:text-sm font-bold bg-blue-700/10 text-blue-900 shrink-0 mt-0.5">
              <span>🇦🇲</span> ՀԱՅ
            </span>
            <div className="flex-1">
              <p className="text-stone-900 font-semibold text-base sm:text-lg leading-relaxed">
                {armenian}
              </p>
              {literal && (
                <p className="text-sm text-stone-600 mt-1.5 italic">
                  <span className="font-bold text-amber-900 not-italic">Բառացի իմաստը՝</span> {literal}
                </p>
              )}
              {contextNote && (
                <p className="text-sm text-orange-900 mt-1.5 font-medium">
                  💡 {contextNote}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
