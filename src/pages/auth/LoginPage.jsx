import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Leaf, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials } from '../../data/users';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const rolePaths = {
    shopkeeper: '/dashboard/shopkeeper/overview',
    supplier: '/dashboard/supplier/overview',
    delivery: '/dashboard/delivery/overview',
    admin: '/dashboard/admin/overview',
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name.split(' ')[0]}!`);
      navigate(rolePaths[result.user.role] || '/');
    } else {
      toast.error(result.error || 'Login failed');
    }
  };

  const fillDemo = (cred) => {
    setEmail(cred.email);
    setPassword(cred.password);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glass glows */}
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 justify-center mb-8 group">
          <div className="w-10 h-10 bg-forest-600 rounded-2xl flex items-center justify-center shadow-md shadow-forest-600/20 group-hover:bg-forest-700 transition-all">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-2xl text-[#17251F] tracking-tight">
            Sajha<span className="text-forest-600">Supply</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 border border-white/80 shadow-2xl"
        >
          <h1 className="text-2xl font-bold text-[#17251F] mb-1 tracking-tight">Welcome back</h1>
          <p className="text-[#64746B] text-sm mb-6">Sign in to your collective procurement account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label">Email address</label>
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input pr-10"
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64746B] hover:text-[#17251F]"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs font-semibold text-forest-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 shadow-md"
            >
              {loading ? (
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-100/80">
            <p className="text-xs text-[#64746B] font-bold uppercase tracking-wider mb-3 text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> One-Click Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoCredentials.map(cred => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => fillDemo(cred)}
                  className="flex items-center gap-2 p-2.5 bg-white/60 hover:bg-white/90 border border-white/80 rounded-xl transition-all text-left shadow-xs hover:shadow-sm"
                >
                  <span className="text-lg">{cred.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#17251F] truncate">{cred.label}</div>
                    <div className="text-[10px] text-[#64746B] truncate">{cred.name.split(' ')[0]}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-[#64746B] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-forest-700 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
