import React from 'react';
import { Award, TrendingUp, Sparkles, PieChart, ThumbsUp, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CravingLog, MealLog, SymptomLog, UserProfile } from '../types';

interface InsightsViewProps {
  cravings: CravingLog[];
  symptoms: SymptomLog[];
  meals: MealLog[];
  profile: UserProfile;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  cravings,
  symptoms,
  meals,
  profile
}) => {

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // 1. Compute Cravings Breakdown
  const cravingCounts: Record<string, number> = {};
  cravings.forEach((c) => {
    cravingCounts[c.category] = (cravingCounts[c.category] || 0) + 1;
  });
  const totalCravings = cravings.length || 1;

  const cravingStats = Object.entries(cravingCounts)
    .map(([cat, count]) => ({
      category: cat,
      count,
      percent: Math.round((count / totalCravings) * 100)
    }))
    .sort((a, b) => b.count - a.count);

  // 2. Compute Foods That Helped The Most
  const helpfulMeals = meals.filter((m) => m.helpedRating === 'Helped Greatly' || m.helpedRating === 'Helped Slightly');

  // 3. Compute Symptoms by Phase
  const symptomsByPhase: Record<string, Record<string, number>> = {
    Menstrual: {},
    Follicular: {},
    Ovulatory: {},
    Luteal: {}
  };

  symptoms.forEach((s) => {
    s.symptoms.forEach((item) => {
      if (!symptomsByPhase[s.phase]) symptomsByPhase[s.phase] = {};
      symptomsByPhase[s.phase][item.name] = (symptomsByPhase[s.phase][item.name] || 0) + 1;
    });
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span>Cycle Intelligence</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            Wellness & Craving Analytics
          </h2>
        </div>

        <button
          onClick={triggerConfetti}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs rounded-2xl shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Celebrate Progress 🎉</span>
        </button>
      </div>

      {/* Grid: Craving Breakdown + Helpful Foods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Chart 1: Most Common Cravings */}
        <div className="rounded-3xl glass-card p-5 border border-pink-200/50 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-pink-500" />
              <span>Most Common Cravings</span>
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{cravings.length} total logs</span>
          </div>

          <div className="space-y-3 pt-1">
            {cravingStats.map((stat, i) => {
              const colors = [
                'bg-pink-500',
                'bg-purple-500',
                'bg-amber-500',
                'bg-indigo-500',
                'bg-emerald-500',
                'bg-rose-500'
              ];
              const barColor = colors[i % colors.length];

              return (
                <div key={stat.category} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <span>{stat.category}</span>
                    <span className="text-slate-400">{stat.count} times ({stat.percent}%)</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${stat.percent}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {cravingStats.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">No cravings logged yet!</p>
            )}
          </div>
        </div>

        {/* Chart 2: Foods That Helped The Most */}
        <div className="rounded-3xl glass-card p-5 border border-purple-200/50 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <ThumbsUp className="w-4 h-4 text-emerald-500" />
              <span>Foods That Helped The Most</span>
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
              {helpfulMeals.length} verified
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {helpfulMeals.slice(0, 4).map((meal) => (
              <div
                key={meal.id}
                className="p-3 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center gap-3"
              >
                {meal.imageUrl && (
                  <img
                    src={meal.imageUrl}
                    alt={meal.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    {meal.title}
                  </h4>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                    ✨ Relieved: {meal.helpedSymptom || 'Cravings'}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[10px] rounded-full shrink-0">
                  {meal.helpedRating}
                </span>
              </div>
            ))}

            {helpfulMeals.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-4">No relief feedback logged yet!</p>
            )}
          </div>
        </div>

      </div>

      {/* Chart 3: Symptoms Across Cycle Phases */}
      <div className="rounded-3xl glass-card p-5 border border-pink-200/50 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-500" />
            <span>Symptoms Logged by Cycle Phase</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">Phase Patterns</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {['Menstrual', 'Follicular', 'Ovulatory', 'Luteal'].map((phaseKey) => {
            const symMap = symptomsByPhase[phaseKey] || {};
            const items = Object.entries(symMap);

            return (
              <div
                key={phaseKey}
                className="p-3.5 bg-white/60 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-2"
              >
                <div className="text-xs font-bold text-pink-600 dark:text-pink-400 border-b border-pink-100 dark:border-slate-700 pb-1">
                  {phaseKey}
                </div>

                {items.length > 0 ? (
                  <ul className="space-y-1">
                    {items.map(([sName, count]) => (
                      <li key={sName} className="text-[11px] font-medium text-slate-700 dark:text-slate-300 flex justify-between">
                        <span>{sName}</span>
                        <span className="text-slate-400 font-bold">x{count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[10px] text-slate-400 italic">No symptoms</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Wellness Milestone Badges Showcase */}
      <div className="rounded-3xl glass-card p-5 border border-amber-200/50 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Wellness Badges & Milestones</span>
          </h3>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            {profile.unlockedBadges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {profile.unlockedBadges.map((badge, idx) => (
            <button
              key={idx}
              onClick={triggerConfetti}
              className="p-3 bg-gradient-to-br from-amber-50/80 to-pink-50/80 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-amber-200/80 dark:border-slate-700 text-center hover:scale-105 transition-transform shadow-xs"
            >
              <div className="text-2xl mb-1">🏅</div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {badge}
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                Unlocked
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
