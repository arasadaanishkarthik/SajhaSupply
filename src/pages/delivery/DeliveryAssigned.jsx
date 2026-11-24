import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, CheckCircle, Navigation, Phone, Calendar, ArrowRight } from 'lucide-react';
import { deliveries } from '../../data/deliveries';
import { Badge } from '../../components/common/UIComponents';
import { toast } from 'sonner';

export default function DeliveryAssigned() {
  const [items, setItems] = useState(deliveries.filter(d => d.deliveryPartnerId === 'u3'));

  const advanceStatus = (id) => {
    setItems(prev => prev.map(d => {
      if (d.id !== id) return d;
      let next = d.status;
      if (d.status === 'assigned') next = 'in-transit';
      else if (d.status === 'in-transit') next = 'delivered';
      return { ...d, status: next };
    }));
    toast.success('Delivery status updated!');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Assigned Village Deliveries</h2>
        <p className="text-sm text-gray-500">Pick up aggregated bulk orders from warehouse hubs and deliver to rural collection centers</p>
      </div>

      <div className="space-y-4">
        {items.map(del => (
          <div key={del.id} className="card p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-gray-900">{del.productName}</h3>
                  <Badge status={del.status} label={del.status.replace('-', ' ')} />
                </div>
                <div className="text-xs text-gray-500 mt-1">Delivery Task ID: {del.id} · Associated Order: {del.orderId}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{del.qty} units ({del.weight})</div>
                <div className="text-xs text-gray-500">Tempo 1.5 Ton Assigned</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 py-3">
              <div className="p-3 bg-page rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" /> Origin Depot:
                </div>
                <div className="text-sm font-medium text-gray-800">{del.pickupLocation}</div>
                <div className="text-xs text-gray-400 mt-0.5">{del.pickupAddress || 'Depot Center'}</div>
              </div>

              <div className="p-3 bg-forest-50/60 rounded-xl border border-forest-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 mb-1">
                  <Navigation className="w-3.5 h-3.5 text-forest-600" /> Village Drop Point:
                </div>
                <div className="text-sm font-bold text-forest-900">{del.dropLocation}</div>
                <div className="text-xs text-gray-500 mt-0.5">{del.dropAddress}</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Distance: <strong>{del.distance}</strong></span>
                <span>Est. Driving Time: <strong>{del.estimatedTime}</strong></span>
              </div>

              <div className="flex gap-2">
                <button onClick={() => toast.info('Calling Village Coordinator: Ramesh Yadav (+91 98765 11111)')} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Call Coordinator
                </button>

                {del.status === 'assigned' && (
                  <button onClick={() => advanceStatus(del.id)} className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Mark Picked Up & Start
                  </button>
                )}
                {del.status === 'in-transit' && (
                  <button onClick={() => advanceStatus(del.id)} className="btn-primary text-xs py-1.5 px-3 bg-green-600 hover:bg-green-700 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Confirm Village Delivery
                  </button>
                )}
                {del.status === 'delivered' && (
                  <span className="text-xs font-bold text-forest-700 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-forest-600" /> Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
