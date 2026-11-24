import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
    toast.success('Reset link dispatched to registered email');
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

        <div className="glass-card p-8 border border-white/80 shadow-2xl">
          {!sent ? (
            <>
              <h1 className="text-2xl font-bold text-[#17251F] mb-1 tracking-tight">Forgot Password?</h1>
              <p className="text-[#64746B] text-xs mb-6">Enter your registered email and we'll send a recovery link.</p>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="label">Registered Email Address</label>
                  <input
                    type="email"
                    className="input"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-xs shadow-md"
                >
                  {loading ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>Send Recovery Link <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">📧</div>
              <h2 className="text-xl font-bold text-[#17251F] mb-2 tracking-tight">Check your email</h2>
              <p className="text-[#64746B] text-xs mb-6">
                Password recovery instructions sent to <strong>{email}</strong>. <span className="italic">(Demo simulation)</span>
              </p>
            </div>
          )}
          <p className="text-center text-xs text-[#64746B] mt-6">
            Remembered your credentials?{' '}
            <Link to="/login" className="text-forest-700 font-bold hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
