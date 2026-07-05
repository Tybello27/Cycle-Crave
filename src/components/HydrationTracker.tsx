import React, { useState } from 'react';
import { Droplet, Plus, Minus, Award } from 'lucide-react';

interface HydrationTrackerProps {
  currentWaterMl: number;
  goalWaterMl: number;
  onAddWater: (amountMl: number) => void;
}

export const HydrationTracker: React.FC<HydrationTrackerProps> = ({
  currentWaterMl,
  goalWaterMl,
  onAddWater
}) => {
  const [splash, setSplash] = useState(false);
  const percentage = Math.min(100, Math.round((currentWaterMl / goalWaterMl) * 100));

  const handleAdd = (amount: number) => {
    onAddWater(amount);
    setSplash(true);
    setTimeout(() => setSplash(false), 800);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl glass-card p-5 border border-sky-200/50 dark:border-sky-900/30 transition-all shadow-md">
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300 rounded-2xl">
            <Droplet className={`w-5 h-5 ${splash ? 'animate-bounce text-sky-500' : ''}`} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Daily Hydration
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reduces water retention & bloating
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
            {currentWaterMl}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500"> / {goalWaterMl} ml</span>
        </div>
      </div>

      {/* Progress Bar & Water Level Fill */}
      <div className="relative w-full h-4 bg-sky-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          {percentage > 15 && (
            <span className="absolute right-2 top-0 bottom-0 flex items-center text-[9px] font-bold text-white">
              {percentage}%
            </span>
          )}
        </div>
      </div>

      {/* Quick Add Buttons */}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAdd(250)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 text-xs font-semibold rounded-xl border border-sky-200/60 dark:border-sky-800/60 transition-transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+250ml Glass</span>
          </button>

          <button
            onClick={() => handleAdd(500)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 text-xs font-semibold rounded-xl border border-sky-200/60 dark:border-sky-800/60 transition-transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+500ml Bottle</span>
          </button>
        </div>

        {currentWaterMl > 0 && (
          <button
            onClick={() => handleAdd(-250)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Undo 250ml"
          >
            <Minus className="w-4 h-4" />
          </button>
        )}
      </div>

      {percentage >= 100 && (
        <div className="mt-3 py-1.5 px-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Award className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Hydration Goal Met Today! Great job flushing toxins! 🎉</span>
        </div>
      )}

    </div>
  );
};
