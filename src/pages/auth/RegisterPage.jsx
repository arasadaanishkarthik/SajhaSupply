import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Leaf, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const indianStates = ['Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Rajasthan', 'Maharashtra', 'Gujarat', 'Punjab', 'Haryana', 'Uttarakhand', 'Jharkhand'];
const roles = [
  { value: 'shopkeeper', label: '🏪 Shopkeeper', desc: 'Buy products for my rural village store' },
  { value: 'supplier', label: '🏭 Supplier', desc: 'Provide bulk FMCG products to villages' },
  { value: 'delivery', label: '🚛 Delivery Partner', desc: 'Transport consolidated orders to villages' },
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({
    name: '', mobile: '', email: '', password: '', village: '', district: '', state: 'Uttar Pradesh', role: 'shopkeeper',
  });
  const navigate = useNavigate();

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    toast.success('Registration successful! Please login with your credentials.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />

      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8 group">
          <div className="w-10 h-10 bg-forest-600 rounded-2xl flex items-center justify-center shadow-md shadow-forest-600/20 group-hover:bg-forest-700 transition-all">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-2xl text-[#17251F] tracking-tight">
            Sajha<span className="text-forest-600">Supply</span>
          </span>
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 border border-white/80 shadow-2xl">
          <div className="flex gap-2 mb-6">
            {[1, 2].map(s => (
              <div key={s} className={`flex-1 h-1.5 rounded-full ${step >= s ? 'bg-forest-600' : 'bg-gray-200/80'} transition-colors`} />
            ))}
          </div>
          <h1 className="text-2xl font-bold text-[#17251F] mb-1 tracking-tight">
            {step === 1 ? 'Create Account' : 'Village & Location'}
          </h1>
          <p className="text-[#64746B] text-xs font-medium mb-6">Step {step} of 2</p>

          <form onSubmit={handleNext} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label className="label">Full Name</label>
                  <input className="input" placeholder="Ramesh Kumar" value={form.name} onChange={e => set('name', e.target.value)} required />
                </div>
                <div>
                  <label className="label">Mobile Number</label>
                  <input className="input" placeholder="+91 98765 43210" value={form.mobile} onChange={e => set('mobile', e.target.value)} required />
                </div>
                <div>
                  <label className="label">Email Address</label>
                  <input type="email" className="input" placeholder="ramesh@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
                </div>
                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} className="input pr-10" placeholder="Create a secure password" value={form.password} onChange={e => set('password', e.target.value)} required />
                    <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64746B]">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label">Select Your Role</label>
                  <div className="grid grid-cols-1 gap-2">
                    {roles.map(r => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => set('role', r.value)}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${form.role === r.value ? 'border-forest-600 bg-forest-50/90 shadow-xs' : 'border-white/80 bg-white/50 hover:bg-white/80'}`}
                      >
                        <span className="text-xl">{r.label.split(' ')[0]}</span>
                        <div>
                          <div className="text-xs font-bold text-[#17251F]">{r.label.substring(2)}</div>
                          <div className="text-[11px] text-[#64746B]">{r.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="label">Village / Town Hub</label>
                  <input className="input" placeholder="e.g. Rampur" value={form.village} onChange={e => set('village', e.target.value)} required />
                </div>
                <div>
                  <label className="label">District</label>
                  <input className="input" placeholder="e.g. Sitapur" value={form.district} onChange={e => set('district', e.target.value)} required />
                </div>
                <div>
                  <label className="label">State</label>
                  <select className="input" value={form.state} onChange={e => set('state', e.target.value)}>
                    {indianStates.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </>
            )}

            <div className="flex gap-2.5 pt-2">
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 py-3 text-xs">
                  Back
                </button>
              )}
              <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-xs">
                {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> : step === 1 ? <>Continue <ArrowRight className="w-4 h-4" /></> : 'Create Account'}
              </button>
            </div>
          </form>

          <p className="text-center text-xs text-[#64746B] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-forest-700 font-bold hover:underline">
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
