import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Users, MapPin, Calendar, Clock, DollarSign, Package } from 'lucide-react';
import { groupOrders } from '../../data/groupOrders';
import { Badge, ProgressBar } from '../../components/common/UIComponents';
import { toast } from 'sonner';

export default function SupplierBulkRequests() {
  const [requests, setRequests] = useState(groupOrders);

  const handleAction = (id, action) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action === 'accept' ? 'confirmed' : 'cancelled' } : r));
    if (action === 'accept') {
      toast.success(`Bulk order confirmed and queued for fulfillment!`);
    } else {
      toast.error(`Bulk request declined.`);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Incoming Collective Bulk Requests</h2>
        <p className="text-sm text-gray-500">Review aggregated demand across multiple villages and confirm orders</p>
      </div>

      <div className="space-y-4">
        {requests.map(order => {
          const totalVal = order.currentQty * order.bulkPrice;
          const pct = Math.min(100, Math.round((order.currentQty / order.targetQty) * 100));

          return (
            <motion.div key={order.id} className="card p-5 hover:shadow-card-hover transition-all">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-gray-900">{order.productName}</h3>
                    <Badge status={order.status} />
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">{order.productVariant} · Request ID: {order.id}</div>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-xs text-gray-400">Total Bulk Value</div>
                    <div className="text-lg font-bold text-forest-600">₹{totalVal.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Target Volume</div>
                    <div className="text-base font-semibold text-gray-800">{order.currentQty} / {order.targetQty} units</div>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="py-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Aggregation Progress ({pct}%)</span>
                  <span>Closes: {order.deadline}</span>
                </div>
                <ProgressBar value={order.currentQty} max={order.targetQty} color={pct >= 100 ? 'forest' : 'amber'} />
              </div>

              {/* Participating villages */}
              <div className="py-3">
                <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-forest-600" />
                  Participating Village Hubs ({order.villages.length} Villages Combined):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {order.villages.map((v, idx) => (
                    <div key={idx} className="bg-page border border-gray-100 rounded-xl p-2.5">
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-800">
                        <MapPin className="w-3 h-3 text-forest-600" /> {v.villageName}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{v.qty} units ({v.shopkeepers} shops)</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500">
                  Agreed Bulk Price: <strong className="text-forest-700">₹{order.bulkPrice}/unit</strong> (Retail: ₹{order.unitPrice})
                </div>
                {order.status === 'active' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleAction(order.id, 'accept')} className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Accept & Lock Bulk Price
                    </button>
                    <button onClick={() => handleAction(order.id, 'reject')} className="btn-secondary text-xs py-2 px-3 text-red-600 border-red-200 hover:bg-red-50 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                )}
                {order.status === 'confirmed' && (
                  <div className="text-xs text-forest-600 font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Confirmed for Fulfillment
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
