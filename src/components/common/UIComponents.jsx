import { motion } from 'framer-motion';

export function StatCard({ title, value, subtitle, icon: Icon, color = 'forest', trend }) {
  const colorMap = {
    forest: 'bg-forest-50/80 text-forest-700 border-forest-100',
    amber: 'bg-amber-50/80 text-amber-700 border-amber-100',
    blue: 'bg-blue-50/80 text-blue-700 border-blue-100',
    purple: 'bg-purple-50/80 text-purple-700 border-purple-100',
    red: 'bg-red-50/80 text-red-700 border-red-100',
  };

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(23,76,56,0.11)' }}
      className="glass-card p-5 flex items-start gap-4 transition-all duration-200"
    >
      {Icon && (
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold text-[#64746B] uppercase tracking-wider">{title}</div>
        <div className="text-2xl font-extrabold text-[#17251F] mt-0.5 tracking-tight">{value}</div>
        {subtitle && <div className="text-xs text-[#64746B] mt-0.5">{subtitle}</div>}
        {trend !== undefined && (
          <div className={`text-xs font-semibold mt-1 flex items-center gap-1 ${trend >= 0 ? 'text-forest-700' : 'text-red-500'}`}>
            <span>{trend >= 0 ? '↑' : '↓'}</span>
            <span>{Math.abs(trend)}% from last month</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Badge({ status, label }) {
  const styles = {
    delivered: 'bg-green-100/80 text-green-800 border-green-200',
    active: 'bg-blue-100/80 text-blue-800 border-blue-200',
    pending: 'bg-amber-100/80 text-amber-800 border-amber-200',
    confirmed: 'bg-purple-100/80 text-purple-800 border-purple-200',
    processing: 'bg-orange-100/80 text-orange-800 border-orange-200',
    dispatched: 'bg-indigo-100/80 text-indigo-800 border-indigo-200',
    cancelled: 'bg-red-100/80 text-red-800 border-red-200',
    paid: 'bg-green-100/80 text-green-800 border-green-200',
    individual: 'bg-gray-100/80 text-gray-700 border-gray-200',
    collective: 'bg-forest-100/80 text-forest-800 border-forest-200 font-bold',
    high: 'bg-red-100/80 text-red-800 border-red-200',
    medium: 'bg-amber-100/80 text-amber-800 border-amber-200',
    low: 'bg-gray-100/80 text-gray-700 border-gray-200',
    verified: 'bg-green-100/80 text-green-800 border-green-200',
    'in-transit': 'bg-indigo-100/80 text-indigo-800 border-indigo-200',
    assigned: 'bg-blue-100/80 text-blue-800 border-blue-200',
    'pending-assignment': 'bg-gray-100/80 text-gray-600 border-gray-200',
  };

  return (
    <span className={`badge border ${styles[status] || 'bg-gray-100 text-gray-700 border-gray-200'}`}>
      {label || status}
    </span>
  );
}

export function ProgressBar({ value, max, color = 'forest' }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const colorMap = {
    forest: 'bg-gradient-to-r from-forest-500 to-forest-600',
    amber: 'bg-gradient-to-r from-amber-400 to-amber-brand',
    blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
    red: 'bg-gradient-to-r from-red-400 to-red-600',
  };

  return (
    <div className="w-full bg-black/5 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/60">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full rounded-full ${colorMap[color]} shadow-xs`}
      />
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center glass-card p-8">
      {Icon && (
        <div className="w-14 h-14 bg-forest-50/80 border border-forest-100 rounded-2xl flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-forest-600" />
        </div>
      )}
      <h3 className="text-base font-bold text-[#17251F]">{title}</h3>
      {description && <p className="text-sm text-[#64746B] mt-1 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin w-8 h-8 border-3 border-forest-600 border-t-transparent rounded-full" />
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizeMap = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className={`relative bg-white/90 backdrop-blur-2xl border border-white/80 rounded-2xl shadow-2xl w-full ${sizeMap[size]} max-h-[90vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100/80">
            <h2 className="text-lg font-bold text-[#17251F]">{title}</h2>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-[#64746B]">✕</button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input pl-10"
      />
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64746B]">🔍</span>
    </div>
  );
}
