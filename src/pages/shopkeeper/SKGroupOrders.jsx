import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, TrendingDown, Calendar, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { groupOrders } from '../../data/groupOrders';
import { Badge, ProgressBar, Modal } from '../../components/common/UIComponents';
import { toast } from 'sonner';

export default function SKGroupOrders() {
  const [filter, setFilter] = useState('all');
  const [joinModal, setJoinModal] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [qty, setQty] = useState('');
  const [joined, setJoined] = useState({});
  const [ordersList, setOrdersList] = useState(groupOrders);
  const [newOrder, setNewOrder] = useState({ title: '', productName: '', productVariant: '1 Litre', targetQty: 500, deadline: '2024-12-15', description: '' });

  const filtered = filter === 'all' ? ordersList : ordersList.filter(o => o.status === filter);

  const handleJoin = () => {
    if (!qty || Number(qty) < 1) { toast.error('Please enter a valid quantity'); return; }
    setJoined(prev => ({ ...prev, [joinModal.id]: Number(qty) }));
    setOrdersList(prev => prev.map(o => o.id === joinModal.id ? { ...o, currentQty: o.currentQty + Number(qty) } : o));
    toast.success(`Joined! Added ${qty} units to ${joinModal.productName}`);
    setJoinModal(null);
    setQty('');
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const created = {
      id: `go-${Date.now()}`,
      title: newOrder.title || `${newOrder.productName} Collective Order`,
      productName: newOrder.productName,
      productVariant: newOrder.productVariant,
      supplierName: 'Adani Wilmar Ltd',
      status: 'active',
      targetQty: Number(newOrder.targetQty),
      currentQty: 100,
      unitPrice: 130,
      bulkPrice: 110,
      savingsPerUnit: 20,
      deadline: newOrder.deadline,
      villages: [{ villageName: 'Rampur', qty: 100, shopkeepers: 1 }],
      description: newOrder.description,
    };
    setOrdersList([created, ...ordersList]);
    toast.success('Collective group order created successfully!');
    setCreateModal(false);
  };

  return (
    <div className="space-y-5">
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80">
        <div>
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-1.5">
            Core Procurement Engine
          </span>
          <h2 className="text-2xl font-extrabold text-[#17251F] tracking-tight">Village Collective Orders</h2>
          <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
            Join ongoing bulk orders or initiate a new procurement pool for your village cluster
          </p>
        </div>
        <button onClick={() => setCreateModal(true)} className="btn-primary flex items-center gap-2 self-start sm:self-auto text-xs py-2.5 px-4 shadow-md">
          <Plus className="w-4 h-4" /> Create Collective Order
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
        {['all', 'active', 'confirmed', 'processing', 'dispatched', 'delivered'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all capitalize ${
              filter === f
                ? 'bg-forest-600 text-white border-forest-600 shadow-xs'
                : 'bg-white/60 text-[#64746B] border-white/80 hover:bg-white/90'
            }`}
          >
            {f === 'all' ? 'All Orders' : f}
          </button>
        ))}
      </div>

      {/* Group Orders List */}
      <div className="space-y-4">
        {filtered.map((go, i) => {
          const pct = Math.min(100, Math.round((go.currentQty / go.targetQty) * 100));
          const isJoined = joined[go.id];
          const totalSaving = go.savingsPerUnit * go.currentQty;

          return (
            <motion.div
              key={go.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="glass-card p-5 sm:p-6 border border-white/80 hover:shadow-card-hover transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-base text-[#17251F]">{go.productName}</h3>
                    <Badge status={go.status} />
                    {isJoined && (
                      <span className="badge bg-forest-100/90 text-forest-800 border border-forest-200 font-bold">
                        ✓ Joined ({isJoined} units)
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#64746B]">
                    {go.productVariant} · Supplier: <strong className="text-[#17251F]">{go.supplierName}</strong>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#64746B]">
                    <span className="flex items-center gap-1 font-medium"><Users className="w-3.5 h-3.5 text-forest-600" /> {go.villages.length} participating villages</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gray-400" /> Closes: {go.deadline}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col sm:items-end justify-between sm:justify-start gap-1 p-3 sm:p-0 bg-white/50 sm:bg-transparent rounded-xl border sm:border-0 border-white/80">
                  <div className="text-[11px] text-[#64746B]">Retail: <s className="text-gray-400">₹{go.unitPrice}</s></div>
                  <div className="text-xl font-extrabold text-forest-700">₹{go.bulkPrice} <span className="text-xs font-normal">/ unit</span></div>
                  <div className="text-xs font-bold text-amber-600">Save ₹{go.savingsPerUnit} per unit</div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-[#64746B] mb-1.5 font-medium">
                  <span className="text-[#17251F] font-bold">{go.currentQty.toLocaleString()} units gathered</span>
                  <span>Target: {go.targetQty.toLocaleString()} units ({pct}%)</span>
                </div>
                <ProgressBar value={go.currentQty} max={go.targetQty} color={pct >= 100 ? 'forest' : 'amber'} />
              </div>

              {/* Participating villages breakdown */}
              <div className="mb-4">
                <div className="text-[11px] font-bold text-[#64746B] uppercase tracking-wider mb-2">
                  Participating Village Hubs
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {go.villages.map((v, vi) => (
                    <div key={vi} className="bg-white/60 p-2.5 rounded-xl border border-white/80 text-xs">
                      <div className="font-bold text-[#17251F] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-forest-600" /> {v.villageName}
                      </div>
                      <div className="text-[11px] text-[#64746B] mt-0.5">{v.qty} units ({v.shopkeepers} shops)</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-gray-100/70">
                <div className="text-xs text-[#64746B]">
                  Estimated Community Savings: <strong className="text-forest-700 font-extrabold">₹{totalSaving.toLocaleString()}</strong>
                  <span className="text-gray-400 italic ml-1">(*Illustrative estimates)</span>
                </div>

                {go.status === 'active' && !isJoined && (
                  <button
                    onClick={() => { setJoinModal(go); setQty(''); }}
                    className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Join This Collective Order
                  </button>
                )}
                {isJoined && (
                  <span className="text-xs font-bold text-forest-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-forest-600" /> You contributed {isJoined} units
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Join Order Modal */}
      <Modal isOpen={!!joinModal} onClose={() => setJoinModal(null)} title={`Join Order: ${joinModal?.productName}`}>
        {joinModal && (
          <div className="space-y-4">
            <div className="p-4 bg-forest-50/80 rounded-xl border border-forest-100 text-xs text-[#17251F] space-y-1.5">
              <div className="flex justify-between">
                <span>Wholesale Collective Rate:</span>
                <strong className="text-forest-700 text-sm">₹{joinModal.bulkPrice} / unit</strong>
              </div>
              <div className="flex justify-between">
                <span>Standard Individual Retail:</span>
                <span className="text-gray-400 line-through">₹{joinModal.unitPrice}</span>
              </div>
              <div className="flex justify-between text-forest-700 font-bold pt-1 border-t border-forest-200">
                <span>Direct Savings:</span>
                <span>₹{joinModal.savingsPerUnit} per unit</span>
              </div>
            </div>

            <div>
              <label className="label">Your Order Quantity (Units)</label>
              <input
                type="number"
                min="5"
                className="input"
                placeholder="e.g. 50"
                value={qty}
                onChange={e => setQty(e.target.value)}
                autoFocus
              />
              <p className="text-[11px] text-[#64746B] mt-1">Units will be delivered to your village hub (Rampur).</p>
            </div>

            {Number(qty) > 0 && (
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl flex justify-between text-xs">
                <span className="text-amber-800 font-semibold">Your Estimated Savings:</span>
                <span className="font-extrabold text-amber-900">₹{(joinModal.savingsPerUnit * Number(qty)).toLocaleString()}</span>
              </div>
            )}

            <div className="flex gap-2.5 pt-2">
              <button type="button" onClick={() => setJoinModal(null)} className="btn-secondary flex-1 py-2.5 text-xs">Cancel</button>
              <button type="button" onClick={handleJoin} className="btn-primary flex-1 py-2.5 text-xs">Confirm & Pool Order</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Create Order Modal */}
      <Modal isOpen={createModal} onClose={() => setCreateModal(false)} title="Initiate Village Collective Order">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="label">Product Name</label>
            <input
              className="input"
              required
              placeholder="e.g. Fortune Sunflower Oil"
              value={newOrder.productName}
              onChange={e => setNewOrder({ ...newOrder, productName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Variant / Pack Size</label>
              <input
                className="input"
                required
                placeholder="e.g. 1 Litre bottle"
                value={newOrder.productVariant}
                onChange={e => setNewOrder({ ...newOrder, productVariant: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Target Threshold (Units)</label>
              <input
                type="number"
                className="input"
                required
                placeholder="e.g. 500"
                value={newOrder.targetQty}
                onChange={e => setNewOrder({ ...newOrder, targetQty: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">Order Target Closing Date</label>
            <input
              type="date"
              className="input"
              required
              value={newOrder.deadline}
              onChange={e => setNewOrder({ ...newOrder, deadline: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Order Notes for Neighbours</label>
            <textarea
              className="input h-20 resize-none text-xs"
              placeholder="Brief note to notify neighbouring village shopkeepers why we are pooling this order..."
              value={newOrder.description}
              onChange={e => setNewOrder({ ...newOrder, description: e.target.value })}
            />
          </div>
          <div className="flex gap-2.5 pt-2">
            <button type="button" onClick={() => setCreateModal(false)} className="btn-secondary flex-1 py-2.5 text-xs">Cancel</button>
            <button type="submit" className="btn-primary flex-1 py-2.5 text-xs">Publish Collective Order</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
