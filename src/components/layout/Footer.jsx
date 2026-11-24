import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Globe, MessageCircle, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-forest-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-lg"><span className="font-logo">Sajha</span><span className="font-bold">Supply</span></span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Empowering rural communities through collective procurement and smart logistics.
            </p>
            <p className="text-xs text-gray-500">Collective Buying. Smarter Living.</p>
            <div className="flex gap-3 mt-5">
              {[Globe, MessageCircle, Share2].map((Icon, i) => (
                <button key={i} className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-forest-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              {['How It Works', 'Features', 'Explore Products', 'Group Orders'].map(l => (
                <li key={l}><Link to="#" className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {['About Us', 'Our Mission', 'Contact', 'Privacy Policy'].map(l => (
                <li key={l}><Link to="#" className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-forest-500" />hello@sajhasupply.in</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-forest-500" />+91 1800 123 4567</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-forest-500 mt-0.5" />Lucknow, Uttar Pradesh, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© 2024 SajhaSupply. All rights reserved.</span>
          <span className="flex items-center gap-1">Made with <span className="text-red-400">♥</span> for rural India</span>
        </div>
      </div>
    </footer>
  );
}
