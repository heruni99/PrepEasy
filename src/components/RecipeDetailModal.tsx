import React, { useState } from 'react';
import { X, Clock, DollarSign, Heart, CalendarPlus, CheckSquare, Square, ChefHat, Trash2, Edit3 } from 'lucide-react';
import type { MealType } from '../types';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const DAYS_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS: MealType[] = ['breakfast', 'lunch', 'dinner'];

export const RecipeDetailModal: React.FC = () => {
  const { user } = useAuth();
  const { selectedRecipe, openRecipeDetails, favorites, toggleFavorite, setMealPlanSlot, deleteRecipe, openRecipeForm } = useApp();
  
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [showPlannerSection, setShowPlannerSection] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<MealType>('dinner');

  if (!selectedRecipe) return null;

  const isFavorite = favorites.includes(selectedRecipe.id);
  const isOwner = selectedRecipe.is_user_submitted || (user && selectedRecipe.owner_id === user.id);

  const toggleIngredientCheck = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStepCheck = (idx: number) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleAssignToMealPlan = () => {
    setMealPlanSlot(selectedDay, selectedMeal, selectedRecipe.id);
    setShowPlannerSection(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${selectedRecipe.title}"?`)) {
      deleteRecipe(selectedRecipe.id);
    }
  };

  const handleEdit = () => {
    openRecipeForm(selectedRecipe);
  };

  const costSymbol = '$'.repeat(selectedRecipe.cost_level);

  return (
    <div
      onClick={() => openRecipeDetails(null)}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col text-slate-100"
      >
        
        {/* Header Image & Action Buttons */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-950">
          <img
            src={selectedRecipe.image_url}
            alt={selectedRecipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-black/60" />

          {/* Close Modal Button */}
          <button
            onClick={() => openRecipeDetails(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700/60 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Owner Controls (Edit/Delete) */}
          {isOwner && (
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <button
                onClick={handleEdit}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-800 text-amber-400 border border-amber-500/40 text-xs font-semibold backdrop-blur-md transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-rose-950/80 text-rose-400 border border-rose-500/40 text-xs font-semibold backdrop-blur-md transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}

          {/* Floating Action Buttons */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            
            <button
              onClick={() => toggleFavorite(selectedRecipe.id)}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-rose-500/30'
                  : 'bg-slate-950/80 text-slate-200 border border-slate-700 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              onClick={() => setShowPlannerSection(!showPlannerSection)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Add to Planner</span>
            </button>
          </div>

        </div>

        {/* Recipe Header Body */}
        <div className="p-6 space-y-6">
          
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-amber-400 border border-amber-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedRecipe.prep_time_minutes} minutes prep</span>
              </span>
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-emerald-400 border border-emerald-500/30">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Budget Level: {costSymbol}</span>
              </span>
              {selectedRecipe.is_user_submitted && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ChefHat className="w-3 h-3" /> Student Submitted
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              {selectedRecipe.title}
            </h2>

            {/* Diet Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {selectedRecipe.diet_tags.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Add To Meal Plan Drawer Section inside Modal */}
          {showPlannerSection && (
            <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 space-y-3 animate-in fade-in duration-200">
              <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <CalendarPlus className="w-4 h-4" /> Add to Weekly Meal Plan
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Select Day</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    {DAYS_FULL.map((day, idx) => (
                      <option key={day} value={idx}>{day}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Select Meal Time</label>
                  <select
                    value={selectedMeal}
                    onChange={(e) => setSelectedMeal(e.target.value as MealType)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-100 capitalize focus:outline-none focus:border-amber-500"
                  >
                    {MEALS.map(meal => (
                      <option key={meal} value={meal}>{meal}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-1">
                <button
                  onClick={() => setShowPlannerSection(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignToMealPlan}
                  className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md"
                >
                  Confirm & Save Slot
                </button>
              </div>
            </div>
          )}

          {/* Ingredients Section with Checkboxes */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-100 flex items-center justify-between border-b border-slate-800 pb-2">
              <span>Ingredients</span>
              <span className="text-xs font-normal text-slate-400">
                {Object.values(checkedIngredients).filter(Boolean).length} / {selectedRecipe.ingredients.length} checked
              </span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedRecipe.ingredients.map((ing, idx) => {
                const isChecked = Boolean(checkedIngredients[idx]);
                return (
                  <li
                    key={idx}
                    onClick={() => toggleIngredientCheck(idx)}
                    className={`flex items-start space-x-2.5 p-2.5 rounded-xl cursor-pointer border transition-all ${
                      isChecked
                        ? 'bg-slate-950/60 border-slate-800 text-slate-500 line-through'
                        : 'bg-slate-950 border-slate-800/80 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    )}
                    <span className="text-xs font-medium leading-tight">{ing}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Preparation Steps Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-2">
              Step-by-Step Instructions
            </h3>
            <ol className="space-y-3">
              {selectedRecipe.steps.map((step, idx) => {
                const isDone = Boolean(completedSteps[idx]);
                return (
                  <li
                    key={idx}
                    onClick={() => toggleStepCheck(idx)}
                    className={`flex items-start space-x-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isDone
                        ? 'bg-slate-950/60 border-slate-800 text-slate-500'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-amber-500/40'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isDone
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <p className={`text-xs sm:text-sm font-normal leading-relaxed ${isDone ? 'line-through' : ''}`}>
                      {step}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>

        </div>

      </div>
    </div>
  );
};
