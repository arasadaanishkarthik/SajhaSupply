import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Store, MapPin, Phone, Mail, Edit2, Save, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SKProfile() {
  const { currentUser, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    mobile: currentUser?.mobile || '',
    email: currentUser?.email || '',
    shopName: currentUser?.shopName || '',
    village: currentUser?.village || '',
    district: currentUser?.district || '',
    state: currentUser?.state || '',
  });

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    updateProfile(form);
    setEditing(false);
    toast.success('Shop profile updated successfully!');
  };

  const fields = [
    { key: 'name', label: 'Proprietor Name', icon: User },
    { key: 'email', label: 'Registered Email', icon: Mail, type: 'email' },
    { key: 'mobile', label: 'Mobile Contact', icon: Phone },
    { key: 'shopName', label: 'Kirana / Shop Name', icon: Store },
    { key: 'village', label: 'Village Hub', icon: MapPin },
    { key: 'district', label: 'District', icon: MapPin },
    { key: 'state', label: 'State', icon: MapPin },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80">
        <div>
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-1.5">
            Store Profile
          </span>
          <h2 className="text-2xl font-extrabold text-[#17251F] tracking-tight">Shopkeeper Account Details</h2>
          <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
            Manage your rural business profile, contact numbers, and delivery destination
          </p>
        </div>
        {!editing ? (
          <button onClick={() => setEditing(true)} className="btn-secondary flex items-center gap-2 text-xs py-2 px-4 self-start sm:self-auto">
            <Edit2 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => setEditing(false)} className="btn-ghost flex items-center gap-1 text-xs py-2 px-3">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
            <button onClick={save} className="btn-primary flex items-center gap-2 text-xs py-2 px-4">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Identity Card */}
      <div className="glass-card p-6 flex items-center gap-5 border border-white/80">
        <div className="w-16 h-16 bg-forest-600 rounded-2xl flex items-center justify-center shadow-md shadow-forest-600/20 text-white text-2xl font-extrabold">
          {currentUser?.avatar || 'RY'}
        </div>
        <div>
          <div className="text-xl font-bold text-[#17251F] tracking-tight">{currentUser?.name}</div>
          <div className="text-xs text-[#64746B] mt-0.5 font-medium">{currentUser?.shopName}</div>
          <div className="text-xs text-[#64746B] mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-forest-600" /> {currentUser?.village}, {currentUser?.district}, {currentUser?.state}
          </div>
          {currentUser?.isVerified && (
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] bg-green-100/80 text-green-800 px-2.5 py-0.5 rounded-full font-bold border border-green-200">
              <CheckCircle2 className="w-3 h-3 text-green-700" /> Verified Village Shopkeeper
            </span>
          )}
        </div>
      </div>

      {/* Fields */}
      <div className="glass-card p-6 border border-white/80">
        <h3 className="font-bold text-sm text-[#17251F] mb-4">Contact & Location Settings</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.key}>
              <label className="label">{f.label}</label>
              {editing ? (
                <input
                  type={f.type || 'text'}
                  className="input text-xs"
                  value={form[f.key]}
                  onChange={e => set(f.key, e.target.value)}
                />
              ) : (
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white/60 rounded-xl border border-white/80 text-xs text-[#17251F] font-medium">
                  <f.icon className="w-4 h-4 text-[#64746B] flex-shrink-0" />
                  <span>{currentUser?.[f.key] || '—'}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lifetime Stats */}
      <div className="glass-card p-6 border border-white/80">
        <h3 className="font-bold text-sm text-[#17251F] mb-3">Lifetime Community Impact</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Orders', val: currentUser?.totalOrders || 23 },
            { label: 'Rupees Saved', val: `₹${(currentUser?.totalSavings || 17100).toLocaleString()}` },
            { label: 'Member Since', val: currentUser?.joinedDate?.slice(0, 7) || '2024-02' },
          ].map((s, idx) => (
            <div key={idx} className="bg-white/50 p-3 rounded-xl border border-white/70 text-center">
              <div className="text-base font-extrabold text-forest-700">{s.val}</div>
              <div className="text-[11px] text-[#64746B] mt-0.5 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
