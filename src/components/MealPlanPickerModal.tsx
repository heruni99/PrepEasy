import React, { useState } from 'react';
import { X, Search, Clock, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';


const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const MealPlanPickerModal: React.FC = () => {
  const { recipes, isPlannerPickerOpen, activePlannerSlot, closePlannerPicker, setMealPlanSlot, mealPlan } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isPlannerPickerOpen || !activePlannerSlot) return null;

  const dayName = DAYS_FULL[activePlannerSlot.dayOfWeek];
  const mealType = activePlannerSlot.mealType;

  // Check if current slot already has a recipe
  const currentSlotEntry = mealPlan.find(
    m => m.day_of_week === activePlannerSlot.dayOfWeek && m.meal_type === mealType
  );
  const currentRecipe = currentSlotEntry ? recipes.find(r => r.id === currentSlotEntry.recipe_id) : null;

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.diet_tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectRecipe = (recipeId: string) => {
    setMealPlanSlot(activePlannerSlot.dayOfWeek, mealType, recipeId);
    closePlannerPicker();
  };

  const handleClearSlot = () => {
    setMealPlanSlot(activePlannerSlot.dayOfWeek, mealType, null);
    closePlannerPicker();
  };

  return (
    <div
      onClick={closePlannerPicker}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-100"
      >
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-lg font-extrabold text-slate-100">
              Select Meal for <span className="text-amber-400">{dayName}</span>
            </h3>
            <p className="text-xs text-slate-400 capitalize">
              Slot: <span className="font-semibold text-orange-400">{mealType}</span>
            </p>
          </div>
          <button
            onClick={closePlannerPicker}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Selected Recipe Bar (if any) */}
        {currentRecipe && (
          <div className="p-3 bg-amber-500/10 border-b border-amber-500/20 px-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={currentRecipe.image_url}
                alt=""
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <span className="text-xs text-amber-400 font-medium">Currently Assigned:</span>
                <p className="text-xs font-bold text-slate-100">{currentRecipe.title}</p>
              </div>
            </div>
            <button
              onClick={handleClearSlot}
              className="flex items-center space-x-1 text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Slot</span>
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search recipe catalog..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Recipe Selection List */}
        <div className="p-4 space-y-2 overflow-y-auto flex-1 divide-y divide-slate-800/60">
          {filtered.map(recipe => (
            <div
              key={recipe.id}
              onClick={() => handleSelectRecipe(recipe.id)}
              className="pt-2 pb-2 first:pt-0 flex items-center justify-between hover:bg-slate-800/50 p-2.5 rounded-xl cursor-pointer transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-1">
                    {recipe.title}
                  </h4>
                  <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-0.5">
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3 text-amber-400" /> {recipe.prep_time_minutes}m</span>
                    <span className="text-emerald-400 font-extrabold">{'$'.repeat(recipe.cost_level)}</span>
                  </div>
                </div>
              </div>

              <button className="px-3 py-1.5 rounded-lg bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-200 text-xs font-bold transition-all flex items-center gap-1 shrink-0">
                <Plus className="w-3.5 h-3.5" />
                <span>Select</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
