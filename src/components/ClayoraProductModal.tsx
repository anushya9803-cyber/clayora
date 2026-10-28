import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Flame, Sparkles, Scale, Info } from 'lucide-react';
import { ClayoraProduct } from '../data/clayoraProducts';

interface ClayoraProductModalProps {
  product: ClayoraProduct | null;
  onClose: () => void;
  onAddToCart: (product: ClayoraProduct, quantity: number) => void;
}

export const ClayoraProductModal: React.FC<ClayoraProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-[#FAF8F5] border border-stone-200 w-full sm:max-w-2xl max-h-[90vh] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 bg-stone-300 rounded-full" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white">
          <div className="flex items-center gap-2 text-xs font-medium text-[#C25E2E] uppercase tracking-wider">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.batchInfo}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            {/* Image */}
            <div className="rounded-xl overflow-hidden bg-stone-100 border border-stone-200 aspect-4/3 sm:aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Core Details */}
            <div className="space-y-3">
              <h2 className="font-serif text-2xl font-medium text-stone-900 leading-tight">
                {product.name}
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {product.subtitle}
              </p>

              <div className="py-2 border-y border-stone-200 flex items-baseline justify-between">
                <span className="font-serif text-2xl font-semibold text-stone-900 font-mono tabular-nums">
                  {product.priceFormatted}
                </span>
                <span className="text-xs text-emerald-700 font-medium">
                  {product.stockCount} in stock
                </span>
              </div>

              {/* Technical Specifications */}
              <div className="text-xs space-y-2 text-stone-600 bg-white p-3.5 rounded-xl border border-stone-200">
                <div className="flex justify-between">
                  <span className="text-stone-400">Clay Origin:</span>
                  <span className="font-medium text-stone-800 text-right">{product.clayType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Dimensions:</span>
                  <span className="font-medium text-stone-800">{product.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Firing Temperature:</span>
                  <span className="font-medium text-stone-800">{product.firingTechnique}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
              Artisan Description & Texture
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Maker notes */}
          <div className="p-4 bg-stone-100/80 rounded-xl border border-stone-200/80 text-xs space-y-1">
            <div className="font-semibold text-stone-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C25E2E]" />
              <span>Studio Master Notes</span>
            </div>
            <p className="text-stone-600 italic">
              "{product.makerNotes}"
            </p>
          </div>
        </div>

        {/* Modal Purchase Footer */}
        <div className="p-5 border-t border-stone-200 bg-white flex items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-3 border border-stone-300 rounded-lg px-3 py-2 bg-stone-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-stone-600 hover:text-stone-900 text-sm font-semibold"
            >
              -
            </button>
            <span className="font-mono text-xs tabular-nums font-semibold w-4 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-stone-600 hover:text-stone-900 text-sm font-semibold"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            className={`flex-1 py-3 px-6 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm ${
              added
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Studio Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-[#E68A5C]" />
                <span>Add {quantity} to Bag · ${(product.price * quantity).toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
