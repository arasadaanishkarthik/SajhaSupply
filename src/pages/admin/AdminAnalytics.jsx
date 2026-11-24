import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { dashboardStats } from '../../data/aiInsights';
import { villages } from '../../data/villages';

const COLORS = ['#174C38', '#2F7655', '#78B683', '#F4B860', '#6B7280'];

export default function AdminAnalytics() {
  const stats = dashboardStats.admin;

  const villageSavingsData = villages.map(v => ({
    name: v.name,
    savings: v.totalSavings,
    orders: v.totalOrders,
  }));

  const categoryShare = [
    { name: 'Cooking Oil', value: 38 },
    { name: 'Rice & Grains', value: 27 },
    { name: 'Pulses', value: 16 },
    { name: 'Dairy', value: 12 },
    { name: 'Personal Care', value: 7 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Platform Analytics & Intelligence</h2>
        <p className="text-sm text-gray-500">Deep-dive into collective bargaining impact, economic savings generated, and demand shifts</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Total Savings Generated Per Village (₹)</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={villageSavingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Community Savings']} />
              <Bar dataKey="savings" fill="#174C38" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">Order Volume Share by Product Category</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                  {categoryShare.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card p-5">
        <h3 className="font-bold text-gray-900 mb-4">Monthly Platform Growth: User Base vs Collective Orders</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={stats.platformActivity}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#174C38" strokeWidth={3} dot={{ fill: '#174C38', r: 4 }} name="Total Orders" />
            <Line type="monotone" dataKey="users" stroke="#F4B860" strokeWidth={3} dot={{ fill: '#F4B860', r: 4 }} name="Registered Users" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
