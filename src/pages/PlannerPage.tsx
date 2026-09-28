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
  const estimatedWeeklyCost = plannedRecipes.reduce((acc, r) => acc + (r.cost_level * 4.5), 0); // ~$4.5 per budget level

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold mb-1">
            <Calendar className="w-4 h-4" />
            <span>Weekly Meal Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Your 7-Day Meal Blueprint
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Assign breakfast, lunch, and dinner to save time and reduce grocery spending.
          </p>
        </div>

        {/* Action Buttons & Tab Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeTab === 'calendar' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              📅 Meal Calendar
            </button>
            <button
              onClick={() => setActiveTab('shoppingList')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all relative ${
                activeTab === 'shoppingList' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              🛒 Shopping List ({aggregatedIngredients.length})
            </button>
          </div>

          {plannedRecipes.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-rose-950/80 border border-rose-500/30 text-rose-400 text-xs font-bold transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Plan</span>
            </button>
          )}

        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Planned Meals</span>
            <p className="text-xl font-black text-slate-100">{plannedRecipes.length} / 21 slots</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Est. Weekly Grocery Cost</span>
            <p className="text-xl font-black text-emerald-400">${estimatedWeeklyCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium">Total Cooking Time</span>
            <p className="text-xl font-black text-slate-100">{totalPrepMinutes} minutes</p>
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
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex flex-col space-y-3 shadow-lg"
              >
                {/* Day Header */}
                <div className="text-center py-1.5 border-b border-slate-800">
                  <h3 className="font-extrabold text-sm text-amber-400">{dayName}</h3>
                </div>

                {/* 3 Meal Slots */}
                <div className="space-y-2 flex-1">
                  {MEALS.map(meal => {
                    const recipe = getRecipeForSlot(dayIdx, meal.type);

                    return (
                      <div
                        key={meal.type}
                        className="bg-slate-950 border border-slate-800/90 rounded-xl p-2.5 flex flex-col justify-between min-h-[90px] relative group hover:border-amber-500/50 transition-all"
                      >
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1">
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
                              <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                                {recipe.title}
                              </h4>
                              <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-1">
                                <span>{recipe.prep_time_minutes}m</span>
                                <span className="text-emerald-400 font-bold">{'$'.repeat(recipe.cost_level)}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setMealPlanSlot(dayIdx, meal.type, null)}
                              title="Clear slot"
                              className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold underline pt-1 block"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => openPlannerPicker(dayIdx, meal.type)}
                            className="w-full h-full my-auto flex flex-col items-center justify-center p-2 rounded-lg border border-dashed border-slate-800 hover:border-amber-500/50 hover:bg-slate-900/60 text-slate-500 hover:text-amber-400 transition-all group/btn"
                          >
                            <Plus className="w-4 h-4 mb-0.5 group-hover/btn:scale-110 transition-transform" />
                            <span className="text-[10px] font-semibold">Add Recipe</span>
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
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                Aggregated Grocery Shopping List
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically compiled from your 7-day meal selections
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyShoppingList}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 shadow-md transition-all"
              >
                {copiedList ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
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
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-slate-950/60 border-slate-800/80 text-slate-500 line-through'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span className="text-xs font-medium">{item.ingredient}</span>
                    </div>

                    {item.count > 1 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-400">
                        ×{item.count} meals
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">Your shopping list is empty</h3>
              <p className="text-xs text-slate-500">
                Add recipes to your 7-day meal calendar to automatically build a grocery list!
              </p>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
