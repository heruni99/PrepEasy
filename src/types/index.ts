export type CostLevel = 1 | 2 | 3;
export type Currency = 'LKR' | 'USD';

export type DietTag = 
  | 'Vegan' 
  | 'Vegetarian' 
  | 'High Protein' 
  | 'Quick (<15m)' 
  | 'Budget' 
  | 'One-Pot' 
  | 'Gluten-Free' 
  | 'Dairy-Free' 
  | 'Meal Prep' 
  | 'Halal';

export interface Recipe {
  id: string;
  owner_id?: string | null;
  title: string;
  ingredients: string[];
  steps: string[];
  prep_time_minutes: number;
  cost_level: CostLevel;
  diet_tags: DietTag[];
  image_url: string;
  is_user_submitted: boolean;
  created_at?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface Favorite {
  id?: string;  // Postgres auto-generates; optional so we never send it on insert
  user_id: string;
  recipe_id: string;
  created_at?: string;
}

export interface MealPlanEntry {
  id: string;
  user_id: string;
  day_of_week: number; // 0: Mon, 1: Tue, ..., 6: Sun
  meal_type: MealType;
  recipe_id: string;
  recipe?: Recipe;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  is_demo?: boolean;
}

export interface FilterState {
  searchQuery: string;
  maxPrepTime: number | null; // e.g. 15, 30, or null (all)
  costLevel: CostLevel | null; // 1, 2, 3, or null
  selectedTags: DietTag[];
  onlyFavorites: boolean;
  onlyUserRecipes: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
