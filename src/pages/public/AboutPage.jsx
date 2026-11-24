import PublicNavbar from '../../components/navigation/PublicNavbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Leaf, Target, Eye, Heart, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF8] relative overflow-hidden">
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />

      <PublicNavbar />
      <div className="relative z-10 pt-28 pb-16">
        {/* Hero */}
        <div className="py-14 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-12 h-12 bg-forest-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-forest-600/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="page-heading text-[#17251F] mb-4">About SajhaSupply</h1>
            <p className="text-base sm:text-lg text-[#64746B] max-w-2xl mx-auto font-normal">
              On a mission to level the commercial playing field for rural shopkeepers through collective procurement power and intelligent logistics.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Story */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 sm:p-10">
            <h2 className="marketing-heading text-2xl text-[#17251F] mb-4">Our Story</h2>
            <p className="text-[#64746B] leading-relaxed text-sm sm:text-base">
              SajhaSupply was born out of a stark reality observed across rural India: local kirana shopkeepers pay 15% to 30% higher wholesale prices for everyday essentials than urban mega-retailers simply because they buy in micro quantities.
              <br /><br />
              The word <strong>"Sajha"</strong> (साझा) signifies <em>shared</em> and <em>collective</em> in Hindi. By uniting multiple villages into single procurement blocks, SajhaSupply unlocks the bargaining clout of a national retail chain for individual rural entrepreneurs.
            </p>
          </motion.div>

          {/* Mission Vision Values */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Our Mission', text: 'Equip every village shopkeeper with collective wholesale bargaining power and transparent AI-assisted purchasing.', color: 'bg-forest-50/80 text-forest-700' },
              { icon: Eye, title: 'Our Vision', text: 'A future where geography is no barrier to fair pricing. Every village connected, every shopkeeper thriving.', color: 'bg-blue-50/80 text-blue-700' },
              { icon: Heart, title: 'Our Core Values', text: 'Community first. Full transparency in margin breakdown. Respect for rural livelihoods and sustainable logistics.', color: 'bg-amber-50/80 text-amber-700' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs ${item.color} mb-4`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#17251F] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#64746B] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Why Collective */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel p-8 sm:p-10 border-forest-200/70">
            <h2 className="marketing-heading text-2xl text-[#17251F] mb-4">Why Collective Procurement Matters</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-[#17251F]">
              {[
                'Rural shopkeepers buy in small quantities, paying retail or near-retail prices',
                'Individual transport trips carry high fuel and vehicle rental overheads',
                'National FMCG suppliers provide deep discounts only on high MOQ thresholds',
                'By aggregating orders across 5+ villages, SajhaSupply unlocks tier-1 pricing',
                'AI-driven demand predictions eliminate costly festive stockouts',
                'Smart corridor delivery cuts per-unit transit costs by over 40%',
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white/60 p-3 rounded-xl border border-white/80">
                  <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
