import { useState } from 'react';
import { products } from '../../data/products';
import { DollarSign, Percent, Award, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function SupplierPricing() {
  const [items, setItems] = useState([
    { id: 'p1', name: 'Fortune Sunflower Oil (1L)', base: 125, tiers: [{ qty: 200, price: 112 }, { qty: 500, price: 108 }, { qty: 1000, price: 103 }] },
    { id: 'p2', name: 'Aashirvaad Atta (5kg)', base: 220, tiers: [{ qty: 100, price: 210 }, { qty: 300, price: 198 }, { qty: 500, price: 190 }] },
    { id: 'p5', name: 'Toor Dal (Arhar) (1kg)', base: 148, tiers: [{ qty: 150, price: 140 }, { qty: 400, price: 132 }, { qty: 800, price: 126 }] },
  ]);

  const updateTier = (itemId, tierIdx, newPrice) => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      const updatedTiers = [...item.tiers];
      updatedTiers[tierIdx] = { ...updatedTiers[tierIdx], price: Number(newPrice) };
      return { ...item, tiers: updatedTiers };
    }));
  };

  const handleSave = () => {
    toast.success('Volume discount tiers saved successfully!');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Bulk Pricing & Volume Tiers</h2>
          <p className="text-sm text-gray-500">Configure collective volume threshold discounts for participating village networks</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex items-center gap-2 self-start">
          <Save className="w-4 h-4" /> Save Discount Tiers
        </button>
      </div>

      <div className="grid gap-4">
        {items.map(item => (
          <div key={item.id} className="card p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-base text-gray-900">{item.name}</h3>
                <div className="text-xs text-gray-500">Standard Individual Price: ₹{item.base}</div>
              </div>
              <div className="text-xs font-semibold text-forest-700 bg-forest-50 px-3 py-1.5 rounded-xl border border-forest-100">
                AI Suggested Bulk Floor: ₹{Math.round(item.base * 0.82)}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {item.tiers.map((tier, idx) => {
                const discount = Math.round(((item.base - tier.price) / item.base) * 100);
                const labels = ['Tier 1 (Bronze)', 'Tier 2 (Silver)', 'Tier 3 (Gold)'];

                return (
                  <div key={idx} className="bg-page border border-gray-200 rounded-xl p-3.5">
                    <div className="text-xs font-bold text-gray-600 mb-1">{labels[idx]}</div>
                    <div className="text-xs text-gray-400 mb-3">Unlocked at {tier.qty}+ combined units</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-600">₹</span>
                      <input
                        type="number"
                        className="input py-1.5 px-2.5 text-sm font-bold text-gray-900"
                        value={tier.price}
                        onChange={e => updateTier(item.id, idx, e.target.value)}
                      />
                    </div>
                    <div className="mt-2 text-xs font-medium text-forest-600">
                      {discount}% discount (Saves ₹{item.base - tier.price}/unit)
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
