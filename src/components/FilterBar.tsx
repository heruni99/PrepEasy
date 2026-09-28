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
  const { filterState, setFilterState, resetFilters, recipes, filteredRecipes } = useApp();

  const handleTagToggle = (tag: DietTag) => {
    const isSelected = filterState.selectedTags.includes(tag);
    const updated = isSelected
      ? filterState.selectedTags.filter(t => t !== tag)
      : [...filterState.selectedTags, tag];
    setFilterState(prev => ({ ...prev, selectedTags: updated }));
  };

  const hasActiveFilters =
    filterState.searchQuery !== '' ||
    filterState.maxPrepTime !== null ||
    filterState.costLevel !== null ||
    filterState.selectedTags.length > 0 ||
    filterState.onlyFavorites ||
    filterState.onlyUserRecipes;

  return (
    <div className="bg-[#FFFDF9] border-2 border-stone-900 rounded-3xl p-5 shadow-[4px_4px_0px_0px_#1C1917] space-y-4">
      
      {/* Top Search & Preset Filter Row */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="Search ramen, pasta, mug cake, ingredients..."
            className="w-full bg-[#F8F3EB] border-2 border-stone-900 focus:border-[#FF3B30] rounded-2xl pl-10 pr-9 py-2.5 text-xs text-stone-900 font-bold placeholder-stone-500 focus:outline-none transition-all shadow-[2px_2px_0px_0px_#1C1917]"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-stone-300 text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
          
          {/* Prep Time Presets */}
          <div className="flex items-center space-x-1 bg-[#F8F3EB] p-1 rounded-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917]">
            <Clock className="w-3.5 h-3.5 text-stone-700 ml-2 mr-1" />
            <span className="text-[10px] font-extrabold text-stone-700 hidden sm:inline mr-1">Time:</span>
            {[10, 15, 25].map((time) => (
              <button
                key={time}
                onClick={() => setFilterState(prev => ({ ...prev, maxPrepTime: prev.maxPrepTime === time ? null : time }))}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all ${
                  filterState.maxPrepTime === time
                    ? 'bg-[#FF3B30] text-white border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917]'
                    : 'text-stone-800 hover:bg-stone-200'
                }`}
              >
                &lt;{time}m
              </button>
            ))}
          </div>

          {/* Budget Level Presets */}
          <div className="flex items-center space-x-1 bg-[#F8F3EB] p-1 rounded-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917]">
            <DollarSign className="w-3.5 h-3.5 text-emerald-700 ml-2 mr-1" />
            <span className="text-[10px] font-extrabold text-stone-700 hidden sm:inline mr-1">Budget:</span>
            {([1, 2, 3] as CostLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setFilterState(prev => ({ ...prev, costLevel: prev.costLevel === level ? null : level }))}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-black transition-all ${
                  filterState.costLevel === level
                    ? 'bg-emerald-500 text-stone-950 border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917]'
                    : 'text-stone-800 hover:bg-stone-200'
                }`}
              >
                {'$'.repeat(level)}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Dietary Tags Pill Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-200">
        <div className="flex items-center space-x-1 text-[11px] font-black text-stone-700 mr-1">
          <Filter className="w-3.5 h-3.5 text-[#FF3B30]" />
          <span>Tags:</span>
        </div>

        {DIET_TAGS.map((tag) => {
          const isSelected = filterState.selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all border-2 border-stone-900 ${
                isSelected
                  ? 'bg-[#FF3B30] text-white shadow-[2px_2px_0px_0px_#1C1917] scale-105'
                  : 'bg-white text-stone-800 hover:bg-[#FFD166]/40 shadow-[1px_1px_0px_0px_#1C1917]'
              }`}
            >
              {tag}
            </button>
          );
        })}

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="ml-auto text-[11px] font-extrabold text-[#FF3B30] hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Clear filters</span>
          </button>
        )}
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-[11px] text-stone-600 font-bold pt-1">
        <span>
          Showing <span className="text-[#FF3B30] font-black">{filteredRecipes.length}</span> of {recipes.length} recipes
        </span>
        {hasActiveFilters && <span className="text-amber-800 italic">Filters active</span>}
      </div>

    </div>
  );
};
