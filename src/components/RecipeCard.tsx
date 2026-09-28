import React, { useState } from 'react';
import { Clock, Heart, CalendarPlus, ChefHat } from 'lucide-react';
import type { Recipe, MealType } from '../types';
import { useApp } from '../context/AppContext';

interface RecipeCardProps {
  recipe: Recipe;
}

const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { favorites, toggleFavorite, setMealPlanSlot, openRecipeDetails, addToast } = useApp();
  const [showPlannerMenu, setShowPlannerMenu] = useState(false);

  const favorited = favorites.includes(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const handleAssignMeal = (dayIdx: number, mealType: MealType, e: React.MouseEvent) => {
    e.stopPropagation();
    setMealPlanSlot(dayIdx, mealType, recipe.id);
    addToast(`Added "${recipe.title}" to ${DAYS_SHORT[dayIdx]} ${mealType}!`, 'success');
    setShowPlannerMenu(false);
  };

  return (
    <div
      onClick={() => openRecipeDetails(recipe)}
      className="bg-white border-2 border-stone-900 rounded-3xl overflow-hidden shadow-[3px_3px_0px_0px_#1C1917] hover:shadow-[6px_6px_0px_0px_#1C1917] hover:-translate-y-1 transition-all cursor-pointer flex flex-col group relative"
    >
      {/* Image Banner Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100 border-b-2 border-stone-900">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          
          {/* Prep Time Badge */}
          <div className="pointer-events-auto bg-[#FFD166] text-stone-900 text-xs font-black px-2.5 py-1 rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{recipe.prep_time_minutes} min</span>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto">
            
            {/* Quick Meal Plan Assign Button */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlannerMenu(!showPlannerMenu);
                }}
                className="w-9 h-9 rounded-xl bg-white border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] flex items-center justify-center text-stone-900 hover:bg-[#FF3B30] hover:text-white transition-all active:scale-95"
                title="Add to weekly meal plan"
              >
                <CalendarPlus className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Quick Meal Slot Picker Dropdown */}
              {showPlannerMenu && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 top-11 z-30 bg-white border-2 border-stone-900 rounded-2xl p-3 shadow-[4px_4px_0px_0px_#1C1917] w-56 space-y-2 animate-in fade-in duration-150"
                >
                  <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-[10px] font-black uppercase text-stone-700">Add to Meal Plan</span>
                    <button
                      onClick={() => setShowPlannerMenu(false)}
                      className="text-[10px] font-bold text-[#FF3B30]"
                    >
                      Close
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {DAYS_SHORT.map((day, dayIdx) => (
                      <div key={day} className="flex items-center justify-between text-[11px] font-bold">
                        <span className="text-stone-700 w-10">{day}:</span>
                        <div className="flex space-x-1">
                          {(['breakfast', 'lunch', 'dinner'] as MealType[]).map((meal) => (
                            <button
                              key={meal}
                              onClick={(e) => handleAssignMeal(dayIdx, meal, e)}
                              className="px-1.5 py-0.5 rounded-lg bg-[#F8F3EB] hover:bg-[#FF3B30] hover:text-white border border-stone-900 text-[9px] font-black capitalize transition-colors"
                            >
                              {meal[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Favorite Heart Toggle */}
            <button
              onClick={handleFavoriteClick}
              className={`w-9 h-9 rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] flex items-center justify-center transition-all active:scale-90 ${
                favorited
                  ? 'bg-[#FF3B30] text-white'
                  : 'bg-white text-stone-700 hover:text-[#FF3B30]'
              }`}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 stroke-[2.5] ${favorited ? 'fill-current' : ''}`} />
            </button>

          </div>

        </div>

        {/* User Submitted Badge */}
        {recipe.is_user_submitted && (
          <div className="absolute bottom-2 left-2 bg-[#06D6A0] text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-lg border border-stone-900 flex items-center space-x-1 shadow-[1px_1px_0px_0px_#1C1917]">
            <ChefHat className="w-3 h-3" />
            <span>Student Created</span>
          </div>
        )}
      </div>

      {/* Card Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#FFFDF9]">
        
        <div>
          <h3 className="font-extrabold text-base text-stone-900 group-hover:text-[#FF3B30] transition-colors leading-snug line-clamp-2 font-heading">
            {recipe.title}
          </h3>

          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md border border-stone-900">
              {'$'.repeat(recipe.cost_level)}
            </span>
            <span className="text-[11px] font-bold text-stone-500">
              {recipe.ingredients.length} ingredients • {recipe.steps.length} steps
            </span>
          </div>
        </div>

        {/* Dietary Tag Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-stone-200">
          {recipe.diet_tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#F8F3EB] text-stone-800 border border-stone-900"
            >
              {tag}
            </span>
          ))}
          {recipe.diet_tags.length > 3 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-stone-200 text-stone-700">
              +{recipe.diet_tags.length - 3}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
