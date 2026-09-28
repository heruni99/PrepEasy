import type { Recipe, Favorite, MealPlanEntry, User } from '../types';
import { SEED_RECIPES } from '../data/seedRecipes';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const RECIPES_KEY = 'prepeasy_recipes';
const FAVORITES_KEY = 'prepeasy_favorites';
const MEAL_PLAN_KEY = 'prepeasy_meal_plan';
const USER_KEY = 'prepeasy_user';

// Helper to initialize LocalStorage with default seed recipes if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(RECIPES_KEY)) {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(SEED_RECIPES));
  }
  if (!localStorage.getItem(FAVORITES_KEY)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([
      { id: 'fav-1', user_id: 'guest-user', recipe_id: 'seed-1' },
      { id: 'fav-2', user_id: 'guest-user', recipe_id: 'seed-4' }
    ]));
  }
  if (!localStorage.getItem(MEAL_PLAN_KEY)) {
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify([
      { id: 'mp-1', user_id: 'guest-user', day_of_week: 0, meal_type: 'breakfast', recipe_id: 'seed-7' },
      { id: 'mp-2', user_id: 'guest-user', day_of_week: 0, meal_type: 'lunch', recipe_id: 'seed-1' },
      { id: 'mp-3', user_id: 'guest-user', day_of_week: 1, meal_type: 'dinner', recipe_id: 'seed-5' }
    ]));
  }
};

export const storageService = {
  // RECIPES
  getRecipes: async (): Promise<Recipe[]> => {
    initializeStorage();
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('recipes').select('*');
        if (!error && data && data.length > 0) {
          // Merge local seed recipes with supabase recipes if needed
          const remoteMap = new Map(data.map((r: Recipe) => [r.id, r]));
          const merged = [...data];
          SEED_RECIPES.forEach(seed => {
            if (!remoteMap.has(seed.id)) {
              merged.push(seed);
            }
          });
          return merged;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using local storage fallback', err);
      }
    }
    const local = localStorage.getItem(RECIPES_KEY);
    return local ? JSON.parse(local) : SEED_RECIPES;
  },

  addRecipe: async (recipe: Omit<Recipe, 'id'>, userId?: string): Promise<Recipe> => {
    initializeStorage();
    const newRecipe: Recipe = {
      ...recipe,
      id: `recipe-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      owner_id: userId || 'guest-user',
      is_user_submitted: true,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .insert([newRecipe])
          .select()
          .single();
        if (!error && data) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase insert failed, fallback to local storage', err);
      }
    }

    const recipes = await storageService.getRecipes();
    const updated = [newRecipe, ...recipes];
    localStorage.setItem(RECIPES_KEY, JSON.stringify(updated));
    return newRecipe;
  },

  updateRecipe: async (recipe: Recipe): Promise<Recipe> => {
    initializeStorage();
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('recipes')
          .update(recipe)
          .eq('id', recipe.id);
      } catch (err) {
        console.warn('Supabase update failed, fallback to local storage', err);
      }
    }

    const recipes = await storageService.getRecipes();
    const updated = recipes.map(r => r.id === recipe.id ? recipe : r);
    localStorage.setItem(RECIPES_KEY, JSON.stringify(updated));
    return recipe;
  },

  deleteRecipe: async (recipeId: string): Promise<void> => {
    initializeStorage();
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('recipes').delete().eq('id', recipeId);
      } catch (err) {
        console.warn('Supabase delete failed', err);
      }
    }

    const recipes = await storageService.getRecipes();
    const updated = recipes.filter(r => r.id !== recipeId);
    localStorage.setItem(RECIPES_KEY, JSON.stringify(updated));

    // Clean up associated favorites and meal plans
    const favorites = await storageService.getFavorites('guest-user');
    const updatedFavs = favorites.filter(f => f.recipe_id !== recipeId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavs));

    const mealPlans = await storageService.getMealPlan('guest-user');
    const updatedPlans = mealPlans.filter(m => m.recipe_id !== recipeId);
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(updatedPlans));
  },

  // FAVORITES
  getFavorites: async (userId: string): Promise<Favorite[]> => {
    initializeStorage();
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', userId);
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase favorites fetch failed', err);
      }
    }
    const local = localStorage.getItem(FAVORITES_KEY);
    const favs: Favorite[] = local ? JSON.parse(local) : [];
    return favs.filter(f => f.user_id === userId || userId === 'guest-user');
  },

  toggleFavorite: async (userId: string, recipeId: string): Promise<boolean> => {
    initializeStorage();
    const favorites = await storageService.getFavorites(userId);
    const existing = favorites.find(f => f.recipe_id === recipeId);

    if (existing) {
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('favorites').delete().eq('id', existing.id);
        } catch (err) {
          console.warn('Supabase favorite delete error', err);
        }
      }
      const updated = favorites.filter(f => f.recipe_id !== recipeId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return false; // Removed from favorites
    } else {
      const newFav: Favorite = {
        id: `fav-${Date.now()}`,
        user_id: userId,
        recipe_id: recipeId,
        created_at: new Date().toISOString()
      };
      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('favorites').insert([newFav]);
        } catch (err) {
          console.warn('Supabase favorite insert error', err);
        }
      }
      const updated = [...favorites, newFav];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return true; // Added to favorites
    }
  },

  // MEAL PLAN
  getMealPlan: async (userId: string): Promise<MealPlanEntry[]> => {
    initializeStorage();
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('meal_plan_entries')
          .select('*')
          .eq('user_id', userId);
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase meal plan fetch failed', err);
      }
    }
    const local = localStorage.getItem(MEAL_PLAN_KEY);
    const entries: MealPlanEntry[] = local ? JSON.parse(local) : [];
    return entries.filter(e => e.user_id === userId || userId === 'guest-user');
  },

  setMealPlanSlot: async (
    userId: string, 
    dayOfWeek: number, 
    mealType: 'breakfast' | 'lunch' | 'dinner', 
    recipeId: string | null
  ): Promise<MealPlanEntry[]> => {
    initializeStorage();
    const allEntries: MealPlanEntry[] = JSON.parse(localStorage.getItem(MEAL_PLAN_KEY) || '[]');
    
    // Filter out existing entry for this specific slot
    const filtered = allEntries.filter(
      e => !(e.day_of_week === dayOfWeek && e.meal_type === mealType && (e.user_id === userId || userId === 'guest-user'))
    );

    if (recipeId) {
      const newEntry: MealPlanEntry = {
        id: `mp-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
        user_id: userId,
        day_of_week: dayOfWeek,
        meal_type: mealType,
        recipe_id: recipeId,
        created_at: new Date().toISOString()
      };
      filtered.push(newEntry);
    }

    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(filtered));

    if (isSupabaseConfigured && supabase) {
      try {
        if (!recipeId) {
          await supabase.from('meal_plan_entries').delete().match({ user_id: userId, day_of_week: dayOfWeek, meal_type: mealType });
        } else {
          await supabase.from('meal_plan_entries').upsert({ user_id: userId, day_of_week: dayOfWeek, meal_type: mealType, recipe_id: recipeId });
        }
      } catch (err) {
        console.warn('Supabase meal plan slot update error', err);
      }
    }

    return filtered.filter(e => e.user_id === userId || userId === 'guest-user');
  },

  clearMealPlan: async (userId: string): Promise<void> => {
    initializeStorage();
    const allEntries: MealPlanEntry[] = JSON.parse(localStorage.getItem(MEAL_PLAN_KEY) || '[]');
    const remaining = allEntries.filter(e => e.user_id !== userId && userId !== 'guest-user');
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(remaining));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('meal_plan_entries').delete().eq('user_id', userId);
      } catch (err) {
        console.warn('Supabase meal plan clear error', err);
      }
    }
  },

  // USER AUTH / GUEST STATE
  getCurrentUser: (): User => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) return JSON.parse(stored);
    const guestUser: User = {
      id: 'guest-user',
      email: 'alex.student@prepeasy.edu',
      name: 'Alex Chen (Student Guest)',
      is_demo: true
    };
    localStorage.setItem(USER_KEY, JSON.stringify(guestUser));
    return guestUser;
  },

  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }
};
