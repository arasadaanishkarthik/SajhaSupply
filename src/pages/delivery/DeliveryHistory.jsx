import { deliveries } from '../../data/deliveries';
import { Badge } from '../../components/common/UIComponents';
import { CheckCircle2, Clock, Calendar, Download, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function DeliveryHistory() {
  const completed = deliveries.filter(d => d.status === 'delivered');

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Delivery Fulfillment History</h2>
          <p className="text-sm text-gray-500">Record of verified village deliveries, signature logs, and earnings per route</p>
        </div>
        <button onClick={() => toast.success('Exporting Delivery Trip Logs...')} className="btn-secondary text-xs flex items-center gap-1.5 self-start">
          <Download className="w-3.5 h-3.5" /> Export History
        </button>
      </div>

      <div className="grid gap-3">
        {completed.map(del => (
          <div key={del.id} className="card p-4 hover:border-forest-200 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-green-50 text-green-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{del.productName} ({del.qty} units)</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span>Delivered to: <strong>{del.dropLocation}</strong></span>
                    <span>•</span>
                    <span>Distance: {del.distance}</span>
                    <span>•</span>
                    <span className="text-gray-400">Date: {del.deliveryDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Trip Earnings</div>
                  <div className="text-sm font-bold text-forest-700">₹1,200</div>
                </div>
                <span className="badge bg-green-100 text-green-800">Verified Drop</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
