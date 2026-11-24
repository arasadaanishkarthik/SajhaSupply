import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, Package, ShoppingBag, TrendingUp, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { dashboardStats } from '../../data/aiInsights';
import { users } from '../../data/users';
import { orders } from '../../data/orders';
import { villages } from '../../data/villages';
import { suppliers } from '../../data/suppliers';
import { StatCard, Badge } from '../../components/common/UIComponents';
import { groupOrders } from '../../data/groupOrders';

const stats = dashboardStats.admin;

export default function AdminOverview() {
  const recentActivity = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Overview</h2>
        <p className="text-gray-500 text-sm">Platform health and performance at a glance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="forest" trend={5} />
        <StatCard title="Shopkeepers" value={stats.totalShopkeepers} icon={ShoppingBag} color="blue" />
        <StatCard title="Total Villages" value={stats.totalVillages} icon={MapPin} color="amber" />
        <StatCard title="Procurement Value" value={`₹${(stats.totalProcurementValue / 100000).toFixed(1)}L`} icon={TrendingUp} color="purple" trend={12} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Collective Orders" value={stats.totalCollectiveOrders} icon={Package} color="forest" />
        <StatCard title="Total Suppliers" value={stats.totalSuppliers} icon={CheckCircle} color="blue" />
        <StatCard title="Completed Orders" value={stats.completedOrders} icon={CheckCircle} color="amber" />
        <StatCard title="Savings Generated" value={`₹${(stats.totalSavingsGenerated / 1000).toFixed(0)}K`} icon={TrendingUp} color="purple" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Platform Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={stats.platformActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#174C38" strokeWidth={2} dot={{ fill: '#174C38' }} name="Orders" />
              <Line type="monotone" dataKey="users" stroke="#F4B860" strokeWidth={2} dot={{ fill: '#F4B860' }} name="Users" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Villages */}
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Village Overview</h3>
          <div className="space-y-3">
            {villages.map((v, i) => (
              <div key={v.id} className="flex items-center justify-between p-3 bg-page rounded-xl">
                <div>
                  <div className="font-semibold text-sm text-gray-900">{v.name}</div>
                  <div className="text-xs text-gray-500">{v.district} · {v.activeShopkeepers} active shops</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-forest-600 text-sm">₹{(v.totalSavings / 1000).toFixed(1)}K saved</div>
                  <div className="text-xs text-gray-400">{v.totalOrders} orders</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-900 mb-4">Recent Platform Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Order ID', 'Product', 'Village', 'Amount', 'Type', 'Status'].map(h => (
                  <th key={h} className="text-left pb-2 text-xs font-semibold text-gray-500 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentActivity.map(o => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="py-2.5 text-xs text-gray-500 pr-4">{o.id}</td>
                  <td className="py-2.5 font-medium text-gray-800 pr-4">{o.productName}</td>
                  <td className="py-2.5 text-gray-600 pr-4">{o.village}</td>
                  <td className="py-2.5 font-semibold pr-4">₹{o.totalAmount.toLocaleString()}</td>
                  <td className="py-2.5 pr-4"><Badge status={o.orderType} label={o.orderType === 'collective' ? '🤝 Collective' : '👤 Individual'} /></td>
                  <td className="py-2.5"><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suppliers */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-900 mb-4">Registered Suppliers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map(s => (
            <div key={s.id} className="p-4 bg-page rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-sm" style={{ backgroundColor: s.color }}>
                  {s.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.location}</div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{s.totalOrders} orders</span>
                <span>★ {s.rating}</span>
                <Badge status={s.verified ? 'verified' : 'pending'} label={s.verified ? '✓ Verified' : 'Pending'} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
