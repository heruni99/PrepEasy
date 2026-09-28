import React from 'react';
import { Utensils, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/FilterBar';
import { RecipeCard } from '../components/RecipeCard';

export const HomePage: React.FC = () => {
  const { filteredRecipes, openRecipeForm } = useApp();

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student-Friendly & Budget Approved</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight leading-tight">
            Delicious Meals on a <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">Student Budget</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover quick 10-minute ramens, 1-pot pastas, high-protein meal prep bowls, and dorm mug cakes designed for busy college schedules.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Under $5 per serving</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>15 min or less</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              <span>Zero fancy equipment</span>
            </div>
          </div>

        </div>

        {/* Hero Background Glow Decorative Circles */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 bottom-0 w-64 h-64 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />
      </section>

      {/* Search & Filter Bar */}
      <FilterBar />

      {/* Recipe Grid View */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 mx-auto flex items-center justify-center text-amber-400">
            <Utensils className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-200">No recipes match your filter</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your prep time, budget criteria, or diet tags, or submit your own custom recipe!
          </p>
          <button
            onClick={() => openRecipeForm()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md transition-colors"
          >
            Create Custom Recipe
          </button>
        </div>
      )}

    </div>
  );
};
