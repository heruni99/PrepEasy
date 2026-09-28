import React, { useState } from 'react';
import { Calendar, Trash2, Plus, Clock, DollarSign, ShoppingBag, CheckSquare, Square, Utensils, Copy, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { MealType, Recipe } from '../types';

const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS: { type: MealType; label: string; icon: string }[] = [
  { type: 'breakfast', label: 'Breakfast', icon: '🍳' },
  { type: 'lunch', label: 'Lunch', icon: '🥗' },
  { type: 'dinner', label: 'Dinner', icon: '🍲' }
];

export const PlannerPage: React.FC = () => {
  const { recipes, mealPlan, openPlannerPicker, setMealPlanSlot, clearMealPlan, openRecipeDetails, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'calendar' | 'shoppingList'>('calendar');
  const [checkedShoppingItems, setCheckedShoppingItems] = useState<Record<string, boolean>>({});
  const [copiedList, setCopiedList] = useState(false);

  // Map entries by day & meal
  const getRecipeForSlot = (day: number, meal: MealType): Recipe | undefined => {
    const entry = mealPlan.find(m => m.day_of_week === day && m.meal_type === meal);
    if (!entry) return undefined;
    return recipes.find(r => r.id === entry.recipe_id);
  };

  // Calculate statistics
  const plannedRecipes = mealPlan.map(m => recipes.find(r => r.id === m.recipe_id)).filter(Boolean) as Recipe[];
  const totalPrepMinutes = plannedRecipes.reduce((acc, r) => acc + r.prep_time_minutes, 0);
  const estimatedWeeklyCost = plannedRecipes.reduce((acc, r) => acc + (r.cost_level * 4.5), 0);

  // Aggregate Shopping List
  const aggregatedIngredients = React.useMemo(() => {
    const map = new Map<string, number>();
    plannedRecipes.forEach(r => {
      r.ingredients.forEach(ing => {
        const key = ing.trim();
        map.set(key, (map.get(key) || 0) + 1);
      });
    });
    return Array.from(map.entries()).map(([ing, count]) => ({ ingredient: ing, count }));
  }, [plannedRecipes]);

  const toggleShoppingCheck = (ing: string) => {
    setCheckedShoppingItems(prev => ({ ...prev, [ing]: !prev[ing] }));
  };

  const handleCopyShoppingList = () => {
    const text = aggregatedIngredients.map(item => `- ${item.ingredient}`).join('\n');
    navigator.clipboard.writeText(`PrepEasy Weekly Shopping List:\n\n${text}`);
    setCopiedList(true);
    addToast('Shopping list copied to clipboard!', 'success');
    setTimeout(() => setCopiedList(false), 2000);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your entire weekly meal plan?')) {
      clearMealPlan();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top Header & Overview Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border-2 border-stone-900 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#1C1917]">
        <div>
          <div className="flex items-center space-x-2 text-[#FF3B30] text-xs font-black mb-1">
            <Calendar className="w-4 h-4" />
            <span>Weekly Meal Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-heading">
            Your 7-Day Meal Blueprint
          </h1>
          <p className="text-xs font-bold text-stone-600 mt-0.5">
            Assign breakfast, lunch, and dinner to save time and reduce grocery spending.
          </p>
        </div>

        {/* Action Buttons & Tab Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex bg-[#F8F3EB] p-1.5 rounded-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] text-xs">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3.5 py-1.5 rounded-xl font-extrabold transition-all ${
                activeTab === 'calendar' ? 'bg-[#FF3B30] text-white shadow-[1px_1px_0px_0px_#1C1917] border border-stone-900' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              📅 Meal Calendar
            </button>
            <button
              onClick={() => setActiveTab('shoppingList')}
              className={`px-3.5 py-1.5 rounded-xl font-extrabold transition-all relative ${
                activeTab === 'shoppingList' ? 'bg-[#FF3B30] text-white shadow-[1px_1px_0px_0px_#1C1917] border border-stone-900' : 'text-stone-700 hover:text-stone-950'
              }`}
            >
              🛒 Shopping List ({aggregatedIngredients.length})
            </button>
          </div>

          {plannedRecipes.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 border-2 border-stone-900 text-rose-800 text-xs font-extrabold shadow-[2px_2px_0px_0px_#1C1917] transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Plan</span>
            </button>
          )}

        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 flex items-center space-x-4 shadow-[3px_3px_0px_0px_#1C1917]">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD166] border-2 border-stone-900 flex items-center justify-center text-stone-900 shadow-[2px_2px_0px_0px_#1C1917]">
            <Utensils className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs text-stone-600 font-extrabold">Planned Meals</span>
            <p className="text-xl font-black text-stone-900 font-heading">{plannedRecipes.length} / 21 slots</p>
          </div>
        </div>

        <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 flex items-center space-x-4 shadow-[3px_3px_0px_0px_#1C1917]">
          <div className="w-12 h-12 rounded-2xl bg-[#06D6A0] border-2 border-stone-900 flex items-center justify-center text-stone-950 shadow-[2px_2px_0px_0px_#1C1917]">
            <DollarSign className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs text-stone-600 font-extrabold">Est. Weekly Grocery Cost</span>
            <p className="text-xl font-black text-emerald-700 font-heading">${estimatedWeeklyCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white border-2 border-stone-900 rounded-2xl p-4 flex items-center space-x-4 shadow-[3px_3px_0px_0px_#1C1917]">
          <div className="w-12 h-12 rounded-2xl bg-[#FF3B30] border-2 border-stone-900 flex items-center justify-center text-white shadow-[2px_2px_0px_0px_#1C1917]">
            <Clock className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-xs text-stone-600 font-extrabold">Total Cooking Time</span>
            <p className="text-xl font-black text-stone-900 font-heading">{totalPrepMinutes} minutes</p>
          </div>
        </div>

      </div>

      {/* Main Calendar View Tab */}
      {activeTab === 'calendar' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {DAYS_FULL.map((dayName, dayIdx) => (
              <div
                key={dayName}
                className="bg-white border-2 border-stone-900 rounded-2xl p-3 flex flex-col space-y-3 shadow-[3px_3px_0px_0px_#1C1917]"
              >
                {/* Day Header */}
                <div className="text-center py-1.5 border-b-2 border-stone-200">
                  <h3 className="font-extrabold text-sm text-[#FF3B30] font-heading">{dayName}</h3>
                </div>

                {/* 3 Meal Slots */}
                <div className="space-y-2 flex-1">
                  {MEALS.map(meal => {
                    const recipe = getRecipeForSlot(dayIdx, meal.type);

                    return (
                      <div
                        key={meal.type}
                        className="bg-[#F8F3EB] border-2 border-stone-900 rounded-xl p-2.5 flex flex-col justify-between min-h-[95px] relative group hover:border-[#FF3B30] transition-all"
                      >
                        <div className="flex items-center justify-between text-[11px] font-extrabold text-stone-700 mb-1">
                          <span className="flex items-center gap-1">
                            <span>{meal.icon}</span>
                            <span className="capitalize">{meal.type}</span>
                          </span>
                        </div>

                        {recipe ? (
                          <div className="space-y-1">
                            <div
                              onClick={() => openRecipeDetails(recipe)}
                              className="cursor-pointer"
                            >
                              <h4 className="text-xs font-extrabold text-stone-900 group-hover:text-[#FF3B30] transition-colors line-clamp-2 font-heading leading-tight">
                                {recipe.title}
                              </h4>
                              <div className="flex items-center space-x-2 text-[10px] text-stone-600 font-bold mt-1">
                                <span>{recipe.prep_time_minutes}m</span>
                                <span className="text-emerald-700">{'$'.repeat(recipe.cost_level)}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setMealPlanSlot(dayIdx, meal.type, null)}
                              title="Clear slot"
                              className="text-[10px] text-[#FF3B30] hover:underline font-extrabold pt-1 block"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => openPlannerPicker(dayIdx, meal.type)}
                            className="w-full h-full my-auto flex flex-col items-center justify-center p-2 rounded-lg border-2 border-dashed border-stone-300 hover:border-stone-900 hover:bg-white text-stone-600 hover:text-[#FF3B30] transition-all group/btn"
                          >
                            <Plus className="w-4 h-4 mb-0.5 group-hover/btn:scale-110 transition-transform stroke-[2.5]" />
                            <span className="text-[10px] font-extrabold">Add Recipe</span>
                          </button>
                        )}

                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Shopping List Tab View */}
      {activeTab === 'shoppingList' && (
        <div className="bg-white border-2 border-stone-900 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[5px_5px_0px_0px_#1C1917] max-w-3xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-stone-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-stone-900 flex items-center gap-2 font-heading">
                <ShoppingBag className="w-5 h-5 text-[#FF3B30]" />
                Aggregated Grocery Shopping List
              </h2>
              <p className="text-xs font-bold text-stone-600 mt-0.5">
                Automatically compiled from your 7-day meal selections
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyShoppingList}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-2xl bg-[#FF3B30] text-white font-extrabold text-xs border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] active:translate-x-[1px] active:translate-y-[1px] transition-all"
              >
                {copiedList ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Copy className="w-4 h-4 stroke-[2.5]" />}
                <span>{copiedList ? 'Copied!' : 'Copy List'}</span>
              </button>
            </div>
          </div>

          {aggregatedIngredients.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aggregatedIngredients.map((item, idx) => {
                const isChecked = Boolean(checkedShoppingItems[item.ingredient]);
                return (
                  <li
                    key={idx}
                    onClick={() => toggleShoppingCheck(item.ingredient)}
                    className={`flex items-center justify-between p-3 rounded-2xl border-2 border-stone-900 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-stone-100 text-stone-400 line-through'
                        : 'bg-[#F8F3EB] text-stone-900 hover:bg-white shadow-[2px_2px_0px_0px_#1C1917]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                      ) : (
                        <Square className="w-4 h-4 text-stone-400 shrink-0 stroke-[2.5]" />
                      )}
                      <span className="text-xs font-bold">{item.ingredient}</span>
                    </div>

                    {item.count > 1 && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#FFD166] text-stone-900 border border-stone-900">
                        ×{item.count} meals
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-10 h-10 text-stone-400 mx-auto" />
              <h3 className="text-base font-extrabold text-stone-800 font-heading">Your shopping list is empty</h3>
              <p className="text-xs font-bold text-stone-600">
                Add recipes to your 7-day meal calendar to automatically build a grocery list!
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
