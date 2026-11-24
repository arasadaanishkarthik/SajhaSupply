import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import { orders } from '../../data/orders';
import { deliveries } from '../../data/deliveries';
import { Badge } from '../../components/common/UIComponents';
import { toast } from 'sonner';

const myOrders = orders.filter(o => o.shopkeeperId === 'u1');

const timelineIcons = {
  assigned: Clock,
  pickup: Package,
  transit: Truck,
  delivered: CheckCircle,
};

export default function SKTracking() {
  const [selectedOrder, setSelectedOrder] = useState(myOrders[0]);
  const delivery = deliveries.find(d => d.id === selectedOrder?.deliveryId);

  return (
    <div className="space-y-5">
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80">
        <div>
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-1.5">
            Logistics Pipeline
          </span>
          <h2 className="text-2xl font-extrabold text-[#17251F] tracking-tight">Order & Delivery Tracking</h2>
          <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
            Monitor consolidated dispatches from regional manufacturing hubs to your village distribution point
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Order Selector List */}
        <div className="lg:col-span-2 space-y-3">
          {myOrders.map(order => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selectedOrder?.id === order.id
                  ? 'glass-card border-forest-600 ring-2 ring-forest-500/20 shadow-md bg-white/90'
                  : 'glass-card-subtle hover:bg-white/70'
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#17251F]">{order.productName}</div>
                  <div className="text-[11px] text-[#64746B] mt-0.5">{order.productVariant} · Qty: {order.qty}</div>
                </div>
                <Badge status={order.status} />
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100/60 flex justify-between text-xs">
                <span className="font-extrabold text-[#17251F]">₹{order.totalAmount.toLocaleString()}</span>
                {order.savings > 0 && <span className="text-forest-700 font-bold">Saved ₹{order.savings.toLocaleString()}</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Order Detailed Tracking Panel */}
        <div className="lg:col-span-3">
          {selectedOrder && (
            <motion.div
              key={selectedOrder.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 border border-white/80 space-y-5"
            >
              <div className="flex items-start justify-between pb-3 border-b border-gray-100/80">
                <div>
                  <h3 className="font-extrabold text-base text-[#17251F]">{selectedOrder.productName}</h3>
                  <div className="text-xs text-[#64746B] mt-0.5">
                    Order Ref: <span className="font-mono text-[#17251F] font-semibold">{selectedOrder.id}</span> · {selectedOrder.orderType === 'collective' ? '🤝 Village Collective Order' : '👤 Individual Order'}
                  </div>
                </div>
                <Badge status={selectedOrder.status} />
              </div>

              {/* Order Meta Matrix */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/60 p-3 rounded-xl border border-white/80">
                  <div className="text-[#64746B]">Verified Supplier</div>
                  <div className="font-bold text-[#17251F] mt-0.5">{selectedOrder.supplierName}</div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl border border-white/80">
                  <div className="text-[#64746B]">Total Amount</div>
                  <div className="font-extrabold text-forest-700 mt-0.5">₹{selectedOrder.totalAmount.toLocaleString()}</div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl border border-white/80">
                  <div className="text-[#64746B]">Order Date</div>
                  <div className="font-semibold text-[#17251F] mt-0.5">{selectedOrder.orderDate}</div>
                </div>
                <div className="bg-white/60 p-3 rounded-xl border border-white/80">
                  <div className="text-[#64746B]">Expected Delivery Arrival</div>
                  <div className="font-bold text-[#17251F] mt-0.5">{selectedOrder.deliveryDate || 'Scheduled on Lock-In'}</div>
                </div>
              </div>

              {/* Waypoint Timeline */}
              {delivery && delivery.timeline.length > 0 && (
                <div className="pt-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#64746B] mb-4">
                    Fulfillment Milestones
                  </h4>
                  <div className="relative pl-6 space-y-4">
                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-200" />
                    {delivery.timeline.map((step, i) => {
                      const Icon = timelineIcons[step.status] || Clock;
                      return (
                        <div key={i} className="flex items-start gap-3 relative">
                          <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center shadow-xs ${
                            step.done ? 'bg-forest-600 text-white' : 'bg-gray-200 text-gray-400'
                          }`}>
                            <Icon className="w-3 h-3" />
                          </div>
                          <div>
                            <div className={`text-xs font-bold ${step.done ? 'text-[#17251F]' : 'text-gray-400'}`}>
                              {step.label}
                            </div>
                            <div className="text-[11px] text-[#64746B]">{step.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Depot to Village Hub Locations */}
              {delivery && (
                <div className="p-4 bg-white/60 rounded-xl border border-white/80 text-xs space-y-2.5">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#64746B]">Origin Depot:</span>
                      <div className="font-semibold text-[#17251F]">{delivery.pickupLocation}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#64746B]">Village Collection Hub:</span>
                      <div className="font-bold text-forest-900">{delivery.dropLocation} ({delivery.dropAddress})</div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100 text-[11px] text-[#64746B]">
                    <span>Transit Distance: <strong>{delivery.distance}</strong></span>
                    <span>Assigned Driver: <strong>{delivery.partnerName || 'Central Route Tempo'}</strong></span>
                  </div>
                </div>
              )}

              {!delivery && (
                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-800">
                  ℹ️ Order is currently gathering volume in Rampur cluster. Delivery partner will be assigned automatically upon order threshold lock-in.
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
