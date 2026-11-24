import { useState } from 'react';
import { villages } from '../../data/villages';
import { MapPin, Users, TrendingUp, Phone, Plus, Building } from 'lucide-react';
import { Modal } from '../../components/common/UIComponents';
import { toast } from 'sonner';

export default function AdminVillages() {
  const [list, setList] = useState(villages);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', district: '', state: 'Uttar Pradesh', totalShopkeepers: 20, coordinator: '', phone: '', pincode: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    const newV = {
      id: `v-${Date.now()}`,
      ...form,
      activeShopkeepers: Math.floor(form.totalShopkeepers * 0.75),
      totalOrders: 1,
      totalSavings: 2400,
    };
    setList([...list, newV]);
    toast.success(`Village hub ${form.name} registered successfully!`);
    setModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Connected Village Hubs</h2>
          <p className="text-sm text-gray-500">Manage village distribution nodes, local coordinators, and cumulative community savings</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary flex items-center gap-2 self-start text-xs">
          <Plus className="w-4 h-4" /> Add Village Hub
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(v => (
          <div key={v.id} className="card p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-base text-gray-900">
                  <MapPin className="w-4 h-4 text-forest-600" /> {v.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{v.district} District, {v.state} · PIN {v.pincode}</div>
              </div>
              <span className="badge bg-forest-50 text-forest-700">Active Node</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-page p-3 rounded-xl border border-gray-100">
              <div>
                <span className="text-gray-400">Total Shopkeepers</span>
                <div className="font-extrabold text-sm text-gray-900">{v.activeShopkeepers} / {v.totalShopkeepers} active</div>
              </div>
              <div>
                <span className="text-gray-400">Total Savings</span>
                <div className="font-extrabold text-sm text-forest-600">₹{v.totalSavings.toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-1 text-xs text-gray-600 pt-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Coordinator:</span>
                <span className="font-semibold text-gray-800">{v.coordinator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone:</span>
                <span className="font-mono text-gray-800">{v.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Orders Fulfilled:</span>
                <span className="font-semibold text-gray-800">{v.totalOrders}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Register New Village Hub">
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="label">Village Name</label>
            <input className="input" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Anandpur" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">District</label>
              <input className="input" required value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} placeholder="e.g. Sitapur" />
            </div>
            <div>
              <label className="label">Pincode</label>
              <input className="input" required value={form.pincode} onChange={e => setForm({ ...form, pincode: e.target.value })} placeholder="e.g. 261001" />
            </div>
          </div>
          <div>
            <label className="label">Village Coordinator Name</label>
            <input className="input" required value={form.coordinator} onChange={e => setForm({ ...form, coordinator: e.target.value })} placeholder="e.g. Ramesh Yadav" />
          </div>
          <div>
            <label className="label">Coordinator Mobile Number</label>
            <input className="input" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 00000" />
          </div>
          <div className="flex gap-3 pt-3">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1">Register Village</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
