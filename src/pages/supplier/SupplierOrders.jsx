import { useState } from 'react';
import { orders } from '../../data/orders';
import { Badge } from '../../components/common/UIComponents';
import { Package, Truck, CheckCircle, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

export default function SupplierOrders() {
  const [filter, setFilter] = useState('all');
  const [orderList, setOrderList] = useState(orders);

  const filtered = filter === 'all' ? orderList : orderList.filter(o => o.status === filter);

  const updateStatus = (id, newStatus) => {
    setOrderList(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    toast.success(`Order ${id} marked as ${newStatus}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Supplier Order Fulfillment</h2>
          <p className="text-sm text-gray-500">Manage order preparation, packaging, and dispatch to delivery partners</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {['all', 'confirmed', 'processing', 'dispatched', 'delivered'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all capitalize ${
              filter === f ? 'bg-forest-600 text-white border-forest-600' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {f === 'all' ? 'All Orders' : f}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Destination Village</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Units</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600 text-xs">Dispatch Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">{order.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">{order.productName}</div>
                    <div className="text-xs text-gray-500">{order.orderType === 'collective' ? '🤝 Collective Order' : 'Individual'}</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{order.village}</td>
                  <td className="py-3 px-4 text-gray-700">{order.qty} units</td>
                  <td className="py-3 px-4 font-bold text-gray-900">₹{order.totalAmount.toLocaleString()}</td>
                  <td className="py-3 px-4"><Badge status={order.status} /></td>
                  <td className="py-3 px-4 text-right">
                    {order.status === 'confirmed' && (
                      <button onClick={() => updateStatus(order.id, 'processing')} className="btn-secondary text-xs py-1 px-3">
                        Pack Order
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button onClick={() => updateStatus(order.id, 'dispatched')} className="btn-primary text-xs py-1 px-3">
                        Dispatch
                      </button>
                    )}
                    {(order.status === 'dispatched' || order.status === 'delivered') && (
                      <span className="text-xs text-forest-600 font-semibold">✓ Dispatched</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
