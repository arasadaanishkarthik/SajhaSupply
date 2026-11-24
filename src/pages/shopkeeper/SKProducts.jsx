import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Package, Eye } from 'lucide-react';
import { products, categories } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { SearchBar, Modal } from '../../components/common/UIComponents';
import { toast } from 'sonner';

export default function SKProducts() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('default');
  const [detailProduct, setDetailProduct] = useState(null);
  const { addToCart } = useCart();

  const filtered = products
    .filter(p => cat === 'all' || p.categoryId === cat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.bulkPrice - b.bulkPrice;
      if (sort === 'price-desc') return b.bulkPrice - a.bulkPrice;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleAdd = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to collective purchase list`);
  };

  return (
    <div className="space-y-5">
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80">
        <div>
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-1.5">
            Verified Supplier Inventory
          </span>
          <h2 className="text-2xl font-extrabold text-[#17251F] tracking-tight">FMCG Product Catalog</h2>
          <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
            Compare individual vs. bulk price points and order wholesale lots for your village shop
          </p>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1"><SearchBar value={search} onChange={setSearch} placeholder="Search rice, atta, cooking oil, dairy, snacks..." /></div>
        <select className="input sm:w-48 text-xs font-semibold" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Sort by: Relevance</option>
          <option value="price-asc">Bulk Price: Low to High</option>
          <option value="price-desc">Bulk Price: High to Low</option>
          <option value="rating">Top Rated by Shopkeepers</option>
        </select>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
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

      <div className="text-xs text-[#64746B] font-medium">{filtered.length} products available for procurement</div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            whileHover={{ y: -3 }}
            className="glass-card overflow-hidden group flex flex-col justify-between border border-white/80"
          >
            <div className="relative h-36 bg-gray-100/50 overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={e => { e.target.src = `https://placehold.co/300x200/E8F2EA/174C38?text=${encodeURIComponent(p.name[0])}`; }}
              />
              <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-forest-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/80">
                MOQ: {p.minBulkQty}
              </span>
            </div>

            <div className="p-3.5 flex flex-col justify-between flex-1">
              <div>
                <div className="text-[11px] text-[#64746B] mb-0.5">{p.category}</div>
                <div className="font-bold text-[#17251F] text-sm leading-snug line-clamp-1">{p.name}</div>
                <div className="text-xs text-[#64746B] mb-2">{p.variant} · {p.supplier}</div>
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

                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleAdd(p)}
                    className="btn-primary flex-1 flex items-center justify-center gap-1 py-2 text-xs shadow-xs"
                  >
                    <ShoppingCart className="w-3 h-3" /> Add
                  </button>
                  <button
                    onClick={() => setDetailProduct(p)}
                    className="p-2 bg-white/70 hover:bg-white rounded-xl border border-white/80 text-[#64746B] hover:text-[#17251F] transition-colors"
                    title="View details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product Detail Modal */}
      <Modal isOpen={!!detailProduct} onClose={() => setDetailProduct(null)} title={detailProduct?.name}>
        {detailProduct && (
          <div className="space-y-4">
            <div className="h-44 rounded-xl overflow-hidden bg-gray-100">
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
                <div className="text-xs text-[#64746B] mt-0.5">Supplier: {detailProduct.supplier} · {detailProduct.category}</div>
              </div>
              <div className="text-right">
                <div className="text-base font-extrabold text-forest-700">₹{detailProduct.bulkPrice} / {detailProduct.unit}</div>
                <div className="text-xs text-gray-400 line-through">Standard: ₹{detailProduct.unitPrice}</div>
              </div>
            </div>
            <p className="text-xs text-[#64746B] leading-relaxed">{detailProduct.description}</p>
            <div className="p-3 bg-forest-50/80 rounded-xl border border-forest-100 text-xs text-forest-800 space-y-1">
              <div>• Minimum collective threshold to unlock bulk rate: <strong>{detailProduct.minBulkQty} units</strong></div>
              <div>• Stock available in central regional depot: <strong>{detailProduct.stock} units</strong></div>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button onClick={() => setDetailProduct(null)} className="btn-secondary flex-1 py-2 text-xs">Close</button>
              <button
                onClick={() => { handleAdd(detailProduct); setDetailProduct(null); }}
                className="btn-primary flex-1 py-2 text-xs flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
