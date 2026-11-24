import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Leaf } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Features', to: '/features' },
  { label: 'Explore Products', to: '/explore' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDashboard = () => {
    const paths = {
      shopkeeper: '/dashboard/shopkeeper/overview',
      supplier: '/dashboard/supplier/overview',
      delivery: '/dashboard/delivery/overview',
      admin: '/dashboard/admin/overview'
    };
    navigate(paths[currentUser.role] || '/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-forest-600 rounded-xl flex items-center justify-center shadow-md shadow-forest-600/20 group-hover:bg-forest-700 transition-all duration-300 group-hover:scale-105">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg text-[#17251F] leading-tight tracking-tight">
                <span className="font-logo text-xl">Sajha</span><span className="text-forest-600 font-bold">Supply</span>
              </span>
              <span className="text-[10px] text-[#64746B] font-medium tracking-wider -mt-0.5 hidden sm:block">
                Collective Buying
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-xs">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-forest-600 text-white shadow-xs'
                      : 'text-[#64746B] hover:text-[#17251F] hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/explore"
              className="relative p-2 rounded-xl text-[#64746B] hover:text-forest-700 hover:bg-white/60 transition-colors"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-brand text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-xs">
                  {totalItems}
                </span>
              )}
            </Link>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <button onClick={handleDashboard} className="btn-primary text-xs py-2 px-4">
                  My Dashboard
                </button>
                <button onClick={logout} className="btn-ghost text-xs py-2 px-3">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-xs py-2 px-3.5 font-semibold text-[#17251F]">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-xs py-2 px-4">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl text-[#17251F] hover:bg-white/60 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/60 bg-white/90 backdrop-blur-2xl px-5 py-4 flex flex-col gap-2.5 shadow-lg"
          >
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-semibold text-[#17251F] hover:text-forest-600 py-1.5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2.5 pt-3 border-t border-gray-100">
              {currentUser ? (
                <>
                  <button onClick={() => { handleDashboard(); setMobileOpen(false); }} className="btn-primary text-xs flex-1 py-2.5">
                    My Dashboard
                  </button>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="btn-secondary text-xs flex-1 py-2.5">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary text-xs flex-1 text-center py-2.5" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary text-xs flex-1 text-center py-2.5" onClick={() => setMobileOpen(false)}>
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
