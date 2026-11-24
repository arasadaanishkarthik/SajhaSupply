import { useState } from 'react';
import PublicNavbar from '../../components/navigation/PublicNavbar';
import Footer from '../../components/layout/Footer';
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
  { q: 'Who can participate in SajhaSupply?', a: 'Any registered kirana store owner, FMCG distributor, or local transport driver in rural India. Currently actively deployed across 5 model village hubs in Uttar Pradesh.' },
  { q: 'Are collective volume prices guaranteed?', a: 'All listed collective prices are illustrative estimates calibrated on verified bulk manufacturer contracts. Actual prices lock in automatically once order quantity thresholds are met.' },
  { q: 'When do shopkeepers pay for collective orders?', a: 'SajhaSupply supports digital UPI and payment-on-delivery at the village distribution hub upon physical order inspection.' },
  { q: 'What FMCG commodities are supported?', a: '15+ high-velocity FMCG items across Cooking Oils (Fortune), Atta (Aashirvaad), Salt (Tata), Pulses (Toor & Chana Dal), Dairy (Amul), Tea, and Biscuits.' },
  { q: 'Can a village coordinator track dispatches live?', a: 'Yes. Every assigned delivery features waypoint timelines and coordinator contact details in the Order Tracking tab.' },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    toast.success('Your message has been sent to our rural support coordinators.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] relative overflow-hidden">
      <div className="ambient-glow-tl" />
      <div className="ambient-glow-br" />

      <PublicNavbar />
      <div className="relative z-10 pt-28 pb-16">
        <div className="py-14 px-4 text-center">
          <span className="badge bg-forest-100/80 text-forest-800 border border-forest-200 mb-3">
            Direct Support
          </span>
          <h1 className="page-heading text-[#17251F] mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg text-[#64746B] max-w-xl mx-auto font-normal">
            Need help setting up a collective village order or onboarding as a verified supplier? Reach out anytime.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div className="glass-card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#17251F] mb-5 tracking-tight">Send a Message</h2>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="label">Your Name</label>
                <input className="input" placeholder="Ramesh Kumar" value={form.name} onChange={e => set('name', e.target.value)} required />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input type="email" className="input" placeholder="ramesh@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
              </div>
              <div>
                <label className="label">Topic / Subject</label>
                <input className="input" placeholder="e.g. Inquiring about starting a village hub" value={form.subject} onChange={e => set('subject', e.target.value)} required />
              </div>
              <div>
                <label className="label">Message</label>
                <textarea className="input h-32 resize-none" placeholder="Provide details about your shop or village requirements..." value={form.message} onChange={e => set('message', e.target.value)} required />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-3 text-xs shadow-md">
                <Send className="w-3.5 h-3.5" /> Submit Inquiry
              </button>
            </form>
          </div>

          {/* Details & FAQs */}
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-3.5">
              <h2 className="text-lg font-bold text-[#17251F] mb-3">Support Hotlines</h2>
              {[
                { icon: Mail, label: 'Email Desk', val: 'support@sajhasupply.in' },
                { icon: Phone, label: 'Toll-free Rural Helpline', val: '+91 1800 123 4567 (Toll-Free)' },
                { icon: MapPin, label: 'Regional Distribution HQ', val: 'Amar Shaheed Path, Lucknow, Uttar Pradesh' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border border-white/80">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
                    <c.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#64746B] font-medium">{c.label}</div>
                    <div className="text-xs font-bold text-[#17251F]">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h2 className="text-lg font-bold text-[#17251F] mb-4">Frequently Asked Questions</h2>
              <div className="space-y-2.5">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-white/80 bg-white/50 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-3.5 text-left hover:bg-white/70 transition-colors"
                    >
                      <span className="font-semibold text-xs text-[#17251F]">{faq.q}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-[#64746B] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-3.5 pb-3.5 text-xs text-[#64746B] leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
