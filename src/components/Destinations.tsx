import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/src/data/travelData";
import Image from "next/image";
import dynamic from "next/dynamic";

const DestinationsMap = dynamic(() => import("./DestinationsMap"), { ssr: false });

export default function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-black" aria-labelledby="destinations-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-zinc-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block focus:outline-none" tabIndex={0}>
              Curated Collections
            </span>
            <h2 id="destinations-title" className="text-4xl md:text-5xl font-serif font-bold text-white focus:outline-none" tabIndex={0}>
              Popular Destinations <br />
              <span className="italic font-normal text-zinc-500">Waiting for You</span>
            </h2>
          </div>
          <button 
            onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-white font-medium hover:opacity-70 transition-opacity focus:outline-none focus:ring-4 focus:ring-white/30 rounded-full px-4 py-2 -mx-4 group"
          >
            View All Destinations <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 [perspective:1000px] mb-24">
          {destinations.map((dest, index) => (
            <motion.a
              href="#tours"
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ rotateY: 10, rotateX: 5, scale: 1.05 }}
              className="group block cursor-pointer [transform-style:preserve-3d] focus:outline-none focus:ring-4 focus:ring-white/50 rounded-[2rem] p-2 -m-2"
              aria-labelledby={`dest-title-${dest.id}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] mb-6 shadow-2xl shadow-black/50">
                <Image
                  src={dest.image}
                  alt={`Destination in ${dest.country}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                <div className="absolute bottom-6 left-6 right-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-sm font-medium mb-1 drop-shadow-md">{dest.category}</p>
                  <h3 className="text-xl font-bold drop-shadow-md line-clamp-2">{dest.description}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between px-2">
                <div>
                  <h3 id={`dest-title-${dest.id}`} className="text-xl font-serif font-bold text-white transition-colors group-hover:text-zinc-200">{dest.name}</h3>
                  <p className="text-zinc-400">{dest.country}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="border border-white/10 rounded-[2rem] p-2 bg-zinc-950 shadow-2xl overflow-hidden h-[600px] mb-8">
          <DestinationsMap />
        </div>
      </div>
    </section>
  );
}
