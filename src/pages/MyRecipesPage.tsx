import React from 'react';
import { ChefHat, PlusCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { RecipeCard } from '../components/RecipeCard';

export const MyRecipesPage: React.FC = () => {
  const { user } = useAuth();
  const { recipes, openRecipeForm } = useApp();

  const userId = user?.id || 'guest-user';
  const myRecipes = recipes.filter(r => r.is_user_submitted || r.owner_id === userId);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold mb-1">
            <ChefHat className="w-4 h-4" />
            <span>My Creations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            User-Submitted Recipes
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your custom recipes, edit instructions, or add new budget creations.
          </p>
        </div>

        <button
          onClick={() => openRecipeForm()}
          className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Custom Recipe</span>
        </button>
      </div>

      {/* Grid of My Recipes */}
      {myRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
            <ChefHat className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-200">No custom recipes yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Got a great budget hack or dorm recipe? Click below to share your creation!
          </p>
          <button
            onClick={() => openRecipeForm()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 shadow-md transition-colors"
          >
            Create Your First Recipe
          </button>
        </div>
      )}

    </div>
  );
};
