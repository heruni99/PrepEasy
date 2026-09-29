import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Mail, PlusCircle, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

// High-fidelity custom SVG vector icons for brand socials
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const SOCIAL_LINKS = {
  github: 'https://github.com/heruni99',
  linkedin: 'https://www.linkedin.com/in/heruni-perera-5974032b8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  instagram: 'https://www.instagram.com/its.samuu__?igsh=NXp3amIwMWdwdzk0',
  repo: 'https://github.com/heruni99/PrepEasy',
  email: 'mailto:herunisp@gmail.com'
};

export const Footer: React.FC = () => {
  const location = useLocation();
  const { openRecipeForm } = useApp();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (path: string) => {
    if (location.pathname === path) {
      handleScrollTop();
    }
  };

  return (
    <footer className="mt-20 relative bg-[#FFD166] text-stone-900 rounded-t-[40px] sm:rounded-t-[56px] lg:rounded-t-[64px] border-t-2 border-stone-900 shadow-[0_-6px_0px_0px_#1C1917] overflow-hidden">
      
      {/* Subtle organic background contour lines inspired by the design */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1200 800"
      >
        <path
          d="M-50,180 C150,120 300,280 500,210 C700,140 850,260 1050,190 C1150,150 1250,220 1300,200"
          fill="none"
          stroke="#1C1917"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <path
          d="M-20,380 C200,320 400,440 650,370 C900,300 1050,420 1250,350"
          fill="none"
          stroke="#1C1917"
          strokeWidth="2"
        />
        <path
          d="M-80,560 C120,490 320,600 580,520 C840,440 1020,570 1280,480"
          fill="none"
          stroke="#1C1917"
          strokeWidth="3"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-8">
        
        {/* Top Action Pill Bar (inspired by the 'LOCATIONS' pill button) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-10 border-b-2 border-stone-900/20">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-stone-900 text-[#FFD166] text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#1C1917]">
              <span className="w-2 h-2 rounded-full bg-[#FFD166]"></span>
              <span>PrepEasy Dorm Kitchen</span>
            </span>
            <span className="text-xs font-bold text-stone-800 hidden md:inline">
              Smart weekly planning for student budgets
            </span>
          </div>

          {/* Pill CTA button matching inspiration */}
          <button
            type="button"
            onClick={() => openRecipeForm()}
            className="group px-6 py-2.5 rounded-full bg-[#FFFDF9] text-stone-900 border-2 border-stone-900 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#FF3B30] hover:text-white active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <span>+ Add Your Recipe</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Main 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-14 py-10">
          
          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <Link
              to="/"
              onClick={handleScrollTop}
              className="inline-flex items-center space-x-3 group cursor-pointer"
              title="PrepEasy - Back to top"
            >
              <div className="w-11 h-11 rounded-2xl bg-[#FF3B30] text-white flex items-center justify-center border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] group-hover:rotate-6 transition-transform">
                <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-stone-900 font-heading">
                  Prep<span className="text-[#FF3B30]">Easy</span>
                </span>
              </div>
            </Link>

            <p className="text-sm font-extrabold text-stone-900 leading-snug">
              Easy recipes & meal planning
            </p>

            <p className="text-xs font-bold text-stone-800 leading-relaxed max-w-xs">
              Tailored for university students cooking on a budget with simple dorm-friendly equipment.
            </p>
          </div>

          {/* Column 2 — Explore */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-widest text-stone-900 border-b-2 border-stone-900 pb-1 inline-block">
              Explore
            </h3>
            
            <ul className="space-y-2.5 text-xs font-black">
              <li>
                <Link
                  to="/"
                  onClick={() => handleNavigate('/')}
                  className="text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all inline-block"
                >
                  Browse Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/planner"
                  onClick={() => handleNavigate('/planner')}
                  className="text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all inline-block"
                >
                  Meal Planner
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  onClick={() => handleNavigate('/favorites')}
                  className="text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all inline-block"
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  to="/my-recipes"
                  onClick={() => handleNavigate('/my-recipes')}
                  className="text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all inline-block"
                >
                  My Recipes
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openRecipeForm()}
                  className="inline-flex items-center space-x-1.5 text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all cursor-pointer font-black"
                >
                  <span>Add Recipe</span>
                  <PlusCircle className="w-3.5 h-3.5 text-[#FF3B30]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 — Connect */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-black uppercase tracking-widest text-stone-900 border-b-2 border-stone-900 pb-1 inline-block">
              Connect
            </h3>

            <ul className="space-y-2.5 text-xs font-black">
              <li>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all group"
                >
                  <LinkedinIcon className="w-4 h-4 text-[#0A66C2] group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-600 group-hover:text-[#FF3B30]" />
                </a>
              </li>

              <li>
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all group"
                >
                  <GithubIcon className="w-4 h-4 text-stone-900 group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-600 group-hover:text-[#FF3B30]" />
                </a>
              </li>

              <li>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all group"
                >
                  <InstagramIcon className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-stone-600 group-hover:text-[#FF3B30]" />
                </a>
              </li>

              <li>
                <a
                  href={SOCIAL_LINKS.email}
                  className="inline-flex items-center space-x-2 text-stone-900 hover:text-[#FF3B30] hover:translate-x-1.5 transition-all group"
                >
                  <Mail className="w-4 h-4 text-[#FF3B30] group-hover:scale-110 transition-transform" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social Squircles */}
        <div className="border-t-2 border-stone-900/20 pt-6 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            
            {/* Copyright & Credit */}
            <p className="text-xs font-black text-stone-900">
              © 2026 PrepEasy. Built by Samu_codes as a student portfolio project.
            </p>

            {/* Social Squircle Icon Buttons */}
            <div className="flex items-center space-x-2.5">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FFFDF9] border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] flex items-center justify-center text-stone-900 hover:bg-[#FF3B30] hover:text-white hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FFFDF9] border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] flex items-center justify-center text-stone-900 hover:bg-[#0A66C2] hover:text-white hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#FFFDF9] border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] flex items-center justify-center text-stone-900 hover:bg-[#E1306C] hover:text-white hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                title="Instagram Profile"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={SOCIAL_LINKS.email}
                className="w-9 h-9 rounded-xl bg-[#FFFDF9] border-2 border-stone-900 shadow-[2px_2px_0px_0px_#1C1917] flex items-center justify-center text-stone-900 hover:bg-[#FF3B30] hover:text-white hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
                title="Send Email"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};
