import { useState } from 'react';
import Footer from '../../components/layout/Footer';
import { products, categories } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { SearchBar } from '../../components/common/UIComponents';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Package, X, Check, Eye } from 'lucide-react';
import { Modal } from '../../components/common/UIComponents';
import { toast } from 'sonner';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [cartOpen, setCartOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState(null);
  const { addToCart, cart, removeFromCart, updateQty, totalItems, totalAmount } = useCart();

  const filtered = products
    .filter(p => cat === 'all' || p.categoryId === cat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#F8FAF8] relative overflow-hidden">
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />

      <div className="relative z-10 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-2">
                FMCG Wholesale Catalog
              </span>
              <h1 className="page-heading text-[#17251F]">Explore Products</h1>
              <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
                Browse FMCG commodities available for collective village orders and wholesale delivery
              </p>
            </div>
            {totalItems > 0 && (
              <button
                onClick={() => setCartOpen(true)}
                className="btn-primary flex items-center gap-2 relative shadow-md self-start sm:self-auto"
              >
                <ShoppingCart className="w-4 h-4" /> Cart ({totalItems}) · ₹{totalAmount.toLocaleString()}
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="mb-5">
            <SearchBar value={search} onChange={setSearch} placeholder="Search products by brand, commodity name, or category..." />
          </div>

          {/* Categories Horizontal Pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  cat === c.id
                    ? 'bg-forest-600 text-white border-forest-600 shadow-xs'
                    : 'bg-white/60 text-[#64746B] border-white/80 hover:bg-white/90'
                }`}
              >
                <span>{c.icon}</span> {c.name}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ y: -3 }}
                className="glass-card overflow-hidden group flex flex-col justify-between"
              >
                <div className="relative h-36 bg-gray-100/50 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = `https://placehold.co/300x200/E8F2EA/174C38?text=${encodeURIComponent(p.name[0])}`; }}
                  />
                  <button
                    onClick={() => setDetailProduct(p)}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-forest-700 shadow-xs"
                    title="Quick Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="text-[11px] font-medium text-[#64746B] mb-0.5">{p.category}</div>
                    <div className="font-bold text-[#17251F] text-sm leading-snug line-clamp-1">{p.name}</div>
                    <div className="text-xs text-[#64746B] mt-0.5 mb-2">{p.variant} · {p.supplier}</div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-xs text-gray-400 line-through">₹{p.unitPrice}</div>
                        <div className="font-extrabold text-forest-700 text-sm">₹{p.bulkPrice} <span className="text-[10px] font-normal text-forest-600">bulk</span></div>
                      </div>
                      <div className="text-[11px] font-bold text-amber-600 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-100">
                        Save ₹{p.unitPrice - p.bulkPrice}
                      </div>
                    </div>

                    <button
                      onClick={() => { addToCart(p, 1); toast.success(`Added ${p.name} to cart`); }}
                      className="btn-primary w-full flex items-center justify-center gap-1.5 py-2 text-xs"
                    >
                      <ShoppingCart className="w-3 h-3" /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <Modal isOpen={!!detailProduct} onClose={() => setDetailProduct(null)} title={detailProduct?.name}>
        {detailProduct && (
          <div className="space-y-4">
            <div className="h-48 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={detailProduct.image}
                alt={detailProduct.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = `https://placehold.co/400x200/E8F2EA/174C38?text=${encodeURIComponent(detailProduct.name)}`; }}
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-base text-[#17251F]">{detailProduct.name} ({detailProduct.variant})</h3>
                <div className="text-xs text-[#64746B] mt-0.5">Supplier: {detailProduct.supplier} · Category: {detailProduct.category}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold text-forest-700">₹{detailProduct.bulkPrice} / {detailProduct.unit}</div>
                <div className="text-xs text-gray-400 line-through">Retail: ₹{detailProduct.unitPrice}</div>
              </div>
            </div>
            <p className="text-xs text-[#64746B] leading-relaxed">{detailProduct.description}</p>
            <div className="p-3 bg-forest-50/80 rounded-xl border border-forest-100 text-xs text-forest-800 space-y-1">
              <div>✓ Minimum collective volume threshold: <strong>{detailProduct.minBulkQty} units</strong></div>
              <div>✓ Stock ready at central distribution hub: <strong>{detailProduct.stock} units</strong></div>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button onClick={() => setDetailProduct(null)} className="btn-secondary flex-1 py-2.5 text-xs">Close</button>
              <button
                onClick={() => { addToCart(detailProduct, 1); toast.success(`Added ${detailProduct.name}`); setDetailProduct(null); }}
                className="btn-primary flex-1 py-2.5 text-xs flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Add to Order
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setCartOpen(false)}>
            <div className="absolute inset-0 bg-black/35 backdrop-blur-xs" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="relative bg-white/95 backdrop-blur-2xl w-full max-w-sm h-full overflow-y-auto shadow-2xl flex flex-col justify-between"
              onClick={e => e.stopPropagation()}
            >
              <div>
                <div className="p-4 border-b border-gray-100/80 flex items-center justify-between">
                  <h2 className="font-bold text-[#17251F] text-base flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-forest-600" /> Cart ({totalItems} items)
                  </h2>
                  <button onClick={() => setCartOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg text-[#64746B]">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-page border border-gray-100 rounded-xl">
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#17251F] truncate">{item.name}</div>
                        <div className="text-[11px] text-[#64746B]">₹{item.bulkPrice || item.unitPrice} each</div>
                      </div>
                      <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded-lg border border-gray-200">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-5 h-5 text-xs text-gray-500 hover:text-black font-bold">-</button>
                        <span className="text-xs font-bold px-1">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-5 h-5 text-xs text-forest-700 hover:text-forest-900 font-bold">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-1">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-white/60">
                <div className="flex justify-between font-extrabold text-[#17251F] text-base mb-4">
                  <span>Total Order Estimate</span>
                  <span className="text-forest-700">₹{totalAmount.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => { toast.success('Order simulated: Proceeding to collective checkout!'); setCartOpen(false); }}
                  className="btn-primary w-full py-3 text-xs"
                >
                  Proceed to Collective Order
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
