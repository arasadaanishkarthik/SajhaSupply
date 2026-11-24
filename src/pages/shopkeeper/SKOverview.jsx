import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, TrendingDown, Truck, ShoppingBag, Users, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatCard, Badge, ProgressBar } from '../../components/common/UIComponents';
import { dashboardStats, aiInsights } from '../../data/aiInsights';
import { orders } from '../../data/orders';
import { groupOrders } from '../../data/groupOrders';

const stats = dashboardStats.shopkeeper;

export default function SKOverview() {
  const { currentUser } = useAuth();
  const myOrders = orders.filter(o => o.shopkeeperId === 'u1').slice(0, 5);
  const activeGOs = groupOrders.filter(go => go.status === 'active').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Bar in Frosted Glass */}
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80">
        <div>
          <div className="text-xs font-bold text-forest-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-forest-600 animate-pulse" /> Shopkeeper Portal
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17251F] tracking-tight">
            Namaste, {currentUser?.name?.split(' ')[0]} 👋
          </h2>
          <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
            {currentUser?.shopName || 'Yadav General Store'} · {currentUser?.village} Village Hub ({currentUser?.district}, UP)
          </p>
        </div>
        <Link to="/dashboard/shopkeeper/group-orders" className="btn-primary flex items-center gap-2 self-start sm:self-auto text-xs py-2.5 px-4 shadow-md">
          <Users className="w-4 h-4" /> Browse Group Orders
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Orders" value={stats.totalOrders} icon={ShoppingBag} color="forest" trend={8} />
        <StatCard title="Active Group Orders" value={stats.activeGroupOrders} icon={Users} color="blue" />
        <StatCard title="Total Savings" value={`₹${stats.totalSavings.toLocaleString()}`} icon={TrendingDown} color="amber" trend={12} />
        <StatCard title="Pending Deliveries" value={stats.pendingDeliveries} icon={Truck} color="purple" />
      </div>

      {/* Chart + AI Recommendations */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="glass-card p-5 lg:col-span-2 border border-white/80">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#17251F]">Procurement & Savings Activity</h3>
              <p className="text-xs text-[#64746B]">Monthly order frequency vs rupee savings unlocked</p>
            </div>
            <span className="badge bg-forest-50/80 text-forest-700 border border-forest-100">6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={aiInsights.monthlyActivity} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f3f1" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64746B' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64746B' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.8)', fontSize: '12px' }}
                formatter={(v, n) => [n === 'savings' ? `₹${v}` : v, n === 'savings' ? 'Savings' : 'Orders Placed']}
              />
              <Bar dataKey="orders" fill="#174C38" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savings" fill="#F4B860" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div className="glass-card p-5 border border-white/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-purple-100/80 rounded-lg flex items-center justify-center text-purple-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#17251F]">Smart AI Advice</h3>
            </div>
            <div className="space-y-2.5">
              {aiInsights.recommendations.slice(0, 3).map((rec, i) => (
                <div key={i} className={`p-3 rounded-xl border text-xs ${
                  rec.priority === 'high' ? 'bg-red-50/60 border-red-100' : 'bg-forest-50/60 border-forest-100'
                }`}>
                  <div className="font-bold text-[#17251F] mb-0.5">{rec.title}</div>
                  <div className="text-[#64746B] leading-relaxed line-clamp-2">{rec.description}</div>
                  {rec.saving > 0 && (
                    <div className="text-forest-700 font-bold mt-1">Unlock ₹{rec.saving.toLocaleString()} savings</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <Link to="/dashboard/shopkeeper/ai-insights" className="flex items-center gap-1 text-xs text-forest-700 font-bold mt-3 hover:gap-1.5 transition-all">
            Open AI Assistant <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Active Group Orders */}
      <div className="glass-card p-5 border border-white/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-[#17251F]">Active Village Group Orders</h3>
            <p className="text-xs text-[#64746B]">Orders currently pooling demand across neighbouring villages</p>
          </div>
          <Link to="/dashboard/shopkeeper/group-orders" className="text-xs text-forest-700 font-bold hover:underline">
            View All (8)
          </Link>
        </div>
        <div className="space-y-3.5">
          {activeGOs.map(go => {
            const pct = Math.round((go.currentQty / go.targetQty) * 100);
            return (
              <div key={go.id} className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2.5">
                  <div>
                    <div className="font-bold text-sm text-[#17251F]">{go.productName} ({go.productVariant})</div>
                    <div className="text-xs text-[#64746B] mt-0.5">
                      {go.villages.length} collaborating villages · Supplier: {go.supplierName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] text-[#64746B]">Wholesale Discount</div>
                    <div className="font-extrabold text-forest-700 text-sm">Save ₹{go.savingsPerUnit}/unit</div>
                  </div>
                </div>
                <ProgressBar value={go.currentQty} max={go.targetQty} />
                <div className="flex justify-between text-[11px] text-[#64746B] mt-1.5">
                  <span className="font-medium text-[#17251F]">{go.currentQty} of {go.targetQty} units collected ({pct}%)</span>
                  <span>Closes: {go.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="glass-card p-5 border border-white/80 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-sm text-[#17251F]">Recent Purchases</h3>
            <p className="text-xs text-[#64746B]">Your shop's latest fulfillment transactions</p>
          </div>
          <Link to="/dashboard/shopkeeper/tracking" className="text-xs text-forest-700 font-bold hover:underline">
            Track Deliveries
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-left text-[#64746B]">
                <th className="pb-2.5 font-bold uppercase tracking-wider">Order ID</th>
                <th className="pb-2.5 font-bold uppercase tracking-wider">Product</th>
                <th className="pb-2.5 font-bold uppercase tracking-wider">Qty</th>
                <th className="pb-2.5 font-bold uppercase tracking-wider">Amount</th>
                <th className="pb-2.5 font-bold uppercase tracking-wider">Type</th>
                <th className="pb-2.5 font-bold uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/60">
              {myOrders.map(o => (
                <tr key={o.id} className="hover:bg-white/60 transition-colors">
                  <td className="py-2.5 font-mono text-[#64746B]">{o.id}</td>
                  <td className="py-2.5 font-bold text-[#17251F]">{o.productName}</td>
                  <td className="py-2.5 text-[#17251F]">{o.qty} units</td>
                  <td className="py-2.5 font-extrabold text-[#17251F]">₹{o.totalAmount.toLocaleString()}</td>
                  <td className="py-2.5">
                    <Badge status={o.orderType} label={o.orderType === 'collective' ? '🤝 Collective' : '👤 Individual'} />
                  </td>
                  <td className="py-2.5"><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
