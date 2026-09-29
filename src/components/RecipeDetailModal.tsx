import React, { useState } from 'react';
import { X, Clock, DollarSign, Heart, CalendarPlus, CheckSquare, Square, Trash2, Edit3 } from 'lucide-react';
import type { MealType } from '../types';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { formatPricePerServing, COST_TIERS } from '../config/currency';
import { triggerConfetti, triggerHeartBurst } from '../utils/confetti';
import { migrateLegacyId } from '../services/storageService';

const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS: { type: MealType; label: string }[] = [
  { type: 'breakfast', label: 'Breakfast' },
  { type: 'lunch', label: 'Lunch' },
  { type: 'dinner', label: 'Dinner' }
];

export const RecipeDetailModal: React.FC = () => {
  const { user } = useAuth();
  const { selectedRecipe, openRecipeDetails, favorites, toggleFavorite, setMealPlanSlot, deleteRecipe, openRecipeForm, addToast, currency } = useApp();
  const closeRecipeDetails = () => openRecipeDetails(null);
  
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  if (!selectedRecipe) return null;

  const favorited = favorites.some(
    favId => favId === selectedRecipe.id || migrateLegacyId(favId) === migrateLegacyId(selectedRecipe.id)
  );
  const isOwner = selectedRecipe.owner_id === user?.id || (selectedRecipe.is_user_submitted && user?.is_demo);

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    const nextState = !completedSteps[idx];
    const updated = { ...completedSteps, [idx]: nextState };
    setCompletedSteps(updated);

    if (nextState) {
      const allDone = selectedRecipe.steps.every((_, i) => updated[i]);
      if (allDone) {
        triggerConfetti();
        addToast(`All ${selectedRecipe.steps.length} steps completed! Enjoy your meal! 🎉`, 'success');
      }
    }
  };

  const handleAssignMeal = (dayIdx: number, mealType: MealType, e?: React.MouseEvent) => {
    setMealPlanSlot(dayIdx, mealType, selectedRecipe.id);
    if (e) triggerHeartBurst(e);
    addToast(`Added "${selectedRecipe.title}" to ${DAYS_FULL[dayIdx]} ${mealType}!`, 'success');
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    if (!favorited) triggerHeartBurst(e);
    toggleFavorite(selectedRecipe.id);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${selectedRecipe.title}"?`)) {
      await deleteRecipe(selectedRecipe.id);
      addToast('Recipe deleted', 'info');
      closeRecipeDetails();
    }
  };

  return (
    <div
      onClick={closeRecipeDetails}
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDF9] border-2 border-stone-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1C1917] relative text-stone-900 space-y-6 max-h-[90vh] overflow-y-auto animate-pop-in"
      >
        {/* Close Button */}
        <button
          onClick={closeRecipeDetails}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#F8F3EB] border-2 border-stone-900 text-stone-800 hover:bg-[#FF3B30] hover:text-white transition-all shadow-[2px_2px_0px_0px_#1C1917]"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Hero Image & Title Bar */}
        <div className="space-y-4">
          <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden border-2 border-stone-900 shadow-[4px_4px_0px_0px_#1C1917]">
            <img
              src={selectedRecipe.image_url}
              alt={selectedRecipe.title}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`absolute top-4 right-4 w-11 h-11 rounded-2xl border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] flex items-center justify-center transition-all cursor-pointer group/fav ${
                favorited ? 'bg-rose-50 text-[#FF3B30] hover:scale-105 active:scale-95' : 'bg-white text-stone-800 hover:text-[#FF3B30] active:scale-95'
              }`}
              title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 stroke-[2.5] transition-transform ${favorited ? 'fill-current scale-110' : 'group-hover/fav:scale-115'}`} />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-heading leading-tight">
                {selectedRecipe.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-stone-600 mt-1">
                <span className="flex items-center space-x-1 bg-[#FFD166] text-stone-900 px-2.5 py-0.5 rounded-lg border border-stone-900">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedRecipe.prep_time_minutes} minutes prep</span>
                </span>
                <span className="flex items-center space-x-1.5 bg-emerald-100 text-emerald-950 px-2.5 py-0.5 rounded-lg border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917]">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Est. {formatPricePerServing(selectedRecipe.cost_level, currency)} ({COST_TIERS[selectedRecipe.cost_level]?.label})</span>
                </span>
              </div>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <div className="flex items-center space-x-2 pt-2 sm:pt-0">
                <button
                  onClick={() => openRecipeForm(selectedRecipe)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-100 border border-stone-900 text-stone-900 text-xs font-bold hover:bg-amber-200 transition-all shadow-[2px_2px_0px_0px_#1C1917]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-100 border border-stone-900 text-rose-700 text-xs font-bold hover:bg-rose-200 transition-all shadow-[2px_2px_0px_0px_#1C1917]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {selectedRecipe.diet_tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#F8F3EB] text-stone-900 border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Assign to Planner Bar */}
        <div className="bg-[#F8F3EB] border-2 border-stone-900 rounded-2xl p-4 space-y-2 shadow-[3px_3px_0px_0px_#1C1917]">
          <span className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
            <CalendarPlus className="w-4 h-4 text-[#FF3B30]" />
            Assign to Weekly Meal Plan:
          </span>
          
          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {DAYS_FULL.map((dayName, dayIdx) => (
              <div key={dayName} className="text-center space-y-1">
                <span className="text-[10px] font-black text-stone-700">{dayName.slice(0, 3)}</span>
                <div className="flex flex-col gap-1">
                  {MEALS.map(meal => (
                      <button
                        key={meal.type}
                        type="button"
                        onClick={(e) => handleAssignMeal(dayIdx, meal.type, e)}
                        title={`Add to ${dayName} ${meal.label}`}
                        className="text-[9px] font-extrabold py-0.5 rounded bg-white hover:bg-[#FF3B30] hover:text-white border border-stone-900 transition-colors uppercase cursor-pointer active:scale-95"
                      >
                        {meal.type[0]}
                      </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients Checklist Section */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-lg text-stone-900 font-heading">
            Ingredients ({selectedRecipe.ingredients.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedRecipe.ingredients.map((ing, idx) => {
              const isChecked = Boolean(checkedIngredients[idx]);
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngredient(idx)}
                  className={`flex items-start space-x-2.5 p-3 rounded-xl border-2 border-stone-900 cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-50 text-stone-500 line-through'
                      : 'bg-white text-stone-900 hover:bg-[#F8F3EB]'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0 stroke-[2.5]" />
                  ) : (
                    <Square className="w-4 h-4 text-stone-400 mt-0.5 shrink-0 stroke-[2.5]" />
                  )}
                  <span className="text-xs font-bold">{ing}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-lg text-stone-900 font-heading">
            Step-by-Step Guide ({selectedRecipe.steps.length} steps)
          </h3>
          <div className="space-y-3">
            {selectedRecipe.steps.map((step, idx) => {
              const isDone = Boolean(completedSteps[idx]);
              return (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`flex items-start space-x-3 p-3.5 rounded-2xl border-2 border-stone-900 cursor-pointer transition-all ${
                    isDone ? 'bg-stone-100 opacity-60' : 'bg-white shadow-[2px_2px_0px_0px_#1C1917]'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-[#FF3B30] text-white font-extrabold text-xs flex items-center justify-center shrink-0 border border-stone-900">
                    {idx + 1}
                  </span>
                  <p className={`text-xs font-semibold leading-relaxed ${isDone ? 'line-through text-stone-500' : 'text-stone-900'}`}>
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
