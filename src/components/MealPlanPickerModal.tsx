import React, { useState } from 'react';
import { X, Search, Clock, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPriceRange } from '../config/currency';

const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MealPlanPickerModal: React.FC = () => {
  const { activePlannerSlot, closePlannerPicker, recipes, mealPlan, setMealPlanSlot, addToast, currency } = useApp();
  const [search, setSearch] = useState('');

  if (!activePlannerSlot) return null;

  const { dayOfWeek, mealType: meal } = activePlannerSlot;

  // Filter recipes by search
  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.ingredients.some(ing => ing.toLowerCase().includes(search.toLowerCase())) ||
    r.diet_tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  // Check currently assigned recipe for this slot
  const currentEntry = mealPlan.find(m => m.day_of_week === dayOfWeek && m.meal_type === meal);

  const handleSelectRecipe = (recipeId: string, recipeTitle: string) => {
    setMealPlanSlot(dayOfWeek, meal, recipeId);
    addToast(`Assigned "${recipeTitle}" to ${DAYS_FULL[dayOfWeek]} ${meal}!`, 'success');
    closePlannerPicker();
  };

  const handleRemoveRecipe = () => {
    setMealPlanSlot(dayOfWeek, meal, null);
    addToast(`Cleared ${DAYS_FULL[dayOfWeek]} ${meal} slot`, 'info');
    closePlannerPicker();
  };

  return (
    <div
      onClick={closePlannerPicker}
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#FFFDF9] border-2 border-stone-900 rounded-3xl max-w-lg w-full p-6 shadow-[8px_8px_0px_0px_#1C1917] relative text-stone-900 space-y-5 max-h-[85vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={closePlannerPicker}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#F8F3EB] border-2 border-stone-900 text-stone-800 hover:bg-[#FF3B30] hover:text-white transition-all shadow-[2px_2px_0px_0px_#1C1917]"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Modal Header */}
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#FF3B30] px-2.5 py-0.5 rounded-md bg-rose-100 border border-stone-900">
            {DAYS_FULL[dayOfWeek]} • {meal}
          </span>
          <h3 className="text-xl font-black text-stone-900 mt-1 font-heading">
            Choose a Recipe for this Meal
          </h3>
        </div>

        {/* Current Selection Bar */}
        {currentEntry && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917]">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-amber-900">Currently Assigned:</span>
              <span className="text-xs font-black text-stone-900">{currentEntry.recipe?.title || 'Selected Recipe'}</span>
            </div>
            <button
              onClick={handleRemoveRecipe}
              className="text-xs font-black text-[#FF3B30] hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes..."
            className="w-full bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl pl-10 pr-3 py-2 text-xs font-bold text-stone-900 placeholder-stone-500 focus:outline-none shadow-[2px_2px_0px_0px_#1C1917]"
          />
        </div>

        {/* Recipe Selection List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map(r => (
            <div
              key={r.id}
              onClick={() => handleSelectRecipe(r.id, r.title)}
              className="flex items-center justify-between p-3 rounded-2xl border-2 border-stone-900 bg-white hover:bg-[#F8F3EB] hover:shadow-[3px_3px_0px_0px_#1C1917] cursor-pointer transition-all group"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={r.image_url}
                  alt={r.title}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-900"
                />
                <div>
                  <h4 className="text-xs font-extrabold text-stone-900 group-hover:text-[#FF3B30] transition-colors line-clamp-1 font-heading">
                    {r.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-[10px] text-stone-500 font-bold mt-0.5">
                    <span className="flex items-center space-x-0.5">
                      <Clock className="w-3 h-3 text-stone-700" />
                      <span>{r.prep_time_minutes}m</span>
                    </span>
                    <span className="text-emerald-800 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded border border-stone-800">
                      {formatPriceRange(r.cost_level, currency)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="p-1.5 rounded-xl bg-[#FF3B30] text-white border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917] group-hover:scale-110 transition-transform">
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
