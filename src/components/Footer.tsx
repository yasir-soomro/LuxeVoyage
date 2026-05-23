import { Globe, Instagram, Twitter, Facebook, Youtube, ChevronDown } from "lucide-react";
import { appData } from "@/src/data/travelData";

const faqs = [
  {
    question: "How do I book a tour?",
    answer: "You can book a tour directly through our website by clicking the 'Book Now' button on any tour page and filling out the secure booking form."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We offer a full refund for cancellations made up to 30 days before the tour departure date. Cancellations made within 30 days may be subject to a cancellation fee."
  },
  {
    question: "Are flights included in the tour price?",
    answer: "International and domestic flights to the starting point of the tour are generally not included unless explicitly stated in the specific tour itinerary."
  },
  {
    question: "Do I need travel insurance?",
    answer: "Yes, comprehensive travel insurance covering medical, evacuation, and trip cancellation is mandatory for all our international tours."
  }
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-black pt-24 pb-12 border-t border-white/10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        {/* FAQ Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif font-bold text-white mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-zinc-400 text-center mb-10">Everything you need to know about our tours and services.</p>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="group bg-zinc-900 border border-white/10 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 text-white font-medium focus:outline-none focus:bg-white/5 transition-colors">
                  {faq.question}
                  <span className="transition duration-300 group-open:-rotate-180">
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  </span>
                </summary>
                <div className="p-6 pt-0 text-zinc-400 leading-relaxed bg-zinc-900">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white p-1.5 rounded-full text-black">
                <Globe className="w-6 h-6" strokeWidth={2} aria-hidden="true" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-white">
                {appData.navbar.logo}
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-8">
              {appData.footer.description}
            </p>
            <div className="flex gap-4">
              {appData.footer.socialLinks.map((social) => {
                const Icon = social.name === "Instagram" ? Instagram : social.name === "Twitter" ? Twitter : social.name === "Facebook" ? Facebook : Youtube;
                return (
                  <a key={social.name} href={social.url} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all focus:outline-none focus:ring-2 focus:ring-white/50" aria-label={`Visit our ${social.name}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h2>
            <ul className="space-y-4">
              {appData.footer.companyLinks.map((link) => (
                <li key={link.name}><a href={link.href} className="text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-sm px-1 py-0.5 -mx-1">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Support</h2>
            <ul className="space-y-4">
              {appData.footer.supportLinks.map((link) => (
                <li key={link.name}><a href={link.href} className="text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-sm px-1 py-0.5 -mx-1">{link.name}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Newsletter</h2>
            <p className="text-zinc-400 mb-6 focus:outline-none" tabIndex={0}>Subscribe to receive travel inspiration and exclusive offers.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Your email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-white/50 text-white transition-shadow"
                required
              />
              <button type="submit" className="bg-white text-black font-medium px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-4 focus:ring-white/30">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-500 text-sm focus:outline-none" tabIndex={0}>
            {appData.footer.copyright}
          </p>
          <div className="flex gap-6 md:gap-8 text-sm text-zinc-500 flex-wrap justify-center">
            {appData.footer.legalLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded-sm px-1 py-0.5 -mx-1">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
