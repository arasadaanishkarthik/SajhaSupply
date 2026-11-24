import { useState } from 'react';
import { suppliers } from '../../data/suppliers';
import { Building2, CheckCircle, Star, Phone, Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSuppliers() {
  const [list, setList] = useState(suppliers);

  const toggleVerify = (id) => {
    setList(prev => prev.map(s => s.id === id ? { ...s, verified: !s.verified } : s));
    toast.success('Supplier verification status updated');
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Verified Supplier Partners</h2>
        <p className="text-sm text-gray-500">Manage manufacturers, state wholesale depots, and agricultural cooperatives</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(s => (
          <div key={s.id} className="card p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-sm" style={{ backgroundColor: s.color }}>
                  {s.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
                  <div className="text-xs text-gray-500">{s.location}</div>
                </div>
              </div>
              <span className="flex items-center gap-0.5 text-xs font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {s.rating}
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{s.description}</p>

            <div className="grid grid-cols-2 gap-2 text-xs bg-page p-2.5 rounded-xl border border-gray-100">
              <div>
                <span className="text-gray-400">Monthly Volume</span>
                <div className="font-bold text-gray-900">₹{(s.monthlyRevenue/100000).toFixed(1)} Lakhs</div>
              </div>
              <div>
                <span className="text-gray-400">Total Orders</span>
                <div className="font-bold text-gray-900">{s.totalOrders} fulfilled</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
              <div className="text-gray-500">Contact: {s.contact}</div>
              <button
                onClick={() => toggleVerify(s.id)}
                className={`font-semibold px-2.5 py-1 rounded-lg text-xs ${
                  s.verified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {s.verified ? '✓ Verified' : 'Pending Verification'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
