import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, Download, Flame, Settings } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  onOpenProfile: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  deferredPrompt: any;
  onInstallPWA: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onOpenProfile,
  onToggleTheme,
  isDarkMode,
  deferredPrompt,
  onInstallPWA
}) => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(`Good Morning, ${profile.name} 🌸`);
    } else if (hour < 18) {
      setGreeting(`Welcome back, ${profile.name} 🌸`);
    } else {
      setGreeting(`Good Evening, ${profile.name} 🌸`);
    }
  }, [profile.name]);

  return (
    <header className="sticky top-0 z-30 glass-panel px-4 py-3 border-b border-pink-100/50 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* User Info & Greeting */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenProfile}
            className="relative group focus:outline-none transition-transform active:scale-95"
            title="View Profile & Settings"
          >
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-pink-400/50 dark:ring-pink-500/50 shadow-sm group-hover:ring-pink-500"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-slate-100 tracking-tight">
                {greeting}
              </h1>
            </div>
            <p className="text-xs font-bold text-pink-700 dark:text-pink-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-pink-600 animate-pulse" />
              Cycle Syncing & Craving Tracker
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          
          {/* Streak Badge */}
          <button
            onClick={onOpenProfile}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-900 dark:text-amber-300 rounded-full text-xs font-bold border border-amber-300 dark:border-amber-800/50 hover:scale-105 transition-all"
            title={`${profile.streakCount} Day Logging Streak`}
          >
            <Flame className="w-4 h-4 text-amber-600 fill-amber-600 animate-bounce" />
            <span>{profile.streakCount} Day Streak</span>
          </button>

          {/* Native PWA Install Button */}
          {deferredPrompt && (
            <button
              onClick={onInstallPWA}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold rounded-full shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:scale-105 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Install App</span>
            </button>
          )}

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-full bg-pink-200/60 dark:bg-slate-800 text-slate-900 dark:text-slate-200 hover:bg-pink-300/60 dark:hover:bg-slate-700 transition-colors focus:outline-none border border-pink-200 dark:border-transparent"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-pink-700" />
            )}
          </button>

          {/* Settings / Profile Button */}
          <button
            onClick={onOpenProfile}
            className="p-2.5 rounded-full bg-pink-200/60 dark:bg-slate-800 text-slate-900 dark:text-slate-200 hover:bg-pink-300/60 dark:hover:bg-slate-700 transition-colors focus:outline-none border border-pink-200 dark:border-transparent"
            title="Settings & Profile"
            aria-label="Open settings"
          >
            <Settings className="w-4 h-4 text-slate-800 dark:text-slate-300" />
          </button>
        </div>

      </div>
    </header>
  );
};
