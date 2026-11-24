import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Bell, LogOut, ChevronDown, User, Sparkles, SwitchCamera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials } from '../../data/users';
import { toast } from 'sonner';

const roleLabels = {
  shopkeeper: 'Shopkeeper',
  supplier: 'Supplier',
  delivery: 'Delivery Partner',
  admin: 'Administrator',
};

const roleColors = {
  shopkeeper: 'bg-forest-600 text-white',
  supplier: 'bg-forest-500 text-white',
  delivery: 'bg-amber-500 text-white',
  admin: 'bg-gray-800 text-white',
};

export default function DashboardNavbar({ tabs, basePath }) {
  const { currentUser, logout, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const switchRole = (cred) => {
    login(cred.email, cred.password);
    setShowRoleSwitcher(false);
    toast.success(`Switched role to ${cred.label}`);
    const paths = {
      shopkeeper: '/dashboard/shopkeeper/overview',
      supplier: '/dashboard/supplier/overview',
      delivery: '/dashboard/delivery/overview',
      admin: '/dashboard/admin/overview'
    };
    navigate(paths[cred.role]);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Glass Navbar */}
      <div className="glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-15 py-3">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-forest-600 rounded-xl flex items-center justify-center shadow-md shadow-forest-600/20 group-hover:bg-forest-700 transition-all">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-base text-[#17251F] hidden sm:block tracking-tight">
                <span className="font-logo">Sajha</span><span className="text-forest-600 font-bold">Supply</span>
              </span>
            </Link>

            {/* Dashboard Role Indicator Pill */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#17251F] bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-xs flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${roleColors[currentUser?.role]?.split(' ')[0] || 'bg-forest-600'}`} />
                {roleLabels[currentUser?.role] || 'User'} Dashboard
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Quick Role Switcher Button */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleSwitcher(v => !v)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-forest-700 bg-forest-50/80 hover:bg-forest-100/90 border border-forest-200/60 px-2.5 py-1.5 rounded-xl transition-all"
                  title="Switch Demo Role"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden md:inline">Switch Role</span>
                </button>

                <AnimatePresence>
                  {showRoleSwitcher && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 glass-card p-2 shadow-xl z-50 border border-white/80 space-y-1"
                    >
                      <div className="text-[11px] font-bold text-[#64746B] px-2.5 py-1 uppercase tracking-wider">
                        Switch Active Role
                      </div>
                      {demoCredentials.map(cred => (
                        <button
                          key={cred.role}
                          onClick={() => switchRole(cred)}
                          className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs text-left transition-colors ${
                            currentUser?.role === cred.role
                              ? 'bg-forest-50 text-forest-800 font-bold'
                              : 'text-[#17251F] hover:bg-white/80'
                          }`}
                        >
                          <span className="text-base">{cred.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">{cred.label}</div>
                            <div className="text-[10px] text-[#64746B] truncate">{cred.name}</div>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(v => !v)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/60 transition-colors"
                >
                  <div className={`w-7 h-7 ${roleColors[currentUser?.role] || 'bg-forest-600'} rounded-lg flex items-center justify-center font-bold text-xs shadow-xs`}>
                    {currentUser?.avatar || 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#64746B]" />
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-52 glass-card p-1.5 shadow-xl z-50 border border-white/80"
                    >
                      <div className="px-3 py-2 border-b border-gray-100/60">
                        <div className="text-xs font-bold text-[#17251F]">{currentUser?.name}</div>
                        <div className="text-[11px] text-[#64746B] truncate">{currentUser?.email}</div>
                      </div>
                      <Link
                        to={`${basePath}/profile`}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#17251F] hover:bg-white/70 rounded-lg transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User className="w-3.5 h-3.5 text-forest-600" /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50/80 rounded-lg w-full text-left transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Tabs Row with Glass Surface */}
      <div className="glass-tabs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide py-1">
            {tabs.map(tab => {
              const isActive = location.pathname.includes(tab.path) ||
                (tab.path === tabs[0].path && location.pathname === basePath);
              return (
                <Link
                  key={tab.path}
                  to={`${basePath}/${tab.path}`}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs whitespace-nowrap transition-all duration-200 rounded-lg mx-0.5 ${
                    isActive
                      ? 'bg-forest-600 text-white font-bold shadow-xs'
                      : 'text-[#64746B] hover:text-[#17251F] hover:bg-white/50 font-medium'
                  }`}
                >
                  {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
