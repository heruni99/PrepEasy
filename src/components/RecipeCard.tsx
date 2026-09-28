import React, { useState } from 'react';
import { Clock, Heart, CalendarPlus, Check, ChefHat } from 'lucide-react';
import type { Recipe, MealType } from '../types';
import { useApp } from '../context/AppContext';

interface RecipeCardProps {
  recipe: Recipe;
}

const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MEALS: MealType[] = ['breakfast', 'lunch', 'dinner'];

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { favorites, toggleFavorite, setMealPlanSlot, openRecipeDetails } = useApp();
  const [showPlannerDropdown, setShowPlannerDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('dinner');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const isFavorite = favorites.includes(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  const handleAddToPlanner = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPlannerDropdown(!showPlannerDropdown);
  };

  const handleConfirmPlannerAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMealPlanSlot(selectedDay, selectedMeal, recipe.id);
    setIsAddedAnimation(true);
    setTimeout(() => {
      setIsAddedAnimation(false);
      setShowPlannerDropdown(false);
    }, 600);
  };

  const costSymbol = '$'.repeat(recipe.cost_level);

  return (
    <div
      onClick={() => openRecipeDetails(recipe)}
      className="group bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      
      {/* Recipe Image & Overlay Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // Fallback for broken image URL
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          
          {/* Prep Time Badge */}
          <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>{recipe.prep_time_minutes} min</span>
          </span>

          {/* Right Action Controls (Favorite & Quick Add) */}
          <div className="flex items-center space-x-2">
            
            {/* Favorite Star Button */}
            <button
              onClick={handleFavoriteClick}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-slate-950/80 text-slate-300 hover:text-rose-400 hover:bg-slate-900 border border-slate-700/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* Quick Meal Plan Button */}
            <button
              onClick={handleAddToPlanner}
              title="Add to weekly meal plan"
              className="p-2 rounded-full bg-slate-950/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700/60 backdrop-blur-md transition-all active:scale-90"
            >
              <CalendarPlus className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* User Submitted Badge */}
        {recipe.is_user_submitted && (
          <span className="absolute bottom-3 left-3 flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/90 text-slate-950 shadow-md">
            <ChefHat className="w-3 h-3" />
            <span>Community Recipe</span>
          </span>
        )}

        {/* Cost Badge */}
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md text-xs font-extrabold bg-slate-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
          {costSymbol}
        </span>

      </div>

      {/* Quick Add To Planner Dropdown Drawer Overlay */}
      {showPlannerDropdown && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-3 top-16 z-20 bg-slate-950/95 border border-amber-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md space-y-3 animate-in fade-in zoom-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <CalendarPlus className="w-3.5 h-3.5" /> Plan Recipe
            </span>
            <button
              onClick={() => setShowPlannerDropdown(false)}
              className="text-slate-400 hover:text-white text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>

          {/* Select Day */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Day of Week</label>
            <div className="grid grid-cols-7 gap-1">
              {DAYS_SHORT.map((day, idx) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(idx)}
                  className={`py-1 rounded text-[10px] font-bold transition-colors ${
                    selectedDay === idx
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Select Meal */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">Meal Time</label>
            <div className="grid grid-cols-3 gap-1">
              {MEALS.map(meal => (
                <button
                  key={meal}
                  type="button"
                  onClick={() => setSelectedMeal(meal)}
                  className={`py-1 rounded text-[10px] font-bold capitalize transition-colors ${
                    selectedMeal === meal
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* Confirm Add Button */}
          <button
            onClick={handleConfirmPlannerAdd}
            className="w-full py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold flex items-center justify-center space-x-1 hover:from-amber-400 hover:to-orange-400 active:scale-95 transition-all"
          >
            {isAddedAnimation ? (
              <>
                <Check className="w-4 h-4 text-slate-950" />
                <span>Added to Plan!</span>
              </>
            ) : (
              <span>Add to {DAYS_SHORT[selectedDay]} {selectedMeal}</span>
            )}
          </button>
        </div>
      )}

      {/* Card Content & Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          <h3 className="font-bold text-base text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1 mb-1">
            {recipe.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2">
            {recipe.ingredients.length} ingredients • {recipe.steps.length} steps guide
          </p>
        </div>

        {/* Diet Tags Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {recipe.diet_tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-950 text-slate-300 border border-slate-800"
            >
              {tag}
            </span>
          ))}
          {recipe.diet_tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-950 text-slate-500 border border-slate-800">
              +{recipe.diet_tags.length - 3}
            </span>
          )}
        </div>

      </div>

    </div>
  );
};
