import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, DollarSign, Download, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { dashboardStats } from '../../data/aiInsights';
import { toast } from 'sonner';

export default function SupplierEarnings() {
  const stats = dashboardStats.supplier;

  const payouts = [
    { id: 'PAY-8921', date: '2024-11-20', amount: 420000, status: 'Settled', method: 'HDFC Direct Bank Transfer', ref: 'CMS77891230' },
    { id: 'PAY-8840', date: '2024-11-10', amount: 315000, status: 'Settled', method: 'NEFT Transfer', ref: 'CMS77810442' },
    { id: 'PAY-8702', date: '2024-10-31', amount: 250000, status: 'Settled', method: 'Direct Bank Transfer', ref: 'CMS77709212' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Supplier Earnings & Settlements</h2>
          <p className="text-sm text-gray-500">Track bulk sales revenue, average transaction volumes, and automated bank payouts</p>
        </div>
        <button onClick={() => toast.success('Downloading Financial Statement PDF...')} className="btn-secondary flex items-center gap-2 self-start text-xs">
          <Download className="w-3.5 h-3.5" /> Export Statements
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Current Month Revenue', val: '₹9,85,000', icon: DollarSign, color: 'text-forest-600' },
          { label: 'Cumulative Platform Sales', val: '₹48,20,000', icon: TrendingUp, color: 'text-gray-900' },
          { label: 'Average Bulk Order Value', val: '₹48,500', icon: ArrowUpRight, color: 'text-blue-600' },
          { label: 'Pending Settlement', val: '₹1,45,000', icon: CheckCircle2, color: 'text-amber-600' },
        ].map((item, idx) => (
          <div key={idx} className="card p-4">
            <item.icon className={`w-5 h-5 ${item.color} mb-2`} />
            <div className={`text-xl font-extrabold ${item.color}`}>{item.val}</div>
            <div className="text-xs text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <h3 className="font-bold text-gray-900 mb-4">Revenue Trend (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={stats.revenueByMonth}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#174C38" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#174C38" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Monthly Sales']} />
            <Area type="monotone" dataKey="revenue" stroke="#174C38" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-5">
        <h3 className="font-bold text-gray-900 mb-4">Recent Bank Settlements</h3>
        <div className="space-y-3">
          {payouts.map(p => (
            <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-page border border-gray-100 rounded-xl">
              <div>
                <div className="font-semibold text-sm text-gray-900">{p.id} · {p.method}</div>
                <div className="text-xs text-gray-500 mt-0.5">Reference: {p.ref} · Date: {p.date}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-base font-extrabold text-forest-700">₹{p.amount.toLocaleString()}</div>
                <span className="badge bg-green-100 text-green-700">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
