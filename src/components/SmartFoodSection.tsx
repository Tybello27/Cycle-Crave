import React, { useState } from 'react';
import { Sparkles, Clock, Flame, ChevronRight, CheckCircle2, Heart, Filter, Utensils } from 'lucide-react';
import { Recipe, CyclePhase, CravingCategory, SymptomName } from '../types';
import { RECIPES_DATABASE } from '../data/recipes';

interface SmartFoodSectionProps {
  currentPhase: CyclePhase;
  todaysCravings: CravingCategory[];
  todaysSymptoms: SymptomName[];
  onLogMeal: (recipe: Recipe) => void;
}

export const SmartFoodSection: React.FC<SmartFoodSectionProps> = ({
  currentPhase,
  todaysCravings,
  todaysSymptoms,
  onLogMeal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCravingFilter, setActiveCravingFilter] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['dark-chocolate-avocado-mousse']);
  const [loggedNotice, setLoggedNotice] = useState(false);

  // Filter recipes based on tab & filters
  const filteredRecipes = RECIPES_DATABASE.filter((recipe) => {
    // Filter by Wellness Category
    if (selectedCategory !== 'All' && recipe.category !== selectedCategory) {
      return false;
    }
    // Filter by Craving match
    if (activeCravingFilter !== 'All') {
      if (!recipe.targetCravings || !recipe.targetCravings.includes(activeCravingFilter as any)) {
        return false;
      }
    }
    return true;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLogRecipe = (recipe: Recipe) => {
    onLogMeal(recipe);
    setLoggedNotice(true);
    setTimeout(() => {
      setLoggedNotice(false);
      setSelectedRecipe(null);
    }, 1500);
  };

  return (
    <section className="space-y-5">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Smart Nutrition Sync</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100">
            Period-Friendly Meal Suggestions
          </h2>
        </div>

        {/* Phase tailored status pill */}
        <div className="px-3 py-1.5 bg-pink-100/80 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300 text-xs font-semibold rounded-2xl flex items-center gap-1.5 self-start sm:self-auto">
          <span>Targeting</span>
          <span className="font-bold underline decoration-pink-400">{currentPhase} Phase</span>
          {todaysCravings.length > 0 && <span>& {todaysCravings[0]} Craving</span>}
          {todaysSymptoms.length > 0 && <span>& {todaysSymptoms[0]} Relief</span>}
        </div>
      </div>

      {/* Wellness Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { label: 'All', icon: '✨' },
          { label: 'Anti-Bloating', icon: '💨' },
          { label: 'Energy Booster', icon: '⚡' },
          { label: 'Comfort Food', icon: '🍯' },
          { label: 'Craving Swap', icon: '🍫' },
        ].map((cat) => (
          <button
            key={cat.label}
            onClick={() => setSelectedCategory(cat.label)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all active:scale-95 ${
              selectedCategory === cat.label
                ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
                : 'bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:border-pink-300'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Craving Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
        <span className="text-[11px] font-bold uppercase text-slate-400 flex items-center gap-1 shrink-0">
          <Filter className="w-3 h-3 text-pink-500" /> Craving Filter:
        </span>
        {['All', 'Chocolate', 'Sweet', 'Salty', 'Carbs', 'Spicy', 'Fast Food'].map((crav) => (
          <button
            key={crav}
            onClick={() => setActiveCravingFilter(crav)}
            className={`shrink-0 px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
              activeCravingFilter === crav
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400'
            }`}
          >
            {crav}
          </button>
        ))}
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((recipe) => {
          const isBookmarked = bookmarkedIds.includes(recipe.id);
          const isPhaseMatch = recipe.targetPhases.includes(currentPhase);

          return (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="group cursor-pointer rounded-3xl glass-card overflow-hidden border border-pink-200/50 dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1 relative flex flex-col justify-between"
            >
              {/* Image Header with Badge Overlays */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Bookmark Button */}
                <button
                  onClick={(e) => toggleBookmark(recipe.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-rose-500 transition-colors shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                {/* Phase Match Pill */}
                {isPhaseMatch && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-pink-600/90 text-white font-bold text-[10px] rounded-full backdrop-blur-md shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {currentPhase} Match
                  </span>
                )}

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="flex items-center gap-1 bg-slate-900/60 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    <Clock className="w-3 h-3 text-pink-300" /> {recipe.prepTimeMinutes} min
                  </span>
                  <span className="flex items-center gap-1 bg-slate-900/60 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    <Flame className="w-3 h-3 text-amber-300" /> {recipe.calories} kcal
                  </span>
                </div>
              </div>

              {/* Recipe Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                    {recipe.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors mt-0.5">
                    {recipe.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                    {recipe.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-pink-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-pink-50 dark:bg-slate-800 text-pink-700 dark:text-pink-300 text-[10px] font-semibold rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Empty Filter State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12 rounded-3xl glass-card border border-pink-200/50 dark:border-slate-800 space-y-3">
          <Utensils className="w-12 h-12 text-pink-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            No recipes match this filter
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Try switching craving filters or viewing 'All' category recipes.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveCravingFilter('All');
            }}
            className="px-4 py-2 bg-pink-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-pink-700"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Recipe Detail Modal Overlay */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-pink-200 dark:border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Modal Image Header */}
            <div className="relative h-56 w-full shrink-0">
              <img
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <button
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-slate-900"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-0.5 bg-pink-600 text-white text-[10px] font-bold uppercase rounded-full">
                  {selectedRecipe.category}
                </span>
                <h3 className="text-xl font-extrabold mt-1 text-white">
                  {selectedRecipe.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              
              {/* Nutrient Highlights */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-pink-50/70 dark:bg-slate-800/70 rounded-2xl border border-pink-100 dark:border-slate-700/60 text-center">
                {selectedRecipe.nutrientHighlights.map((nh, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                      {nh.label}
                    </div>
                    <div className="text-xs font-extrabold text-pink-700 dark:text-pink-300">
                      {nh.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Why It Helps */}
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Why it helps your period & cravings:
                </h4>
                <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
                  {selectedRecipe.whyItHelps}
                </p>
              </div>

              {/* Ingredients List */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-2">
                  🛒 Ingredients
                </h4>
                <ul className="space-y-1.5">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-2">
                  👩‍🍳 Step-by-Step Instructions
                </h4>
                <ol className="space-y-2">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                      <span className="px-1.5 py-0.5 bg-pink-100 dark:bg-slate-800 text-pink-700 dark:text-pink-300 font-bold rounded-md shrink-0 text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 shrink-0">
              {loggedNotice ? (
                <div className="py-3 bg-emerald-500 text-white text-center font-bold text-sm rounded-2xl flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 animate-bounce" />
                  <span>Logged as eaten in today's meals! 🎉</span>
                </div>
              ) : (
                <button
                  onClick={() => handleLogRecipe(selectedRecipe)}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-2xl text-sm shadow-lg shadow-pink-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Log This Recipe as Eaten (+ Relief Check-In)</span>
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
