import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, CheckCircle, Clock, MapPin, Navigation } from 'lucide-react';
import { deliveries } from '../../data/deliveries';
import { dashboardStats } from '../../data/aiInsights';
import { StatCard, Badge } from '../../components/common/UIComponents';
import { toast } from 'sonner';

const stats = dashboardStats.delivery;

const statusOptions = ['assigned', 'in-transit', 'delivered'];

export default function DeliveryOverview() {
  const [myDeliveries, setMyDeliveries] = useState(deliveries.filter(d => d.deliveryPartnerId === 'u3'));

  const updateStatus = (id, newStatus) => {
    setMyDeliveries(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    toast.success(`Status updated to: ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Delivery Dashboard</h2>
        <p className="text-gray-500 text-sm">Manage your assigned deliveries and routes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Assigned" value={stats.totalAssigned} icon={Truck} color="forest" />
        <StatCard title="Pending" value={stats.pending} icon={Clock} color="amber" />
        <StatCard title="In Transit" value={stats.inTransit} icon={Navigation} color="blue" />
        <StatCard title="Completed" value={stats.completed} icon={CheckCircle} color="purple" />
      </div>

      {/* Deliveries */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900">Assigned Deliveries</h3>
        {myDeliveries.map((del, i) => (
          <motion.div
            key={del.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div>
                <div className="font-bold text-gray-900">{del.productName}</div>
                <div className="text-sm text-gray-500">Qty: {del.qty} · {del.weight}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge status={del.status} label={del.status.replace('-', ' ')} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-start gap-2 p-3 bg-page rounded-xl">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium">Pickup</div>
                  <div className="text-sm text-gray-800">{del.pickupLocation}</div>
                  {del.pickupDate && <div className="text-xs text-gray-400">Date: {del.pickupDate}</div>}
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 bg-page rounded-xl">
                <MapPin className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500 font-medium">Delivery</div>
                  <div className="text-sm text-gray-800">{del.dropLocation}</div>
                  <div className="text-xs text-gray-400">Expected: {del.expectedDelivery || del.deliveryDate}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex gap-4 text-xs text-gray-500">
                <span>Distance: {del.distance}</span>
                <span>Est. Time: {del.estimatedTime}</span>
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-1">
                {del.timeline.map((step, si) => (
                  <div key={si} className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.done ? 'bg-forest-600' : 'bg-gray-200'}`}>
                      <span className="text-white text-xs">{si + 1}</span>
                    </div>
                    {si < del.timeline.length - 1 && <div className={`w-4 h-0.5 ${step.done && del.timeline[si + 1].done ? 'bg-forest-600' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>

              {/* Update Status */}
              {del.status !== 'delivered' && del.status !== 'pending-assignment' && (
                <div className="flex gap-2">
                  {del.status === 'assigned' && (
                    <button onClick={() => updateStatus(del.id, 'in-transit')} className="btn-primary flex items-center gap-1 text-xs py-1.5">
                      <Truck className="w-3 h-3" /> Start Pickup
                    </button>
                  )}
                  {del.status === 'in-transit' && (
                    <button onClick={() => updateStatus(del.id, 'delivered')} className="btn-primary flex items-center gap-1 text-xs py-1.5 bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-3 h-3" /> Mark Delivered
                    </button>
                  )}
                </div>
              )}
              {del.status === 'delivered' && (
                <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Delivered on {del.deliveryDate}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-900 mb-3">Route Map</h3>
        <div className="bg-gradient-to-br from-forest-50 to-green-50 rounded-2xl h-56 border border-forest-100 flex flex-col items-center justify-center gap-3">
          <Navigation className="w-10 h-10 text-forest-400" />
          <div className="text-center">
            <div className="font-semibold text-gray-700">Interactive Route Map</div>
            <div className="text-sm text-gray-500 mt-1">Lucknow → Rampur Village (82 km)</div>
            <div className="text-xs text-gray-400 mt-1">Route visualization powered by sample data</div>
          </div>
          <div className="flex gap-2">
            {['Rampur', 'Shivpur', 'Anandpur', 'Devgaon'].map(v => (
              <span key={v} className="text-xs bg-white text-forest-700 border border-forest-200 px-2 py-1 rounded-full font-medium">{v}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
