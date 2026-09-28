import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from '../components/RecipeCard';

export const FavoritesPage: React.FC = () => {
  const { recipes, favorites } = useApp();

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold mb-1">
            <Heart className="w-4 h-4 fill-current" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Your Favorite Student Recipes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Quick access to your saved recipes for fast meal planning.
          </p>
        </div>

        <div className="hidden sm:flex items-center space-x-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
          <span className="text-2xl font-black text-rose-400">{favoriteRecipes.length}</span>
          <span className="text-xs text-slate-400 font-semibold">Saved</span>
        </div>
      </div>

      {/* Grid of Favorites */}
      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 mx-auto flex items-center justify-center text-rose-400">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-200">No favorites saved yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click the heart star icon on any recipe card to save your go-to meals here!
          </p>
        </div>
      )}

    </div>
  );
};
