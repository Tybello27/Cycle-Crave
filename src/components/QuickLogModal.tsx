import React, { useState } from 'react';
import { X, Cookie, Activity, Utensils } from 'lucide-react';
import { CravingCategory, CravingTrigger, SymptomItem, MealType, ReliefRating } from '../types';
import { CravingLogger } from './CravingLogger';
import { SymptomLogger } from './SymptomLogger';
import { MealLogger } from './MealLogger';

interface QuickLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'craving' | 'symptom' | 'meal';
  onSaveCraving: (data: { category: CravingCategory; intensity: number; trigger?: CravingTrigger; notes?: string }) => void;
  onSaveSymptom: (data: { symptoms: SymptomItem[]; notes?: string }) => void;
  onSaveMeal: (data: { mealType: MealType; title: string; category?: any; tags: string[]; imageUrl?: string; calories?: number; helpedRating?: ReliefRating; helpedSymptom?: string; notes?: string }) => void;
}

export const QuickLogModal: React.FC<QuickLogModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'craving',
  onSaveCraving,
  onSaveSymptom,
  onSaveMeal
}) => {
  const [activeTab, setActiveTab] = useState<'craving' | 'symptom' | 'meal'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      
      <div 
        className="w-full sm:max-w-md bg-white dark:bg-slate-900 border-t sm:border border-pink-200 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Swipe Bar Header */}
        <div className="w-12 h-1 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>Wellness Logger</span>
            <span className="text-xs font-normal text-pink-600 bg-pink-100 dark:bg-pink-950 dark:text-pink-300 px-2.5 py-0.5 rounded-full">
              Live
            </span>
          </h2>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => setActiveTab('craving')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'craving'
                ? 'bg-white dark:bg-slate-900 text-pink-600 dark:text-pink-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>Craving</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('symptom')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'symptom'
                ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Symptom</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('meal')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'meal'
                ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Meal</span>
          </button>
        </div>

        {/* Active Tab Logger Form */}
        {activeTab === 'craving' && (
          <CravingLogger onSave={onSaveCraving} onClose={onClose} />
        )}

        {activeTab === 'symptom' && (
          <SymptomLogger onSave={onSaveSymptom} onClose={onClose} />
        )}

        {activeTab === 'meal' && (
          <MealLogger onSave={onSaveMeal} onClose={onClose} />
        )}

      </div>
    </div>
  );
};
