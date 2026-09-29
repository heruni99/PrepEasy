import type { Recipe, Favorite, MealPlanEntry, User } from '../types';
import { SEED_RECIPES } from '../data/seedRecipes';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const RECIPES_KEY = 'prepeasy_recipes';
const FAVORITES_KEY = 'prepeasy_favorites';
const MEAL_PLAN_KEY = 'prepeasy_meal_plan';
const USER_KEY = 'prepeasy_user';

// Map legacy seed IDs ('seed-1' .. 'seed-22') to deterministic UUIDs
export const LEGACY_SEED_MAP: Record<string, string> = {};
for (let i = 1; i <= 22; i++) {
  const pad4 = String(i).padStart(4, '0');
  const pad2 = String(i).padStart(2, '0');
  LEGACY_SEED_MAP[`seed-${i}`] = `a1b2c3d4-${pad4}-4000-8000-0000000000${pad2}`;
}

export const normalizeTitle = (title: string): string => {
  return title.toLowerCase().trim().replace(/\s+/g, ' ');
};

export const migrateLegacyId = (id: string): string => {
  return LEGACY_SEED_MAP[id] || id;
};

// Merge stored recipes with canonical SEED_RECIPES without duplicates
export const mergeWithCanonicalSeeds = (existingRecipes: Recipe[]): Recipe[] => {
  const canonicalSeedIds = new Set(SEED_RECIPES.map(s => s.id));
  const canonicalSeedTitles = new Set(SEED_RECIPES.map(s => normalizeTitle(s.title)));

  const userRecipes: Recipe[] = [];
  const seenIds = new Set<string>(canonicalSeedIds);
  const seenTitles = new Set<string>(canonicalSeedTitles);

  for (const r of existingRecipes) {
    if (!r || !r.id || !r.title) continue;
    const normTitle = normalizeTitle(r.title);

    // If it's a legacy seed id (seed-1, etc.) or matches any canonical seed id or title, skip duplicate
    if (r.id.startsWith('seed-') || LEGACY_SEED_MAP[r.id] || seenIds.has(r.id) || seenTitles.has(normTitle)) {
      continue;
    }

    seenIds.add(r.id);
    seenTitles.add(normTitle);
    userRecipes.push(r);
  }

  // Canonical seeds always come first, followed by any unique custom user recipes
  return [...SEED_RECIPES, ...userRecipes];
};

// Helper to initialize LocalStorage with default seed recipes if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(RECIPES_KEY)) {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(SEED_RECIPES));
  }
  if (!localStorage.getItem(FAVORITES_KEY)) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([
      { id: 'fav-1', user_id: 'guest-user', recipe_id: 'a1b2c3d4-0001-4000-8000-000000000001' },
      { id: 'fav-2', user_id: 'guest-user', recipe_id: 'a1b2c3d4-0004-4000-8000-000000000004' }
    ]));
  }
  if (!localStorage.getItem(MEAL_PLAN_KEY)) {
    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify([
      { id: 'mp-1', user_id: 'guest-user', day_of_week: 0, meal_type: 'breakfast', recipe_id: 'a1b2c3d4-0007-4000-8000-000000000007' },
      { id: 'mp-2', user_id: 'guest-user', day_of_week: 0, meal_type: 'lunch', recipe_id: 'a1b2c3d4-0001-4000-8000-000000000001' },
      { id: 'mp-3', user_id: 'guest-user', day_of_week: 1, meal_type: 'dinner', recipe_id: 'a1b2c3d4-0005-4000-8000-000000000005' }
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
          const merged = mergeWithCanonicalSeeds(data as Recipe[]);
          return merged;
        }
      } catch (err) {
        console.warn('Supabase fetch failed, using local storage fallback', err);
      }
    }
    const local = localStorage.getItem(RECIPES_KEY);
    if (!local) {
      localStorage.setItem(RECIPES_KEY, JSON.stringify(SEED_RECIPES));
      return SEED_RECIPES;
    }
    try {
      const stored: Recipe[] = JSON.parse(local);
      const merged = mergeWithCanonicalSeeds(stored);
      localStorage.setItem(RECIPES_KEY, JSON.stringify(merged));
      return merged;
    } catch {
      localStorage.setItem(RECIPES_KEY, JSON.stringify(SEED_RECIPES));
      return SEED_RECIPES;
    }
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
        if (!error && data) {
          return (data as Favorite[]).map(f => ({
            ...f,
            recipe_id: migrateLegacyId(f.recipe_id)
          }));
        }
      } catch (err) {
        console.warn('Supabase favorites fetch failed', err);
      }
    }
    const local = localStorage.getItem(FAVORITES_KEY);
    let favs: Favorite[] = local ? JSON.parse(local) : [];
    let modified = false;

    // Migrate any legacy seed-X IDs in favorites to UUIDs
    favs = favs.map(f => {
      const migrated = migrateLegacyId(f.recipe_id);
      if (migrated !== f.recipe_id) {
        modified = true;
        return { ...f, recipe_id: migrated };
      }
      return f;
    });

    // Deduplicate favorites by user_id + recipe_id
    const seenFav = new Set<string>();
    const uniqueFavs: Favorite[] = [];
    for (const f of favs) {
      const key = `${f.user_id}:${f.recipe_id}`;
      if (!seenFav.has(key)) {
        seenFav.add(key);
        uniqueFavs.push(f);
      } else {
        modified = true;
      }
    }

    if (modified) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(uniqueFavs));
    }
    return uniqueFavs.filter(f => f.user_id === userId || userId === 'guest-user');
  },

  toggleFavorite: async (userId: string, recipeId: string): Promise<boolean> => {
    initializeStorage();
    const normalizedRecipeId = migrateLegacyId(recipeId);
    const favorites = await storageService.getFavorites(userId);
    const existing = favorites.find(f => migrateLegacyId(f.recipe_id) === normalizedRecipeId);

    if (existing) {
      if (isSupabaseConfigured && supabase) {
        try {
          if (existing.id) {
            // Delete by real Postgres UUID if we have one
            await supabase.from('favorites').delete().eq('id', existing.id);
          } else {
            // Fallback: delete by the composite key (user + recipe)
            await supabase.from('favorites')
              .delete()
              .eq('user_id', userId)
              .eq('recipe_id', normalizedRecipeId);
          }
        } catch (err) {
          console.warn('Supabase favorite delete error', err);
        }
      }
      const updated = favorites.filter(f => migrateLegacyId(f.recipe_id) !== normalizedRecipeId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return false; // Removed from favorites
    } else {
      if (isSupabaseConfigured && supabase) {
        try {
          // Never send `id` — let Postgres auto-generate the UUID
          const { data, error } = await supabase
            .from('favorites')
            .insert([{ user_id: userId, recipe_id: normalizedRecipeId }])
            .select()
            .single();
          if (!error && data) {
            // Use the Postgres-returned row (with real UUID) for localStorage too
            const updated = [...favorites, data as Favorite];
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
            return true;
          }
          console.warn('Supabase favorite insert error', error);
        } catch (err) {
          console.warn('Supabase favorite insert error', err);
        }
      }
      // localStorage-only fallback (no Supabase) — local id is fine here
      const newFav: Favorite = {
        id: `fav-${Date.now()}`,
        user_id: userId,
        recipe_id: normalizedRecipeId,
        created_at: new Date().toISOString()
      };
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
        if (!error && data) {
          return (data as MealPlanEntry[]).map(e => ({
            ...e,
            recipe_id: migrateLegacyId(e.recipe_id)
          }));
        }
      } catch (err) {
        console.warn('Supabase meal plan fetch failed', err);
      }
    }
    const local = localStorage.getItem(MEAL_PLAN_KEY);
    let entries: MealPlanEntry[] = local ? JSON.parse(local) : [];
    let modified = false;

    // Migrate legacy seed-X IDs in meal plans
    entries = entries.map(e => {
      if (e.recipe_id) {
        const migrated = migrateLegacyId(e.recipe_id);
        if (migrated !== e.recipe_id) {
          modified = true;
          return { ...e, recipe_id: migrated };
        }
      }
      return e;
    });

    if (modified) {
      localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(entries));
    }
    return entries.filter(e => e.user_id === userId || userId === 'guest-user');
  },

  setMealPlanSlot: async (
    userId: string, 
    dayOfWeek: number, 
    mealType: 'breakfast' | 'lunch' | 'dinner', 
    recipeId: string | null
  ): Promise<MealPlanEntry[]> => {
    initializeStorage();
    const normalizedRecipeId = recipeId ? migrateLegacyId(recipeId) : null;
    const allEntries: MealPlanEntry[] = JSON.parse(localStorage.getItem(MEAL_PLAN_KEY) || '[]');
    
    // Filter out existing entry for this specific slot
    const filtered = allEntries.filter(
      e => !(e.day_of_week === dayOfWeek && e.meal_type === mealType && (e.user_id === userId || userId === 'guest-user'))
    );

    if (normalizedRecipeId) {
      const newEntry: MealPlanEntry = {
        id: `mp-${Date.now()}-${Math.random().toString(36).substr(2, 3)}`,
        user_id: userId,
        day_of_week: dayOfWeek,
        meal_type: mealType,
        recipe_id: normalizedRecipeId,
        created_at: new Date().toISOString()
      };
      filtered.push(newEntry);
    }

    localStorage.setItem(MEAL_PLAN_KEY, JSON.stringify(filtered));

    if (isSupabaseConfigured && supabase) {
      try {
        if (!normalizedRecipeId) {
          await supabase.from('meal_plan_entries').delete().match({ user_id: userId, day_of_week: dayOfWeek, meal_type: mealType });
        } else {
          await supabase.from('meal_plan_entries').upsert({ user_id: userId, day_of_week: dayOfWeek, meal_type: mealType, recipe_id: normalizedRecipeId });
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
      email: 'guest@prepeasy.app',
      name: 'Guest Cook',
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
