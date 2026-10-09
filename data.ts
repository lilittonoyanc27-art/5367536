export interface ExpressionItem {
  id: string;
  spanish: string;
  armenian: string;
  literalMeaning?: string;
  usageArmenian: string;
  usageSpanish?: string;
  category: 'disagreement' | 'surprise' | 'incredulity' | 'indifference' | 'approval' | 'annoyance' | 'relief' | 'shame' | 'sadness';
  categoryLabelArm: string;
  categoryLabelEs: string;
  badgeColor: string;
  grammarNote?: {
    title: string;
    description: string;
  };
  examples: {
    esQuestion: string;
    armQuestion: string;
    esAnswer: string;
    armAnswer: string;
    context?: string;
  }[];
  alternatives?: {
    es: string;
    arm: string;
    note: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  questionEs: string;
  dialogueEs: string;
  dialogueArm: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correct: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface ReactionPrompt {
  id: number;
  scenarioEs: string;
  scenarioArm: string;
  questionEs: string;
  questionArm: string;
  suggestedAnswers: {
    textEs: string;
    textArm: string;
    note?: string;
  }[];
}

export interface TransformExercise {
  id: number;
  formalEs: string;
  formalArm: string;
  colloquialEs: string;
  colloquialArm: string;
  explanation: string;
}

export interface ReadingQuestion {
  id: number;
  questionEs: string;
  questionArm: string;
  answerEs: string;
  answerArm: string;
}

export const TOP_5_EXPRESSIONS: ExpressionItem[] = [
  {
    id: 'que-va',
    spanish: '¡Qué va!',
    armenian: 'Ի՞նչ ես ասում։ Բոլորովին էլ չէ։ / Ամենևին։',
    literalMeaning: 'Ի՞նչ է գնում',
    usageArmenian: 'Այս արտահայտությունն օգտագործում ենք, երբ ուզում ենք ինչ-որ բան ժխտել, համաձայն չլինել կամ ասել, որ իրականությունն այլ է։ Այն շատ տարածված է հատկապես Իսպանիայում։',
    usageSpanish: 'Para negar enfáticamente o corregir una suposición errónea.',
    category: 'disagreement',
    categoryLabelArm: 'Ժխտում / Անհամաձայնություն',
    categoryLabelEs: 'Negación / Desacuerdo',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    grammarNote: {
      title: 'Կարևոր է (Nota gramatical)',
      description: '«¡Qué va!» արտահայտության մեջ ir («va») բայը բառացիորեն «գնալ» չի նշանակում։ Սա պատրաստի խոսակցական իդիոմատիկ արտահայտություն է։',
    },
    examples: [
      {
        esQuestion: '— ¿Estás enfadado conmigo?',
        armQuestion: '— Դու ինձ վրա բարկացա՞ծ ես։',
        esAnswer: '— ¡Qué va! Estoy un poco cansado, nada más.',
        armAnswer: '— Ի՞նչ ես ասում, բոլորովին էլ չէ։ Պարզապես մի փոքր հոգնած եմ։',
      },
      {
        esQuestion: '— ¿Te parece difícil aprender español?',
        armQuestion: '— Քեզ դժվա՞ր է թվում իսպաներեն սովորելը։',
        esAnswer: '— ¡Qué va! Me parece muy interesante.',
        armAnswer: '— Ամենևին։ Ինձ շատ հետաքրքիր է թվում։',
      },
    ],
  },
  {
    id: 'no-me-digas',
    spanish: '¡No me digas!',
    armenian: 'Չե՞ս ասում։ Լո՞ւրջ։ Չեմ հավատում։',
    literalMeaning: 'Ինձ մի՛ ասա',
    usageArmenian: 'Օգտագործվում է, երբ ինչ-որ տեղեկություն մեզ զարմացնում է։ Կախված ձայնի տոնից՝ կարող է արտահայտել անկեղծ զարմանք կամ հեգնանք։',
    usageSpanish: 'Expresa sorpresa, incredulidad o a veces ironía.',
    category: 'surprise',
    categoryLabelArm: 'Զարմանք / Հեգնանք',
    categoryLabelEs: 'Sorpresa / Ironía',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    grammarNote: {
      title: 'Քերականական բացատրություն (Explicación gramatical)',
      description: '• Decir — ասել\n• No me digas — բառացի՝ «ինձ մի՛ ասա»\n• Digas — Presente de Subjuntivo\nԱյստեղ օգտագործված է բացասական հրամայականը՝ Imperativo negativo, որը կազմվում է Presente de Subjuntivo-ով։',
    },
    examples: [
      {
        esQuestion: '— ¡He encontrado un trabajo nuevo!',
        armQuestion: '— Ես նոր աշխատանք եմ գտել։',
        esAnswer: '— ¡No me digas! ¡Qué alegría!',
        armAnswer: '— Լո՞ւրջ։ Ի՜նչ ուրախալի լուր է։',
      },
      {
        esQuestion: '— Ayer vi a Antonio Banderas en Málaga.',
        armQuestion: '— Երեկ Մալագայում տեսա Անտոնիո Բանդերասին։',
        esAnswer: '— ¡No me digas! ¿Y hablaste con él?',
        armAnswer: '— Չե՞ս ասում։ Իսկ նրա հետ խոսեցի՞ր։',
      },
    ],
  },
  {
    id: 'venga-ya',
    spanish: '¡Venga ya!',
    armenian: 'Դե լավ էլի։ Մի՛ ասա։ Չեմ հավատում։',
    literalMeaning: 'Դե արի արդեն',
    usageArmenian: 'Այս արտահայտությունը հաճախ օգտագործվում է, երբ չենք հավատում լսածին, կասկածում ենք կամ կարծում ենք, որ դիմացինը չափազանցնում է։',
    usageSpanish: 'Para expresar incredulidad ante una exageración o algo dudoso.',
    category: 'incredulity',
    categoryLabelArm: 'Անհավատություն / Կասկած',
    categoryLabelEs: 'Incredulidad / Duda',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    grammarNote: {
      title: 'Տարբերությունը ¡No me digas!-ի և ¡Venga ya!-ի միջև',
      description: '• ¡No me digas! — Ավելի հաճախ արտահայտում է զարմանք (հաճելի կամ չեզոք)։\n• ¡Venga ya! — Ավելի հաճախ արտահայտում է անհավատություն, կասկած կամ երբ կարծում ես, որ դիմացինը չափազանցնում է կամ ստում։',
    },
    examples: [
      {
        esQuestion: '— He ganado un millón de euros.',
        armQuestion: '— Ես մեկ միլիոն եվրո եմ շահել։',
        esAnswer: '— ¡Venga ya! ¡No te creo!',
        armAnswer: '— Դե լավ էլի։ Չեմ հավատում քեզ։',
      },
      {
        esQuestion: '— Puedo aprender veinte idiomas en un mes.',
        armQuestion: '— Ես կարող եմ մեկ ամսում քսան լեզու սովորել։',
        esAnswer: '— ¡Venga ya! Eso es imposible.',
        armAnswer: '— Դե լավ էլի։ Դա անհնար է։',
      },
    ],
  },
  {
    id: 'me-da-igual',
    spanish: 'Me da igual',
    armenian: 'Ինձ համար միևնույն է։ Տարբերություն չկա։',
    literalMeaning: 'Ինձ նույնն է տալիս',
    usageArmenian: 'Օգտագործում ենք, երբ երկու կամ ավելի տարբերակներից որևէ մեկը մեզ համար ընդունելի է, կամ տվյալ հարցում նախընտրություն չունենք։',
    usageSpanish: 'Para indicar neutralidad o falta de preferencia.',
    category: 'indifference',
    categoryLabelArm: 'Չեզոքություն / Անտարբերություն',
    categoryLabelEs: 'Indiferencia / Neutralidad',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    grammarNote: {
      title: 'Ուշադրություն (Precaución)',
      description: '«Me da igual»-ը երբեմն կարող է սառը կամ անտարբեր հնչել՝ հատկապես ձայնի տոնից կախված։ Եթե ցանկանում եք ավելի քաղաքավարի և մեղմ լինել, օգտագործեք այլընտրանքները։',
    },
    alternatives: [
      {
        es: 'Me parece bien cualquiera de las dos opciones.',
        arm: 'Երկու տարբերակն էլ ինձ հարմար է։',
        note: 'Ավելի մեղմ և քաղաքավարի',
      },
      {
        es: 'Como tú prefieras.',
        arm: 'Ինչպես դու կնախընտրես։',
        note: 'Ընկերական և հարգալից',
      },
    ],
    examples: [
      {
        esQuestion: '— ¿Prefieres ir al cine o al restaurante?',
        armQuestion: '— Նախընտրո՞ւմ ես կինոթատրոն գնալ, թե՞ ռեստորան։',
        esAnswer: '— Me da igual. Tú decides.',
        armAnswer: '— Ինձ համար միևնույն է։ Դու որոշիր։',
      },
      {
        esQuestion: '— ¿Quieres café o té?',
        armQuestion: '— Սու՞րճ ես ուզում, թե՞ թեյ։',
        esAnswer: '— Me da igual. Lo que tengas.',
        armAnswer: '— Ինձ համար տարբերություն չկա։ Ինչ ունես, այն էլ կլինի։',
      },
    ],
  },
  {
    id: 'que-fuerte',
    spanish: '¡Qué fuerte!',
    armenian: 'Վա՜յ։ Աներևակայելի է։ Ցնցող է։',
    literalMeaning: 'Ինչ ուժեղ',
    usageArmenian: 'Շատ տարածված խոսակցական արտահայտություն է Իսպանիայում։ Օգտագործվում է, երբ ինչ-որ լուր չափազանց անսպասելի, զարմանալի, ցնցող կամ նույնիսկ անարդար է թվում։',
    usageSpanish: 'Para reaccionar ante noticias chocantes o sorprendentes.',
    category: 'surprise',
    categoryLabelArm: 'Ցնցող զարմանք',
    categoryLabelEs: 'Sorpresa mayúscula',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    grammarNote: {
      title: 'Բառացի vs Խոսակցական',
      description: '«Fuerte» բառը սովորաբար նշանակում է «ուժեղ», բայց «¡Qué fuerte!» արտահայտության մեջ իմաստը բառացի չէ, այլ նշանակում է «անհավատալի է», «ինչպիսի անակնկալ/շոկ»։',
    },
    examples: [
      {
        esQuestion: '— Pedro ha dejado su trabajo sin avisar a nadie.',
        armQuestion: '— Պեդրոն թողել է աշխատանքը՝ առանց որևէ մեկին զգուշացնելու։',
        esAnswer: '— ¡Qué fuerte! ¿Y por qué lo ha hecho?',
        armAnswer: '— Վա՜յ, անհավատալի է։ Իսկ ինչո՞ւ է այդպես արել։',
      },
      {
        esQuestion: '— Mi vecino ha ganado la lotería dos veces.',
        armQuestion: '— Իմ հարևանը երկու անգամ վիճակախաղում շահել է։',
        esAnswer: '— ¡Qué fuerte! ¡Qué suerte tiene!',
        armAnswer: '— Աներևակայելի է։ Ի՜նչ բախտավոր է։',
      },
    ],
  },
];

export const EXTRA_10_EXPRESSIONS: ExpressionItem[] = [
  {
    id: 'que-guay',
    spanish: '¡Qué guay!',
    armenian: 'Ի՜նչ լավ է։ / Հիանալի է։ / Շատ կուլ է։',
    literalMeaning: 'Ինչ հավես',
    usageArmenian: 'Օգտագործվում է ուրախություն, հավանություն կամ հիացմունք արտահայտելիս։',
    usageSpanish: 'Alegría, aprobación, entusiasmo.',
    category: 'approval',
    categoryLabelArm: 'Ուրախություն / Հավանություն',
    categoryLabelEs: 'Aprobación / Entusiasmo',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    examples: [
      {
        esQuestion: '— ¡Mañana nos vamos a Barcelona!',
        armQuestion: '— Վաղը մեկնում ենք Բարսելոնա։',
        esAnswer: '— ¡Qué guay! ¡Disfrutad del viaje!',
        armAnswer: '— Ի՜նչ լավ է։ Վայելեք ճանապարհորդությունը։',
      },
    ],
  },
  {
    id: 'que-rollo',
    spanish: '¡Qué rollo!',
    armenian: 'Ի՜նչ ձանձրալի է։ / Ի՜նչ տհաճ իրավիճակ է։',
    literalMeaning: 'Ինչ փաթեթ / ռուլետ',
    usageArmenian: 'Օգտագործվում է ձանձրույթ, տհաճություն կամ ձանձրալի պարտականություն նկարագրելիս։',
    usageSpanish: 'Aburrimiento o situación pesada y molesta.',
    category: 'annoyance',
    categoryLabelArm: 'Ձանձրույթ / Տհաճություն',
    categoryLabelEs: 'Aburrimiento / Molestia',
    badgeColor: 'bg-stone-200 text-stone-800 border-stone-300',
    examples: [
      {
        esQuestion: '— Tenemos que esperar dos horas.',
        armQuestion: '— Պետք է երկու ժամ սպասենք։',
        esAnswer: '— ¡Qué rollo! ¿No podemos hacer otra cosa?',
        armAnswer: '— Ի՜նչ տհաճ է։ Չե՞նք կարող ուրիշ բան անել։',
      },
    ],
  },
  {
    id: 'ni-hablar',
    spanish: '¡Ni hablar!',
    armenian: 'Ոչ մի դեպքում։ / Խոսք անգամ լինել չի կարող։',
    literalMeaning: 'Ոչ էլ խոսել',
    usageArmenian: 'Կտրուկ, վճռական մերժում, երբ որևէ բան բացառվում է։',
    usageSpanish: 'Negación tajante y rotunda.',
    category: 'disagreement',
    categoryLabelArm: 'Կտրուկ մերժում',
    categoryLabelEs: 'Rechazo tajante',
    badgeColor: 'bg-red-100 text-red-900 border-red-300',
    examples: [
      {
        esQuestion: '— ¿Me prestas tu coche para todo el fin de semana?',
        armQuestion: '— Մեքենադ կտա՞ս ամբողջ հանգստյան օրերի համար։',
        esAnswer: '— ¡Ni hablar! Lo necesito.',
        armAnswer: '— Ոչ մի դեպքում։ Այն ինձ պետք է։',
      },
    ],
  },
  {
    id: 'menos-mal',
    spanish: '¡Menos mal!',
    armenian: 'Լավ է, որ... / Փառք Աստծո։ / Բարեբախտաբար։',
    literalMeaning: 'Ավելի քիչ վատ',
    usageArmenian: 'Թեթևացում, երբ վատ իրավիճակը բարեհաջող է ավարտվել կամ խուսափել ենք խնդրից։',
    usageSpanish: 'Alivio tras evitar un problema.',
    category: 'relief',
    categoryLabelArm: 'Թեթևացում',
    categoryLabelEs: 'Alivio',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    examples: [
      {
        esQuestion: '— Al final he encontrado mi cartera.',
        armQuestion: '— Ի վերջո գտա դրամապանակս։',
        esAnswer: '— ¡Menos mal! Pensaba que la habías perdido.',
        armAnswer: '— Լավ է, որ գտել ես։ Կարծում էի՝ կորցրել ես։',
      },
    ],
  },
  {
    id: 'que-verguenza',
    spanish: '¡Qué vergüenza!',
    armenian: 'Ի՜նչ ամոթ է։ / Շատ եմ ամաչում։',
    literalMeaning: 'Ինչ ամոթ',
    usageArmenian: 'Օգտագործվում է անհարմար կամ ամոթալի իրավիճակներում։',
    usageSpanish: 'Sensación de bochorno o vergüenza ajena/propia.',
    category: 'shame',
    categoryLabelArm: 'Ամոթ / Անհարմարություն',
    categoryLabelEs: 'Vergüenza',
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-300',
    examples: [
      {
        esQuestion: '— Se me cayó el café encima del jefe.',
        armQuestion: '— Սուրճս թափվեց ղեկավարի վրա։',
        esAnswer: '— ¡Qué vergüenza! ¿Y qué te dijo?',
        armAnswer: '— Ի՜նչ ամոթ է։ Իսկ ի՞նչ ասաց քեզ։',
      },
    ],
  },
  {
    id: 'que-pena',
    spanish: '¡Qué pena!',
    armenian: 'Ի՜նչ ափսոս։ / Ցավում եմ։',
    literalMeaning: 'Ինչ վիշտ/ցավ',
    usageArmenian: 'Ափսոսանք կամ տխրություն արտահայտելիս։',
    usageSpanish: 'Tristeza o lástima ante una mala noticia.',
    category: 'sadness',
    categoryLabelArm: 'Ափսոսանք / Տխրություն',
    categoryLabelEs: 'Lástima / Pena',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    examples: [
      {
        esQuestion: '— No podré ir a tu fiesta de cumpleaños.',
        armQuestion: '— Չեմ կարողանա գալ քո ծննդյան երեկույթին։',
        esAnswer: '— ¡Qué pena! Te vamos a echar de menos.',
        armAnswer: '— Ի՜նչ ափսոս։ Քո կարիքը զգալու ենք։',
      },
    ],
  },
  {
    id: 'anda',
    spanish: '¡Anda!',
    armenian: 'Վա՜յ։ / Չե՞ս ասում։ / Իսկապե՞ս։',
    literalMeaning: 'Քայլի՛ր',
    usageArmenian: 'Անսպասելի նորության վրա զարմանալիս կամ ուշադրություն գրավելիս։',
    usageSpanish: 'Expresa sorpresa o asombro espontáneo.',
    category: 'surprise',
    categoryLabelArm: 'Զարմանք',
    categoryLabelEs: 'Sorpresa espontánea',
    badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
    examples: [
      {
        esQuestion: '— Mi hermana se ha casado.',
        armQuestion: '— Քույրս ամուսնացել է։',
        esAnswer: '— ¡Anda! ¡No lo sabía!',
        armAnswer: '— Վա՜յ։ Չգիտեի։',
      },
    ],
  },
  {
    id: 'vale',
    spanish: '¡Vale!',
    armenian: 'Լավ։ / Համաձայն եմ։ / Օքեյ։',
    literalMeaning: 'Արժե',
    usageArmenian: 'Ամենատարածված համաձայնության արտահայտությունն Իսպանիայում։',
    usageSpanish: 'Acuerdo, confirmación.',
    category: 'approval',
    categoryLabelArm: 'Համաձայնություն',
    categoryLabelEs: 'Acuerdo',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    examples: [
      {
        esQuestion: '— ¿Nos vemos a las ocho en la plaza?',
        armQuestion: '— Հանդիպե՞նք ժամը ութին հրապարակում։',
        esAnswer: '— ¡Vale! Allí estaré.',
        armAnswer: '— Լավ։ Այնտեղ կլինեմ։',
      },
    ],
  },
  {
    id: 'ya-ves',
    spanish: '¡Ya ves!',
    armenian: 'Բա ի՞նչ ես կարծում։ / Դե արդեն տեսնում ես։',
    literalMeaning: 'Արդեն տեսնում ես',
    usageArmenian: 'Համաձայնություն, ակնհայտ բան շեշտել կամ «դե իհարկե, ճիշտ ես» ասել։',
    usageSpanish: 'Para confirmar algo obvio o dar la razón enfáticamente.',
    category: 'approval',
    categoryLabelArm: 'Ակնհայտի հաստատում',
    categoryLabelEs: 'Confirmación de lo evidente',
    badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    examples: [
      {
        esQuestion: '— Esta semana ha sido larguísima.',
        armQuestion: '— Այս շաբաթը չափազանց երկար էր։',
        esAnswer: '— ¡Ya ves! Necesito descansar.',
        armAnswer: '— Բա ի՞նչ ես կարծում։ Հանգստանալ է պետք։',
      },
    ],
  },
  {
    id: 'que-pasada',
    spanish: '¡Qué pasada!',
    armenian: 'Աներևակայելի է։ / Ի՜նչ հիասքանչ է։ / Գժվելու բան է։',
    literalMeaning: 'Ինչ անցում',
    usageArmenian: 'Մեծ զարմանք, հիացմունք կամ երբ ինչ-որ բան շատ տպավորիչ է։',
    usageSpanish: 'Gran asombro, admiración o entusiasmo.',
    category: 'surprise',
    categoryLabelArm: 'Մեծ հիացմունք / Զարմանք',
    categoryLabelEs: 'Asombro extremo / Admiración',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    examples: [
      {
        esQuestion: '— Mira la vista desde esta terraza.',
        armQuestion: '— Նայի՛ր տեսարանին այս պատշգամբից։',
        esAnswer: '— ¡Qué pasada! Es increíble.',
        armAnswer: '— Աներևակայելի է։ Շատ տպավորիչ է։',
      },
    ],
  },
];

export const INTONATION_EXAMPLES = [
  {
    situationEs: 'Situación 1 — Sorpresa positiva (դրական զարմանք)',
    situationArm: 'Իրավիճակ 1 — Դրական զարմանք',
    dialogue: [
      {
        es: '— ¡Voy a ser padre!',
        arm: '— Ես հայր եմ դառնալու։',
      },
      {
        es: '— ¡No me digas! ¡Enhorabuena!',
        arm: '— Լո՞ւրջ։ Շնորհավորում եմ։',
      },
    ],
    noteArm: 'Ձայնի բարձր և ուրախ տոնայնություն՝ անկեղծ ուրախության և անակնկալի զգացումով։',
  },
  {
    situationEs: 'Situación 2 — Incredulidad (անհավատություն)',
    situationArm: 'Իրավիճակ 2 — Անհավատություն',
    dialogue: [
      {
        es: '— He corrido cincuenta kilómetros sin parar.',
        arm: '— Ես հիսուն կիլոմետր վազել եմ առանց կանգ առնելու։',
      },
      {
        es: '— ¡No me digas! ¿De verdad?',
        arm: '— Չե՞ս ասում։ Իսկապե՞ս։',
      },
    ],
    noteArm: 'Կասկածամիտ հարցական ինտոնացիա, որովհետև ասվածը չափազանցված է թվում։',
  },
  {
    situationEs: 'Situación 3 — Ironía (հեգնանք)',
    situationArm: 'Իրավիճակ 3 — Հեգնանք',
    dialogue: [
      {
        es: '— Si no estudias, no aprobarás el examen.',
        arm: '— Եթե չսովորես, քննությունը չես հանձնի։',
      },
      {
        es: '— ¡No me digas! ¡Qué sorpresa!',
        arm: '— Չե՞ս ասում։ Ի՜նչ մեծ նորություն։',
      },
    ],
    noteArm: 'Այստեղ մարդը իրականում զարմացած չէ։ Նա հեգնանքով է պատասխանում, որովհետև լսածը ակնհայտ է բոլորին։',
  },
];

export const LITERAL_VS_COLLOQUIAL = [
  {
    phrase: '¡Qué va!',
    literal: 'Ի՞նչ է գնում',
    real: 'Ամենևին, ի՞նչ ես ասում',
  },
  {
    phrase: '¡No me digas!',
    literal: 'Ինձ մի՛ ասա',
    real: 'Լո՞ւրջ, չե՞ս ասում',
  },
  {
    phrase: '¡Venga ya!',
    literal: 'Դե արի արդեն',
    real: 'Դե լավ էլի, չեմ հավատում',
  },
  {
    phrase: 'Me da igual',
    literal: 'Ինձ նույնն է տալիս',
    real: 'Ինձ համար միևնույն է',
  },
  {
    phrase: '¡Qué fuerte!',
    literal: 'Ինչ ուժեղ',
    real: 'Աներևակայելի է / Ցնցող է',
  },
  {
    phrase: '¡Menos mal!',
    literal: 'Ավելի քիչ վատ',
    real: 'Լավ է, որ այդպես եղավ / Փառք Աստծո',
  },
];

export const QUIZ_1_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— ¿Has pagado 500 euros por una camiseta?\n— ¡Qué va! Solo me ha costado 20.',
    dialogueArm: '— Դու 500 եվրո՞ ես վճարել շապիկի համար։\n— Ի՞նչ ես ասում։ Ընդամենը 20 եվրո է արժեցել։',
    options: [
      { key: 'A', text: 'Հաստատում է 500 եվրոն' },
      { key: 'B', text: 'Ժխտում է տեղեկությունը' },
      { key: 'C', text: 'Զայրացած է' },
      { key: 'D', text: 'Չգիտի գինը' },
    ],
    correct: 'B',
    explanation: '«¡Qué va!»-ն օգտագործվում է սխալ ենթադրությունը կտրականապես ժխտելու համար։',
  },
  {
    id: 2,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— ¡Me han dado un ascenso!\n— ¡No me digas! ¡Enhorabuena!',
    dialogueArm: '— Ինձ պաշտոնի բարձրացում են տվել։\n— Լո՞ւրջ։ Շնորհավորում եմ։',
    options: [
      { key: 'A', text: 'Անկեղծ ուրախանում և զարմանում է' },
      { key: 'B', text: 'Չի ցանկանում խոսել' },
      { key: 'C', text: 'Չի հավատում աշխատակցին' },
      { key: 'D', text: 'Նեղացել է' },
    ],
    correct: 'A',
    explanation: '«¡No me digas! ¡Enhorabuena!»-ն արտահայտում է հաճելի անակնկալ և շնորհավորանք։',
  },
  {
    id: 3,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— Ayer vi un dinosaurio en el jardín.\n— ¡Venga ya!',
    dialogueArm: '— Երեկ այգում դինոզավր տեսա։\n— Դե լավ էլի։',
    options: [
      { key: 'A', text: 'Վախենում է' },
      { key: 'B', text: 'Շնորհավորում է' },
      { key: 'C', text: 'Չի հավատում պատմությանը' },
      { key: 'D', text: 'Ուզում է այցելել այգի' },
    ],
    correct: 'C',
    explanation: '«¡Venga ya!»-ն ցույց է տալիս, որ մարդը չի հավատում անհավանական չափազանցությանը։',
  },
  {
    id: 4,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— ¿Pizza o pasta?\n— Me da igual, elige tú.',
    dialogueArm: '— Պիցցա՞, թե՞ մակարոն։\n— Ինձ համար միևնույն է, դու ընտրիր։',
    options: [
      { key: 'A', text: 'Չի սիրում ուտել' },
      { key: 'B', text: 'Ուզում է երկուսն էլ' },
      { key: 'C', text: 'Բարկացած է' },
      { key: 'D', text: 'Հատուկ նախընտրություն չունի' },
    ],
    correct: 'D',
    explanation: '«Me da igual»-ը նշանակում է նախընտրության բացակայություն, երկու տարբերակներն էլ հարմար են։',
  },
  {
    id: 5,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— Han cancelado el concierto cinco minutos antes de empezar.\n— ¡Qué fuerte!',
    dialogueArm: '— Համերգը չեղարկել են սկսվելուց հինգ րոպե առաջ։\n— Աներևակայելի է։',
    options: [
      { key: 'A', text: 'Ցանկանում է երգել' },
      { key: 'B', text: 'Ցնցված կամ զարմացած է' },
      { key: 'C', text: 'Ուրախ է' },
      { key: 'D', text: 'Համաձայն է որոշման հետ' },
    ],
    correct: 'B',
    explanation: '«¡Qué fuerte!»-ն արտահայտում է ցնցում, մեծ զարմանք կամ անսպասելի վրդովմունք։',
  },
  {
    id: 6,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— ¡He perdido las llaves!\n— ¡Qué rollo!',
    dialogueArm: '— Բանալիներս կորցրել եմ։\n— Ի՜նչ տհաճ իրավիճակ։',
    options: [
      { key: 'A', text: 'Հիանում է' },
      { key: 'B', text: 'Կատակ է պատմում' },
      { key: 'C', text: 'Տհաճություն է արտահայտում' },
      { key: 'D', text: 'Շնորհավորում է' },
    ],
    correct: 'C',
    explanation: '«¡Qué rollo!»-ն նշանակում է ձանձրալի կամ նյարդայնացնող, տհաճ իրավիճակ։',
  },
  {
    id: 7,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— Han encontrado a nuestro perro.\n— ¡Menos mal!',
    dialogueArm: '— Մեր շանը գտել են։\n— Լավ է, որ գտել են։',
    options: [
      { key: 'A', text: 'Թեթևացում է զգում' },
      { key: 'B', text: 'Բարկացած է' },
      { key: 'C', text: 'Վախենում է' },
      { key: 'D', text: 'Չի հավատում' },
    ],
    correct: 'A',
    explanation: '«¡Menos mal!»-ն արտահայտում է թեթևացում, գոհունակություն և ուրախություն, որ ամեն ինչ լավ է։',
  },
  {
    id: 8,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— ¿Puedo conducir tu coche sin tener carné?\n— ¡Ni hablar!',
    dialogueArm: '— Կարո՞ղ եմ մեքենադ վարել առանց վարորդական իրավունքի։\n— Ոչ մի դեպքում։',
    options: [
      { key: 'A', text: 'Համաձայն է' },
      { key: 'B', text: 'Վստահ չէ' },
      { key: 'C', text: 'Ուզում է մտածել' },
      { key: 'D', text: 'Կտրուկ մերժում է' },
    ],
    correct: 'D',
    explanation: '«¡Ni hablar!»-ն կտրուկ, բացարձակ մերժում է՝ «խոսք անգամ լինել չի կարող»։',
  },
  {
    id: 9,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— ¡Nos vamos de vacaciones a Tenerife!\n— ¡Qué guay!',
    dialogueArm: '— Մենք արձակուրդի ենք գնում Տեներիֆե։\n— Ի՜նչ լավ է։',
    options: [
      { key: 'A', text: 'Ափսոսում է' },
      { key: 'B', text: 'Ուրախանում է' },
      { key: 'C', text: 'Չի հավատում' },
      { key: 'D', text: 'Անհանգստանում է' },
    ],
    correct: 'B',
    explanation: '«¡Qué guay!»-ն հիանալի նորության համար ուրախություն և հավանություն արտահայտող խոսք է։',
  },
  {
    id: 10,
    questionEs: '¿Qué significa la reacción?',
    dialogueEs: '— Tu amigo ganó la lotería dos veces.\n— ¡Anda! ¡Qué suerte!',
    dialogueArm: '— Ընկերդ երկու անգամ վիճակախաղում շահել է։\n— Վա՜յ, ինչ բախտավոր է։',
    options: [
      { key: 'A', text: 'Կասկածում է նրա գոյությանը' },
      { key: 'B', text: 'Ցանկանում է հեռանալ' },
      { key: 'C', text: 'Զարմանում է' },
      { key: 'D', text: 'Բարկանում է' },
    ],
    correct: 'C',
    explanation: '«¡Anda!»-ն արտահայտում է ինքնաբուխ զարմանք՝ «Վա՜յ, չե՞ս ասում»։',
  },
];

export const REACTION_PROMPTS: ReactionPrompt[] = [
  {
    id: 1,
    scenarioEs: 'Tu mejor amigo te dice: «¡Me voy a casar!»',
    scenarioArm: 'Քո լավագույն ընկերը քեզ ասում է. «Ես ամուսնանալու եմ»։',
    questionEs: '¿Cómo reaccionas? — Ինչպե՞ս կարձագանքես։',
    questionArm: 'Ինչպե՞ս կարձագանքես նման ուրախալի և զարմանալի լուրին։',
    suggestedAnswers: [
      {
        textEs: '¡No me digas! ¡Enhorabuena!',
        textArm: 'Լո՞ւրջ։ Շնորհավորում եմ։',
        note: 'Ամենատարածված բնական արձագանքը',
      },
      {
        textEs: '¡Qué guay! ¡Qué alegría!',
        textArm: 'Ի՜նչ հիանալի է։ Ի՜նչ ուրախություն է։',
      },
    ],
  },
  {
    id: 2,
    scenarioEs: 'Alguien te dice: «Hablas diez idiomas perfectamente».',
    scenarioArm: 'Ինչ-որ մեկը քեզ ասում է. «Դու տասը լեզվով կատարյալ խոսում ես»։',
    questionEs: '¿Cómo reaccionas si no es verdad?',
    questionArm: 'Ինչպե՞ս կարձագանքես, եթե դա ճիշտ չէ։',
    suggestedAnswers: [
      {
        textEs: '¡Qué va! Ojalá, pero solo hablo dos o tres.',
        textArm: 'Ի՞նչ ես ասում, բոլորովին էլ չէ։ Երանի, բայց միայն երկու կամ երեք լեզու գիտեմ։',
        note: '«¡Qué va!»-ն կատարյալ է համեստորեն ժխտելու համար',
      },
      {
        textEs: '¡Venga ya! ¡Ojalá fuera verdad!',
        textArm: 'Դե լավ էլի։ Երանի ճիշտ լիներ։',
      },
    ],
  },
  {
    id: 3,
    scenarioEs: 'Tu amigo te propone levantarte todos los días a las cuatro de la mañana.',
    scenarioArm: 'Ընկերդ առաջարկում է ամեն օր առավոտյան ժամը չորսին արթնանալ։',
    questionEs: '¿Cómo reaccionas?',
    questionArm: 'Ինչպե՞ս կարձագանքես այս անհեթեթ կամ ծանր առաջարկին։',
    suggestedAnswers: [
      {
        textEs: '¡Ni hablar! ¡Estás loco!',
        textArm: 'Ոչ մի դեպքում։ Խելագարվե՞լ ես։',
        note: 'Կտրուկ և ծիծաղելի մերժում',
      },
      {
        textEs: '¡Qué rollo! Prefiero dormir.',
        textArm: 'Ի՜նչ տհաճություն։ Նախընտրում եմ քնել։',
      },
    ],
  },
  {
    id: 4,
    scenarioEs: 'Has perdido el móvil, pero después de una hora lo encuentras.',
    scenarioArm: 'Կորցրել ես հեռախոսդ, բայց մեկ ժամ անց գտնում ես։',
    questionEs: '¿Qué dices?',
    questionArm: 'Ի՞նչ ես ասում թեթևացած։',
    suggestedAnswers: [
      {
        textEs: '¡Menos mal! ¡Qué alivio!',
        textArm: 'Լավ է, որ գտա։ Փառք Աստծո, ինչպիսի թեթևացում։',
      },
      {
        textEs: '¡Menos mal que apareció!',
        textArm: 'Լավ է, որ հայտնվեց։',
      },
    ],
  },
  {
    id: 5,
    scenarioEs: 'Un amigo te invita a cenar y te pregunta si prefieres comida italiana o española.',
    scenarioArm: 'Ընկերդ հրավիրում է ընթրիքի և հարցնում՝ նախընտրում ես իտալական, թե իսպանական ուտեստներ։',
    questionEs: '¿Qué respondes si te gustan las dos?',
    questionArm: 'Ի՞նչ կպատասխանես, եթե երկուսն էլ հավանում ես։',
    suggestedAnswers: [
      {
        textEs: 'Me da igual. Las dos me encantan, elige tú.',
        textArm: 'Ինձ համար միևնույն է։ Երկուսն էլ սիրում եմ, դու ընտրիր։',
      },
      {
        textEs: 'Me parece bien cualquiera de las dos opciones.',
        textArm: 'Երկու տարբերակն էլ ինձ հարմար է (ավելի քաղաքավարի)։',
      },
      {
        textEs: 'Como tú prefieras.',
        textArm: 'Ինչպես դու նախընտրես։',
      },
    ],
  },
  {
    id: 6,
    scenarioEs: 'Tu amigo te cuenta que ha comprado una casa cerca del mar.',
    scenarioArm: 'Ընկերդ պատմում է, որ ծովի մոտ տուն է գնել։',
    questionEs: '¿Qué le dices?',
    questionArm: 'Ի՞նչ կասես նման տպավորիչ նորության առթիվ։',
    suggestedAnswers: [
      {
        textEs: '¡Qué pasada! ¡Qué suerte tienes!',
        textArm: 'Աներևակայելի է։ Ի՜նչ բախտավոր ես։',
      },
      {
        textEs: '¡No me digas! ¡Qué fuerte! ¡Felicidades!',
        textArm: 'Չե՞ս ասում։ Անհավատալի է։ Շնորհավորում եմ։',
      },
    ],
  },
  {
    id: 7,
    scenarioEs: 'El camarero te dice que tendrás que esperar dos horas para comer.',
    scenarioArm: 'Մատուցողն ասում է, որ ուտելու համար պետք է երկու ժամ սպասես։',
    questionEs: '¿Cómo reaccionas?',
    questionArm: 'Ինչպե՞ս կարձագանքես նման ձանձրալի/տհաճ սպասմանը։',
    suggestedAnswers: [
      {
        textEs: '¡Qué rollo! ¿Dos horas? Mejor nos vamos a otro sitio.',
        textArm: 'Ի՜նչ տհաճ է։ Երկու ժա՞մ։ Ավելի լավ է ուրիշ տեղ գնանք։',
      },
      {
        textEs: '¡Venga ya! Es demasiado tiempo.',
        textArm: 'Դե լավ էլի։ Չափազանց երկար ժամանակ է։',
      },
    ],
  },
  {
    id: 8,
    scenarioEs: 'Alguien te dice que puede vivir un año sin dormir.',
    scenarioArm: 'Ինչ-որ մեկը քեզ ասում է, որ կարող է մեկ տարի ապրել առանց քնելու։',
    questionEs: '¿Qué respondes?',
    questionArm: 'Ի՞նչ կպատասխանես այս անհեթեթ չափազանցությանը։',
    suggestedAnswers: [
      {
        textEs: '¡Venga ya! ¡Eso es completamente imposible!',
        textArm: 'Դե լավ էլի։ Դա բացարձակապես անհնար է։',
      },
      {
        textEs: '¡Qué va! ¡No te creo nada!',
        textArm: 'Ի՞նչ ես ասում։ Քեզ ոչ մի բան չեմ հավատում։',
      },
    ],
  },
];

export const TRANSFORM_EXERCISES: TransformExercise[] = [
  {
    id: 1,
    formalEs: 'Estoy muy sorprendido.',
    formalArm: 'Ես շատ զարմացած եմ։',
    colloquialEs: '¡No me digas! / ¡Anda!',
    colloquialArm: 'Չե՞ս ասում։ / Վա՜յ։',
    explanation: 'Խոսակցականում անակնկալ լուր լսելիս անմիջապես ասում ենք «¡No me digas!» կամ «¡Anda!»։',
  },
  {
    id: 2,
    formalEs: 'No estoy de acuerdo en absoluto.',
    formalArm: 'Ես ընդհանրապես համաձայն չեմ։',
    colloquialEs: '¡Qué va! / ¡Ni hablar!',
    colloquialArm: 'Ի՞նչ ես ասում, բոլորովին էլ չէ։ / Ոչ մի դեպքում։',
    explanation: 'Կտրուկ կամ բնական ժխտման դեպքում իսպանացիներն օգտագործում են «¡Qué va!» կամ կտրուկ մերժման համար՝ «¡Ni hablar!»։',
  },
  {
    id: 3,
    formalEs: 'Es una noticia estupenda.',
    formalArm: 'Սա հիանալի նորություն է։',
    colloquialEs: '¡Qué guay! / ¡Qué pasada!',
    colloquialArm: 'Ի՜նչ լավ է։ / Աներևակայելի է։',
    explanation: 'Հաճելի և հիանալի բաներին արձագանքում ենք «¡Qué guay!» կամ առավելագույն հիացմունքով՝ «¡Qué pasada!»։',
  },
  {
    id: 4,
    formalEs: 'No tengo ninguna preferencia.',
    formalArm: 'Ես որևէ նախընտրություն չունեմ։',
    colloquialEs: 'Me da igual.',
    colloquialArm: 'Ինձ համար միևնույն է։',
    explanation: 'Երկու տարբերակներից ընտրելիս ամենաարագ և բնական պատասխանն է «Me da igual»։',
  },
  {
    id: 5,
    formalEs: 'Es una situación muy desagradable.',
    formalArm: 'Սա շատ տհաճ իրավիճակ է։',
    colloquialEs: '¡Qué rollo!',
    colloquialArm: 'Ի՜նչ ձանձրալի/տհաճ բան է։',
    explanation: 'Տհաճ կամ ձանձրալի իրավիճակներում իսպանացիներն օգտագործում են «¡Qué rollo!»։',
  },
  {
    id: 6,
    formalEs: 'Me siento aliviado porque todo ha salido bien.',
    formalArm: 'Ես թեթևացում եմ զգում, որովհետև ամեն ինչ լավ է ավարտվել։',
    colloquialEs: '¡Menos mal!',
    colloquialArm: 'Լավ է, որ այդպես եղավ։ / Փառք Աստծո։',
    explanation: 'Բարեհաջող ելքի կամ խնդրի հանգուցալուծման ժամանակ ասում ենք «¡Menos mal!»։',
  },
  {
    id: 7,
    formalEs: 'Me niego completamente.',
    formalArm: 'Ես կտրականապես հրաժարվում եմ։',
    colloquialEs: '¡Ni hablar!',
    colloquialArm: 'Ոչ մի դեպքում։',
    explanation: 'Վճռական մերժում, երբ բանակցելու տեղ չկա՝ «¡Ni hablar!»։',
  },
  {
    id: 8,
    formalEs: 'No puedo creer lo que acaba de pasar.',
    formalArm: 'Չեմ կարող հավատալ հենց նոր տեղի ունեցածին։',
    colloquialEs: '¡Qué fuerte! / ¡Venga ya!',
    colloquialArm: 'Վա՜յ, աներևակայելի է։ / Դե լավ էլի։',
    explanation: 'Անհավատալի և ցնցող լուրի կամ դեպքի ժամանակ իսպանացիներն ասում են «¡Qué fuerte!»։',
  },
];

export interface DialogueLine {
  speaker: 'Carlos' | 'Lucía';
  textEs: string;
  textArm: string;
  highlightPhrase?: string;
  expressionId?: string;
}

export const READING_DIALOGUE: DialogueLine[] = [
  {
    speaker: 'Carlos',
    textEs: '¡Hola, Lucía! ¡Cuánto tiempo sin verte!',
    textArm: 'Ողջո՜ւյն, Լուսիա։ Ի՜նչ երկար ժամանակ է չենք տեսնվել։',
  },
  {
    speaker: 'Lucía',
    textEs: '¡Carlos! ¡No me digas que has vuelto de Valencia!',
    textArm: 'Կա՛ռլոս։ Չե՞ս ասում, որ վերադարձել ես Վալենսիայից։',
    highlightPhrase: '¡No me digas!',
    expressionId: 'no-me-digas',
  },
  {
    speaker: 'Carlos',
    textEs: 'Sí, llegué ayer. Y tengo una noticia: ¡me han ofrecido un trabajo en Barcelona!',
    textArm: 'Այո՛, երեկ եկա։ Եվ մի նորություն ունեմ. ինձ աշխատանք են առաջարկել Բարսելոնայում։',
  },
  {
    speaker: 'Lucía',
    textEs: '¡Qué guay! ¿Y vas a aceptarlo?',
    textArm: 'Ի՜նչ լավ է։ Իսկ ընդունելո՞ւ ես այն։',
    highlightPhrase: '¡Qué guay!',
    expressionId: 'que-guay',
  },
  {
    speaker: 'Carlos',
    textEs: 'No lo sé todavía. Tengo que pensarlo bien.',
    textArm: 'Դեռ չգիտեմ։ Պետք է լավ մտածեմ։',
  },
  {
    speaker: 'Lucía',
    textEs: '¿No te gusta la idea?',
    textArm: 'Միտքը դո՞ւրդ չի գալիս։',
  },
  {
    speaker: 'Carlos',
    textEs: '¡Qué va! Me encanta Barcelona, pero mi familia está aquí.',
    textArm: 'Ի՞նչ ես ասում, բոլորովին էլ չէ։ Շատ եմ սիրում Բարսելոնան, բայց ընտանիքս այստեղ է։',
    highlightPhrase: '¡Qué va!',
    expressionId: 'que-va',
  },
  {
    speaker: 'Lucía',
    textEs: 'Claro, te entiendo. ¿Y qué dice tu hermano?',
    textArm: 'Իհարկե, հասկանում եմ քեզ։ Իսկ ի՞նչ է ասում եղբայրդ։',
  },
  {
    speaker: 'Carlos',
    textEs: 'Dice que él también quiere mudarse a Barcelona.',
    textArm: 'Ասում է, որ ինքն էլ է ուզում տեղափոխվել Բարսելոնա։',
  },
  {
    speaker: 'Lucía',
    textEs: '¡Venga ya! ¿En serio?',
    textArm: 'Դե լավ էլի։ Իսկապե՞ս։',
    highlightPhrase: '¡Venga ya!',
    expressionId: 'venga-ya',
  },
  {
    speaker: 'Carlos',
    textEs: 'Sí, y lo más sorprendente es que ya ha encontrado un piso.',
    textArm: 'Այո՛, և ամենազարմանալին այն է, որ նա արդեն բնակարան է գտել։',
  },
  {
    speaker: 'Lucía',
    textEs: '¡Qué fuerte! ¡Todo está cambiando muy rápido!',
    textArm: 'Աներևակայելի է։ Ամեն ինչ շատ արագ է փոխվում։',
    highlightPhrase: '¡Qué fuerte!',
    expressionId: 'que-fuerte',
  },
  {
    speaker: 'Carlos',
    textEs: 'Ya ves. Por cierto, ¿quieres tomar un café o un té?',
    textArm: 'Բա ի՞նչ ես կարծում։ Իմիջիայլոց, ուզո՞ւմ ես սուրճ խմել, թե՞ թեյ։',
    highlightPhrase: 'Ya ves',
    expressionId: 'ya-ves',
  },
  {
    speaker: 'Lucía',
    textEs: 'Me da igual. Elige tú.',
    textArm: 'Ինձ համար միևնույն է։ Դու ընտրիր։',
    highlightPhrase: 'Me da igual',
    expressionId: 'me-da-igual',
  },
  {
    speaker: 'Carlos',
    textEs: 'Perfecto. ¡Ah! Y casi pierdo el tren ayer.',
    textArm: 'Հիանալի է։ Ա՜խ, և երեկ քիչ էր մնում գնացքը բաց թողնեի։',
  },
  {
    speaker: 'Lucía',
    textEs: '¡Menos mal que llegaste!',
    textArm: 'Լավ է, որ հասցրիր գալ։',
    highlightPhrase: '¡Menos mal!',
    expressionId: 'menos-mal',
  },
];

export const READING_QUESTIONS: ReadingQuestion[] = [
  {
    id: 1,
    questionEs: '¿Por qué se sorprende Lucía al ver a Carlos?',
    questionArm: 'Ինչո՞ւ է Լուսիան զարմանում Կառլոսին տեսնելիս։',
    answerEs: 'Porque no esperaba que hubiera vuelto de Valencia.',
    answerArm: 'Որովհետև չէր սպասում, որ նա արդեն վերադարձել է Վալենսիայից։',
  },
  {
    id: 2,
    questionEs: '¿Qué significa «¡Qué guay!» en esta conversación?',
    questionArm: 'Ի՞նչ է նշանակում «¡Qué guay!» այս զրույցում։',
    answerEs: 'Significa que es una noticia genial y estupenda que le ofrezcan un trabajo en Barcelona.',
    answerArm: 'Նշանակում է, որ հիանալի և ուրախալի լուր է, որ Կառլոսին աշխատանք են առաջարկել Բարսելոնայում։',
  },
  {
    id: 3,
    questionEs: '¿Por qué Carlos responde «¡Qué va!»?',
    questionArm: 'Ինչո՞ւ է Կառլոսը պատասխանում «¡Qué va!»։',
    answerEs: 'Porque niega que no le guste la idea; al contrario, le encanta Barcelona.',
    answerArm: 'Որովհետև ժխտում է այն միտքը, թե իրեն դուր չի գալիս Բարսելոնան. ընդհակառակը, նա շատ է սիրում այդ քաղաքը։',
  },
  {
    id: 4,
    questionEs: '¿Qué noticia provoca la reacción «¡Venga ya!»?',
    questionArm: 'Ո՞ր նորությունն է առաջացնում «¡Venga ya!» արձագանքը։',
    answerEs: 'La noticia de que su hermano también quiere mudarse a Barcelona.',
    answerArm: 'Այն նորությունը, որ Կառլոսի եղբայրն էլ է ցանկանում տեղափոխվել Բարսելոնա։',
  },
  {
    id: 5,
    questionEs: '¿Por qué dice Lucía «¡Qué fuerte!»?',
    questionArm: 'Ինչո՞ւ է Լուսիան ասում «¡Qué fuerte!»։',
    answerEs: 'Porque le resulta increíble e impactante que ya haya encontrado piso tan rápido.',
    answerArm: 'Որովհետև նրա համար անհավատալի և ցնցող է, որ եղբայրն արդեն այդքան արագ բնակարան է գտել։',
  },
  {
    id: 6,
    questionEs: '¿Qué quiere decir Lucía con «Me da igual»?',
    questionArm: 'Ի՞նչ նկատի ունի Լուսիան՝ ասելով «Me da igual»։',
    answerEs: 'Que no tiene preferencia entre tomar café o té, cualquier opción está bien.',
    answerArm: 'Որ նախընտրություն չունի սուրճի և թեյի միջև, ցանկացած տարբերակն էլ ընդունելի է իր համար։',
  },
  {
    id: 7,
    questionEs: '¿Qué expresión utiliza Lucía cuando se entera de que Carlos casi perdió el tren?',
    questionArm: 'Ի՞նչ արտահայտություն է օգտագործում Լուսիան, երբ իմանում է, որ Կառլոսը քիչ էր մնում բաց թողներ գնացքը։',
    answerEs: 'Utiliza la expresión «¡Menos mal que llegaste!».',
    answerArm: 'Օգտագործում է «¡Menos mal que llegaste!» («Լավ է, որ հասցրիր») արտահայտությունը։',
  },
  {
    id: 8,
    questionEs: '¿Qué harías tú si te ofrecieran un trabajo en otra ciudad?',
    questionArm: 'Ի՞նչ կանեիր դու, եթե քեզ աշխատանք առաջարկեին մեկ այլ քաղաքում։',
    answerEs: 'Respuesta abierta: Puedes decir «¡Qué bien!» y evaluar con tu familia, o decir «¡Ni hablar!» si prefieres quedarte.',
    answerArm: 'Բաց հարց՝ կարող ես ասել «Կմտածեի ընտանիքիս մասին» կամ «Անմիջապես կհամաձայնեի»՝ օգտագործելով այսօրվա արտահայտությունները։',
  },
];

export const OPINION_QUESTIONS = [
  {
    id: 1,
    es: '¿Te molesta cuando alguien exagera demasiado? ¿Qué le dices?',
    arm: 'Քեզ նյարդայնացնո՞ւմ է, երբ ինչ-որ մեկը չափազանցնում է։ Ի՞նչ ես նրան ասում։',
    hintEs: 'Ejemplo: «Le digo: ¡Venga ya! ¡No exageres tanto!»',
    hintArm: 'Օրինակ՝ «Ասում եմ՝ ¡Venga ya! (Դե լավ էլի), մի՛ չափազանցրու»',
  },
  {
    id: 2,
    es: '¿Qué noticia te haría decir «¡No me digas!»?',
    arm: 'Ի՞նչ նորությունից կասեիր «¡No me digas!»։',
    hintEs: 'Ejemplo: «Si un amigo famoso viene a mi ciudad.»',
    hintArm: 'Օրինակ՝ «Եթե հայտնի մեկը հանկարծ գար իմ քաղաք»',
  },
  {
    id: 3,
    es: '¿En qué situaciones dices «Me da igual»?',
    arm: 'Ի՞նչ իրավիճակներում ես ասում «Ինձ համար միևնույն է»։',
    hintEs: 'Ejemplo: «Cuando elijo qué película ver con amigos.»',
    hintArm: 'Օրինակ՝ «Երբ ընկերներիս հետ ֆիլմ ենք ընտրում»',
  },
  {
    id: 4,
    es: '¿Qué cosas te parecen un rollo?',
    arm: 'Ի՞նչ բաներ են քեզ ձանձրալի կամ տհաճ թվում։',
    hintEs: 'Ejemplo: «Esperar en la cola del banco es un rollo tremendo.»',
    hintArm: 'Օրինակ՝ «Բանկի հերթում սպասելը սարսափելի ձանձրալի է»',
  },
  {
    id: 5,
    es: '¿Qué harías si un amigo te contara algo increíble?',
    arm: 'Ի՞նչ կանեիր, եթե ընկերդ անհավանական բան պատմեր։',
    hintEs: 'Ejemplo: «Gritaría: ¡Qué fuerte! ¿Cómo es posible?»',
    hintArm: 'Օրինակ՝ «Կբացականչեի՝ ¡Qué fuerte! Ինչպե՞ս է դա հնարավոր»',
  },
  {
    id: 6,
    es: '¿Qué prefieres: hablar de manera formal o coloquial con tus amigos? ¿Por qué?',
    arm: 'Ընկերներիդ հետ նախընտրում ես պաշտոնակա՞ն, թե՞ խոսակցական ձևով խոսել։ Ինչո՞ւ։',
    hintEs: 'Ejemplo: «Prefiero hablar de manera coloquial porque es más natural y cercano.»',
    hintArm: 'Օրինակ՝ «Նախընտրում եմ խոսակցական, որովհետև ավելի բնական և մտերիմ է»',
  },
  {
    id: 7,
    es: '¿Alguna vez has dicho «¡Menos mal!» después de solucionar un problema? Cuenta qué pasó.',
    arm: 'Երբևէ որևէ խնդիր լուծելուց հետո ասե՞լ ես «Լավ է, որ... »։ Պատմիր՝ ինչ է տեղի ունեցել։',
    hintEs: 'Ejemplo: «Cuando encontré mi pasaporte antes del vuelo, dije: ¡Menos mal!»',
    hintArm: 'Օրինակ՝ «Երբ թռիչքից առաջ գտա անձնագիրս, ասացի՝ ¡Menos mal!»',
  },
  {
    id: 8,
    es: '¿Por qué crees que es importante entender las expresiones coloquiales cuando vivimos en España?',
    arm: 'Քո կարծիքով՝ ինչո՞ւ է կարևոր հասկանալ խոսակցական արտահայտությունները, երբ ապրում ենք Իսպանիայում։',
    hintEs: 'Ejemplo: «Porque la gente habla así todos los días en la calle y con amigos.»',
    hintArm: 'Օրինակ՝ «Որովհետև մարդիկ փողոցում և ընկերական միջավայրում հենց այդպես են խոսում»',
  },
];
