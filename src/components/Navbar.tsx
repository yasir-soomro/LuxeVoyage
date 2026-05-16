import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appData } from "@/src/data/travelData";
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = appData.navbar.links;

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
    exit: { opacity: 0, y: -20 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? "pt-4 px-4" : "pt-6 px-4 md:px-8"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${
          isScrolled
            ? "max-w-5xl bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3.5 shadow-2xl shadow-black/50"
            : "max-w-7xl bg-transparent px-2 py-0"
        }`}
        aria-label="Main Navigation"
      >
        <motion.div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full pr-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="LuxeVoyage Home"
          role="button"
          tabIndex={0}
        >
          <div className="bg-white p-1.5 rounded-full text-black">
            <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" strokeWidth={2} aria-hidden="true" />
          </div>
          <span className="text-xl font-serif font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
            {appData.navbar.logo}
          </span>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                {link.name}
              </a>
            ))}
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] h-11 px-7 font-bold text-sm focus:ring-4 focus:ring-white/30"
            >
              Book Now
            </Button>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded-full transition-colors z-50 relative backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-zinc-950/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 md:hidden z-40 border-b border-white/10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={itemVariants}
                  className="text-3xl font-serif text-white hover:text-zinc-400 transition-colors tracking-tight focus:outline-none focus:ring-2 focus:ring-white/50 p-2 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <motion.div variants={itemVariants}>
              <Button className="mt-6 bg-white text-black hover:bg-zinc-200 rounded-full px-10 py-7 text-xl font-bold shadow-2xl focus:ring-4 focus:ring-white/30">
                Book Now
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
