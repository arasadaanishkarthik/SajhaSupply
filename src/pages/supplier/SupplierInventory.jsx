import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Check, X, AlertTriangle, Package } from 'lucide-react';
import { products } from '../../data/products';
import { Modal, Badge } from '../../components/common/UIComponents';
import { toast } from 'sonner';

export default function SupplierInventory() {
  const [items, setItems] = useState(products.filter(p => p.supplierId === 's2' || p.supplierId === 's1'));
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: '', variant: '', category: 'Rice & Grains', unitPrice: '', bulkPrice: '', stock: '', minBulkQty: 100 });

  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.category.toLowerCase().includes(search.toLowerCase()));

  const handleSave = (e) => {
    e.preventDefault();
    if (editingItem) {
      setItems(prev => prev.map(item => item.id === editingItem.id ? { ...item, ...form, unitPrice: Number(form.unitPrice), bulkPrice: Number(form.bulkPrice), stock: Number(form.stock) } : item));
      toast.success('Product updated successfully!');
    } else {
      const newItem = {
        id: `p-${Date.now()}`,
        ...form,
        supplier: 'ITC Foods Division',
        supplierId: 's2',
        unitPrice: Number(form.unitPrice),
        bulkPrice: Number(form.bulkPrice),
        stock: Number(form.stock),
        rating: 4.8,
        reviews: 1,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop'
      };
      setItems([newItem, ...items]);
      toast.success('New product added to catalog!');
    }
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      variant: item.variant,
      category: item.category,
      unitPrice: item.unitPrice,
      bulkPrice: item.bulkPrice,
      stock: item.stock,
      minBulkQty: item.minBulkQty || 100,
    });
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    setItems(prev => prev.filter(i => i.id !== id));
    toast.error(`Removed ${name} from inventory`);
  };

  const openNew = () => {
    setEditingItem(null);
    setForm({ name: '', variant: '1 kg', category: 'Rice & Grains', unitPrice: 100, bulkPrice: 85, stock: 1000, minBulkQty: 100 });
    setModalOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Inventory Management</h2>
          <p className="text-sm text-gray-500">Track stock levels, configure bulk pricing and manage catalog</p>
        </div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products by name or category..."
          className="input pl-10"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Product Details</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Unit Retail</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Bulk Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Min Bulk Qty</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Stock Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600 text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.variant}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.category}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800">₹{item.unitPrice}</td>
                  <td className="py-3 px-4 font-bold text-forest-600">₹{item.bulkPrice}</td>
                  <td className="py-3 px-4 text-gray-600">{item.minBulkQty || 100} units</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.stock > 1000 ? 'bg-green-50 text-green-700' : item.stock > 200 ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {item.stock <= 200 && <AlertTriangle className="w-3 h-3 text-red-500" />}
                      {item.stock} in stock
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(item)} className="p-1.5 text-gray-500 hover:text-forest-600 hover:bg-forest-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id, item.name)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingItem ? 'Edit Product' : 'Add New Product'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="label">Product Name</label>
            <input className="input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Fortune Sunflower Oil" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Variant / Size</label>
              <input className="input" required value={form.variant} onChange={e => setForm({ ...form, variant: e.target.value })} placeholder="e.g. 1 Litre" />
            </div>
            <div>
              <label className="label">Category</label>
              <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['Rice & Grains', 'Cooking Oil', 'Pulses', 'Dairy Products', 'Beverages', 'Snacks', 'Personal Care', 'Household Essentials'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Unit Retail (₹)</label>
              <input type="number" className="input" required value={form.unitPrice} onChange={e => setForm({ ...form, unitPrice: e.target.value })} />
            </div>
            <div>
              <label className="label">Bulk Price (₹)</label>
              <input type="number" className="input" required value={form.bulkPrice} onChange={e => setForm({ ...form, bulkPrice: e.target.value })} />
            </div>
            <div>
              <label className="label">Stock Qty</label>
              <input type="number" className="input" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Minimum Bulk Order Quantity (MOQ)</label>
            <input type="number" className="input" value={form.minBulkQty} onChange={e => setForm({ ...form, minBulkQty: e.target.value })} />
          </div>
          <div className="flex gap-3 pt-3">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1">{editingItem ? 'Save Changes' : 'Create Product'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
