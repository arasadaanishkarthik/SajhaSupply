import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Edit2, Save, X, Building, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SupplierProfile() {
  const { currentUser, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    mobile: currentUser?.mobile || '',
    company: currentUser?.company || '',
  });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const save = () => { updateProfile(form); setEditing(false); toast.success('Supplier profile updated!'); };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/80">
        <div>
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-1.5">
            Partner Profile
          </span>
          <h2 className="text-2xl font-extrabold text-[#17251F] tracking-tight">Supplier Account Details</h2>
          <p className="text-xs sm:text-sm text-[#64746B] mt-0.5">
            Manage your corporate credentials, dispatch contact desk, and verification status
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

      <div className="glass-card p-6 flex items-center gap-5 border border-white/80">
        <div className="w-16 h-16 bg-forest-600 rounded-2xl flex items-center justify-center shadow-md shadow-forest-600/20 text-white text-2xl font-extrabold">
          {currentUser?.avatar || 'PN'}
        </div>
        <div>
          <div className="text-xl font-bold text-[#17251F] tracking-tight">{currentUser?.name}</div>
          <div className="text-xs text-[#64746B] font-medium">{currentUser?.company}</div>
          {currentUser?.isVerified && (
            <span className="mt-2 inline-flex items-center gap-1 text-[11px] bg-green-100/80 text-green-800 px-2.5 py-0.5 rounded-full font-bold border border-green-200">
              <CheckCircle2 className="w-3 h-3 text-green-700" /> Verified FMCG Manufacturer
            </span>
          )}
        </div>
      </div>

      <div className="glass-card p-6 border border-white/80 space-y-4">
        <h3 className="font-bold text-sm text-[#17251F] mb-2">Corporate Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { key: 'name', label: 'Authorized Representative', icon: Building },
            { key: 'email', label: 'Corporate Email', icon: Mail },
            { key: 'mobile', label: 'Dispatch Desk Phone', icon: Phone },
            { key: 'company', label: 'Enterprise Entity', icon: Building },
          ].map(f => (
            <div key={f.key}>
              <label className="label">{f.label}</label>
              {editing
                ? <input className="input text-xs" value={form[f.key]} onChange={e => set(f.key, e.target.value)} />
                : (
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white/60 rounded-xl border border-white/80 text-xs text-[#17251F] font-medium">
                    <f.icon className="w-4 h-4 text-[#64746B]" />
                    <span>{currentUser?.[f.key] || '—'}</span>
                  </div>
                )
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
