import { Globe, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-8 h-8 text-white" />
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                LuxeVoyage
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Crafting extraordinary journeys for the discerning traveler. 
              Explore the world with elegance and ease.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Safety Information</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Cancellation Options</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors">Our COVID-19 Response</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
            <p className="text-zinc-400 mb-6">Subscribe to receive travel inspiration and exclusive offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white/10 text-white"
              />
              <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-sm">
            © 2024 LuxeVoyage. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
