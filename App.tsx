/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  TOP_5_EXPRESSIONS,
  EXTRA_10_EXPRESSIONS,
  INTONATION_EXAMPLES,
  LITERAL_VS_COLLOQUIAL,
  ExpressionItem,
} from './data.ts';
import { SpanishText } from './SpanishText.tsx';
import { QuizGame } from './QuizGame.tsx';
import { ReactionGame } from './ReactionGame.tsx';
import { TransformGame } from './TransformGame.tsx';
import { ReadingSection } from './ReadingSection.tsx';
import { SpeakingChallenge } from './SpeakingChallenge.tsx';
import { playSpanishTTS } from './audioUtils.ts';
import {
  Flame,
  BookOpen,
  Volume2,
  Search,
  Sparkles,
  Gamepad2,
  MessageSquare,
  HelpCircle,
  Eye,
  CheckCircle,
  ChevronRight,
  GraduationCap,
  Layers,
  ArrowRight,
  Filter,
  X,
  Type,
} from 'lucide-react';

type TabType =
  | 'intro'
  | 'top5'
  | 'extra10'
  | 'game1'
  | 'game2'
  | 'game3'
  | 'reading'
  | 'speaking';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [globalRevealAll, setGlobalRevealAll] = useState(false);
  const [activeExpressionId, setActiveExpressionId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  useEffect(() => {
    document.documentElement.setAttribute('data-font', fontSize);
  }, [fontSize]);

  // Combine all 15 expressions for search & browse
  const allExpressions = useMemo(() => {
    return [...TOP_5_EXPRESSIONS, ...EXTRA_10_EXPRESSIONS];
  }, []);

  // Filtered expressions for the search bar
  const filteredExpressions = useMemo(() => {
    if (!searchQuery.trim() && selectedCategory === 'all') {
      return allExpressions;
    }
    const q = searchQuery.toLowerCase().trim();
    return allExpressions.filter((item) => {
      const matchSearch =
        !q ||
        item.spanish.toLowerCase().includes(q) ||
        item.armenian.toLowerCase().includes(q) ||
        (item.literalMeaning && item.literalMeaning.toLowerCase().includes(q)) ||
        item.usageArmenian.toLowerCase().includes(q);

      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [allExpressions, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans">
      {/* Top Banner with Spanish Spanish-Bordeaux-Orange Heritage Aesthetic */}
      <header className="bg-gradient-to-r from-red-900 via-rose-900 to-amber-900 text-white shadow-lg sticky top-0 z-50 border-b-2 border-amber-500/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Title & Badge */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 text-red-950 font-black text-2xl flex items-center justify-center shadow-md border-2 border-yellow-300 shrink-0">
                🇪🇸
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-amber-100 tracking-tight flex items-center gap-2">
                    El español coloquial
                    <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-full font-bold bg-yellow-400 text-red-950 border border-yellow-300">
                      B1–B2
                    </span>
                  </h1>
                </div>
                <p className="text-xs sm:text-base text-amber-200/90 font-medium">
                  🇦🇲 Խոսակցական իսպաներեն • Սեղմիր իսպաներենի վրա թարգմանության համար
                </p>
              </div>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-2 flex-wrap self-end md:self-auto">
              {/* Font Size Adjuster */}
              <div
                className="flex items-center gap-1 bg-black/25 px-2.5 py-1 rounded-xl border border-white/15"
                title="Տառաչափ / Размер шрифта"
              >
                <Type className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="text-xs text-amber-200 font-bold hidden sm:inline">
                  Տառաչափ՝
                </span>
                <button
                  type="button"
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 rounded-md text-xs font-extrabold transition-all ${
                    fontSize === 'normal'
                      ? 'bg-yellow-400 text-stone-950 shadow-xs scale-105'
                      : 'text-amber-200 hover:text-white hover:bg-white/10'
                  }`}
                  title="Սովորական տառաչափ"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 rounded-md text-xs font-extrabold transition-all ${
                    fontSize === 'large'
                      ? 'bg-yellow-400 text-stone-950 shadow-xs scale-105'
                      : 'text-amber-200 hover:text-white hover:bg-white/10'
                  }`}
                  title="Մեծ տառաչափ (կանխադրված)"
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-0.5 rounded-md text-xs font-extrabold transition-all ${
                    fontSize === 'xlarge'
                      ? 'bg-yellow-400 text-stone-950 shadow-xs scale-105'
                      : 'text-amber-200 hover:text-white hover:bg-white/10'
                  }`}
                  title="Առավելագույն խոշոր տառաչափ"
                >
                  A++
                </button>
              </div>

              <button
                type="button"
                onClick={() => setGlobalRevealAll(!globalRevealAll)}
                className={`text-xs sm:text-sm px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                  globalRevealAll
                    ? 'bg-yellow-400 text-red-950 shadow-md ring-2 ring-yellow-300'
                    : 'bg-white/15 hover:bg-white/25 text-amber-100 border border-white/20'
                }`}
                title="Ցուցադրել կամ թաքցնել բոլոր հայերեն թարգմանությունները"
              >
                <Eye className="w-4 h-4" />
                <span>
                  {globalRevealAll ? 'Թարգմանությունները բաց են' : 'Սեղմելու ռեժիմ'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('game1');
                }}
                className="text-xs sm:text-sm px-3 py-1.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all flex items-center gap-1 shadow-sm active:scale-95"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Խաղեր</span>
              </button>
            </div>
          </div>

          {/* Navigation Bar / Tabs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar text-sm sm:text-base font-bold border-t border-white/10 mt-2">
            {[
              { id: 'intro', label: '1. Ներածություն', icon: BookOpen },
              { id: 'top5', label: '2. 5 Գլխավոր', icon: Flame },
              { id: 'extra10', label: '3. Եվս 10 բառ', icon: Layers },
              { id: 'game1', label: '🎮 Խաղ 1', icon: Gamepad2 },
              { id: 'game2', label: '⚡ Խաղ 2', icon: MessageSquare },
              { id: 'game3', label: '🔄 Խաղ 3', icon: GraduationCap },
              { id: 'reading', label: '📖 Ընթերցանություն', icon: BookOpen },
              { id: 'speaking', label: '🗣️ Խոսակցություն', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-yellow-400 text-stone-950 shadow-sm font-extrabold'
                      : 'text-amber-100/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Global Quick Search Drawer */}
        <section className="bg-white rounded-2xl border border-orange-200/80 p-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Որոնել արտահայտություն (օրինակ՝ ¡Qué va!, զարմանք, ոչ մի դեպքում, fuerte, rollo)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar shrink-0">
              <span className="text-xs text-stone-400 flex items-center gap-1 font-semibold pl-1">
                <Filter className="w-3 h-3 text-amber-600" />
              </span>
              {[
                { id: 'all', label: 'Բոլորը (15)' },
                { id: 'surprise', label: 'Զարմանք' },
                { id: 'disagreement', label: 'Ժխտում / Մերժում' },
                { id: 'approval', label: 'Համաձայնություն' },
                { id: 'relief', label: 'Թեթևացում' },
                { id: 'annoyance', label: 'Տհաճություն' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-red-800 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* If search query or filter active, show quick results card strip */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="mt-3 pt-3 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-500">
                  Գտնվել է՝ {filteredExpressions.length} արտահայտություն
                </span>
                <span className="text-xs text-amber-800 font-medium">
                  👆 Սեղմիր ցանկացածի վրա՝ թարգմանությունը տեսնելու համար
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {filteredExpressions.map((item) => (
                  <SpanishText
                    key={item.id}
                    spanish={item.spanish}
                    armenian={item.armenian}
                    literal={item.literalMeaning}
                    contextNote={item.usageArmenian}
                    badge={item.categoryLabelArm}
                    showArmenianInitially={globalRevealAll}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* TAB 1: INTRODUCTION & NUANCES */}
        {activeTab === 'intro' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Hero / Overview Banner */}
            <div className="bg-gradient-to-r from-red-800 via-rose-900 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-red-700 space-y-4">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-yellow-400/30">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                Բացատրություն, օրինակներ և խոսակցական խաղեր
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-amber-100 leading-tight">
                1. ¿Qué es el español coloquial? — Ի՞նչ է խոսակցական իսպաներենը
              </h2>
              <p className="text-amber-100/95 text-sm sm:text-base leading-relaxed">
                <strong className="text-yellow-300">El español coloquial</strong> իսպաներենի այն տարբերակն է, որը մարդիկ օգտագործում են առօրյա կյանքում՝ ընկերների, ընտանիքի անդամների, ծանոթների և մտերիմ մարդկանց հետ շփվելիս։
              </p>
              <p className="text-amber-200/90 text-sm sm:text-base leading-relaxed">
                Դասագրքերում հաճախ սովորում ենք քերականորեն ճիշտ, բայց երբեմն չափազանց պաշտոնական արտահայտություններ։ Իրական կյանքում իսպանացիները շատ հաճախ օգտագործում են կարճ, հուզական և բնական արտահայտություններ։
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-bold">
                <span className="bg-black/20 text-yellow-200 px-3 py-1 rounded-lg border border-white/10">
                  🎯 Մակարդակ՝ B1–B2
                </span>
                <span className="bg-black/20 text-yellow-200 px-3 py-1 rounded-lg border border-white/10">
                  🇪🇸 Իսպանիայի բնական խոսք
                </span>
                <span className="bg-black/20 text-yellow-200 px-3 py-1 rounded-lg border border-white/10">
                  👆 Ինտերակտիվ թարգմանություն սեղմելով
                </span>
              </div>
            </div>

            {/* Formal vs Colloquial Contrast Cards */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-red-950 flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-600" />
                Պաշտոնական տարբերակ vs Խոսակցական տարբերակ
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Սեղմիր իսպաներեն արտահայտությունների վրա՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար։
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contrast 1 */}
                <div className="bg-white rounded-2xl border border-orange-200 p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Օրինակ 1 • Անհամաձայնություն
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-500 block mb-1">
                      Պաշտոնական կամ չեզոք տարբերակ՝
                    </span>
                    <SpanishText
                      spanish="No estoy de acuerdo contigo."
                      armenian="Ես համաձայն չեմ քեզ հետ։"
                      showArmenianInitially={globalRevealAll}
                      size="sm"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-900 block mb-1">
                      Խոսակցական տարբերակ (առավել բնական)՝
                    </span>
                    <SpanishText
                      spanish="¡Qué va!"
                      armenian="Ի՞նչ ես ասում։ Բոլորովին էլ այդպես չէ։ Ամենևին։"
                      literal="Ի՞նչ է գնում"
                      contextNote="Իրականում ir բայը գնալ չի նշանակում այստեղ"
                      highlight={true}
                      showArmenianInitially={globalRevealAll}
                      size="md"
                    />
                  </div>
                </div>

                {/* Contrast 2 */}
                <div className="bg-white rounded-2xl border border-orange-200 p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Օրինակ 2 • Զարմանք
                  </div>
                  <div>
                    <span className="text-xs font-bold text-stone-500 block mb-1">
                      Պաշտոնական կամ չեզոք տարբերակ՝
                    </span>
                    <SpanishText
                      spanish="Estoy muy sorprendido."
                      armenian="Ես շատ զարմացած եմ։"
                      showArmenianInitially={globalRevealAll}
                      size="sm"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-red-900 block mb-1">
                      Խոսակցական տարբերակ (առավել բնական)՝
                    </span>
                    <SpanishText
                      spanish="¡No me digas!"
                      armenian="Չե՞ս ասում։ Լո՞ւրջ։ Չեմ հավատում։"
                      literal="Ինձ մի՛ ասա"
                      contextNote="Կախված տոնից՝ զարմանք կամ հեգնանք"
                      highlight={true}
                      showArmenianInitially={globalRevealAll}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Goals of this Topic */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200/80 p-5 sm:p-6 shadow-xs">
              <h3 className="text-base sm:text-lg font-black text-amber-950 flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-amber-700" />
                Այս թեմայի նպատակն է, որ աշակերտը կարողանա՝
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {[
                  {
                    num: '1',
                    title: 'Բնական արձագանքել',
                    desc: 'Զրույցի ընթացքում արձագանքել ինչպես իսպանացիները',
                  },
                  {
                    num: '2',
                    title: 'Հասկանալ իրական իմաստը',
                    desc: 'Չթարգմանել բառացի, այլ ըմբռնել իդիոմատիկ իրական իմաստը',
                  },
                  {
                    num: '3',
                    title: 'Տարբերել հույզերը',
                    desc: 'Տարբերել զարմանքը, կասկածը, ուրախությունը և անտարբերությունը',
                  },
                  {
                    num: '4',
                    title: 'Օգտագործել երկխոսություններում',
                    desc: 'Ակտիվորեն կիրառել փոքր և մեծ իրական խոսակցություններում',
                  },
                ].map((goal) => (
                  <div
                    key={goal.num}
                    className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-amber-200/60 shadow-2xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-red-700 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {goal.num}
                    </span>
                    <div>
                      <h4 className="font-bold text-stone-900">{goal.title}</h4>
                      <p className="text-stone-600 mt-0.5">{goal.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Խոսակցական իսպաներենի կարևոր առանձնահատկությունները */}
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-black text-red-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                4. Խոսակցական իսպաներենի կարևոր առանձնահատկությունները
              </h3>

              {/* A. Intonation changes meaning */}
              <div className="bg-white rounded-2xl border border-orange-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-red-100 text-red-900 rounded-lg text-xs font-extrabold">
                    A
                  </span>
                  <h4 className="font-bold text-base sm:text-lg text-stone-900">
                    Ինտոնացիան փոխում է իմաստը (La entonación cambia el significado)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600">
                  Միևնույն արտահայտությունը տարբեր իրավիճակներում կարող է տարբեր զգացմունքներ արտահայտել։ Օրինակ՝ <strong className="text-red-900">¡No me digas!</strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {INTONATION_EXAMPLES.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-amber-50/50 rounded-xl p-3.5 border border-amber-200 flex flex-col justify-between space-y-2.5"
                    >
                      <div>
                        <span className="text-xs font-bold text-red-900 block mb-1">
                          {item.situationArm}
                        </span>
                        <div className="space-y-1.5">
                          {item.dialogue.map((d, dIdx) => (
                            <SpanishText
                              key={dIdx}
                              spanish={d.es}
                              armenian={d.arm}
                              size="sm"
                              showArmenianInitially={globalRevealAll}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-amber-200 text-xs text-stone-600 italic">
                        💡 {item.noteArm}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* B. Don't translate literally */}
              <div className="bg-white rounded-2xl border border-orange-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-950 rounded-lg text-xs font-extrabold">
                    B
                  </span>
                  <h4 className="font-bold text-base sm:text-lg text-stone-900">
                    Պետք չէ ամեն ինչ բառացի թարգմանել (No traducir literalmente)
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-stone-600">
                  Ահա թե ինչու խոսակցական իսպաներեն սովորելիս կարևոր է ոչ միայն բառերի իմաստը, այլ նաև ամբողջ իրավիճակը։
                </p>

                {/* Literal vs Real Table */}
                <div className="overflow-x-auto rounded-xl border border-stone-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-3">Արտահայտություն (Español)</th>
                        <th className="p-3">Բառացի իմաստ</th>
                        <th className="p-3">Իրական խոսակցական իմաստ</th>
                        <th className="p-3 text-right">Աուդիո</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 bg-white">
                      {LITERAL_VS_COLLOQUIAL.map((row, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/50 transition-colors">
                          <td className="p-3 font-extrabold text-red-950">
                            {row.phrase}
                          </td>
                          <td className="p-3 text-stone-500 italic">
                            {row.literal}
                          </td>
                          <td className="p-3 font-semibold text-stone-900">
                            {row.real}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => playSpanishTTS(row.phrase)}
                              className="p-1 rounded text-red-700 hover:bg-stone-100 transition-colors inline-flex"
                              title="Լսել"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Jump to Next Step Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('top5')}
                className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white shadow-md transition-all flex items-center gap-2 active:scale-98"
              >
                <span>Անցնել 5 գլխավոր արտահայտություններին</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TOP 5 ESSENTIAL EXPRESSIONS */}
        {activeTab === 'top5' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-gradient-to-r from-red-900 via-rose-900 to-amber-900 text-white rounded-3xl p-6 sm:p-7 shadow-md border border-red-700">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-yellow-400/30">
                <Flame className="w-3.5 h-3.5 text-yellow-300" />
                Թեմա 2 • Ամենակարևոր արտահայտությունները
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-100">
                2. Ամենակարևոր խոսակցական արտահայտությունները (Top 5)
              </h2>
              <p className="text-amber-200/90 text-xs sm:text-sm mt-1">
                Սեղմիր ցանկացած իսպաներեն արտահայտության կամ երկխոսության վրա՝ հայերեն թարգմանությունն ու բացատրությունը բացելու համար։
              </p>
            </div>

            {/* List of 5 Expressions Detailed */}
            <div className="space-y-6">
              {TOP_5_EXPRESSIONS.map((item, index) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl border border-orange-200/90 p-5 sm:p-6 shadow-xs hover:border-orange-300 transition-all space-y-4"
                >
                  {/* Header of Item */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-red-800 text-amber-100 flex items-center justify-center font-extrabold text-sm shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-black text-red-950">
                            {item.spanish}
                          </h3>
                          <button
                            type="button"
                            onClick={() => playSpanishTTS(item.spanish)}
                            className="p-1 rounded-lg text-amber-800 hover:bg-amber-100 transition-colors"
                            title="Լսել արտասանությունը"
                          >
                            <Volume2 className="w-5 h-5 text-red-700" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-stone-700">
                          🇦🇲 {item.armenian}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-bold self-start sm:self-auto border ${item.badgeColor}`}
                    >
                      {item.categoryLabelArm}
                    </span>
                  </div>

                  {/* Usage explanation */}
                  <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80 text-xs sm:text-sm text-stone-800">
                    <p className="leading-relaxed">{item.usageArmenian}</p>
                    {item.literalMeaning && (
                      <p className="mt-1 text-xs text-stone-600 italic">
                        <span className="font-bold text-amber-950 not-italic">
                          Բառացի իմաստ՝
                        </span>{' '}
                        {item.literalMeaning}
                      </p>
                    )}
                  </div>

                  {/* Grammar Note if present */}
                  {item.grammarNote && (
                    <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800">
                      <h4 className="font-bold text-red-900 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        {item.grammarNote.title}
                      </h4>
                      <p className="whitespace-pre-line text-stone-700 leading-relaxed">
                        {item.grammarNote.description}
                      </p>
                    </div>
                  )}

                  {/* Alternatives (for Me da igual) */}
                  {item.alternatives && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        Ավելի մեղմ և քաղաքավարի տարբերակներ՝
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.alternatives.map((alt, aIdx) => (
                          <div
                            key={aIdx}
                            className="p-3 bg-stone-50 rounded-xl border border-stone-200"
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-xs font-bold text-amber-800">
                                {alt.note}
                              </span>
                              <button
                                type="button"
                                onClick={() => playSpanishTTS(alt.es)}
                                className="p-1 rounded text-red-700 hover:bg-stone-200"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <SpanishText
                              spanish={alt.es}
                              armenian={alt.arm}
                              size="sm"
                              showArmenianInitially={globalRevealAll}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Dialogues */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Օրինակներ երկխոսություններում (սեղմիր թարգմանելու համար)՝
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="bg-stone-50/70 p-3.5 rounded-xl border border-stone-200 space-y-2"
                        >
                          <div className="text-xs font-semibold text-stone-400">
                            Օրինակ {exIdx + 1}
                          </div>
                          <SpanishText
                            spanish={ex.esQuestion}
                            armenian={ex.armQuestion}
                            size="sm"
                            showArmenianInitially={globalRevealAll}
                          />
                          <SpanishText
                            spanish={ex.esAnswer}
                            armenian={ex.armAnswer}
                            highlight={true}
                            size="sm"
                            showArmenianInitially={globalRevealAll}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Jump to next */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('intro')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all"
              >
                ← 1. Ներածություն
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('extra10')}
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>3. Եվս 10 արտահայտություն</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: EXTRA 10 EXPRESSIONS */}
        {activeTab === 'extra10' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-gradient-to-r from-red-900 via-rose-900 to-amber-900 text-white rounded-3xl p-6 sm:p-7 shadow-md border border-red-700">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-yellow-400/30">
                <Layers className="w-3.5 h-3.5 text-yellow-300" />
                Թեմա 3 • Բնական խոսքի բառապաշար
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-amber-100">
                3. Եվս 10 արտահայտություն՝ բնական խոսքի համար
              </h2>
              <p className="text-amber-200/90 text-xs sm:text-sm mt-1">
                Աղյուսակ, իրական կիրառություն և երկխոսություններ։ Սեղմիր իսպաներենի վրա թարգմանության համար։
              </p>
            </div>

            {/* Table of 10 Expressions */}
            <div className="bg-white rounded-2xl border border-orange-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-amber-100/60 text-amber-950 font-bold border-b border-orange-200">
                    <tr>
                      <th className="p-3.5">Español</th>
                      <th className="p-3.5">Հայերեն</th>
                      <th className="p-3.5">Երբ օգտագործել</th>
                      <th className="p-3.5 text-right">Աուդիո</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {EXTRA_10_EXPRESSIONS.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-amber-50/50 transition-colors"
                      >
                        <td className="p-3.5 font-extrabold text-red-950 text-base">
                          {item.spanish}
                        </td>
                        <td className="p-3.5 font-semibold text-stone-900">
                          {item.armenian}
                        </td>
                        <td className="p-3.5 text-stone-600">
                          {item.usageArmenian}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => playSpanishTTS(item.spanish)}
                            className="p-1.5 rounded-lg text-red-700 hover:bg-stone-100 transition-colors inline-flex"
                            title="Լսել արտասանությունը"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real-Life Situations / Dialogues for 10 Expressions */}
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-black text-red-950 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                Օրինակներ իրական իրավիճակներից
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Սեղմիր իսպաներենի վրա՝ հայերեն թարգմանությունն ու բացատրությունը բացելու համար։
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXTRA_10_EXPRESSIONS.filter((item) => item.examples.length > 0).map(
                  (item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-orange-200/80 p-4 sm:p-5 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                        <span className="font-extrabold text-red-950 text-base">
                          {item.spanish}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${item.badgeColor}`}
                        >
                          {item.categoryLabelArm}
                        </span>
                      </div>

                      {item.examples.map((ex, exIdx) => (
                        <div key={exIdx} className="space-y-2">
                          <SpanishText
                            spanish={ex.esQuestion}
                            armenian={ex.armQuestion}
                            size="sm"
                            showArmenianInitially={globalRevealAll}
                          />
                          <SpanishText
                            spanish={ex.esAnswer}
                            armenian={ex.armAnswer}
                            highlight={true}
                            size="sm"
                            showArmenianInitially={globalRevealAll}
                          />
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Jump to next */}
            <div className="flex justify-between pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('top5')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-stone-100 text-stone-700 hover:bg-stone-200 transition-all"
              >
                ← 2. 5 Գլխավոր
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('game1')}
                className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Անցնել Խաղ 1-ին</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: JUEGO 1 */}
        {activeTab === 'game1' && (
          <div className="animate-in fade-in duration-200">
            <QuizGame />
          </div>
        )}

        {/* TAB 5: JUEGO 2 */}
        {activeTab === 'game2' && (
          <div className="animate-in fade-in duration-200">
            <ReactionGame />
          </div>
        )}

        {/* TAB 6: JUEGO 3 */}
        {activeTab === 'game3' && (
          <div className="animate-in fade-in duration-200">
            <TransformGame />
          </div>
        )}

        {/* TAB 7: READING (LECTURA) */}
        {activeTab === 'reading' && (
          <div className="animate-in fade-in duration-200">
            <ReadingSection />
          </div>
        )}

        {/* TAB 8: SPEAKING & 2-MIN CHALLENGE */}
        {activeTab === 'speaking' && (
          <div className="animate-in fade-in duration-200">
            <SpeakingChallenge />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-amber-100/70 border-t border-stone-800 mt-12 py-8 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-amber-200 text-sm">
              🇪🇸🇦🇲 El español coloquial — Խոսակցական իսպաներեն (B1–B2)
            </p>
            <p className="text-stone-400 mt-1">
              Ինտերակտիվ ուսումնական հավելված • Բացատրություն, օրինակներ, խաղեր և աուդիո
            </p>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <span>Instituto Cervantes ստանդարտ</span>
            <span>•</span>
            <span>2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
