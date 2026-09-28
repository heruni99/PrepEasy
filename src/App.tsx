
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PlannerPage } from './pages/PlannerPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MyRecipesPage } from './pages/MyRecipesPage';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { MealPlanPickerModal } from './components/MealPlanPickerModal';
import { RecipeFormModal } from './components/RecipeFormModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { UtensilsCrossed, Heart } from 'lucide-react';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
            
            {/* Header Navigation */}
            <Navbar />

            {/* Main Page Container */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/planner" element={<PlannerPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/my-recipes" element={<MyRecipesPage />} />
              </Routes>
            </main>

            {/* Application Modals */}
            <RecipeDetailModal />
            <MealPlanPickerModal />
            <RecipeFormModal />
            <AuthModal />

            {/* Toast Notifications */}
            <ToastContainer />

            {/* Modern Footer */}
            <footer className="bg-slate-900/90 border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-400 space-y-3">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-950">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-sm text-slate-200">PrepEasy</span>
                  <span className="text-slate-500">— Easy Recipe & Weekly Meal Planner</span>
                </div>

                <div className="flex items-center space-x-1 text-slate-400">
                  <span>Made with</span>
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
                  <span>for home cooks & food lovers everywhere • Powered by React + TypeScript + Supabase</span>
                </div>
              </div>
            </footer>

          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
