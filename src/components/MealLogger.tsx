import React, { useState } from 'react';
import { Utensils, Sparkles, CheckCircle2 } from 'lucide-react';
import { MealType, ReliefRating } from '../types';

interface MealLoggerProps {
  onSave: (meal: {
    mealType: MealType;
    title: string;
    category?: 'Comfort Food' | 'Energy Booster' | 'Anti-Bloating' | 'Craving Swap' | 'Standard';
    tags: string[];
    imageUrl?: string;
    calories?: number;
    helpedRating?: ReliefRating;
    helpedSymptom?: string;
    notes?: string;
  }) => void;
  onClose?: () => void;
}

const MEAL_TYPES: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Beverage'];

const PRESET_PHOTOS = [
  { label: 'Berry Smoothie Bowl', url: 'https://images.pexels.com/photos/1334130/pexels-photo-1334130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { label: 'Salad & Fresh Beverage', url: 'https://images.pexels.com/photos/7243127/pexels-photo-7243127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { label: 'Salmon Quinoa Bowl', url: 'https://images.pexels.com/photos/14775610/pexels-photo-14775610.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { label: 'Matcha & Oatmeal', url: 'https://images.pexels.com/photos/4552127/pexels-photo-4552127.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { label: 'Cucumber Watermelon', url: 'https://images.pexels.com/photos/4552231/pexels-photo-4552231.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
  { label: 'Baked Sweet Potato', url: 'https://images.pexels.com/photos/31336116/pexels-photo-31336116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200' },
];

export const MealLogger: React.FC<MealLoggerProps> = ({ onSave, onClose }) => {
  const [mealType, setMealType] = useState<MealType>('Lunch');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Comfort Food' | 'Energy Booster' | 'Anti-Bloating' | 'Craving Swap' | 'Standard'>('Anti-Bloating');
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PHOTOS[0].url);
  const [calories, setCalories] = useState<string>('320');
  const [helpedRating, setHelpedRating] = useState<ReliefRating>('Helped Greatly');
  const [helpedSymptom, setHelpedSymptom] = useState('Bloating & Cramps');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      mealType,
      title: title.trim(),
      category,
      tags: [category, 'Period-Friendly'],
      imageUrl: selectedPhoto,
      calories: calories ? parseInt(calories, 10) : undefined,
      helpedRating,
      helpedSymptom: helpedSymptom.trim() ? helpedSymptom : undefined,
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
          Meal Logged Successfully! 🥗
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Saved to your wellness food journal!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Meal Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
          <Utensils className="w-4 h-4 text-pink-500" /> Meal Type:
        </label>
        <div className="flex flex-wrap gap-2">
          {MEAL_TYPES.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setMealType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                mealType === type
                  ? 'bg-pink-600 text-white border-pink-700 shadow-sm'
                  : 'bg-white/70 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          Meal or Drink Title *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Avocado Toast with Hemp Seeds & Matcha"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Category & Calories */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Wellness Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="Anti-Bloating">💨 Anti-Bloating</option>
            <option value="Energy Booster">⚡ Energy Booster</option>
            <option value="Comfort Food">🍯 Comfort Food</option>
            <option value="Craving Swap">🍫 Craving Swap</option>
            <option value="Standard">🥗 Standard Healthy</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Approx Calories
          </label>
          <input
            type="number"
            placeholder="e.g. 350"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>

      {/* Photo Picker */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Select Thumbnail Photo
        </label>
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {PRESET_PHOTOS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedPhoto(p.url)}
              className={`shrink-0 w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all relative ${
                selectedPhoto === p.url ? 'border-pink-500 ring-2 ring-pink-400/50 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={p.url} alt={p.label} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          Meal Notes (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g. Added extra chia seeds and almond milk..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
        />
      </div>

      {/* Did this help? Rating Section */}
      <div className="p-3.5 bg-pink-50/60 dark:bg-slate-800/50 rounded-2xl border border-pink-200/60 dark:border-slate-700/60 space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300">
          🌸 Did this meal help relieve symptoms/cravings?
        </label>
        
        <div className="grid grid-cols-2 gap-2">
          {(['Helped Greatly', 'Helped Slightly', 'Neutral', 'Didn\'t Help'] as ReliefRating[]).map((rate) => (
            <button
              type="button"
              key={rate}
              onClick={() => setHelpedRating(rate)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                helpedRating === rate
                  ? 'bg-pink-600 text-white border-pink-700'
                  : 'bg-white dark:bg-slate-800 border-pink-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {rate === 'Helped Greatly' ? '🌸 Great Relief' : rate === 'Helped Slightly' ? '🌱 Slight Relief' : rate === 'Neutral' ? '😐 Neutral' : '❌ No Change'}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Which symptom was relieved? (e.g. Cramps, Bloating)"
          value={helpedSymptom}
          onChange={(e) => setHelpedSymptom(e.target.value)}
          className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 border border-pink-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-emerald-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>Log Meal</span>
      </button>

    </form>
  );
};
