import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollFeatures: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }

      if (totalScroll > 280) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Scroll Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 pointer-events-none bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-[#FF3B30] via-[#FFD166] to-[#06D6A0] transition-all duration-75 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          title="Back to top"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-[#FF3B30] text-white border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] hover:bg-[#E6302B] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#1C1917] active:translate-y-0 active:shadow-none transition-all duration-200 group cursor-pointer animate-pop-in"
        >
          <ArrowUp className="w-5 h-5 stroke-[3] group-hover:-translate-y-0.5 transition-transform" />
          <span className="sr-only">Back to top</span>
        </button>
      )}
    </>
  );
};
