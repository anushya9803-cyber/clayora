/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DeviceMode } from './types';
import { ClayoraProduct, CartItem, CLAYORA_PRODUCTS } from './data/clayoraProducts';
import { DeviceSimulatorBar } from './components/DeviceSimulatorBar';
import { ClayoraHeader } from './components/ClayoraHeader';
import { ClayoraHero } from './components/ClayoraHero';
import { ClayoraFirstPageAuthBar } from './components/ClayoraFirstPageAuthBar';
import { ClayoraCatalog } from './components/ClayoraCatalog';
import { ClayoraProcess } from './components/ClayoraProcess';
import { ClayoraReviews } from './components/ClayoraReviews';
import { ClayoraFooter } from './components/ClayoraFooter';
import { ClayoraMobileBottomBar } from './components/ClayoraMobileBottomBar';
import { ClayoraMobileDrawer } from './components/ClayoraMobileDrawer';
import { ClayoraProductModal } from './components/ClayoraProductModal';
import { ClayoraCartDrawer } from './components/ClayoraCartDrawer';
import { ClayoraAuthModal } from './components/ClayoraAuthModal';
import { ClayoraAdminPanel } from './components/ClayoraAdminPanel';
import { ClayoraShareModal } from './components/ClayoraShareModal';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

const LIVE_APP_URL = "https://ais-pre-eaabzqcyny76rd6yjexsrx-791424219399.asia-northeast1.run.app";

interface StudioOrder {
  id: string;
  customerName: string;
  customerAddress: string;
  phone: string;
  items: string[];
  total: number;
  status: 'Received' | 'Packed' | 'Dispatched';
  date: string;
}

export default function App() {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('responsive');
  const [activeSection, setActiveSection] = useState<string>('shop');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ClayoraProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<{
    role: 'guest' | 'customer' | 'admin';
    name?: string;
    email?: string;
  } | null>(null);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<'admin' | 'customer'>('customer');
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Live Inventory State (can be modified by Admin)
  const [products, setProducts] = useState<ClayoraProduct[]>(CLAYORA_PRODUCTS);

  // Customer Orders State (viewable & manageable by Admin)
  const [orders, setOrders] = useState<StudioOrder[]>([
    {
      id: 'CY-9102',
      customerName: 'Marcus Vance',
      customerAddress: '14 Meadow Lane, Edinburgh EH3',
      phone: '+44 7700 900142',
      items: ['Stoneware Dining Plate & Tasting Bowl (x1)'],
      total: 115.00,
      status: 'Packed',
      date: '26 Oct',
    },
    {
      id: 'CY-8845',
      customerName: 'Elena Rostova',
      customerAddress: '88 Kensington Church St, London W8',
      phone: '+44 7700 900591',
      items: ['Elysian Fluted Terracotta Vase (x1)', 'Monolith Carbon Incense & Key Tray (x1)'],
      total: 134.00,
      status: 'Dispatched',
      date: '25 Oct',
    }
  ]);

  // Cart State with initial item
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: CLAYORA_PRODUCTS[0],
      quantity: 1,
    },
  ]);

  const handleOpenAuth = (role: 'admin' | 'customer' = 'customer') => {
    setAuthModalInitialRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: { role: 'admin' | 'customer'; name: string; email?: string }) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setIsAdminPanelOpen(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAdminPanelOpen(false);
  };

  const handleAddToCart = (product: ClayoraProduct, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceOrder = (newOrder: StudioOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockCount: newStock, inStock: newStock > 0 } : p))
    );
  };

  const handleAddNewProduct = (newProduct: ClayoraProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'Received' | 'Packed' | 'Dispatched') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    if (section === 'shop') {
      document.getElementById('shop-catalog')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'process') {
      document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'reviews') {
      document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Main Clayora Handcrafted Web App
  const renderClayoraContent = () => (
    <div className="min-h-screen bg-[#FAF8F5] text-[#292524] flex flex-col font-['Plus_Jakarta_Sans'] selection:bg-[#C25E2E] selection:text-white">
      {/* 3-Zone Clean Header */}
      <ClayoraHeader
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsDrawerOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      <main className="flex-1">
        {/* Artisanal Hero */}
        <ClayoraHero
          onExploreClick={() => handleNavigate('shop')}
          onProcessClick={() => handleNavigate('process')}
        />

        {/* 2 User Logins Prominently on the First Page (Admin login with password anu@9803, Customer login) */}
        <ClayoraFirstPageAuthBar
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onLogout={handleLogout}
          onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
          onOpenShareModal={() => setIsShareModalOpen(true)}
        />

        {/* Catalog with Real High-Fidelity Ceramics */}
        <ClayoraCatalog
          onSelectProduct={setSelectedProduct}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          addedProductId={addedProductId}
        />

        {/* 4-Stage Studio Process */}
        <ClayoraProcess />

        {/* Collector Reviews & Provenance */}
        <ClayoraReviews />
      </main>

      {/* Editorial Footer */}
      <ClayoraFooter />

      {/* Thumb-friendly Mobile Bottom Bar (<=15% sticky cap) */}
      <ClayoraMobileBottomBar
        activeTab={activeSection}
        onTabChange={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      {/* Mobile Slide-out Menu */}
      <ClayoraMobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Product Detail Modal */}
      <ClayoraProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart & Checkout Drawer */}
      <ClayoraCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        currentUser={currentUser}
      />

      {/* 2 User Logins Auth Modal */}
      <ClayoraAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialRole={authModalInitialRole}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Studio Administrator Dashboard */}
      <ClayoraAdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        products={products}
        onUpdateStock={handleUpdateStock}
        onAddNewProduct={handleAddNewProduct}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* Live App Link / Share Modal */}
      <ClayoraShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        appUrl={LIVE_APP_URL}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1C1917] flex flex-col text-stone-100">
      {/* Top Device Simulator Bar for testing mobile & desktop layouts */}
      <DeviceSimulatorBar
        deviceMode={deviceMode}
        onDeviceModeChange={setDeviceMode}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
      />

      {/* Simulator Frame Wrapper */}
      <div className="flex-1 flex flex-col items-center justify-start bg-[#1C1917] overflow-x-hidden">
        {deviceMode === 'responsive' && (
          <div className="w-full">
            {renderClayoraContent()}
          </div>
        )}

        {deviceMode === 'desktop' && (
          <div className="w-full py-6 px-4 flex flex-col items-center">
            <div className="text-xs text-stone-400 mb-2 font-mono tabular-nums flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-[#E68A5C]" />
              <span>Desktop Viewport (1440 × 900 px Baseline)</span>
            </div>
            <div className="w-full max-w-[1440px] rounded-xl border border-stone-800 shadow-2xl overflow-hidden bg-[#FAF8F5]">
              <div className="h-8 bg-stone-900 border-b border-stone-800 px-4 flex items-center justify-between text-xs text-stone-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="font-mono text-[11px] text-stone-400 bg-stone-800/80 px-4 py-0.5 rounded">
                  {LIVE_APP_URL}
                </div>
                <span className="text-[11px] font-mono">1440px</span>
              </div>
              <div className="max-h-[82vh] overflow-y-auto custom-scrollbar">
                {renderClayoraContent()}
              </div>
            </div>
          </div>
        )}

        {deviceMode === 'tablet' && (
          <div className="w-full py-6 px-4 flex flex-col items-center">
            <div className="text-xs text-stone-400 mb-2 font-mono tabular-nums flex items-center gap-2">
              <Tablet className="w-3.5 h-3.5 text-[#E68A5C]" />
              <span>Tablet Viewport (768 × 1024 px iPad)</span>
            </div>
            <div className="w-[768px] max-w-full rounded-2xl border-4 border-stone-800 shadow-2xl overflow-hidden bg-[#FAF8F5]">
              <div className="h-6 bg-stone-900 border-b border-stone-800 px-4 flex items-center justify-between text-[10px] text-stone-400">
                <span>9:41 AM</span>
                <span>Clayora iPad Touch View</span>
                <span>100%</span>
              </div>
              <div className="h-[80vh] overflow-y-auto custom-scrollbar">
                {renderClayoraContent()}
              </div>
            </div>
          </div>
        )}

        {deviceMode === 'mobile' && (
          <div className="w-full py-6 px-4 flex flex-col items-center">
            <div className="text-xs text-stone-400 mb-2 font-mono tabular-nums flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5 text-[#E68A5C]" />
              <span>Mobile Phone Viewport (390 × 844 px iPhone)</span>
            </div>
            {/* Realistic iPhone bezel */}
            <div className="w-[390px] max-w-[94vw] rounded-[44px] border-[8px] border-stone-800 shadow-2xl overflow-hidden bg-[#FAF8F5] relative">
              {/* Top speaker notch */}
              <div className="h-7 bg-stone-950 flex items-center justify-between px-6 text-[11px] font-medium text-stone-400 select-none z-30">
                <span>9:41</span>
                <div className="w-20 h-4 bg-stone-900 rounded-full" />
                <div className="flex items-center gap-1">
                  <span className="text-[9px]">5G</span>
                  <div className="w-4 h-2.5 border border-stone-400 rounded-xs p-0.5">
                    <div className="w-full h-full bg-stone-400 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Scrollable screen with touch bottom bar */}
              <div className="h-[740px] max-h-[78vh] overflow-y-auto custom-scrollbar relative bg-[#FAF8F5]">
                {renderClayoraContent()}
              </div>

              {/* Home indicator bar */}
              <div className="h-5 bg-stone-950 flex items-center justify-center">
                <div className="w-28 h-1 bg-stone-600 rounded-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
