import { useState, useEffect } from 'react';
import { 
  Home, 
  Sparkles, 
  Plus, 
  BarChart3, 
  Search, 
  Cookie, 
  Utensils 
} from 'lucide-react';
import { useCycleData } from './hooks/useCycleData';
import { Header } from './components/Header';
import { CycleCard } from './components/CycleCard';
import { HydrationTracker } from './components/HydrationTracker';
import { DailyWellnessTip } from './components/DailyWellnessTip';
import { QuickLogModal } from './components/QuickLogModal';
import { SmartFoodSection } from './components/SmartFoodSection';
import { InsightsView } from './components/InsightsView';
import { LogHistoryView } from './components/LogHistoryView';
import { ProfileView } from './components/ProfileView';
import { IOSInstallGuide } from './components/IOSInstallGuide';
import { Recipe } from './types';

export default function App() {
  const {
    profile,
    currentCycleDay,
    currentPhase,
    cravings,
    symptoms,
    meals,
    todayWaterMl,
    todayStr,
    addWater,
    addCraving,
    addSymptom,
    addMeal,
    updateMealRelief,
    deleteLog,
    updateProfile,
    resetToSeed
  } = useCycleData();

  const [activeNav, setActiveNav] = useState<'home' | 'smart-foods' | 'insights' | 'history' | 'profile'>('home');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [logModalTab, setLogModalTab] = useState<'craving' | 'symptom' | 'meal'>('craving');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Dark mode toggle effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // PWA beforeinstallprompt event listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallPWA = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA installation');
        }
        setDeferredPrompt(null);
      });
    }
  };

  const openLogModal = (tab: 'craving' | 'symptom' | 'meal') => {
    setLogModalTab(tab);
    setIsLogModalOpen(true);
  };

  // Filter today's items
  const todaysCravingsList = cravings.filter(c => c.date === todayStr);
  const todaysSymptomsList = symptoms.filter(s => s.date === todayStr);
  const todaysMealsList = meals.filter(m => m.date === todayStr);

  const todaysCravingCategories = Array.from(new Set(todaysCravingsList.map(c => c.category)));
  const todaysSymptomNames = Array.from(
    new Set(todaysSymptomsList.flatMap(s => s.symptoms.map(i => i.name)))
  );

  const handleRecipeLogged = (recipe: Recipe) => {
    addMeal({
      mealType: 'Snack',
      title: recipe.title,
      category: recipe.category,
      tags: recipe.tags,
      imageUrl: recipe.imageUrl,
      calories: recipe.calories,
      helpedRating: 'Helped Greatly',
      helpedSymptom: recipe.targetSymptoms ? recipe.targetSymptoms[0] : 'General Wellness',
      notes: recipe.whyItHelps
    });
  };

  return (
    <div className="min-h-screen bg-rose-50/50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col transition-colors duration-300">
      
      {/* Sticky Header */}
      <Header
        profile={profile}
        onOpenProfile={() => setActiveNav('profile')}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
        deferredPrompt={deferredPrompt}
        onInstallPWA={handleInstallPWA}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 mb-24 space-y-6">
        
        {/* VIEW 1: HOME DASHBOARD */}
        {activeNav === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Cycle Status Card */}
            <CycleCard
              currentDay={currentCycleDay}
              currentPhase={currentPhase}
              cycleLength={profile.cycleLength}
              periodLength={profile.periodLength}
              lastPeriodStartDate={profile.lastPeriodStartDate}
              onUpdatePeriodStart={(dateStr) => updateProfile({ lastPeriodStartDate: dateStr })}
            />

            {/* Daily Quick Actions Bar */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => openLogModal('craving')}
                className="p-3 bg-gradient-to-br from-amber-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-amber-200/60 dark:border-slate-700 hover:scale-102 transition-transform shadow-xs text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">🍫</span>
                  <Plus className="w-3.5 h-3.5 text-amber-600 group-hover:rotate-90 transition-transform" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Log Craving
                </div>
                <div className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
                  {todaysCravingsList.length} today
                </div>
              </button>

              <button
                onClick={() => openLogModal('symptom')}
                className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-purple-200/60 dark:border-slate-700 hover:scale-102 transition-transform shadow-xs text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">⚡</span>
                  <Plus className="w-3.5 h-3.5 text-purple-600 group-hover:rotate-90 transition-transform" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Log Symptom
                </div>
                <div className="text-[10px] text-purple-700 dark:text-purple-400 font-semibold">
                  {todaysSymptomsList.length} today
                </div>
              </button>

              <button
                onClick={() => openLogModal('meal')}
                className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl border border-emerald-200/60 dark:border-slate-700 hover:scale-102 transition-transform shadow-xs text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl">🥗</span>
                  <Plus className="w-3.5 h-3.5 text-emerald-600 group-hover:rotate-90 transition-transform" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                  Log Meal
                </div>
                <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                  {todaysMealsList.length} today
                </div>
              </button>
            </div>

            {/* Hydration Tracker & Daily Tip Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <HydrationTracker
                currentWaterMl={todayWaterMl}
                goalWaterMl={profile.dailyWaterGoalMl}
                onAddWater={addWater}
              />

              <DailyWellnessTip phase={currentPhase} />
            </div>

            {/* Today's Logged Cravings & Symptoms Summary */}
            <div className="rounded-3xl glass-card p-5 border border-pink-200/50 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Cookie className="w-4 h-4 text-pink-500" />
                  <span>Today's Cravings & Symptoms Logged</span>
                </h3>
                <span className="text-xs text-pink-600 font-semibold">
                  {todaysCravingsList.length + todaysSymptomsList.length} total
                </span>
              </div>

              {todaysCravingsList.length > 0 || todaysSymptomsList.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {todaysCravingsList.map((c) => (
                    <span
                      key={c.id}
                      className="px-3 py-1.5 bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 text-xs font-bold rounded-2xl border border-amber-200 dark:border-amber-800 flex items-center gap-1.5"
                    >
                      <span>🍫 {c.category}</span>
                      <span className="text-[10px] bg-amber-200 dark:bg-amber-800 px-1.5 py-0.2 rounded-full">
                        {c.intensity}/10
                      </span>
                    </span>
                  ))}

                  {todaysSymptomsList.flatMap((s) => s.symptoms).map((sym, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 text-xs font-bold rounded-2xl border border-purple-200 dark:border-purple-800 flex items-center gap-1.5"
                    >
                      <span>⚡ {sym.name}</span>
                      <span className="text-[10px] bg-purple-200 dark:bg-purple-800 px-1.5 py-0.2 rounded-full">
                        {sym.severity}
                      </span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-2 italic">
                  No cravings or symptoms logged yet today. Tap the quick buttons above to check in!
                </p>
              )}
            </div>

            {/* Today's Meals with "Did this help?" interactive buttons */}
            <div className="rounded-3xl glass-card p-5 border border-pink-200/50 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-500" />
                  <span>Today's Meals & Relief Tracker</span>
                </h3>
                <button
                  onClick={() => openLogModal('meal')}
                  className="text-xs font-bold text-pink-600 hover:underline"
                >
                  + Add Meal
                </button>
              </div>

              {todaysMealsList.length > 0 ? (
                <div className="space-y-3 pt-1">
                  {todaysMealsList.map((meal) => (
                    <div
                      key={meal.id}
                      className="p-3.5 bg-white/70 dark:bg-slate-800/70 rounded-2xl border border-slate-100 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        {meal.imageUrl && (
                          <img
                            src={meal.imageUrl}
                            alt={meal.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                        )}
                        <div>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                            {meal.mealType}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                            {meal.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Relief status: <strong className="text-emerald-600 dark:text-emerald-300">{meal.helpedRating || 'Not set'}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Quick Rating Buttons */}
                      <div className="flex items-center gap-1.5 self-end sm:self-auto">
                        <button
                          onClick={() => updateMealRelief(meal.id, 'Helped Greatly', 'Cramps & Cravings')}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-colors ${
                            meal.helpedRating === 'Helped Greatly'
                              ? 'bg-emerald-500 text-white border-emerald-600'
                              : 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-slate-700'
                          }`}
                        >
                          🌸 Helped Greatly
                        </button>
                        <button
                          onClick={() => updateMealRelief(meal.id, 'Helped Slightly', 'General')}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-colors ${
                            meal.helpedRating === 'Helped Slightly'
                              ? 'bg-teal-500 text-white border-teal-600'
                              : 'bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-slate-700'
                          }`}
                        >
                          🌱 Slightly
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-2 italic">
                  No meals logged yet today.
                </p>
              )}
            </div>

            {/* Smart Meal Recommendations Section */}
            <SmartFoodSection
              currentPhase={currentPhase}
              todaysCravings={todaysCravingCategories}
              todaysSymptoms={todaysSymptomNames}
              onLogMeal={handleRecipeLogged}
            />

          </div>
        )}

        {/* VIEW 2: SMART FOODS */}
        {activeNav === 'smart-foods' && (
          <div className="animate-fadeIn">
            <SmartFoodSection
              currentPhase={currentPhase}
              todaysCravings={todaysCravingCategories}
              todaysSymptoms={todaysSymptomNames}
              onLogMeal={handleRecipeLogged}
            />
          </div>
        )}

        {/* VIEW 3: INSIGHTS & CHARTS */}
        {activeNav === 'insights' && (
          <InsightsView
            cravings={cravings}
            symptoms={symptoms}
            meals={meals}
            profile={profile}
          />
        )}

        {/* VIEW 4: LOG HISTORY & SEARCH */}
        {activeNav === 'history' && (
          <LogHistoryView
            cravings={cravings}
            symptoms={symptoms}
            meals={meals}
            onDeleteLog={deleteLog}
          />
        )}

        {/* VIEW 5: PROFILE & SETTINGS */}
        {activeNav === 'profile' && (
          <ProfileView
            profile={profile}
            onUpdateProfile={updateProfile}
            onResetData={resetToSeed}
            deferredPrompt={deferredPrompt}
            onInstallPWA={handleInstallPWA}
          />
        )}

      </main>

      {/* Quick Log Tabbed Modal Overlay */}
      <QuickLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        defaultTab={logModalTab}
        onSaveCraving={addCraving}
        onSaveSymptom={addSymptom}
        onSaveMeal={addMeal}
      />

      {/* iOS Install Prompt Banner */}
      <IOSInstallGuide />

      {/* Modern Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 glass-panel border-t border-pink-100/60 dark:border-slate-800 py-2 px-4 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          
          {/* Nav 1: Home */}
          <button
            onClick={() => setActiveNav('home')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              activeNav === 'home'
                ? 'text-pink-600 dark:text-pink-400 font-bold scale-105'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          {/* Nav 2: Smart Foods */}
          <button
            onClick={() => setActiveNav('smart-foods')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              activeNav === 'smart-foods'
                ? 'text-pink-600 dark:text-pink-400 font-bold scale-105'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Smart Foods</span>
          </button>

          {/* Nav 3: CENTER FLOATING ACTION BUTTON */}
          <button
            onClick={() => openLogModal('craving')}
            className="w-12 h-12 -mt-6 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 text-white flex items-center justify-center shadow-lg shadow-pink-500/35 hover:scale-110 active:scale-95 transition-transform ring-4 ring-rose-50 dark:ring-slate-950"
            title="Quick Log Craving, Symptom, or Meal"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>

          {/* Nav 4: Insights */}
          <button
            onClick={() => setActiveNav('insights')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              activeNav === 'insights'
                ? 'text-pink-600 dark:text-pink-400 font-bold scale-105'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Insights</span>
          </button>

          {/* Nav 5: Log History */}
          <button
            onClick={() => setActiveNav('history')}
            className={`flex flex-col items-center gap-1 text-[11px] font-semibold transition-colors ${
              activeNav === 'history'
                ? 'text-pink-600 dark:text-pink-400 font-bold scale-105'
                : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>History</span>
          </button>

        </div>
      </nav>

    </div>
  );
}
