import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Star, Clock, MapPin, ArrowRight, X, CheckCircle } from "lucide-react";
import { tours } from "@/src/data/travelData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Tours() {
  const [activeTag, setActiveTag] = useState("All");
  const [selectedTour, setSelectedTour] = useState<null | typeof tours[0]>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "" });

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tours.forEach((tour) => tour.tags.forEach((tag) => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, []);

  const filteredTours = useMemo(() => {
    if (activeTag === "All") return tours;
    return tours.filter((tour) => tour.tags.includes(activeTag));
  }, [activeTag]);

  const closeModal = () => {
    setSelectedTour(null);
    setIsExpanded(false);
    setErrors({ name: "", email: "" });
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    
    let hasError = false;
    const newErrors = { name: "", email: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      hasError = true;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", email: "" });
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      closeModal();
    }, 3000);
  };

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <section id="tours" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-zinc-400 text-sm font-medium tracking-[0.2em] uppercase mb-4 block">
            Signature Experiences
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Featured Tour Packages
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTag === tag
                  ? "bg-white text-black"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} onClick={() => setSelectedTour(tour)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Tour Detail Modal */}
      <AnimatePresence>
        {selectedTour && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
            role="presentation"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="overflow-y-auto pr-2 -mr-2">
                <img
                  src={selectedTour.image}
                  alt={selectedTour.title}
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                  referrerPolicy="no-referrer"
                />
                
                <h2 id="modal-title" className="text-3xl font-serif font-bold text-white mb-4">{selectedTour.title}</h2>
                <p id="modal-description" className="text-zinc-400 mb-6">
                  {isExpanded || selectedTour.description.length <= 150 
                    ? selectedTour.description 
                    : `${selectedTour.description.substring(0, 150)}...`}
                  {selectedTour.description.length > 150 && (
                    <button onClick={toggleDescription} className="text-white ml-2 underline hover:text-zinc-300">
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/50 p-4 rounded-xl">
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">Duration</p>
                    <p className="text-white font-bold">{selectedTour.duration}</p>
                  </div>
                  <div className="bg-black/50 p-4 rounded-xl">
                    <p className="text-zinc-500 text-xs uppercase tracking-wider">Price</p>
                    <p className="text-white font-bold">${selectedTour.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-bold mb-4">Book This Tour</h3>
                  {isBooked ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-900/30 border border-green-500/50 p-4 rounded-xl flex items-center gap-3 text-green-400"
                    >
                      <CheckCircle className="w-6 h-6" />
                      <p>Booking successful! We will contact you soon.</p>
                    </motion.div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleBooking}>
                      <input name="name" type="text" placeholder="Your Name" aria-label="Your Name" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white" />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                      <input name="email" type="email" placeholder="Your Email" aria-label="Your Email" className="w-full bg-black border border-white/10 rounded-xl p-3 text-white" />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                      <Button type="submit" className="w-full bg-white text-black hover:bg-white/90">Confirm Booking</Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface TourCardProps {
  tour: typeof tours[0];
  onClick: () => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:shadow-2xl hover:shadow-white/5 transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <AnimatePresence mode="wait">
          {isHovered && tour.video ? (
            <motion.video
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={tour.video}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.img
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ y, scale: 1.2 }}
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </AnimatePresence>
        <div className="absolute top-4 left-4 flex gap-2">
          {tour.tags.map((tag) => (
            <Badge key={`${tour.id}-${tag}`} className="bg-black/90 text-white hover:bg-black border border-white/20 backdrop-blur-sm">
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
  );
};
