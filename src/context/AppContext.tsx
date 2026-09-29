import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Recipe, MealPlanEntry, FilterState, ToastMessage, MealType, Currency } from '../types';
import { storageService, migrateLegacyId } from '../services/storageService';
import { useAuth } from './AuthContext';

interface PlannerSlotSelection {
  dayOfWeek: number;
  mealType: MealType;
}

interface AppContextType {
  recipes: Recipe[];
  favorites: string[]; // array of recipe IDs favorited by current user
  mealPlan: MealPlanEntry[];
  filterState: FilterState;
  toasts: ToastMessage[];
  isLoading: boolean;
  selectedRecipe: Recipe | null;
  editingRecipe: Recipe | null;
  isAuthModalOpen: boolean;
  isRecipeFormOpen: boolean;
  isPlannerPickerOpen: boolean;
  activePlannerSlot: PlannerSlotSelection | null;
  
  // Handlers
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  toggleFavorite: (recipeId: string) => Promise<void>;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<void>;
  updateRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  setMealPlanSlot: (dayOfWeek: number, mealType: MealType, recipeId: string | null) => Promise<void>;
  clearMealPlan: () => Promise<void>;
  openRecipeDetails: (recipe: Recipe | null) => void;
  openRecipeForm: (recipe?: Recipe | null) => void;
  closeRecipeForm: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openPlannerPicker: (dayOfWeek: number, mealType: MealType) => void;
  closePlannerPicker: () => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  addToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  filteredRecipes: Recipe[];
}

const initialFilterState: FilterState = {
  searchQuery: '',
  maxPrepTime: null,
  costLevel: null,
  selectedTags: [],
  onlyFavorites: false,
  onlyUserRecipes: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlanEntry[]>([]);
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false);
  const [isPlannerPickerOpen, setIsPlannerPickerOpen] = useState(false);
  const [activePlannerSlot, setActivePlannerSlot] = useState<PlannerSlotSelection | null>(null);
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('prepeasy_currency');
    return (saved === 'USD' || saved === 'LKR') ? saved : 'LKR';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('prepeasy_currency', c);
  };

  const toggleCurrency = () => {
    setCurrencyState(prev => {
      const next = prev === 'LKR' ? 'USD' : 'LKR';
      localStorage.setItem('prepeasy_currency', next);
      return next;
    });
  };

  const userId = user?.id || 'guest-user';

  // Load Data on mount and user change
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const fetchedRecipes = await storageService.getRecipes();
        const userFavs = await storageService.getFavorites(userId);
        const userPlan = await storageService.getMealPlan(userId);
        
        setRecipes(fetchedRecipes);
        setFavorites(userFavs.map(f => f.recipe_id));
        setMealPlan(userPlan);
      } catch (err) {
        console.error('Error loading AppContext data', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [userId]);

  const addToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const resetFilters = () => {
    setFilterState(initialFilterState);
  };

  const toggleFavorite = async (recipeId: string) => {
    const canonicalId = migrateLegacyId(recipeId);
    const recipe = recipes.find(r => r.id === canonicalId || r.id === recipeId);
    const title = recipe ? recipe.title : 'Recipe';
    const isFav = await storageService.toggleFavorite(userId, canonicalId);

    if (isFav) {
      setFavorites(prev => {
        const cleaned = prev.filter(id => migrateLegacyId(id) !== canonicalId && id !== recipeId);
        return [...cleaned, canonicalId];
      });
      addToast(`Added "${title}" to your favorites!`, 'success');
    } else {
      setFavorites(prev => prev.filter(id => migrateLegacyId(id) !== canonicalId && id !== recipeId));
      addToast(`Removed "${title}" from favorites`, 'info');
    }
  };

  const addRecipe = async (newRecipeData: Omit<Recipe, 'id'>) => {
    const created = await storageService.addRecipe(newRecipeData, userId);
    setRecipes(prev => [created, ...prev]);
    addToast(`Successfully created recipe "${created.title}"!`, 'success');
    closeRecipeForm();
  };

  const updateRecipe = async (recipe: Recipe) => {
    const updated = await storageService.updateRecipe(recipe);
    setRecipes(prev => prev.map(r => r.id === updated.id ? updated : r));
    if (selectedRecipe?.id === updated.id) {
      setSelectedRecipe(updated);
    }
    addToast(`Updated recipe "${updated.title}"`, 'success');
    closeRecipeForm();
  };

  const deleteRecipe = async (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    const title = recipe ? recipe.title : 'Recipe';
    await storageService.deleteRecipe(recipeId);
    setRecipes(prev => prev.filter(r => r.id !== recipeId));
    setFavorites(prev => prev.filter(id => id !== recipeId));
    setMealPlan(prev => prev.filter(m => m.recipe_id !== recipeId));
    if (selectedRecipe?.id === recipeId) {
      setSelectedRecipe(null);
    }
    addToast(`Deleted recipe "${title}"`, 'warning');
  };

  const setMealPlanSlot = async (dayOfWeek: number, mealType: MealType, recipeId: string | null) => {
    const updatedPlan = await storageService.setMealPlanSlot(userId, dayOfWeek, mealType, recipeId);
    setMealPlan(updatedPlan);
    if (recipeId) {
      const rec = recipes.find(r => r.id === recipeId);
      addToast(`Added "${rec?.title || 'Recipe'}" to meal plan!`, 'success');
    } else {
      addToast('Cleared meal slot', 'info');
    }
  };

  const clearMealPlan = async () => {
    await storageService.clearMealPlan(userId);
    setMealPlan([]);
    addToast('Cleared your weekly meal plan', 'info');
  };

  const openRecipeDetails = (recipe: Recipe | null) => {
    setSelectedRecipe(recipe);
  };

  const openRecipeForm = (recipe?: Recipe | null) => {
    setEditingRecipe(recipe || null);
    setIsRecipeFormOpen(true);
  };

  const closeRecipeForm = () => {
    setIsRecipeFormOpen(false);
    setEditingRecipe(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const openPlannerPicker = (dayOfWeek: number, mealType: MealType) => {
    setActivePlannerSlot({ dayOfWeek, mealType });
    setIsPlannerPickerOpen(true);
  };

  const closePlannerPicker = () => {
    setIsPlannerPickerOpen(false);
    setActivePlannerSlot(null);
  };

  // Filter computation
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Search Query Filter
      if (filterState.searchQuery) {
        const query = filterState.searchQuery.toLowerCase();
        const matchesTitle = recipe.title.toLowerCase().includes(query);
        const matchesIngredient = recipe.ingredients.some(ing => ing.toLowerCase().includes(query));
        const matchesTag = recipe.diet_tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesIngredient && !matchesTag) return false;
      }

      // Max Prep Time Filter
      if (filterState.maxPrepTime !== null) {
        if (recipe.prep_time_minutes > filterState.maxPrepTime) return false;
      }

      // Cost Level Filter
      if (filterState.costLevel !== null) {
        if (recipe.cost_level !== filterState.costLevel) return false;
      }

      // Diet Tags Filter (must match all selected tags)
      if (filterState.selectedTags.length > 0) {
        const hasAllTags = filterState.selectedTags.every(tag => recipe.diet_tags.includes(tag));
        if (!hasAllTags) return false;
      }

      // Only Favorites
      if (filterState.onlyFavorites) {
        if (!favorites.some(favId => favId === recipe.id || migrateLegacyId(favId) === migrateLegacyId(recipe.id))) return false;
      }

      // Only User Submitted Recipes
      if (filterState.onlyUserRecipes) {
        if (!recipe.is_user_submitted && recipe.owner_id !== userId) return false;
      }

      return true;
    });
  }, [recipes, favorites, filterState, userId]);

  return (
    <AppContext.Provider value={{
      recipes,
      favorites,
      mealPlan,
      filterState,
      toasts,
      isLoading,
      selectedRecipe,
      editingRecipe,
      isAuthModalOpen,
      isRecipeFormOpen,
      isPlannerPickerOpen,
      activePlannerSlot,
      setFilterState,
      resetFilters,
      toggleFavorite,
      addRecipe,
      updateRecipe,
      deleteRecipe,
      setMealPlanSlot,
      clearMealPlan,
      openRecipeDetails,
      openRecipeForm,
      closeRecipeForm,
      openAuthModal,
      closeAuthModal,
      openPlannerPicker,
      closePlannerPicker,
      currency,
      setCurrency,
      toggleCurrency,
      addToast,
      removeToast,
      filteredRecipes
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
