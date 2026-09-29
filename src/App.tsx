
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
import { ScrollFeatures } from './components/ScrollFeatures';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <div className="min-h-screen bg-[#F8F3EB] text-stone-900 flex flex-col selection:bg-[#FFD166] selection:text-stone-900">
            
            {/* Scroll Reading Progress & Back To Top */}
            <ScrollFeatures />

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

            {/* Footer Component */}
            <Footer />

          </div>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
