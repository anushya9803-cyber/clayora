import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../data/clayoraProducts';

interface ClayoraCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: {
    id: string;
    customerName: string;
    customerAddress: string;
    phone: string;
    items: string[];
    total: number;
    status: 'Received' | 'Packed' | 'Dispatched';
    date: string;
  }) => void;
  currentUser: { role: 'guest' | 'customer' | 'admin'; name?: string; email?: string } | null;
}

export const ClayoraCartDrawer: React.FC<ClayoraCartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  currentUser,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('cod');
  const [lastOrderId, setLastOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `CY-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastOrderId(newOrderId);

    onPlaceOrder({
      id: newOrderId,
      customerName: customerName || (currentUser?.name ?? 'Studio Collector'),
      customerAddress: customerAddress || '72 Devon Courtyard, Local Delivery',
      phone: customerPhone || '+91 98765 43210',
      items: cartItems.map((ci) => `${ci.product.name} (x${ci.quantity})`),
      total: total,
      status: 'Received',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
    });

    setCheckoutStep('success');
  };

  const handleReset = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Drawer Container */}
      <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl border-l border-stone-200 text-stone-900 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C25E2E]" />
            <h2 className="font-serif text-lg font-medium text-stone-900">
              {checkoutStep === 'cart' && 'Your Ceramic Bag'}
              {checkoutStep === 'checkout' && 'Artisanal Delivery Checkout'}
              {checkoutStep === 'success' && 'Order Confirmed'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content based on step */}
        <div className="flex-1 overflow-y-auto p-6">
          {checkoutStep === 'cart' && (
            <>
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-500">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-lg text-stone-800">Your bag is empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
                    Explore our available studio batches of hand-thrown terracotta vases, bowls, and planters.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-18 h-18 object-cover rounded-lg bg-stone-200 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-serif text-sm font-medium text-stone-900 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <span className="text-[11px] text-stone-500">
                              {item.product.category}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 border border-stone-300 rounded-lg bg-white px-2 py-1">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="text-stone-500 hover:text-stone-900 p-0.5"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono tabular-nums px-1.5 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="text-stone-500 hover:text-stone-900 p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-xs text-stone-400 hover:text-red-600 transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Packaging trust note */}
                  <div className="p-3 bg-stone-100/80 rounded-xl text-[11px] text-stone-600 space-y-1">
                    <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#C25E2E]" />
                      <span>Zero-Breakage Guarantee</span>
                    </div>
                    <p className="leading-relaxed">
                      Packed in biodegradable molded pulp and double-corrugated boxes. If damaged in transit, we replace it instantly.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCompleteOrder} id="checkout-form" className="space-y-4">
              <div className="text-xs text-stone-600 pb-2 border-b border-stone-200">
                Please provide your shipping details for safe courier delivery from our Devon workshop.
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Recipient Name
                </label>
                <input
                  required
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Sugeenthiran H."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C25E2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Contact Phone Number
                </label>
                <input
                  required
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C25E2E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Delivery Address & Pincode
                </label>
                <textarea
                  required
                  rows={3}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="Street, City, Postal Code"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#C25E2E] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Payment Preference
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#C25E2E] bg-[#FAF8F5] text-stone-900 font-semibold'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <div>Cash on Delivery</div>
                    <div className="text-[10px] text-stone-500 font-normal mt-0.5">Pay upon safe arrival</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#C25E2E] bg-[#FAF8F5] text-stone-900 font-semibold'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    <div>Card / UPI / Net</div>
                    <div className="text-[10px] text-stone-500 font-normal mt-0.5">Secure encrypted</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-stone-900">
                Order #{lastOrderId || 'CY-8941'} Received
              </h3>
              <p className="text-xs text-stone-600 max-w-xs leading-relaxed">
                Thank you, <strong>{customerName || 'Collector'}</strong>! Our Devon studio team has logged this order in the studio console.
              </p>
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-left w-full text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-stone-500">Shipping To:</span>
                  <span className="font-medium text-stone-900">{customerAddress || 'Local Address'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Payment:</span>
                  <span className="font-medium text-stone-900 uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-stone-200 pt-1 mt-1">
                  <span>Total Due:</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors"
              >
                Continue Exploring Studio
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary & Action (only on cart and checkout) */}
        {checkoutStep !== 'success' && cartItems.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-[#FAF8F5] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)} pieces)</span>
                <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Fragile Studio Courier</span>
                <span className="font-mono tabular-nums">
                  {shipping === 0 ? <span className="text-emerald-700 font-semibold">Free</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-stone-900 font-serif text-base font-semibold border-t border-stone-200 pt-2">
                <span>Total Amount</span>
                <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                <span>Proceed to Studio Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-4 py-3 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 py-3 bg-[#C25E2E] hover:bg-[#A94F25] text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                >
                  Confirm & Place Order
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
