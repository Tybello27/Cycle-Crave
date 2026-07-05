import React, { useState } from 'react';
import { Sparkles, Cookie, Flame, Zap, CheckCircle2 } from 'lucide-react';
import { CravingCategory, CravingTrigger } from '../types';

interface CravingLoggerProps {
  onSave: (craving: {
    category: CravingCategory;
    intensity: number;
    trigger?: CravingTrigger;
    notes?: string;
  }) => void;
  onClose?: () => void;
}

const CATEGORIES: Array<{ label: CravingCategory; icon: string; bg: string; color: string }> = [
  { label: 'Chocolate', icon: '🍫', bg: 'bg-amber-100 dark:bg-amber-950/60', color: 'border-amber-400 text-amber-950 dark:text-amber-200' },
  { label: 'Sweet', icon: '🍩', bg: 'bg-pink-100 dark:bg-pink-950/60', color: 'border-pink-400 text-pink-950 dark:text-pink-200' },
  { label: 'Salty', icon: '🥨', bg: 'bg-yellow-100 dark:bg-yellow-950/60', color: 'border-yellow-400 text-yellow-950 dark:text-yellow-200' },
  { label: 'Carbs', icon: '🥖', bg: 'bg-orange-100 dark:bg-orange-950/60', color: 'border-orange-400 text-orange-950 dark:text-orange-200' },
  { label: 'Spicy', icon: '🌶️', bg: 'bg-rose-100 dark:bg-rose-950/60', color: 'border-rose-400 text-rose-950 dark:text-rose-200' },
  { label: 'Fast Food', icon: '🍟', bg: 'bg-red-100 dark:bg-red-950/60', color: 'border-red-400 text-red-950 dark:text-red-200' },
  { label: 'Other', icon: '🥑', bg: 'bg-emerald-100 dark:bg-emerald-950/60', color: 'border-emerald-400 text-emerald-950 dark:text-emerald-200' },
];

const TRIGGERS: CravingTrigger[] = ['PMS', 'Stress', 'Fatigue', 'Boredom', 'Habit', 'Social'];

export const CravingLogger: React.FC<CravingLoggerProps> = ({ onSave, onClose }) => {
  const [category, setCategory] = useState<CravingCategory>('Chocolate');
  const [intensity, setIntensity] = useState<number>(7);
  const [trigger, setTrigger] = useState<CravingTrigger>('PMS');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      category,
      intensity,
      trigger,
      notes: notes.trim() ? notes : undefined
    });
    setSubmitted(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 900);
  };

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-3 animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-300">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Craving Logged! 🌸
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          We've prepared smart period swaps for {category} in your suggestions!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Category Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Cookie className="w-4 h-4 text-pink-500" /> What are you craving?
        </label>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2.5">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.label;
            return (
              <button
                type="button"
                key={cat.label}
                onClick={() => setCategory(cat.label)}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all active:scale-95 ${
                  isSelected
                    ? `${cat.bg} border-pink-500 ring-2 ring-pink-500/30 shadow-md`
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:border-pink-300'
                }`}
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Intensity Slider */}
      <div className="bg-pink-50/50 dark:bg-slate-800/40 p-4 rounded-2xl border border-pink-100 dark:border-slate-700/60">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" /> Craving Intensity:
          </label>
          <span className="px-2.5 py-0.5 bg-pink-600 text-white font-extrabold text-xs rounded-full">
            {intensity} / 10
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full accent-pink-600 cursor-pointer h-2 bg-pink-200 dark:bg-slate-700 rounded-lg"
        />

        <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
          <span>Mild hint</span>
          <span>Moderate</span>
          <span>Irresistible!</span>
        </div>
      </div>

      {/* Trigger Select */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" /> Trigger / Driver:
        </label>
        <div className="flex flex-wrap gap-2">
          {TRIGGERS.map((trig) => (
            <button
              type="button"
              key={trig}
              onClick={() => setTrigger(trig)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                trigger === trig
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {trig}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          Notes (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g. Craving reached peak around 4 PM after work..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-pink-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>Log Craving</span>
      </button>

    </form>
  );
};
