import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Calendar, Heart, PlusCircle, ChefHat, UserCheck, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isGuest = user?.is_demo ?? false;
  const { mealPlan, favorites, openRecipeForm, openAuthModal, currency, setCurrency } = useApp();

  const isActive = (path: string) => location.pathname === path;

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b-2 border-stone-900 shadow-sm">
      
      {/* Top Accent Strip */}
      <div className="h-1.5 bg-[#FF3B30] w-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center space-x-3 group cursor-pointer"
          title="PrepEasy - Back to top"
        >
          <div className="w-11 h-11 rounded-2xl bg-[#FF3B30] text-white flex items-center justify-center border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] group-hover:rotate-3 transition-transform">
            <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-stone-900 font-heading">
              Prep<span className="text-[#FF3B30]">Easy</span>
            </span>
            <span className="text-[10px] font-bold text-stone-600 -mt-1 uppercase tracking-wider">
              Easy Recipe & Meal Planner
            </span>
          </div>
        </Link>

        {/* Center Route Links */}
        <nav className="hidden md:flex items-center space-x-2 bg-[#F8F3EB] p-1.5 rounded-2xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917]">
          
          <Link
            to="/"
            onClick={() => {
              if (isActive('/')) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/')
                ? 'bg-[#FF3B30] text-white shadow-[2px_2px_0px_0px_#1C1917] border border-stone-900'
                : 'text-stone-800 hover:text-stone-950 hover:bg-stone-200/60'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Browse Recipes</span>
          </Link>

          <Link
            to="/planner"
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
              isActive('/planner')
                ? 'bg-[#FF3B30] text-white shadow-[2px_2px_0px_0px_#1C1917] border border-stone-900'
                : 'text-stone-800 hover:text-stone-950 hover:bg-stone-200/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Meal Planner</span>
            {mealPlan.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-black rounded-full bg-[#FFD166] text-stone-900 border border-stone-900">
                {mealPlan.length}
              </span>
            )}
          </Link>

          <Link
            to="/favorites"
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/favorites')
                ? 'bg-[#FF3B30] text-white shadow-[2px_2px_0px_0px_#1C1917] border border-stone-900'
                : 'text-stone-800 hover:text-stone-950 hover:bg-stone-200/60'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-black rounded-full bg-[#FFD166] text-stone-900 border border-stone-900">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/my-recipes"
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isActive('/my-recipes')
                ? 'bg-[#FF3B30] text-white shadow-[2px_2px_0px_0px_#1C1917] border border-stone-900'
                : 'text-stone-800 hover:text-stone-950 hover:bg-stone-200/60'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>My Recipes</span>
          </Link>

        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Currency Toggle Switch (LKR / USD) */}
          <div 
            className="flex items-center bg-[#F8F3EB] p-0.5 sm:p-1 rounded-xl border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917]"
            title="Toggle between Sri Lankan Rupees (LKR) and US Dollars (USD)"
          >
            <button
              type="button"
              id="currency-toggle-lkr"
              onClick={() => setCurrency('LKR')}
              className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                currency === 'LKR'
                  ? 'bg-[#FF3B30] text-white border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917]'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <span className="sm:hidden">Rs</span>
              <span className="hidden sm:inline">🇱🇰 LKR</span>
            </button>
            <button
              type="button"
              id="currency-toggle-usd"
              onClick={() => setCurrency('USD')}
              className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#FF3B30] text-white border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917]'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-200/60'
              }`}
            >
              <span className="sm:hidden">$</span>
              <span className="hidden sm:inline">💵 USD</span>
            </button>
          </div>

          {/* Add Recipe CTA */}
          <button
            onClick={() => openRecipeForm()}
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl bg-[#FF3B30] text-white text-xs font-extrabold border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Add Recipe</span>
          </button>

          {/* User Profile / Auth State */}
          {user && !isGuest ? (
            <div id="user-profile-badge" className="flex items-center space-x-2 bg-[#FFD166] border-2 border-stone-900 rounded-xl px-3 py-1.5 shadow-[2px_2px_0px_0px_#1C1917]">
              <div className="flex flex-col text-right">
                <span id="user-display-name" className="text-xs font-extrabold text-stone-900 line-clamp-1">
                  {user.name || user.email.split('@')[0]}
                </span>
                <span className="text-[9px] font-bold text-stone-700 uppercase tracking-wider">
                  Member
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Switch back to Guest Mode / Log Out"
                id="nav-logout-btn"
                className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/80 hover:bg-white text-stone-900 text-[10px] font-black border border-stone-900 transition-all cursor-pointer shadow-[1px_1px_0px_0px_#1C1917]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={openAuthModal}
                id="nav-guest-btn"
                title="You are currently browsing in Guest Mode. Click to sign in or create an account."
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[#F8F3EB] hover:bg-amber-100 border-2 border-stone-900 text-stone-900 text-xs font-black transition-all shadow-[2px_2px_0px_0px_#1C1917] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Guest Mode</span>
              </button>
              <button
                type="button"
                onClick={openAuthModal}
                id="nav-auth-btn"
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#FF3B30] hover:bg-[#E6302B] text-white text-xs font-black border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer"
              >
                <UserCheck className="w-4 h-4 stroke-[2.5]" />
                <span>Sign In / Up</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Mobile Nav Links */}
      <div className="flex md:hidden items-center justify-around border-t border-stone-300 py-2 bg-[#F8F3EB]">
        <Link
          to="/"
          onClick={() => {
            if (isActive('/')) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className={`text-xs font-bold ${isActive('/') ? 'text-[#FF3B30]' : 'text-stone-700'}`}
        >
          Browse
        </Link>
        <Link to="/planner" className={`text-xs font-bold ${isActive('/planner') ? 'text-[#FF3B30]' : 'text-stone-700'}`}>Planner ({mealPlan.length})</Link>
        <Link to="/favorites" className={`text-xs font-bold ${isActive('/favorites') ? 'text-[#FF3B30]' : 'text-stone-700'}`}>Favorites ({favorites.length})</Link>
        <Link to="/my-recipes" className={`text-xs font-bold ${isActive('/my-recipes') ? 'text-[#FF3B30]' : 'text-stone-700'}`}>My Recipes</Link>
      </div>

    </header>
  );
};
