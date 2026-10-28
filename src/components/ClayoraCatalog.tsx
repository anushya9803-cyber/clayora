import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye, Check, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { ClayoraProduct, CLAYORA_PRODUCTS } from '../data/clayoraProducts';

interface ClayoraCatalogProps {
  onSelectProduct: (product: ClayoraProduct) => void;
  onAddToCart: (product: ClayoraProduct) => void;
  addedProductId: string | null;
}

export const ClayoraCatalog: React.FC<ClayoraCatalogProps> = ({
  onSelectProduct,
  onAddToCart,
  addedProductId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Hand-Thrown Vases', 'Tableware', 'Planters & Pots', 'Home Objects'];

  const filteredProducts = useMemo(() => {
    return CLAYORA_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.clayType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="shop-catalog" className="py-14 sm:py-20 border-b border-stone-200/80 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C25E2E] uppercase tracking-wider mb-2">
              <span>Studio Inventory</span>
              <span aria-hidden="true">·</span>
              <span>Batch 18 Currently Available</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 tracking-tight">
              Featured Handcrafted Ceramics & Terracotta
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl">
              Each vessel is individually turned, dried over two weeks, glazed by hand, and fired in our Devon kiln. No two pieces are identical.
            </p>
          </div>

          {/* Search box */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by clay, form, or finish..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C25E2E] focus:border-transparent transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter categories tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center bg-white border border-stone-200 rounded-2xl">
            <p className="text-sm text-stone-500 font-serif">No ceramics match your current filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 text-xs text-[#C25E2E] font-medium hover:underline"
            >
              Reset search filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isJustAdded = addedProductId === product.id;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Image container */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="relative aspect-4/3 bg-stone-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />

                    {/* Fallback container */}
                    <div
                      style={{ display: 'none' }}
                      className="w-full h-full flex flex-col items-center justify-center p-6 bg-stone-200 text-stone-600"
                    >
                      <span className="font-serif text-lg">{product.name}</span>
                      <span className="text-xs mt-1 text-stone-500">{product.clayType}</span>
                    </div>

                    {/* Subtle batch sticker */}
                    <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-mono text-stone-700 border border-stone-300/60 shadow-2xs">
                      {product.batchInfo.split('·')[0].trim()}
                    </div>

                    {/* Quick view icon affordance */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/80 backdrop-blur-sm p-2 rounded-lg text-white">
                      <Eye className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Clean unboxed metadata separator */}
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 uppercase tracking-wider mb-1.5">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.clayType.split(',')[0]}</span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="text-lg font-serif font-medium text-stone-900 hover:text-[#C25E2E] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                        {product.subtitle}
                      </p>

                      <div className="mt-3 text-[11px] text-stone-500 flex items-center justify-between border-t border-stone-100 pt-2.5">
                        <span>{product.dimensions}</span>
                        <span className="text-[#C25E2E] font-medium">
                          {product.stockCount} in batch
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Price & Add to Bag */}
                    <div className="pt-4 mt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-lg font-serif font-semibold text-stone-900 font-mono tabular-nums">
                          {product.priceFormatted}
                        </span>
                        <div className="text-[10px] text-stone-500">Taxes included</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="p-2.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                          title="View Details & Provenance"
                          aria-label="Inspect piece"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onAddToCart(product)}
                          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium transition-all active:scale-95 shadow-2xs ${
                            isJustAdded
                              ? 'bg-emerald-700 text-white'
                              : 'bg-stone-900 hover:bg-stone-800 text-white'
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 text-[#E68A5C]" />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
