import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/src/data/travelData";

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-zinc-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
              Curated Collections
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Popular Destinations <br />
              <span className="italic font-normal text-zinc-500">Waiting for You</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-white font-medium hover:opacity-70 transition-opacity">
            View All Destinations <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 [perspective:1000px]">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
              className="group cursor-pointer [transform-style:preserve-3d]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] mb-6 shadow-2xl shadow-black/50">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-sm font-medium mb-1">{dest.category}</p>
                  <h3 className="text-xl font-bold">{dest.name}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">{dest.name}</h3>
                  <p className="text-zinc-400">{dest.country}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
