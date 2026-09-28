import React from 'react';
import { NavLink } from 'react-router-dom';
import { UtensilsCrossed, Calendar, Heart, ChefHat, User, LogOut, Sparkles, PlusCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { favorites, mealPlan, openAuthModal, openRecipeForm } = useApp();

  const activePlannerCount = mealPlan.length;
  const activeFavoritesCount = favorites.length;

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                PrepEasy
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Student Meals
              </span>
            </div>
          </NavLink>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Recipes</span>
            </NavLink>

            <NavLink
              to="/planner"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Calendar className="w-4 h-4" />
              <span>Meal Planner</span>
              {activePlannerCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-orange-500 text-white">
                  {activePlannerCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
              {activeFavoritesCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                  {activeFavoritesCount}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/my-recipes"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <ChefHat className="w-4 h-4" />
              <span>My Recipes</span>
            </NavLink>
          </nav>

          {/* Right Action Buttons & User Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => openRecipeForm()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-md shadow-orange-500/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Add Recipe</span>
            </button>

            {user ? (
              <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700/60 rounded-lg pl-3 pr-1.5 py-1">
                <div className="flex flex-col text-right hidden sm:block">
                  <span className="text-xs font-bold text-slate-200">{user.name || user.email}</span>
                  {user.is_demo && (
                    <span className="text-[10px] text-amber-400 font-semibold flex items-center justify-end gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" /> Guest Mode
                    </span>
                  )}
                </div>
                <button
                  onClick={() => logout()}
                  title="Log out"
                  className="p-1.5 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-700/60 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Mobile Nav Bar Links (bottom tab bar for mobile view) */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950 py-2 px-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs font-medium ${isActive ? 'text-amber-400' : 'text-slate-400'}`
          }
        >
          <UtensilsCrossed className="w-5 h-5 mb-0.5" />
          <span>Recipes</span>
        </NavLink>
        <NavLink
          to="/planner"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs font-medium relative ${isActive ? 'text-amber-400' : 'text-slate-400'}`
          }
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>Planner</span>
          {activePlannerCount > 0 && (
            <span className="absolute -top-1 right-2 px-1 py-0.2 text-[9px] font-bold rounded-full bg-orange-500 text-white">
              {activePlannerCount}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs font-medium relative ${isActive ? 'text-amber-400' : 'text-slate-400'}`
          }
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span>Favorites</span>
          {activeFavoritesCount > 0 && (
            <span className="absolute -top-1 right-2 px-1 py-0.2 text-[9px] font-bold rounded-full bg-rose-500 text-white">
              {activeFavoritesCount}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/my-recipes"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs font-medium ${isActive ? 'text-amber-400' : 'text-slate-400'}`
          }
        >
          <ChefHat className="w-5 h-5 mb-0.5" />
          <span>Mine</span>
        </NavLink>
      </div>
    </header>
  );
};
