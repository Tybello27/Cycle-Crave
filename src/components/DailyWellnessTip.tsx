import React, { useState } from 'react';
import { Lightbulb, RefreshCw, Heart } from 'lucide-react';
import { CyclePhase } from '../types';

interface DailyWellnessTipProps {
  phase: CyclePhase;
}

const TIPS_BY_PHASE: Record<CyclePhase, string[]> = {
  Menstrual: [
    "Warm ginger or cinnamon tea boosts circulation to the uterus and relaxes uterine muscles, reducing cramp intensity.",
    "Iron levels drop during menstruation. Pair iron-rich spinach or lentils with vitamin C (berries or lemon) for 3x absorption!",
    "Light walking or gentle pelvic stretches increase endorphins and release pelvic pressure without overexerting energy.",
    "Magnesium glycinate or 85%+ raw dark cacao regulates prostaglandin signaling, relieving both cramps and mood dips."
  ],
  Follicular: [
    "Estrogen is rising! Your body is efficient at building muscle now—fuel with lean protein and fermented kimchi or kefir.",
    "Try incorporating sprouted seeds like flax and pumpkin seeds (seed cycling) to support optimal estrogen metabolism.",
    "Higher natural stamina today—ideal for introducing new antioxidant-rich green smoothies or matcha chia puddings.",
    "Gut health dictates hormone balance! Focus on fiber-dense cruciferous vegetables like broccoli sprouts and cauliflower."
  ],
  Ovulatory: [
    "Your metabolism and energy are at peak levels! Raw salads, crisp cucumbers, and berries help flush excess estrogen.",
    "Hydration is vital during peak estrogen. Enjoy cooling watermelon bowls with fresh mint and lime to stay energized.",
    "Sesame and sunflower seeds support rising progesterone as you transition towards your luteal phase.",
    "Estrogen spike can trigger mild water retention; potassium-rich foods like avocados and bananas maintain cell balance."
  ],
  Luteal: [
    "Progesterone drop causes blood sugar to fluctuate easily. Choose complex slow carbs like baked sweet potatoes over white sugar.",
    "Chocolate craving? That's your body's signal for magnesium! Swap milk chocolate for Cacao Mousse with Almond Butter.",
    "Fennel tea or cucumber salad relaxes intestinal smooth muscle, preventing late-cycle PMS bloating before it starts.",
    "Vitamin B6 found in chickpeas, oats, and sweet potatoes helps synthesize serotonin and GABA to soothe premenstrual anxiety."
  ]
};

export const DailyWellnessTip: React.FC<DailyWellnessTipProps> = ({ phase }) => {
  const tips = TIPS_BY_PHASE[phase] || TIPS_BY_PHASE.Luteal;
  const [tipIndex, setTipIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleNext = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
    setLiked(false);
  };

  return (
    <div className="rounded-3xl glass-card p-5 border border-purple-200/50 dark:border-purple-900/30 shadow-md relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 rounded-2xl">
            <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
            Daily {phase} Tip
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-1.5 rounded-full transition-colors ${liked ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50' : 'text-slate-400 hover:text-rose-400'}`}
            title="Bookmark Tip"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500' : ''}`} />
          </button>
          
          <button
            onClick={handleNext}
            className="p-1.5 text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
            title="Next Tip"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed pl-1">
        "{tips[tipIndex]}"
      </p>

      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-purple-100/60 dark:border-purple-900/40">
        <span>Tailored for your current phase</span>
        <span>Tip {tipIndex + 1} of {tips.length}</span>
      </div>
    </div>
  );
};
