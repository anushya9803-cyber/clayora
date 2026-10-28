import React from 'react';
import { Home, Compass, Star, ShoppingBag, Share2 } from 'lucide-react';

interface ClayoraMobileBottomBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenShareModal: () => void;
}

export const ClayoraMobileBottomBar: React.FC<ClayoraMobileBottomBarProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  onOpenShareModal,
}) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200 md:hidden h-14 max-h-[12vh] px-2 flex items-center justify-around"
    >
      <button
        onClick={() => onTabChange('shop')}
        className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] transition-colors ${
          activeTab === 'shop' ? 'text-[#C25E2E] font-semibold' : 'text-stone-500 hover:text-stone-900'
        }`}
      >
        <Home className="w-4 h-4" />
        <span className="text-[10px] mt-1 font-medium">Studio</span>
      </button>

      <button
        onClick={() => onTabChange('process')}
        className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] transition-colors ${
          activeTab === 'process' ? 'text-[#C25E2E] font-semibold' : 'text-stone-500 hover:text-stone-900'
        }`}
      >
        <Compass className="w-4 h-4" />
        <span className="text-[10px] mt-1 font-medium">Process</span>
      </button>

      <button
        onClick={() => onTabChange('reviews')}
        className={`flex flex-col items-center justify-center min-w-[50px] min-h-[44px] transition-colors ${
          activeTab === 'reviews' ? 'text-[#C25E2E] font-semibold' : 'text-stone-500 hover:text-stone-900'
        }`}
      >
        <Star className="w-4 h-4" />
        <span className="text-[10px] mt-1 font-medium">Reviews</span>
      </button>

      <button
        onClick={onOpenShareModal}
        className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-stone-500 hover:text-stone-900 transition-colors"
      >
        <Share2 className="w-4 h-4 text-[#C25E2E]" />
        <span className="text-[10px] mt-1 font-medium">Link</span>
      </button>

      <button
        onClick={onOpenCart}
        className="flex flex-col items-center justify-center min-w-[50px] min-h-[44px] text-stone-700 hover:text-stone-900 relative transition-colors"
      >
        <ShoppingBag className="w-4 h-4 text-[#C25E2E]" />
        {cartCount > 0 && (
          <span className="absolute top-1 right-2.5 w-4 h-4 rounded-full bg-[#C25E2E] text-[9px] font-bold text-white flex items-center justify-center font-mono">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] mt-1 font-medium">Bag</span>
      </button>
    </nav>
  );
};
