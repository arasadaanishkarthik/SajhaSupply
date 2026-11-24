import { useState } from 'react';
import { Save, Bell, Shield, Sliders, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    minBulkThreshold: 500,
    platformFeePercent: 1.5,
    autoAssignDelivery: true,
    emailAlerts: true,
    smsAlertsToVillages: true,
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('System settings saved and applied across platform!');
  };

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Platform System Configuration</h2>
        <p className="text-sm text-gray-500">Fine-tune automated collective thresholds, logistics allocation and alerts</p>
      </div>

      <form onSubmit={handleSave} className="card p-6 space-y-6">
        <div>
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-forest-600" /> Procurement Rules
          </h3>
          <div className="space-y-4">
            <div>
              <label className="label">Default Minimum Bulk Quantity for Group Orders (Units)</label>
              <input
                type="number"
                className="input"
                value={settings.minBulkThreshold}
                onChange={e => setSettings({ ...settings, minBulkThreshold: Number(e.target.value) })}
              />
              <p className="text-xs text-gray-400 mt-1">Orders with combined units below this threshold will remain in collecting status.</p>
            </div>
            <div>
              <label className="label">Platform Logistics Surcharge Fee (%)</label>
              <input
                type="number"
                step="0.1"
                className="input"
                value={settings.platformFeePercent}
                onChange={e => setSettings({ ...settings, platformFeePercent: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-forest-600" /> Automation & Dispatch
          </h3>
          <div className="space-y-3">
            {[
              { key: 'autoAssignDelivery', label: 'Auto-assign nearest Delivery Partner once order confirms', desc: 'Uses proximity clustering to ping drivers in the pickup zone.' },
              { key: 'smsAlertsToVillages', label: 'Send free SMS order arrival updates to Village Coordinators', desc: 'Essential for shopkeepers with limited 4G internet access.' },
              { key: 'emailAlerts', label: 'Supplier instant email alerts for new bulk RFQs', desc: 'Dispatches detailed quantity breakdown per village.' },
            ].map(item => (
              <label key={item.key} className="flex items-start gap-3 p-3 bg-page rounded-xl border border-gray-100 cursor-pointer hover:border-gray-200">
                <input
                  type="checkbox"
                  checked={settings[item.key]}
                  onChange={e => setSettings({ ...settings, [item.key]: e.target.checked })}
                  className="mt-1 rounded text-forest-600 focus:ring-forest-500 w-4 h-4"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Platform Settings
        </button>
      </form>
    </div>
  );
}
