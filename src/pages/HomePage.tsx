import React from 'react';
import { Utensils, Dices, ArrowDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/FilterBar';
import { RecipeCard } from '../components/RecipeCard';
import { LiveMarquee } from '../components/LiveMarquee';
import { triggerConfetti } from '../utils/confetti';

export const HomePage: React.FC = () => {
  const { filteredRecipes, openRecipeForm, openRecipeDetails, currency } = useApp();

  const handleSurpriseMe = () => {
    if (filteredRecipes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
    const chosen = filteredRecipes[randomIndex];
    triggerConfetti();
    openRecipeDetails(chosen);
  };

  const scrollToRecipes = () => {
    const el = document.getElementById('recipes-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 pb-14">
      
      {/* Pop Red Hero Banner Section with Floating Animations */}
      <section className="relative rounded-3xl overflow-hidden bg-[#FF3B30] border-2 border-stone-900 p-6 sm:p-10 shadow-[6px_6px_0px_0px_#1C1917] text-white">
        
        <div className="relative z-10 max-w-2xl space-y-4">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white text-stone-900 border-2 border-stone-900 text-xs font-black shadow-[2px_2px_0px_0px_#1C1917]">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30]"></span>
            <span>Quick, Delicious & Student Budget-Friendly</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-heading">
            Delicious Everyday Meals <span className="bg-[#FFD166] text-stone-900 px-2.5 py-0.5 rounded-2xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] inline-block -rotate-1 hover:rotate-1 transition-transform">Made Easy</span>
          </h1>

          <p className="text-sm sm:text-base font-bold text-stone-100 leading-relaxed max-w-xl">
            Discover quick 15-minute dinners, Sri Lankan favorites, 1-pot pastas, and meal prep blueprints tailored for busy university schedules and shared dorm kitchens.
          </p>

          {/* Interactive Hero CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#FFD166] hover:bg-[#ffc938] text-stone-900 text-xs font-black border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer group"
            >
              <Dices className="w-4 h-4 stroke-[2.5] group-hover:rotate-45 transition-transform" />
              <span>Surprise Me! (Random Recipe)</span>
            </button>

            <button
              type="button"
              onClick={scrollToRecipes}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-900 text-xs font-black border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer group"
            >
              <span>Explore {filteredRecipes.length} Recipes</span>
              <ArrowDown className="w-4 h-4 stroke-[2.5] group-hover:translate-y-0.5 transition-transform" />
            </button>

          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <div className="flex items-center space-x-1.5 bg-white/95 text-stone-900 px-3 py-1 rounded-xl border border-stone-900 text-xs font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#06D6A0]"></span>
              <span>{currency === 'LKR' ? 'From Rs 150 / serv' : 'From $0.50 / serv'}</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/95 text-stone-900 px-3 py-1 rounded-xl border border-stone-900 text-xs font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFD166]"></span>
              <span>15 min or less</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/95 text-stone-900 px-3 py-1 rounded-xl border border-stone-900 text-xs font-black shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              <span>Sri Lankan Pola & Supermarket staples</span>
            </div>
          </div>

        </div>

        {/* Floating Animated Badges (Desktop & Tablet) */}
        <div className="hidden lg:flex absolute right-8 top-10 z-20 items-center space-x-3 bg-white text-stone-900 px-4 py-2.5 rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1C1917] animate-float">
          <span className="text-2xl">🍛</span>
          <div>
            <p className="text-xs font-black">Kiribath & Sambol</p>
            <span className="text-[10px] font-bold text-emerald-700">
              {currency === 'LKR' ? 'Rs 150–350' : '$0.50–$1.20'}
            </span>
          </div>
        </div>

        <div className="hidden lg:flex absolute right-24 bottom-8 z-20 items-center space-x-3 bg-[#FFD166] text-stone-900 px-4 py-2.5 rounded-2xl border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1C1917] animate-float-slow">
          <span className="text-2xl">🥘</span>
          <div>
            <p className="text-xs font-black">Creamy Parippu</p>
            <span className="text-[10px] font-bold text-stone-800">1-Pot Comfort</span>
          </div>
        </div>

        <div className="hidden xl:flex absolute right-12 top-40 z-20 items-center space-x-2 bg-[#06D6A0] text-stone-950 px-3 py-1.5 rounded-2xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] animate-float-delay">
          <span className="text-lg">🦐</span>
          <span className="text-xs font-black">Crispy Isso Wade</span>
        </div>

        {/* Hero Background Decorative Shapes */}
        <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-[#FFD166]/30 border-4 border-stone-900 pointer-events-none" />
        <div className="absolute right-1/3 -top-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />

      </section>

      {/* Live Kitchen Continuous Ticker */}
      <LiveMarquee />

      {/* Search & Filter Bar */}
      <FilterBar />

      {/* Recipe Grid View Section */}
      <div id="recipes-grid-section">
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, idx) => (
              <div 
                key={recipe.id} 
                className="animate-pop-in"
                style={{ animationDelay: `${Math.min(idx * 40, 360)}ms` }}
              >
                <RecipeCard recipe={recipe} />
              </div>
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
              className="px-5 py-2.5 rounded-2xl bg-[#FF3B30] text-white text-xs font-extrabold border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
            >
              Create Custom Recipe
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
