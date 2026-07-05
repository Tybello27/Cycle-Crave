import React, { useState } from 'react';
import { Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import { SymptomItem, SymptomName, SymptomSeverity } from '../types';

interface SymptomLoggerProps {
  onSave: (data: { symptoms: SymptomItem[]; notes?: string }) => void;
  onClose?: () => void;
}

const ALL_SYMPTOMS: Array<{ name: SymptomName; icon: string }> = [
  { name: 'Cramps', icon: '⚡' },
  { name: 'Bloating', icon: '🎈' },
  { name: 'Fatigue', icon: '😴' },
  { name: 'Headache', icon: '🤕' },
  { name: 'Mood Swings', icon: '🎭' },
  { name: 'Anxiety', icon: '🌧️' },
  { name: 'Low Energy', icon: '🔋' },
  { name: 'Breast Tenderness', icon: '🌸' },
  { name: 'Brain Fog', icon: '🌫️' },
  { name: 'Sugar Spikes', icon: '🍬' },
];

export const SymptomLogger: React.FC<SymptomLoggerProps> = ({ onSave, onClose }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Map<SymptomName, SymptomSeverity>>(
    new Map([
      ['Bloating', 'Moderate'],
      ['Fatigue', 'Mild']
    ])
  );
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleSymptom = (name: SymptomName) => {
    const next = new Map(selectedSymptoms);
    if (next.has(name)) {
      next.delete(name);
    } else {
      next.set(name, 'Moderate');
    }
    setSelectedSymptoms(next);
  };

  const setSeverity = (name: SymptomName, severity: SymptomSeverity) => {
    const next = new Map(selectedSymptoms);
    next.set(name, severity);
    setSelectedSymptoms(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSymptoms.size === 0) return;

    const list: SymptomItem[] = Array.from(selectedSymptoms.entries()).map(([name, severity]) => ({
      name,
      severity
    }));

    onSave({
      symptoms: list,
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
          Symptoms Logged! 🌿
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Anti-bloating and anti-cramp food recommendations updated.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-purple-500" /> Select Symptoms Felt Today:
        </label>

        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
          {ALL_SYMPTOMS.map((sym) => {
            const isSelected = selectedSymptoms.has(sym.name);
            const currentSeverity = selectedSymptoms.get(sym.name) || 'Moderate';

            return (
              <div
                key={sym.name}
                className={`p-3 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-purple-50/80 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800 shadow-xs'
                    : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleSymptom(sym.name)}
                    className="flex items-center gap-2.5 text-left flex-1"
                  >
                    <span className="text-xl">{sym.icon}</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {sym.name}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSymptom(sym.name)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {isSelected ? 'Selected' : '+ Add'}
                  </button>
                </div>

                {/* Severity pill selector when selected */}
                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-purple-200/50 dark:border-purple-900/40 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                      Severity:
                    </span>
                    {(['Mild', 'Moderate', 'Severe'] as SymptomSeverity[]).map((sev) => (
                      <button
                        type="button"
                        key={sev}
                        onClick={() => setSeverity(sym.name, sev)}
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                          currentSeverity === sev
                            ? 'bg-purple-700 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                        }`}
                      >
                        {sev}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
          Symptom Notes (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g. Cramps started around 2 PM..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <button
        type="submit"
        disabled={selectedSymptoms.size === 0}
        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-bold rounded-2xl text-sm shadow-lg shadow-purple-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span>Log {selectedSymptoms.size} Symptom(s)</span>
      </button>

    </form>
  );
};
