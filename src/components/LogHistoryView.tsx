import React, { useState } from 'react';
import { Search, Cookie, Activity, Utensils, Trash2, Calendar, Filter } from 'lucide-react';
import { CravingLog, MealLog, SymptomLog } from '../types';

interface LogHistoryViewProps {
  cravings: CravingLog[];
  symptoms: SymptomLog[];
  meals: MealLog[];
  onDeleteLog: (type: 'craving' | 'symptom' | 'meal', id: string) => void;
}

export const LogHistoryView: React.FC<LogHistoryViewProps> = ({
  cravings,
  symptoms,
  meals,
  onDeleteLog
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Cravings' | 'Symptoms' | 'Meals'>('All');

  // Combine into unified list
  const combinedLogs = [
    ...cravings.map((c) => ({
      id: c.id,
      type: 'craving' as const,
      date: c.date,
      phase: c.phase,
      title: `${c.category} Craving (Intensity ${c.intensity}/10)`,
      subtitle: c.trigger ? `Trigger: ${c.trigger}` : undefined,
      notes: c.notes,
      rawDate: new Date(c.timestamp)
    })),
    ...symptoms.map((s) => ({
      id: s.id,
      type: 'symptom' as const,
      date: s.date,
      phase: s.phase,
      title: s.symptoms.map((i) => `${i.name} (${i.severity})`).join(', '),
      subtitle: `${s.symptoms.length} symptom(s) logged`,
      notes: s.notes,
      rawDate: new Date(s.timestamp)
    })),
    ...meals.map((m) => ({
      id: m.id,
      type: 'meal' as const,
      date: m.date,
      phase: m.phase,
      title: `${m.mealType}: ${m.title}`,
      subtitle: m.helpedRating ? `Relief: ${m.helpedRating} (${m.helpedSymptom || 'General'})` : undefined,
      notes: m.notes,
      imageUrl: m.imageUrl,
      rawDate: new Date(m.timestamp)
    }))
  ].sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());

  // Filter logs based on search term & filter tab
  const filtered = combinedLogs.filter((item) => {
    if (filterType === 'Cravings' && item.type !== 'craving') return false;
    if (filterType === 'Symptoms' && item.type !== 'symptom') return false;
    if (filterType === 'Meals' && item.type !== 'meal') return false;

    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(term)) ||
      (item.notes && item.notes.toLowerCase().includes(term)) ||
      item.date.includes(term) ||
      item.phase.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header & Search Bar */}
      <div className="space-y-3">
        <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
          Meal & Symptom Log History
        </h2>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs by keyword, recipe, craving, date (e.g. Chocolate, Bloating, Luteal)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-pink-200 dark:border-slate-700 rounded-2xl text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5 text-pink-500" /> Filter:
        </span>
        {(['All', 'Cravings', 'Symptoms', 'Meals'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`shrink-0 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all ${
              filterType === tab
                ? 'bg-pink-600 text-white shadow-sm'
                : 'bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Log Items List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="p-4 rounded-3xl glass-card border border-pink-100 dark:border-slate-800 flex items-start justify-between gap-3 transition-all hover:border-pink-300"
          >
            <div className="flex items-start gap-3">
              {item.type === 'craving' && (
                <div className="p-2.5 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-2xl shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
              )}
              {item.type === 'symptom' && (
                <div className="p-2.5 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-2xl shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
              )}
              {item.type === 'meal' && (
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-2xl shrink-0">
                  <Utensils className="w-5 h-5" />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {item.title}
                  </span>
                  <span className="px-2 py-0.5 bg-pink-100 dark:bg-slate-800 text-pink-700 dark:text-pink-300 font-semibold text-[10px] rounded-full">
                    {item.phase} Phase
                  </span>
                </div>

                {item.subtitle && (
                  <p className="text-xs font-medium text-pink-600 dark:text-pink-400">
                    {item.subtitle}
                  </p>
                )}

                {item.notes && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    "{item.notes}"
                  </p>
                )}

                <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onDeleteLog(item.type, item.id)}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              title="Delete Log"
            >
              <Trash2 className="w-4 h-4" />
            </button>

          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 glass-card rounded-3xl border border-pink-100 dark:border-slate-800 text-slate-400 space-y-2">
            <Search className="w-10 h-10 mx-auto text-pink-300" />
            <p className="text-sm font-semibold">No logs found matching your search.</p>
          </div>
        )}
      </div>

    </div>
  );
};
