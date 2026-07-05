import React, { useState } from 'react';
import { Calendar, Award, RotateCcw, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetData: () => void;
  deferredPrompt: any;
  onInstallPWA: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onResetData,
  deferredPrompt,
  onInstallPWA
}) => {
  const [name, setName] = useState(profile.name);
  const [cycleLength, setCycleLength] = useState(profile.cycleLength);
  const [periodLength, setPeriodLength] = useState(profile.periodLength);
  const [startDate, setStartDate] = useState(profile.lastPeriodStartDate);
  const [waterGoal, setWaterGoal] = useState(profile.dailyWaterGoalMl);
  const [savedNotice, setSavedNotice] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim() ? name.trim() : 'Kishi',
      cycleLength,
      periodLength,
      lastPeriodStartDate: startDate,
      dailyWaterGoalMl: waterGoal
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-10 max-w-2xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover ring-4 ring-pink-300 dark:ring-pink-600 shadow-md"
        />
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <span>{profile.name}'s Wellness Settings</span>
            <span className="text-xs bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 px-2.5 py-0.5 rounded-full font-bold">
              Pro
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Customize your cycle duration, period length, and daily hydration targets.
          </p>
        </div>
      </div>

      {/* Cycle & Wellness Settings Form */}
      <form onSubmit={handleSave} className="rounded-3xl glass-card p-6 border border-pink-200/50 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> Cycle Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Last Period Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Average Cycle Length (Days)
            </label>
            <input
              type="number"
              min="21"
              max="45"
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Average Period Length (Days)
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={periodLength}
              onChange={(e) => setPeriodLength(Number(e.target.value))}
              className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Daily Water Goal (ml)
            </label>
            <input
              type="number"
              step="250"
              min="1000"
              max="4000"
              value={waterGoal}
              onChange={(e) => setWaterGoal(Number(e.target.value))}
              className="w-full px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400 text-slate-800 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="pt-2">
          {savedNotice ? (
            <div className="py-2.5 bg-emerald-500 text-white text-center font-bold text-xs rounded-xl flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings Saved Successfully!</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              Save Cycle Preferences
            </button>
          )}
        </div>
      </form>

      {/* PWA Section */}
      <div className="rounded-3xl glass-card p-5 border border-purple-200/50 dark:border-slate-800 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
          <Download className="w-4 h-4" /> Progressive Web App (PWA)
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          CycleCrave works completely offline! You can add CycleCrave directly to your phone's Home Screen for a fast native app experience without downloading from an app store.
        </p>

        {deferredPrompt ? (
          <button
            onClick={onInstallPWA}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Install CycleCrave App Now</span>
          </button>
        ) : (
          <div className="p-3 bg-purple-50 dark:bg-slate-800 rounded-2xl border border-purple-100 dark:border-slate-700 text-xs text-purple-900 dark:text-purple-200">
            💡 <strong>Safari / Chrome Tip:</strong> Tap <strong>Share</strong> or the browser menu and select <strong>"Add to Home Screen"</strong>.
          </div>
        )}
      </div>

      {/* Badges Summary */}
      <div className="rounded-3xl glass-card p-5 border border-amber-200/50 dark:border-slate-800 space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
          <Award className="w-4 h-4" /> Your Milestones ({profile.unlockedBadges.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {profile.unlockedBadges.map((badge, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 font-bold text-xs rounded-xl border border-amber-200 dark:border-amber-800 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Reset Data Button */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset App to Default Seed Data</span>
          </button>
        ) : (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-200 dark:border-rose-900 space-y-3">
            <p className="text-xs font-bold text-rose-800 dark:text-rose-200">
              Are you sure? This will replace your local logs with initial seed data.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-xl"
              >
                Yes, Reset Data
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
