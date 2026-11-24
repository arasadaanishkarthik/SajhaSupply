import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, TrendingUp, ShoppingBag, AlertCircle, Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { products } from '../../data/products';
import { groupOrders } from '../../data/groupOrders';
import { dashboardStats } from '../../data/aiInsights';
import { StatCard, Badge, Modal } from '../../components/common/UIComponents';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';

const stats = dashboardStats.supplier;
const COLORS = ['#174C38', '#2F7655', '#F4B860', '#6B7280'];

export default function SupplierOverview() {
  const { currentUser } = useAuth();
  const myProducts = products.filter(p => p.supplierId === 's2');
  const bulkRequests = groupOrders.filter(go => go.supplierId === 's2' || go.status === 'active').slice(0, 4);
  const [modal, setModal] = useState(null);
  const [localProds, setLocalProds] = useState(myProducts);

  const handleAccept = (go) => {
    toast.success(`Bulk request accepted: ${go.productName}`);
    setModal(null);
  };
  const handleReject = (go) => {
    toast.error(`Bulk request declined: ${go.productName}`);
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Supplier Dashboard</h2>
          <p className="text-gray-500 text-sm">{currentUser?.company || 'Your Company'}</p>
        </div>
        <button className="btn-primary flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Products" value={stats.totalProducts} icon={Package} color="forest" />
        <StatCard title="Active Orders" value={stats.activeOrders} icon={ShoppingBag} color="blue" />
        <StatCard title="Pending Requests" value={stats.pendingRequests} icon={AlertCircle} color="amber" />
        <StatCard title="Monthly Revenue" value={`₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`} icon={TrendingUp} color="purple" trend={8} />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Monthly Revenue (₹)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#174C38" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Orders by Category</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={stats.ordersByCategory} dataKey="orders" nameKey="category" cx="50%" cy="50%" outerRadius={70} label={({ category, percent }) => `${(percent * 100).toFixed(0)}%`}>
                  {stats.ordersByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {stats.ordersByCategory.map((c, i) => (
              <span key={i} className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} /> {c.category}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bulk Requests */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-900 mb-4">Incoming Bulk Requests</h3>
        <div className="space-y-3">
          {bulkRequests.map((go, i) => (
            <div key={go.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-page rounded-xl border border-gray-100">
              <div>
                <div className="font-semibold text-sm text-gray-900">{go.productName} · {go.productVariant}</div>
                <div className="text-xs text-gray-500 mt-0.5">{go.villages.length} villages · {go.currentQty} units · Deadline: {go.deadline}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right mr-2">
                  <div className="text-xs text-gray-500">Bulk Price</div>
                  <div className="font-bold text-forest-600">₹{go.bulkPrice}</div>
                </div>
                {go.status === 'active' && (
                  <>
                    <button onClick={() => { toast.success(`Accepted: ${go.productName}`); }} className="btn-primary py-1.5 px-3 text-xs flex items-center gap-1">
                      <Check className="w-3 h-3" /> Accept
                    </button>
                    <button onClick={() => { toast.error(`Declined: ${go.productName}`); }} className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1 text-red-600 border-red-200">
                      <X className="w-3 h-3" /> Decline
                    </button>
                  </>
                )}
                {go.status !== 'active' && <Badge status={go.status} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Products */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">My Products</h3>
          <button className="btn-primary flex items-center gap-1 text-xs py-2 px-3">
            <Plus className="w-3 h-3" /> Add
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Product', 'Category', 'Unit Price', 'Bulk Price', 'Stock', 'Actions'].map(h => (
                  <th key={h} className="text-left pb-2 text-xs font-semibold text-gray-500 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {localProds.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-2.5 font-medium text-gray-800 pr-4">{p.name} <span className="text-xs text-gray-400">{p.variant}</span></td>
                  <td className="py-2.5 text-gray-500 pr-4">{p.category}</td>
                  <td className="py-2.5 font-semibold pr-4">₹{p.unitPrice}</td>
                  <td className="py-2.5 text-forest-600 font-semibold pr-4">₹{p.bulkPrice}</td>
                  <td className="py-2.5 pr-4">
                    <span className={`font-medium ${p.stock < 500 ? 'text-orange-600' : 'text-gray-700'}`}>{p.stock}</span>
                  </td>
                  <td className="py-2.5">
                    <div className="flex gap-1">
                      <button onClick={() => toast.success('Edit mode (demo)')} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => toast.error('Deleted (demo)')} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
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
