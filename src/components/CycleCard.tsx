import React, { useState } from 'react';
import { Calendar, Info, Sparkles, ChevronRight, RefreshCw } from 'lucide-react';
import { CyclePhase } from '../types';
import { PHASE_INFOS } from '../data/recipes';

interface CycleCardProps {
  currentDay: number;
  currentPhase: CyclePhase;
  cycleLength: number;
  periodLength: number;
  lastPeriodStartDate: string;
  onUpdatePeriodStart: (dateStr: string) => void;
}

export const CycleCard: React.FC<CycleCardProps> = ({
  currentDay,
  currentPhase,
  cycleLength,
  lastPeriodStartDate,
  onUpdatePeriodStart
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const [newDateVal, setNewDateVal] = useState(lastPeriodStartDate);

  const phaseDetails = PHASE_INFOS[currentPhase];

  // Calculate days remaining in cycle
  const daysUntilNext = cycleLength - currentDay + 1;

  const handleSaveDate = () => {
    onUpdatePeriodStart(newDateVal);
    setIsEditingDate(false);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl glass-card p-5 sm:p-6 border border-pink-200/50 dark:border-slate-800 transition-all shadow-xl shadow-pink-500/5">
      
      {/* Decorative Background Glows */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Cycle Phase Ring & Main Day Display */}
        <div className="flex items-center gap-5">
          <div className="relative flex items-center justify-center shrink-0">
            {/* Animated Circular Progress Arc SVG */}
            <svg className="w-24 h-24 sm:w-28 sm:w-28 transform -rotate-90">
              {/* Outer ring track */}
              <circle
                cx="50%"
                cy="50%"
                r="38"
                className="stroke-pink-100 dark:stroke-slate-800"
                strokeWidth="7"
                fill="transparent"
              />
              {/* Progress arc */}
              <circle
                cx="50%"
                cy="50%"
                r="38"
                stroke="currentColor"
                strokeWidth="7"
                strokeDasharray="238.7"
                strokeDashoffset={238.7 - (238.7 * (currentDay / cycleLength))}
                strokeLinecap="round"
                fill="transparent"
                className="text-pink-500 transition-all duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">Day</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 leading-none">
                {currentDay}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">of {cycleLength}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-xs ${phaseDetails.bgLight} ${phaseDetails.borderColor}`}>
                {currentPhase} Phase
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {phaseDetails.dayRange}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mt-1.5 flex items-center gap-1.5">
              <span>Next period in ~{daysUntilNext} {daysUntilNext === 1 ? 'day' : 'days'}</span>
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 max-w-md">
              {phaseDetails.hormoneStatus}
            </p>
          </div>
        </div>

        {/* Phase Action & Info Button */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5">
          <button
            onClick={() => setShowInfoModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-100/80 dark:bg-slate-800 hover:bg-pink-200/80 dark:hover:bg-slate-700 text-pink-700 dark:text-pink-300 text-xs font-semibold rounded-2xl transition-colors"
          >
            <Info className="w-4 h-4 text-pink-500" />
            <span>Phase Nutrition Guide</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsEditingDate(!isEditingDate)}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{isEditingDate ? 'Cancel' : 'Adjust Period Start'}</span>
          </button>
        </div>

      </div>

      {/* Date Adjuster Collapsible Bar */}
      {isEditingDate && (
        <div className="mt-4 pt-4 border-t border-pink-100 dark:border-slate-800 flex flex-wrap items-center gap-3 bg-pink-50/50 dark:bg-slate-900/50 p-3 rounded-2xl">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Last period start date:
          </span>
          <input
            type="date"
            value={newDateVal}
            onChange={(e) => setNewDateVal(e.target.value)}
            className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-pink-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleSaveDate}
            className="px-4 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Save Date
          </button>
        </div>
      )}

      {/* Focus Tag Pills */}
      <div className="mt-4 pt-3 border-t border-pink-100/60 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-pink-500" /> Key Focus:
        </span>
        {phaseDetails.nutritionFocus.map((focus, i) => (
          <span
            key={i}
            className="shrink-0 px-2.5 py-0.5 bg-white/80 dark:bg-slate-800/80 border border-pink-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full"
          >
            {focus}
          </span>
        ))}
      </div>

      {/* Phase Info Modal Overlay */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${phaseDetails.bgLight}`}>
                {currentPhase} Phase Guide
              </span>
              <span className="text-xs text-slate-500 font-medium">{phaseDetails.dayRange}</span>
            </div>

            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              What your body needs right now 🌸
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {phaseDetails.description}
            </p>

            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-2">
                  ✨ Recommended Foods
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {phaseDetails.recommendedFoods.map((food, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-xl border border-emerald-200 dark:border-emerald-800">
                      {food}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 rounded-2xl border border-rose-200 dark:border-rose-800">
                <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider mb-2">
                  ⚠️ Foods to limit right now
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {phaseDetails.foodsToLimit.map((food, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white dark:bg-slate-800 text-rose-800 dark:text-rose-200 text-xs font-semibold rounded-xl border border-rose-200 dark:border-rose-800">
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full mt-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-2xl text-sm transition-colors shadow-md"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
