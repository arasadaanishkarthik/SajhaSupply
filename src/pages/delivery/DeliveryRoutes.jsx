import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Compass, Truck, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { villages } from '../../data/villages';

export default function DeliveryRoutes() {
  const [selectedVillage, setSelectedVillage] = useState(villages[0]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Optimized Logistics Routing</h2>
        <p className="text-sm text-gray-500">AI-suggested cluster drop paths combining deliveries into cost-effective rural loops</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Interactive Map Visual */}
        <div className="lg:col-span-2 card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-forest-600" /> Central Lucknow Hub ➔ North UP Cluster
            </h3>
            <span className="badge bg-forest-50 text-forest-700 border border-forest-100">
              Optimal Loop: 184 km total
            </span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-80 bg-gradient-to-br from-gray-50 via-forest-50/40 to-green-50/60 rounded-2xl border border-gray-200 overflow-hidden p-6 flex flex-col justify-between">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Route lines */}
              <path d="M 60 160 Q 180 80 280 110 T 480 180" fill="none" stroke="#2F7655" strokeWidth="3" strokeDasharray="6 4" className="animate-pulse" />
              <path d="M 280 110 L 360 240 L 480 180" fill="none" stroke="#F4B860" strokeWidth="2.5" strokeDasharray="4 4" />
            </svg>

            {/* Hub marker */}
            <div className="absolute left-10 top-36 z-10">
              <div className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" /> Central Depot (Lucknow)
              </div>
            </div>

            {/* Village nodes */}
            {villages.map((v, i) => {
              const positions = [
                { left: '38%', top: '22%' },
                { left: '68%', top: '48%' },
                { left: '50%', top: '68%' },
                { left: '26%', top: '62%' },
                { left: '80%', top: '25%' },
              ];
              const pos = positions[i] || { left: '50%', top: '50%' };
              const isSelected = selectedVillage.id === v.id;

              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVillage(v)}
                  style={{ left: pos.left, top: pos.top }}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl transition-all shadow-md flex items-center gap-1.5 ${
                    isSelected ? 'bg-forest-600 text-white scale-110 ring-4 ring-forest-200' : 'bg-white text-gray-800 hover:bg-forest-50'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-brand' : 'text-forest-600'}`} />
                  <span className="text-xs font-bold whitespace-nowrap">{v.name}</span>
                </button>
              );
            })}

            <div className="relative z-10 self-end mt-auto bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-gray-200 text-xs text-gray-600 max-w-xs shadow-sm">
              <div className="font-semibold text-gray-900 mb-0.5">Route Consolidation Benefit</div>
              Saving 42 liters of diesel vs separate individual village runs. Co2 reduction: 38%.
            </div>
          </div>
        </div>

        {/* Selected Stop Details */}
        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-forest-50 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-forest-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{selectedVillage.name} Hub</h3>
              <div className="text-xs text-gray-500">District: {selectedVillage.district}, UP</div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between p-2.5 bg-page rounded-xl">
              <span className="text-gray-500">Active Shopkeepers</span>
              <span className="font-bold text-gray-900">{selectedVillage.activeShopkeepers} of {selectedVillage.totalShopkeepers}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-page rounded-xl">
              <span className="text-gray-500">Pincode</span>
              <span className="font-mono font-semibold text-gray-900">{selectedVillage.pincode}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-page rounded-xl">
              <span className="text-gray-500">Coordinator</span>
              <span className="font-semibold text-gray-900">{selectedVillage.coordinator}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-page rounded-xl">
              <span className="text-gray-500">Contact</span>
              <span className="font-mono text-gray-900">{selectedVillage.phone}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-forest-50 rounded-xl">
              <span className="text-forest-700 font-medium">Cumulative Savings</span>
              <span className="font-bold text-forest-700">₹{selectedVillage.totalSavings.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs font-semibold text-gray-700 mb-2">Turn-by-turn Waypoint Sequence</div>
            <div className="space-y-2 text-xs">
              {['1. Lucknow NH-24 Bypass Depot', '2. Rampur Panchayat Bhavan Drop', '3. Shivpur Village Chowk Point', '4. Anandpur Provision Distribution'].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-600">
                  <div className="w-4 h-4 rounded-full bg-forest-100 text-forest-700 flex items-center justify-center font-bold text-[10px]">
                    {i + 1}
                  </div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
