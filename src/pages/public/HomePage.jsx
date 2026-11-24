import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import {
  ArrowRight, Users, TrendingDown, Truck, Brain, BarChart3,
  ShoppingBag, Star, ChevronRight, ChevronLeft, Package, Handshake, Leaf, MapPin, Zap, Sparkles
} from 'lucide-react';
import PublicNavbar from '../../components/navigation/PublicNavbar';
import Footer from '../../components/layout/Footer';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const baseUrl = import.meta.env.BASE_URL;

const heroImages = [
  { src: `${baseUrl}images/hero/hero-farm.jpg`, alt: 'Fresh vegetables and farm produce' },
  { src: `${baseUrl}images/hero/hero-market.jpg`, alt: 'Indian grocery wholesale market' },
  { src: `${baseUrl}images/hero/hero-grains.jpg`, alt: 'Rice, wheat, pulses and grains' },
  { src: `${baseUrl}images/hero/hero-fruits.jpg`, alt: 'Fresh fruits and vegetables' },
  { src: `${baseUrl}images/hero/hero-warehouse.jpg`, alt: 'Grocery distribution warehouse operations' },
];

function HoverRevealCard({ type, image, title, supportingLine, children }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const isExpanded = isHovered || isPinned;
  const isChallenge = type === 'challenge';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsPinned((prev) => !prev)}
      role="region"
      aria-expanded={isExpanded}
      className={`group relative rounded-3xl overflow-hidden min-h-[490px] sm:min-h-[520px] flex flex-col justify-between cursor-pointer transition-all duration-500 ${isChallenge
        ? 'border border-red-200/70 shadow-lg shadow-red-950/5 hover:border-red-400/80 hover:shadow-2xl hover:shadow-red-900/10'
        : 'border border-forest-200/70 shadow-lg shadow-forest-950/5 hover:border-forest-400/80 hover:shadow-2xl hover:shadow-forest-900/10'
        }`}
    >
      {/* 1. PHOTOGRAPHIC COVER LAYER (Default initial state) */}
      <div
        className={`absolute inset-0 z-10 transition-all duration-500 ease-out flex flex-col justify-between p-8 sm:p-10 ${isExpanded ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
          }`}
      >
        {/* Background Image with subtle zoom on hover */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* High-contrast gradient overlay */}
        <div
          className={`absolute inset-0 ${isChallenge
            ? 'bg-gradient-to-t from-[#1A0A0A]/95 via-[#2E1212]/60 to-[#0F0505]/30'
            : 'bg-gradient-to-t from-[#071F17]/95 via-[#0D2E22]/60 to-[#071F17]/30'
            }`}
        />

        {/* Top Tag Badge */}
        <div className="relative z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${isChallenge
              ? 'bg-red-500/25 text-red-100 border-red-400/40 shadow-xs'
              : 'bg-forest-500/30 text-emerald-100 border-emerald-400/40 shadow-xs'
              }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${isChallenge ? 'bg-red-400 animate-pulse' : 'bg-emerald-400 animate-pulse'
                }`}
            />
            {isChallenge ? 'The Rural Supply Challenge' : 'The SajhaSupply Solution'}
          </span>
        </div>

        {/* Bottom Headline & Callout */}
        <div className="relative z-10 text-left mt-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-md">
            {title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base text-white/90 leading-relaxed font-normal max-w-md drop-shadow">
            {supportingLine}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold group-hover:bg-white/30 transition-all shadow-sm">
            <span>Hover to view breakdown</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>

      {/* 2. WORDS / BREAKDOWN LAYER (Smoothly revealed on hover while keeping cursor on card) */}
      <div
        className={`relative z-20 w-full h-full p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 ease-out ${isChallenge
          ? 'bg-gradient-to-br from-white/98 via-[#FFF9F9]/95 to-[#FDE8E8]/90 backdrop-blur-xl'
          : 'bg-gradient-to-br from-white/98 via-[#F7FAF8]/95 to-[#E8F2EA]/90 backdrop-blur-xl'
          } ${isExpanded
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
      >
        <div className="w-full">
          {children}
        </div>

        {/* Bottom indicator hint */}
        <div className="pt-6 mt-4 border-t border-gray-200/60 flex items-center justify-between text-xs text-[#64746B]">
          <span className="flex items-center gap-1.5 font-medium">
            <span
              className={`w-2 h-2 rounded-full ${isChallenge ? 'bg-red-500' : 'bg-forest-600'}`}
            />
            {isPinned ? 'Card pinned open (click to collapse)' : 'Move cursor away to view photo card'}
          </span>
          <span className="hidden sm:inline-block text-[11px] text-gray-400 font-medium">
            {isPinned ? 'Click to unpin' : 'Click to pin'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

const stats = [
  { label: 'Villages Connected', value: '5+', icon: MapPin },
  { label: 'Registered Shopkeepers', value: '112', icon: Users },
  { label: 'Average Bulk Savings', value: '14.2%', icon: TrendingDown },
  { label: 'Orders Fulfilled', value: '423', icon: Package },
];

const features = [
  { icon: Users, title: 'Collective Procurement', desc: 'Pool orders across neighbouring rural clusters to reach manufacturer bulk thresholds.', color: 'bg-forest-50/80 text-forest-700' },
  { icon: Brain, title: 'AI Demand Forecasting', desc: 'Smart predictions help you restock before winter or festive demand surges.', color: 'bg-purple-50/80 text-purple-700' },
  { icon: TrendingDown, title: 'Smart Price Comparison', desc: 'Automatically compares verified wholesale suppliers to unlock the lowest unit cost.', color: 'bg-blue-50/80 text-blue-700' },
  { icon: Truck, title: 'Route Optimization', desc: 'Cluster deliveries reduce transport diesel expenses by 40–60%.', color: 'bg-amber-50/80 text-amber-700' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track collective spend, personal savings, and village-wide economic impact.', color: 'bg-green-50/80 text-green-700' },
  { icon: Handshake, title: 'Verified Supplier Network', desc: 'Direct access to national FMCG brands like Adani Wilmar, ITC, and Amul.', color: 'bg-indigo-50/80 text-indigo-700' },
];

const steps = [
  { n: '01', title: 'Shopkeepers Select Products', desc: 'Browse our FMCG catalog and select the items your village shop needs.' },
  { n: '02', title: 'Create or Join a Collective Order', desc: 'Initiate a village group order or join an active one nearby with 1 click.' },
  { n: '03', title: 'Multiple Villages Pool Quantities', desc: 'Rampur, Shivpur, and Anandpur combine requirements into one high-volume order.' },
  { n: '04', title: 'Suppliers Receive Bulk Order', desc: 'Verified manufacturers confirm bulk discounts as volume thresholds are met.' },
  { n: '05', title: 'Smart Route Dispatch', desc: 'AI-grouped transport hubs deliver consolidated orders directly to village points.' },
  { n: '06', title: 'Shopkeepers Enjoy Big Savings', desc: 'Receive high-quality FMCG products at 10–25% lower wholesale prices.' },
];

const sampleProducts = [
  { id: 'p1', name: 'Fortune Sunflower Oil (1L)', retail: 125, tiers: [{ q: 300, p: 115 }, { q: 600, p: 108 }, { q: 1000, p: 103 }] },
  { id: 'p2', name: 'Aashirvaad Atta (5kg)', retail: 220, tiers: [{ q: 200, p: 210 }, { q: 400, p: 198 }, { q: 600, p: 190 }] },
  { id: 'p5', name: 'Toor Dal (Arhar) (1kg)', retail: 148, tiers: [{ q: 300, p: 140 }, { q: 600, p: 132 }, { q: 900, p: 126 }] },
];

export default function HomePage() {
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  // Automatic hero carousel autoplay continuously (cycles smoothly every 4.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeHeroImage]);

  const handleNextHero = () => {
    setActiveHeroImage((current) => (current + 1) % heroImages.length);
  };

  const handlePrevHero = () => {
    setActiveHeroImage((current) => (current - 1 + heroImages.length) % heroImages.length);
  };

  // Simulator State
  const [selectedProd, setSelectedProd] = useState(sampleProducts[0]);
  const [villageQuantities, setVillageQuantities] = useState({
    Rampur: 180,
    Shivpur: 140,
    Anandpur: 220,
    Lakshmipur: 90,
    Devgaon: 110,
  });

  const totalQty = Object.values(villageQuantities).reduce((a, b) => a + b, 0);

  const calculatePrice = () => {
    let p = selectedProd.retail;
    for (const t of selectedProd.tiers) {
      if (totalQty >= t.q) p = t.p;
    }
    return p;
  };

  const currentPrice = calculatePrice();
  const savingPerUnit = selectedProd.retail - currentPrice;
  const totalSavings = totalQty * savingPerUnit;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#174C38', '#2F7655', '#F4B860', '#C5DFC9']
    });
    toast.success(`🎉 Locked in ₹${totalSavings.toLocaleString()} collective savings across 5 villages!`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] relative overflow-hidden">
      {/* Ambient background lighting */}
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />
      <div className="ambient-glow-center" />

      <PublicNavbar />

      {/* Full-width photographic hero carousel */}
      <section
        className="relative z-10 min-h-[680px] sm:min-h-[720px] overflow-hidden flex items-center"
      >
        {heroImages.map((image, index) => (
          <motion.img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            className="absolute inset-0 h-full w-full object-cover"
            initial={false}
            animate={{
              opacity: index === activeHeroImage ? 1 : 0,
              scale: index === activeHeroImage ? 1.035 : 1,
            }}
            transition={{ opacity: { duration: 0.9 }, scale: { duration: 7, ease: 'linear' } }}
            aria-hidden={index !== activeHeroImage}
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,23,0.78),rgba(23,76,56,0.48),rgba(7,31,23,0.72))]" />
        <div className="absolute inset-0 bg-black/10" />

        <button
          type="button"
          aria-label="Previous hero photograph"
          onClick={handlePrevHero}
          className="absolute left-3 sm:left-6 top-1/2 z-30 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Next hero photograph"
          onClick={handleNextHero}
          className="absolute right-3 sm:right-6 top-1/2 z-30 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/25 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-16 sm:pt-32">
          <motion.div variants={stagger} initial="hidden" animate="show">
            {/* Main Headline */}
            <motion.h1
              variants={fadeUp}
              className="hero-heading font-extrabold text-white drop-shadow-lg"
            >
              Together,<br />
              <span className="text-[#C5DFC9]">We Buy</span> Better.
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-normal drop-shadow"
            >
              Empowering rural shopkeepers to purchase smarter, save more and grow together through collective procurement and intelligent logistics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-3.5 justify-center mt-10"
            >
              <Link to="/register" className="btn-primary flex items-center gap-2 text-sm sm:text-base px-7 py-3.5">
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/how-it-works" className="btn-secondary flex items-center gap-2 text-sm sm:text-base px-7 py-3.5">
                Explore How It Works <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Subtle floating glass highlight badges */}
            <motion.div
              variants={fadeUp}
              className="mt-14 inline-flex flex-wrap items-center justify-center gap-3 glass-card px-5 py-3 border border-white/80"
            >
              <span className="text-xs font-semibold text-[#17251F] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-forest-600" /> 5 Connected Villages
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-semibold text-[#17251F] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> ₹2.3L+ Community Savings
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-semibold text-[#17251F] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> 100% Verified FMCG
              </span>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2" role="tablist" aria-label="Hero photographs">
          {heroImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-label={`Show ${image.alt}`}
              aria-selected={index === activeHeroImage}
              onClick={() => setActiveHeroImage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === activeHeroImage ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section: Glass Cards */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-6 text-center hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="w-10 h-10 bg-forest-50/80 border border-forest-100 rounded-xl flex items-center justify-center mx-auto mb-3 text-forest-600">
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl font-extrabold text-[#17251F] tracking-tight">{stat.value}</div>
                <div className="text-xs text-[#64746B] mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution: Dual Glass Cards */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* The Problem */}
            <HoverRevealCard
              type="challenge"
              image={`${baseUrl}images/cards/challenge-kirana.jpg`}
              title="Rural shops need fair buying power"
              supportingLine="Real village economies thrive when shopkeepers purchase collectively."
            >
              <div className="flex flex-col justify-between h-full">
                <span className="badge bg-red-100/70 text-red-800 border border-red-200 mb-4">
                  The Rural Supply Challenge
                </span>
                <h2 className="section-title text-2xl sm:text-3xl mt-2">
                  Rural Shopkeepers Pay <span className="text-red-500">More</span> For The Same Products
                </h2>
                <p className="text-sm sm:text-base text-[#64746B] mt-3 leading-relaxed">
                  When village kirana owners buy individually, they lack bargaining power with distributors, paying 10–25% higher costs plus hefty individual transit freight.
                </p>
                <ul className="mt-6 space-y-3.5">
                  {[
                    'No collective bargaining power with national FMCG manufacturers',
                    'Disproportionately high per-unit transit costs on individual trips',
                    'Frequent stockouts on essential staples during peak harvest season',
                    'Multiple middleman layers taking 15–30% distributor margins',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#17251F]">
                      <span className="mt-0.5 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </HoverRevealCard>

            {/* Our Solution */}
            <HoverRevealCard
              type="solution"
              image={`${baseUrl}images/cards/solution-warehouse.jpg`}
              title="Collective supply, delivered smarter"
              supportingLine="Organized wholesale distribution turns pooled demand into dependable delivery."
            >
              <div className="flex flex-col justify-between h-full">
                <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-4">
                  The SajhaSupply Solution
                </span>
                <h2 className="section-title text-2xl sm:text-3xl mt-2">
                  Collective Volume Changes Everything
                </h2>
                <p className="text-sm sm:text-base text-[#64746B] mt-3 leading-relaxed">
                  By uniting neighbouring villages into collective purchasing blocks, SajhaSupply aggregates demand to unlock factory-floor wholesale tiers.
                </p>
                <ul className="mt-6 space-y-3.5">
                  {[
                    'Combined village orders unlock manufacturer volume discount tiers',
                    'AI demand prediction prevents stockouts before demand spikes',
                    'Smart route clustering cuts logistics freight by 40–60%',
                    'Transparent real-time tracking of community and individual savings',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#17251F] font-medium">
                      <span className="mt-0.5 w-5 h-5 bg-forest-100 text-forest-700 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </HoverRevealCard>
          </div>
        </div>
      </section>

      {/* COLLECTIVE PURCHASING INTERACTIVE SIMULATOR */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-amber-100/70 text-amber-800 border border-amber-200 mb-3">
              Interactive Prototype Demonstration
            </span>
            <h2 className="section-title">Collective Purchasing Simulator</h2>
            <p className="section-subtitle">
              Adjust village order quantities below and experience how combining requirements unlocks bulk discounts in real time.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Controls */}
            <div className="lg:col-span-7 glass-card p-6 sm:p-8 space-y-6">
              <div>
                <label className="label text-xs uppercase tracking-wider text-[#64746B] font-bold mb-2.5">
                  Select Commodity Product
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {sampleProducts.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProd(p)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${selectedProd.id === p.id
                        ? 'border-forest-600 bg-forest-50/90 text-forest-900 font-bold shadow-xs'
                        : 'border-white/70 bg-white/50 text-[#64746B] hover:bg-white/80'
                        }`}
                    >
                      <div className="truncate">{p.name.split('(')[0]}</div>
                      <div className="text-[11px] text-[#64746B] font-normal mt-0.5">Base: ₹{p.retail}/unit</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label text-xs uppercase tracking-wider text-[#64746B] font-bold mb-3.5">
                  Village Demands (Units per Village)
                </label>
                <div className="space-y-4">
                  {Object.entries(villageQuantities).map(([village, qty]) => (
                    <div key={village} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-[#17251F]">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-forest-600" /> {village}
                        </span>
                        <span className="font-mono text-forest-700 bg-white/60 px-2 py-0.5 rounded-md border border-white/80">
                          {qty} units
                        </span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="300"
                        step="10"
                        value={qty}
                        onChange={e => setVillageQuantities({ ...villageQuantities, [village]: Number(e.target.value) })}
                        className="w-full accent-forest-600 cursor-pointer h-2 bg-gray-200/80 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="lg:col-span-5 glass-panel p-6 sm:p-8 border-forest-200/70 shadow-card-hover space-y-6">
              <div>
                <div className="text-xs font-bold text-[#64746B] uppercase tracking-wider mb-1">
                  Combined Bulk Quantity
                </div>
                <div className="text-4xl font-extrabold text-[#17251F] tracking-tight">
                  {totalQty.toLocaleString()} <span className="text-lg font-normal text-[#64746B]">units</span>
                </div>
                <div className="text-xs text-forest-700 font-semibold mt-1">
                  Aggregated across 5 collaborating village clusters
                </div>
              </div>

              {/* Tier status */}
              <div className="space-y-2 text-xs">
                <div className="text-[#64746B] font-medium">Bulk Price Tier Progression:</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {selectedProd.tiers.map((t, idx) => {
                    const active = totalQty >= t.q;
                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border transition-all ${active
                          ? 'bg-forest-600 text-white font-bold border-forest-600 shadow-xs'
                          : 'bg-white/40 text-gray-400 border-white/60'
                          }`}
                      >
                        <div className="text-[11px]">{t.q}+ Units</div>
                        <div className="text-sm font-extrabold mt-0.5">₹{t.p}</div>
                        {active && <div className="text-[10px] text-forest-100">Unlocked!</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price comparison */}
              <div className="p-4 bg-white/70 backdrop-blur-md rounded-2xl border border-white/90 space-y-2.5 shadow-xs">
                <div className="flex justify-between text-xs">
                  <span className="text-[#64746B]">Individual Buying Rate:</span>
                  <span className="font-semibold text-gray-400 line-through">₹{selectedProd.retail}/unit</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-[#17251F]">SajhaSupply Collective Rate:</span>
                  <span className="font-extrabold text-forest-700">₹{currentPrice}/unit</span>
                </div>
                <div className="flex justify-between text-sm pt-2.5 border-t border-gray-100">
                  <span className="font-bold text-[#17251F]">Total Community Savings:</span>
                  <span className="font-black text-xl text-amber-600">₹{totalSavings.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={triggerConfetti}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm shadow-md hover:shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Simulate Bulk Lock-In
              </button>

              <p className="text-[11px] text-[#64746B] text-center italic">
                *Illustrative estimates based on typical wholesale manufacturer contracts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works: 6 Glass Cards */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge bg-forest-100/70 text-forest-800 border border-forest-200 mb-3">
              Procurement Journey
            </span>
            <h2 className="section-title">How SajhaSupply Works</h2>
            <p className="section-subtitle">
              Six simple steps that transform how rural shopkeepers procure everyday products.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass-card p-6 hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="text-3xl font-black text-forest-200 mb-2">{step.n}</div>
                <h3 className="font-bold text-[#17251F] text-base mb-2">{step.title}</h3>
                <p className="text-sm text-[#64746B] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities: Glass Cards */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="badge bg-purple-100/70 text-purple-800 border border-purple-200 mb-3">
              AI-Powered Capabilities
            </span>
            <h2 className="section-title">Intelligent Rural Commerce</h2>
            <p className="section-subtitle">
              SajhaSupply integrates predictive analytics, smart price comparison, and automated logistics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.slice(0, 3).map((card, i) => (
              <div key={i} className="glass-card p-6 space-y-4 hover:scale-[1.02] transition-transform duration-200">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#17251F] text-base">{card.title}</h3>
                <p className="text-sm text-[#64746B] leading-relaxed">{card.desc}</p>
                <div className="pt-2 border-t border-gray-100/80 text-xs font-bold text-forest-700">
                  Included in All Village Hubs
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-forest-600 to-forest-800 rounded-3xl p-10 sm:p-14 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <Leaf className="w-10 h-10 text-forest-200 mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Start Saving Today</h2>
            <p className="text-forest-100 text-base sm:text-lg mb-8 max-w-xl mx-auto font-normal">
              Join over 112 shopkeepers from 5 villages who are already buying smarter with SajhaSupply.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register" className="bg-white text-forest-700 font-bold px-8 py-3.5 rounded-xl hover:bg-forest-50 transition-colors inline-flex items-center gap-2 shadow-lg">
                Register as Shopkeeper <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="border-2 border-white/80 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors">
                Login to Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
