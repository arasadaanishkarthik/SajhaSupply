import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Brain, TrendingDown, Truck, BarChart3, Handshake, ArrowRight, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Collective Procurement',
    color: 'bg-forest-50/80 text-forest-700',
    details: [
      'Create or join group orders with neighbouring rural villages',
      'Real-time volume bars show progression toward bulk tiers',
      'Transparent breakdown of participating villages and orders',
      'Wholesale discount unlocks automatically as volume increases',
    ],
  },
  {
    icon: Brain,
    title: 'AI Demand Forecasting',
    color: 'bg-purple-50/80 text-purple-700',
    details: [
      'Predicts village consumption 2–4 weeks ahead from seasonal data',
      'Calibrated for festivals (Diwali, Chhath, Holi) and harvest times',
      'Provides confidence metrics and optimal restocking advice',
      'Prevents emergency stockouts and panic buying markups',
    ],
  },
  {
    icon: TrendingDown,
    title: 'Smart Price Comparison',
    color: 'bg-blue-50/80 text-blue-700',
    details: [
      'Scans verified FMCG mills and regional suppliers automatically',
      'Considers delivery schedules and minimum order quantities',
      'Recommends the best overall value with transparent math',
      'Historical price charts to identify optimal buying windows',
    ],
  },
  {
    icon: Handshake,
    title: 'Verified Supplier Network',
    color: 'bg-amber-50/80 text-amber-700',
    details: [
      'Direct contracts with Adani Wilmar, ITC, HUL, Nestlé, and Amul',
      'Comprehensive supplier verification and review benchmarks',
      'Quick bulk acceptance and direct dispatch coordination',
      'Ensures guaranteed authentic FMCG packaged goods',
    ],
  },
  {
    icon: Truck,
    title: 'Route Optimization & Tracking',
    color: 'bg-indigo-50/80 text-indigo-700',
    details: [
      'Groups multiple village deliveries along unified transit corridors',
      'Calculates optimal sequence to cut vehicle turnaround and diesel use',
      'Central village hubs serve as convenient drop-off stations',
      'Interactive timeline tracking from warehouse pickup to delivery',
    ],
  },
  {
    icon: BarChart3,
    title: 'Platform Analytics & Insights',
    color: 'bg-green-50/80 text-green-700',
    details: [
      'Individual shopkeeper spend, savings, and order logs',
      'Village-level collective economic impact tracking',
      'Monthly trend reports and commodity price shifts',
      'Admin-level analytics across participating districts',
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF8] relative overflow-hidden">
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />

      <div className="relative z-10 pt-28 pb-16">
        <div className="py-14 px-4 text-center">
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-3">
            Core Architecture
          </span>
          <h1 className="page-heading text-[#17251F] mb-4">Platform Features</h1>
          <p className="text-base sm:text-lg text-[#64746B] max-w-2xl mx-auto font-normal">
            Every feature is designed to make collective procurement simple, transparent, and powerful for rural communities.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`glass-card p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-start ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xs ${f.color} flex-shrink-0`}>
                <f.icon className="w-7 h-7" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="marketing-heading text-xl text-[#17251F] mb-3">{f.title}</h2>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {f.details.map((d, di) => (
                    <div key={di} className="flex items-start gap-2 bg-white/50 p-2.5 rounded-xl border border-white/70 text-xs sm:text-sm text-[#17251F]">
                      <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 shadow-lg">
            Start Buying Collectivley <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
