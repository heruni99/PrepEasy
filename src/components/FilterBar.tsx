import React from 'react';
import { Search, Clock, DollarSign, X, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { CostLevel, DietTag } from '../types';

const DIET_TAGS: DietTag[] = [
  'Vegan',
  'Vegetarian',
  'High Protein',
  'Quick (<15m)',
  'Budget',
  'One-Pot',
  'Gluten-Free',
  'Dairy-Free',
  'Meal Prep',
  'Halal'
];

export const FilterBar: React.FC = () => {
  const { filterState, setFilterState, resetFilters, filteredRecipes, recipes } = useApp();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  const toggleTag = (tag: DietTag) => {
    setFilterState(prev => {
      const exists = prev.selectedTags.includes(tag);
      return {
        ...prev,
        selectedTags: exists
          ? prev.selectedTags.filter(t => t !== tag)
          : [...prev.selectedTags, tag]
      };
    });
  };

  const handlePrepTimeToggle = (time: number | null) => {
    setFilterState(prev => ({
      ...prev,
      maxPrepTime: prev.maxPrepTime === time ? null : time
    }));
  };

  const handleCostToggle = (cost: CostLevel | null) => {
    setFilterState(prev => ({
      ...prev,
      costLevel: prev.costLevel === cost ? null : cost
    }));
  };

  const hasActiveFilters = 
    filterState.searchQuery !== '' ||
    filterState.maxPrepTime !== null ||
    filterState.costLevel !== null ||
    filterState.selectedTags.length > 0 ||
    filterState.onlyFavorites ||
    filterState.onlyUserRecipes;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm space-y-4 mb-6">
      
      {/* Top Search & Quick Toggles Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Bar Input */}
        <div className="relative w-full sm:w-80 md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search recipes, ingredients, or tags..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-9 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Filter Buttons (Prep Time & Budget) */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
          
          {/* Prep Time Filters */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="px-2 text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Time:
            </span>
            <button
              onClick={() => handlePrepTimeToggle(10)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                filterState.maxPrepTime === 10
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              &lt;10m
            </button>
            <button
              onClick={() => handlePrepTimeToggle(15)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                filterState.maxPrepTime === 15
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              &lt;15m
            </button>
            <button
              onClick={() => handlePrepTimeToggle(25)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                filterState.maxPrepTime === 25
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              &lt;25m
            </button>
          </div>

          {/* Budget Filters ($ / $$ / $$$) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="px-2 text-slate-400 font-medium flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Budget:
            </span>
            <button
              onClick={() => handleCostToggle(1)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                filterState.costLevel === 1
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Cheap / Budget Friendly ($)"
            >
              $
            </button>
            <button
              onClick={() => handleCostToggle(2)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                filterState.costLevel === 2
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Moderate ($$)"
            >
              $$
            </button>
            <button
              onClick={() => handleCostToggle(3)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                filterState.costLevel === 3
                  ? 'bg-emerald-500 text-slate-950'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Treat / Fancy ($$$)"
            >
              $$$
            </button>
          </div>

        </div>

      </div>

      {/* Diet Tag Pills Row */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5 text-amber-400" /> Tags:
        </span>
        {DIET_TAGS.map(tag => {
          const isSelected = filterState.selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md font-bold scale-105'
                  : 'bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300'
              }`}
            >
              {tag}
            </button>
          );
        })}

        {/* Clear All Filters button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="ml-auto text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 underline transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Clear filters
          </button>
        )}
      </div>

      {/* Filter Results Summary */}
      <div className="text-xs text-slate-400 flex items-center justify-between pt-1">
        <span>
          Showing <strong className="text-amber-400">{filteredRecipes.length}</strong> of {recipes.length} student recipes
        </span>
        {hasActiveFilters && (
          <span className="text-slate-500 italic">
            Filters active
          </span>
        )}
      </div>

    </div>
  );
};
