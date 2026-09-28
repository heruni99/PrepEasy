import React from 'react';
import { Heart, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from '../components/RecipeCard';
import { Link } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
  const { recipes, favorites } = useApp();
  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border-2 border-stone-900 rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1C1917] flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-[#FF3B30] text-xs font-black mb-1">
            <Heart className="w-4 h-4 fill-current text-[#FF3B30]" />
            <span>Saved Collection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-heading">
            Your Favorite Recipes
          </h1>
          <p className="text-xs font-bold text-stone-600 mt-0.5">
            Quick access to the meals you love most ({favoriteRecipes.length} saved)
          </p>
        </div>
      </div>

      {/* Grid */}
      {favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border-2 border-stone-900 rounded-3xl p-8 space-y-4 shadow-[4px_4px_0px_0px_#1C1917] max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 border-2 border-stone-900 mx-auto flex items-center justify-center text-[#FF3B30] shadow-[3px_3px_0px_0px_#1C1917]">
            <Heart className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-black text-stone-900 font-heading">No favorites saved yet</h3>
          <p className="text-xs font-bold text-stone-600">
            Click the heart icon on any recipe card to save it here for fast access!
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-[#FF3B30] text-white text-xs font-extrabold border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] transition-all"
          >
            <Utensils className="w-4 h-4" />
            <span>Browse All Recipes</span>
          </Link>
        </div>
      )}

    </div>
  );
};
