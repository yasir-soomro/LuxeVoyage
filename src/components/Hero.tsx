import { motion, useScroll, useTransform } from "motion/react";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000"
          alt="Travel Background"
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Beyond the Ordinary
          </span>
          <h1 className="text-5xl md:text-8xl font-serif text-white font-bold leading-[1.1] mb-8">
            The World, <br />
            <span className="italic font-normal">Refined.</span>
          </h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl md:rounded-full shadow-2xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
              <MapPin className="text-white/60 w-5 h-5" />
              <div className="text-left w-full">
                <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Location</p>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="bg-transparent text-white placeholder:text-white/40 border-none outline-none w-full text-sm"
                />
              </div>
            </div>
            
            <div className="hidden md:block w-px h-10 bg-white/10" />

            <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
              <Calendar className="text-white/60 w-5 h-5" />
              <div className="text-left w-full">
                <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Date</p>
                <input
                  type="text"
                  placeholder="Add dates"
                  className="bg-transparent text-white placeholder:text-white/40 border-none outline-none w-full text-sm"
                />
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/10" />

            <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
              <Users className="text-white/60 w-5 h-5" />
              <div className="text-left w-full">
                <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Travelers</p>
                <input
                  type="text"
                  placeholder="Add guests"
                  className="bg-transparent text-white placeholder:text-white/40 border-none outline-none w-full text-sm"
                />
              </div>
            </div>

            <Button className="w-full md:w-auto md:rounded-full h-12 px-8 bg-white text-black hover:bg-white/90">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
