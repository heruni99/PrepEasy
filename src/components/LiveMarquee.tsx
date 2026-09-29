import React from 'react';
import { Flame } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface TickerItem {
  emoji: string;
  name: string;
  badge: string;
  query: string;
}

const TICKER_ITEMS: TickerItem[] = [
  { emoji: '🍛', name: 'Kiribath (Milk Rice)', badge: 'Traditional Favorite', query: 'Kiribath' },
  { emoji: '🥘', name: 'Creamy Mysore Parippu', badge: 'Dhal Comfort', query: 'Parippu' },
  { emoji: '🍳', name: '5-Min Egg Fried Rice', badge: 'Quick Dorm Meal', query: 'Fried Rice' },
  { emoji: '🥪', name: 'Spicy Pol Sambol Toast', badge: 'No-Cook Quick', query: 'Pol Sambol' },
  { emoji: '🍜', name: 'Peanut Chili Noodles', badge: '10-Min Fast', query: 'Noodles' },
  { emoji: '🦐', name: 'Crispy Isso Wade', badge: 'Street Food Craving', query: 'Isso Wade' },
  { emoji: '🥞', name: 'Stovetop Egg Hoppers', badge: 'Lacy & Crispy', query: 'Egg Hoppers' },
  { emoji: '🥑', name: 'Avocado Toast & Egg', badge: 'High Protein', query: 'Avocado' },
  { emoji: '🥣', name: 'Ceylon Cinnamon Oats', badge: 'Grab & Go', query: 'Oats' },
];

export const LiveMarquee: React.FC = () => {
  const { setFilterState } = useApp();

  const handleItemClick = (query: string) => {
    setFilterState(prev => ({ ...prev, searchQuery: query }));
    const gridEl = document.getElementById('recipes-grid-section');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Duplicate items for seamless infinite loop
  const displayItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#FFFDF9] border-2 border-stone-900 shadow-[3px_3px_0px_0px_#1C1917] py-2.5 px-3 flex items-center">
      
      {/* Fixed Live Tag on the left */}
      <div className="flex-shrink-0 flex items-center space-x-1.5 bg-[#FF3B30] text-white px-2.5 py-1 rounded-xl border border-stone-900 shadow-[1px_1px_0px_0px_#1C1917] mr-3 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFD166]"></span>
        </span>
        <Flame className="w-3.5 h-3.5 fill-current text-[#FFD166]" />
        <span className="text-[10px] font-black uppercase tracking-wider hidden sm:inline">Trending Meals</span>
        <span className="text-[10px] font-black uppercase tracking-wider sm:hidden">Hot</span>
      </div>

      {/* Infinite Scrolling Ticker Track */}
      <div className="overflow-hidden flex-1 mask-fade">
        <div className="animate-marquee flex items-center space-x-6 whitespace-nowrap">
          {displayItems.map((item, idx) => (
            <button
              key={`${item.name}-${idx}`}
              type="button"
              onClick={() => handleItemClick(item.query)}
              className="inline-flex items-center space-x-2 text-xs font-extrabold text-stone-800 hover:text-[#FF3B30] transition-colors cursor-pointer group"
            >
              <span className="text-base group-hover:scale-125 transition-transform">{item.emoji}</span>
              <span>{item.name}</span>
              <span className="text-[10px] font-bold text-stone-600 bg-[#F8F3EB] group-hover:bg-[#FFD166] px-2 py-0.5 rounded-full border border-stone-900 transition-colors">
                {item.badge}
              </span>
              <span className="text-stone-400 font-black">•</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
