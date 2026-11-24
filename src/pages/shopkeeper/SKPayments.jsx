import { payments, paymentSummary } from '../../data/payments';
import { Badge } from '../../components/common/UIComponents';
import { CreditCard, TrendingDown, Clock, CheckCircle2, Download } from 'lucide-react';
import { toast } from 'sonner';

const myPayments = payments.filter(p => p.shopkeeperId === 'u1');
const summary = paymentSummary.u1;

export default function SKPayments() {
  return (
    <div className="space-y-5">
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80">
        <div>
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-1.5">
            Transparent Ledger
          </span>
          <h2 className="text-2xl font-extrabold text-[#17251F] tracking-tight">Payments & Ledger</h2>
          <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
            Track total wholesale spend, collective savings generated, and settlement status
          </p>
        </div>
        <button onClick={() => toast.success('Exporting GST compliant invoice summary...')} className="btn-secondary text-xs flex items-center gap-1.5 self-start sm:self-auto">
          <Download className="w-3.5 h-3.5" /> Download Invoices
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Purchases', value: `₹${summary.totalSpent.toLocaleString()}`, icon: CreditCard, color: 'text-[#17251F]' },
          { label: 'Total Savings Unlocked', value: `₹${summary.totalSavings.toLocaleString()}`, icon: TrendingDown, color: 'text-forest-700' },
          { label: 'Due On Delivery', value: `₹${summary.pendingAmount.toLocaleString()}`, icon: Clock, color: 'text-amber-600' },
          { label: 'Completed Settlements', value: summary.transactionCount, icon: CheckCircle2, color: 'text-blue-600' },
        ].map((s, i) => (
          <div key={i} className="glass-card p-5 border border-white/80">
            <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
            <div className={`text-xl font-extrabold tracking-tight ${s.color}`}>{s.value}</div>
            <div className="text-xs text-[#64746B] mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Payment History Table */}
      <div className="glass-card p-6 border border-white/80 space-y-4">
        <h3 className="font-bold text-sm text-[#17251F]">Transaction Ledger</h3>
        <div className="space-y-3">
          {myPayments.map((pay) => (
            <div
              key={pay.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/70 hover:bg-white/80 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  pay.status === 'completed' ? 'bg-green-100/80 text-green-700' : 'bg-amber-100/80 text-amber-700'
                }`}>
                  {pay.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#17251F]">{pay.description}</div>
                  <div className="text-[11px] text-[#64746B] mt-0.5">
                    Method: {pay.method} · Date: {pay.date} {pay.upiRef && `· Ref: ${pay.upiRef}`}
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col sm:items-end justify-between sm:justify-start gap-1">
                <div className="font-extrabold text-sm text-[#17251F]">₹{pay.amount.toLocaleString()}</div>
                {pay.savings > 0 && (
                  <div className="text-[11px] font-bold text-forest-700">Saved ₹{pay.savings.toLocaleString()}</div>
                )}
                <Badge status={pay.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
