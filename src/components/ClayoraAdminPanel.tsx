import React, { useState } from 'react';
import { X, Shield, Package, ShoppingBag, Plus, Check } from 'lucide-react';
import { ClayoraProduct } from '../data/clayoraProducts';

interface ClayoraAdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  products: ClayoraProduct[];
  onUpdateStock: (productId: string, newStock: number) => void;
  onAddNewProduct: (product: ClayoraProduct) => void;
  orders: Array<{
    id: string;
    customerName: string;
    customerAddress: string;
    phone: string;
    items: string[];
    total: number;
    status: 'Received' | 'Packed' | 'Dispatched';
    date: string;
  }>;
  onUpdateOrderStatus: (orderId: string, status: 'Received' | 'Packed' | 'Dispatched') => void;
}

export const ClayoraAdminPanel: React.FC<ClayoraAdminPanelProps> = ({
  isOpen,
  onClose,
  products,
  onUpdateStock,
  onAddNewProduct,
  orders,
  onUpdateOrderStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'new-piece'>('inventory');

  // Form for adding new piece
  const [newName, setNewName] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Hand-Thrown Vases' | 'Tableware' | 'Planters & Pots' | 'Home Objects'>('Hand-Thrown Vases');
  const [newPrice, setNewPrice] = useState('85');
  const [newClay, setNewClay] = useState('Devon Terracotta');
  const [newStock, setNewStock] = useState('5');

  if (!isOpen) return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newProd: ClayoraProduct = {
      id: `clayora-custom-${Date.now()}`,
      name: newName,
      subtitle: newSubtitle || 'Artisanal studio wheel thrown piece',
      category: newCategory,
      price: parseFloat(newPrice) || 85,
      priceFormatted: `$${parseFloat(newPrice || '85').toFixed(2)}`,
      image: '/src/assets/images/clay_vase_terracotta_1793121121448.jpg',
      clayType: newClay,
      dimensions: 'Custom studio dimension',
      firingTechnique: 'Wood-fired 1240°C',
      batchInfo: 'Batch 18 · Studio Addition',
      inStock: true,
      stockCount: parseInt(newStock) || 5,
      description: 'Handcrafted piece added to the live batch.',
      makerNotes: 'Thrown in the Devon studio floor.'
    };

    onAddNewProduct(newProd);
    setNewName('');
    setNewSubtitle('');
    setActiveTab('inventory');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white border border-stone-200 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C25E2E] text-white flex items-center justify-center font-bold text-xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-serif text-lg font-medium text-stone-900">
                Clayora Studio Management Console
              </div>
              <div className="text-[11px] text-stone-500 font-mono">
                Authenticated as Administrator (anu@9803)
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-stone-100 border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3 px-3 font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'border-[#C25E2E] text-[#C25E2E]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Ceramic Inventory ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#C25E2E] text-[#C25E2E]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Studio Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('new-piece')}
            className={`py-3 px-3 font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'new-piece'
                ? 'border-[#C25E2E] text-[#C25E2E]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Piece to Batch</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500">
                  Manage current stock levels available for customers. Adjusting counts updates the storefront immediately.
                </p>
                <button
                  onClick={() => setActiveTab('new-piece')}
                  className="px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Piece</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 font-medium">
                      <th className="py-2.5 px-4">Vessel / Piece</th>
                      <th className="py-2.5 px-4">Category</th>
                      <th className="py-2.5 px-4">Price</th>
                      <th className="py-2.5 px-4">Kiln Batch</th>
                      <th className="py-2.5 px-4 text-center">Available Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-stone-700">
                    {products.map((item) => (
                      <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4 font-medium text-stone-900 flex items-center gap-2.5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-9 h-9 object-cover rounded-md bg-stone-200 shrink-0"
                          />
                          <span className="truncate max-w-[200px]">{item.name}</span>
                        </td>
                        <td className="py-3 px-4 text-stone-500">{item.category}</td>
                        <td className="py-3 px-4 font-mono font-medium">{item.priceFormatted}</td>
                        <td className="py-3 px-4 font-mono text-stone-500 text-[11px]">{item.batchInfo}</td>
                        <td className="py-3 px-4 text-center">
                          <div className="inline-flex items-center gap-2 border border-stone-300 rounded-lg px-2 py-1 bg-white">
                            <button
                              onClick={() => onUpdateStock(item.id, Math.max(0, item.stockCount - 1))}
                              className="text-stone-500 hover:text-stone-900 font-bold px-1"
                            >
                              -
                            </button>
                            <span className="font-mono tabular-nums font-semibold w-5 text-center">
                              {item.stockCount}
                            </span>
                            <button
                              onClick={() => onUpdateStock(item.id, item.stockCount + 1)}
                              className="text-stone-500 hover:text-stone-900 font-bold px-1"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500">
                Customer orders placed via storefront. Update packing and courier dispatch statuses.
              </p>

              {orders.length === 0 ? (
                <div className="p-12 text-center border border-stone-200 rounded-xl bg-stone-50">
                  <p className="text-xs text-stone-500">No customer orders placed yet in this session.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-stone-900">{ord.id}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-stone-500">{ord.date}</span>
                        </div>
                        <div className="font-semibold text-stone-900">{ord.customerName} ({ord.phone})</div>
                        <div className="text-stone-500 text-[11px]">{ord.customerAddress}</div>
                        <div className="text-stone-600 text-[11px]">Items: {ord.items.join(', ')}</div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <div className="text-right">
                          <div className="font-serif font-bold text-stone-900 text-sm font-mono tabular-nums">
                            ${ord.total.toFixed(2)}
                          </div>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              ord.status === 'Dispatched'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'Packed'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-stone-200 text-stone-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>

                        {/* Status switcher */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => onUpdateOrderStatus(ord.id, 'Packed')}
                            className="px-2.5 py-1.5 bg-white border border-stone-300 hover:bg-stone-100 rounded text-[11px] font-medium"
                          >
                            Mark Packed
                          </button>
                          <button
                            onClick={() => onUpdateOrderStatus(ord.id, 'Dispatched')}
                            className="px-2.5 py-1.5 bg-stone-900 text-white hover:bg-stone-800 rounded text-[11px] font-medium"
                          >
                            Dispatch
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'new-piece' && (
            <form onSubmit={handleCreateProduct} className="max-w-xl mx-auto space-y-4 text-xs">
              <div>
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Register New Ceramic Vessel into Studio Batch
                </h3>
                <p className="text-stone-500 mt-0.5">
                  This item will immediately be made available for customers on the storefront.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Vessel Title
                </label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Terracotta Amphora Vessel"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs focus:ring-1 focus:ring-[#C25E2E]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Subtitle / Form Detail
                </label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Hand-turned red clay with raw fluted texture"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs focus:ring-1 focus:ring-[#C25E2E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                  >
                    <option value="Hand-Thrown Vases">Hand-Thrown Vases</option>
                    <option value="Tableware">Tableware</option>
                    <option value="Planters & Pots">Planters & Pots</option>
                    <option value="Home Objects">Home Objects</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Clay Type
                  </label>
                  <input
                    type="text"
                    value={newClay}
                    onChange={(e) => setNewClay(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Batch Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-stone-900 text-xs font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#C25E2E] hover:bg-[#A94F25] text-white rounded-lg font-semibold shadow-sm transition-all"
              >
                Publish Ceramic Piece to Storefront
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
