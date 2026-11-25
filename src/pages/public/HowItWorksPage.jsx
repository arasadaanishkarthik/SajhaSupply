import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  { n: '01', emoji: '🛒', title: 'Shopkeepers Select Products', desc: 'Browse the SajhaSupply catalog of FMCG products from verified suppliers. Add the items you need for your shop to your list.', detail: 'Browse by category, search by name, and compare unit vs. bulk prices upfront.' },
  { n: '02', emoji: '👥', title: 'Create or Join a Village Group Order', desc: 'Start a new collective order for a product, or join one that another shopkeeper in your village has already created.', detail: 'Each group order displays active volume, participating villages, and unlocked tier discounts.' },
  { n: '03', emoji: '🌐', title: 'Villages Combine Their Quantities', desc: 'Shopkeepers from multiple villages (Rampur, Shivpur, Anandpur, etc.) pool their requirements into the same collective order.', detail: 'Live volume trackers show how close the order is to reaching bulk manufacturer thresholds.' },
  { n: '04', emoji: '🏭', title: 'Supplier Receives Combined Bulk Order', desc: 'Once target volume is reached, the consolidated order is sent to the verified manufacturer, locking in wholesale rates.', detail: 'Suppliers confirm bulk requests instantly and schedule packaging for dispatch.' },
  { n: '05', emoji: '🚛', title: 'Smart Logistics Corridor Dispatch', desc: 'A delivery partner picks up the consolidated shipment and follows an AI-optimized cluster route across village drops.', detail: 'Loop routing minimizes travel distance, delivering directly to central village distribution hubs.' },
  { n: '06', emoji: '🎉', title: 'Shopkeepers Receive Products at Better Prices', desc: 'Products arrive at your village hub. You collect your goods and pay the locked-in collective wholesale price.', detail: 'Transparently track exact rupees saved on every individual product order.' },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF8] relative overflow-hidden">
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />

      <div className="relative z-10 pt-28 pb-16">
        <div className="py-14 px-4 text-center">
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-3">
            Six-Step Journey
          </span>
          <h1 className="page-heading text-[#17251F] mb-4">How SajhaSupply Works</h1>
          <p className="text-base sm:text-lg text-[#64746B] max-w-2xl mx-auto font-normal">
            From individual need to collective bargaining — six transparent steps that transform rural commerce.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-7 flex gap-5 sm:gap-6 hover:scale-[1.01] transition-transform duration-200"
            >
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="text-3xl font-black text-forest-200">{step.n}</div>
                <div className="text-2xl mt-1.5">{step.emoji}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-[#17251F] mb-1.5">{step.title}</h3>
                <p className="text-sm text-[#17251F] mb-2 font-medium leading-relaxed">{step.desc}</p>
                <p className="text-xs text-[#64746B] italic">{step.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-sm sm:text-base px-8 py-3.5 shadow-lg">
            Join SajhaSupply Today <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
