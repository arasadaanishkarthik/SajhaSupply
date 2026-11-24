import { useState } from 'react';
import { orders } from '../../data/orders';
import { Badge } from '../../components/common/UIComponents';
import { Search, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminOrders() {
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = orders
    .filter(o => filter === 'all' || o.status === filter)
    .filter(o => typeFilter === 'all' || o.orderType === typeFilter)
    .filter(o => o.productName.toLowerCase().includes(search.toLowerCase()) || o.village.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Platform Order Monitoring</h2>
          <p className="text-sm text-gray-500">Real-time surveillance of collective village requests and fulfillment pipeline</p>
        </div>
        <button onClick={() => toast.success('Exporting Platform Orders CSV...')} className="btn-secondary text-xs flex items-center gap-1.5 self-start">
          <Download className="w-3.5 h-3.5" /> Export All Orders
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            className="input pl-10"
            placeholder="Search by order ID, product, or village..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <select className="input sm:w-44" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="all">All Order Types</option>
          <option value="collective">Collective Only</option>
          <option value="individual">Individual Only</option>
        </select>
        <select className="input sm:w-40" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="confirmed">Confirmed</option>
          <option value="processing">Processing</option>
          <option value="dispatched">Dispatched</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Product Details</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Village Hub</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Supplier</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Amount & Savings</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(o => (
                <tr key={o.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-600">{o.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-gray-900">{o.productName}</div>
                    <div className="text-xs text-gray-500">{o.qty} units ({o.productVariant})</div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{o.village}</td>
                  <td className="py-3 px-4 text-gray-600 text-xs">{o.supplierName}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">₹{o.totalAmount.toLocaleString()}</div>
                    {o.savings > 0 && <div className="text-xs text-forest-600 font-semibold">Saved ₹{o.savings.toLocaleString()}</div>}
                  </td>
                  <td className="py-3 px-4">
                    <Badge status={o.orderType} label={o.orderType === 'collective' ? '🤝 Collective' : '👤 Individual'} />
                  </td>
                  <td className="py-3 px-4"><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
