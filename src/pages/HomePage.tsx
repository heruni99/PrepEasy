import React from 'react';
import { Utensils, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/FilterBar';
import { RecipeCard } from '../components/RecipeCard';

export const HomePage: React.FC = () => {
  const { filteredRecipes, openRecipeForm } = useApp();

  return (
    <div className="space-y-8 pb-12">
      
      {/* Pop Red Hero Banner Section */}
      <section className="relative rounded-3xl overflow-hidden bg-[#FF3B30] border-2 border-stone-900 p-6 sm:p-10 shadow-[6px_6px_0px_0px_#1C1917] text-white">
        
        <div className="relative z-10 max-w-2xl space-y-4">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white text-stone-900 border-2 border-stone-900 text-xs font-black shadow-[2px_2px_0px_0px_#1C1917]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3B30] fill-current" />
            <span>Quick, Delicious & Budget-Friendly</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
            Delicious Everyday Meals <span className="bg-[#FFD166] text-stone-900 px-2 py-0.5 rounded-2xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] inline-block -rotate-1">Made Easy</span>
          </h1>

          <p className="text-sm sm:text-base font-bold text-stone-100 leading-relaxed max-w-xl">
            Discover quick 15-minute dinners, 1-pot pastas, high-protein meal prep bowls, and wholesome recipes designed for busy everyday schedules.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center space-x-2 bg-white/90 text-stone-900 px-3 py-1 rounded-xl border border-stone-900 text-xs font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06D6A0]"></span>
              <span>Under $5 per serving</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 text-stone-900 px-3 py-1 rounded-xl border border-stone-900 text-xs font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD166]"></span>
              <span>15 min or less</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/90 text-stone-900 px-3 py-1 rounded-xl border border-stone-900 text-xs font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
              <span>Everyday ingredients</span>
            </div>
          </div>

        </div>

        {/* Hero Background Decorative Shapes */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-[#FFD166]/30 border-4 border-stone-900 pointer-events-none" />
        <div className="absolute right-1/4 -top-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />

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
        <div className="text-center py-16 bg-white border-2 border-stone-900 rounded-3xl p-8 space-y-4 shadow-[4px_4px_0px_0px_#1C1917]">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD166] border-2 border-stone-900 mx-auto flex items-center justify-center text-stone-900 shadow-[3px_3px_0px_0px_#1C1917]">
            <Utensils className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-black text-stone-900 font-heading">No recipes match your filter</h3>
          <p className="text-xs font-bold text-stone-600 max-w-md mx-auto">
            Try adjusting your prep time, budget criteria, or diet tags, or submit your own custom recipe!
          </p>
          <button
            onClick={() => openRecipeForm()}
            className="px-5 py-2.5 rounded-2xl bg-[#FF3B30] text-white text-xs font-extrabold border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] transition-all"
          >
            Create Custom Recipe
          </button>
        </div>
      )}

    </div>
  );
};
