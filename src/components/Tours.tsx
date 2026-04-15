import { motion } from "motion/react";
import { Star, Clock, MapPin, ArrowRight } from "lucide-react";
import { tours } from "@/src/data/travelData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Tours() {
  return (
    <section id="tours" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-zinc-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Signature Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Featured Tour Packages
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Discover our handpicked selection of premium tours designed to provide 
            authentic and unforgettable experiences across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:shadow-2xl hover:shadow-white/5 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {tour.tags.map((tag) => (
                    <Badge key={tag} className="bg-black/90 text-white hover:bg-black border border-white/20 backdrop-blur-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-white">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {tour.rating}
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
                  <MapPin className="w-3 h-3" />
                  {tour.location}
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-zinc-300 transition-colors">
                  {tour.title}
                </h3>
                
                <div className="flex items-center gap-6 mb-8 text-sm text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {tour.duration}
                  </div>
                  <div className="font-bold text-white">
                    From ${tour.price.toLocaleString()}
                  </div>
                </div>

                <Button className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 group/btn">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
