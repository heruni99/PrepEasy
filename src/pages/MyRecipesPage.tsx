import React from 'react';
import { ChefHat, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecipeCard } from '../components/RecipeCard';

export const MyRecipesPage: React.FC = () => {
  const { recipes, openRecipeForm } = useApp();
  const userRecipes = recipes.filter(r => r.is_user_submitted);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-white border-2 border-stone-900 rounded-3xl p-6 sm:p-8 shadow-[4px_4px_0px_0px_#1C1917] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[#FF3B30] text-xs font-black mb-1">
            <ChefHat className="w-4 h-4" />
            <span>Student Creation Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-heading">
            My Submitted Recipes
          </h1>
          <p className="text-xs font-bold text-stone-600 mt-0.5">
            Manage your custom dorm hacks and budget recipes ({userRecipes.length} published)
          </p>
        </div>

        <button
          onClick={() => openRecipeForm()}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-[#FF3B30] text-white text-xs font-extrabold border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] transition-all"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>Create New Recipe</span>
        </button>
      </div>

      {/* Grid */}
      {userRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border-2 border-stone-900 rounded-3xl p-8 space-y-4 shadow-[4px_4px_0px_0px_#1C1917] max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#FFD166] border-2 border-stone-900 mx-auto flex items-center justify-center text-stone-900 shadow-[3px_3px_0px_0px_#1C1917]">
            <ChefHat className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h3 className="text-xl font-black text-stone-900 font-heading">No recipes created yet</h3>
          <p className="text-xs font-bold text-stone-600">
            Have a 5-minute ramen hack, mug cake, or microwave recipe? Share it with other students!
          </p>
          <button
            onClick={() => openRecipeForm()}
            className="px-5 py-2.5 rounded-2xl bg-[#FF3B30] text-white text-xs font-extrabold border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] transition-all"
          >
            Submit First Recipe
          </button>
        </div>
      )}

    </div>
  );
};
