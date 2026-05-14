import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Clock, MapPin, ArrowRight, ArrowUp, Check, Heart, Share2 } from "lucide-react";
import { tours } from "@/src/data/travelData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TourModal from "./TourModal";

export default function Tours() {
  const [activeTag, setActiveTag] = useState("All");
  const [sortOrder, setSortOrder] = useState<"def" | "asc" | "desc">("def");
  const [isLoadingTours, setIsLoadingTours] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const section = document.getElementById("tours");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('luxevoyage_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('luxevoyage_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingTours(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]);
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tours.forEach((tour) => tour.tags.forEach((tag) => tags.add(tag)));
    return ["All", ...Array.from(tags)];
  }, []);

  const savedTours = useMemo(() => {
    return tours.filter(tour => wishlist.includes(tour.id));
  }, [wishlist]);

  const filteredTours = useMemo(() => {
    let result = tours;
    if (activeTag !== "All") {
      result = tours.filter((tour) => tour.tags.includes(activeTag));
    }

    result = [...result];

    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeTag, wishlist, sortOrder]);

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

        {savedTours.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              <h3 className="text-3xl font-serif font-bold text-white">Your Saved Tours</h3>
            </div>
            
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start"
            >
              <AnimatePresence mode="popLayout">
                {savedTours.map((tour) => (
                  <TourCard 
                    key={`saved-${tour.id}`} 
                    tour={tour} 
                    isWishlisted={true}
                    onToggleWishlist={(e) => {
                      e.stopPropagation();
                      toggleWishlist(tour.id);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {savedTours.length > 0 && (
          <div className="flex items-center gap-6 mb-12">
            <h3 className="text-3xl font-serif font-bold text-white whitespace-nowrap">Discover More</h3>
            <div className="h-px bg-white/10 w-full" />
          </div>
        )}

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
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

          <div className="flex items-center gap-3">
            <span className="text-zinc-500 text-sm font-medium">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="bg-zinc-900 border border-white/10 text-white text-sm rounded-full px-4 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white transition-colors hover:bg-zinc-800"
              aria-label="Sort tours by price"
            >
              <option value="def">Recommended</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start"
        >
          {isLoadingTours ? (
            <>
              <TourCardSkeleton />
              <TourCardSkeleton />
              <TourCardSkeleton />
            </>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredTours.map((tour) => (
                <TourCard 
                  key={tour.id} 
                  tour={tour} 
                  isWishlisted={wishlist.includes(tour.id)}
                  onToggleWishlist={(e) => {
                    e.stopPropagation();
                    toggleWishlist(tour.id);
                  }}
                />
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-white text-black rounded-full shadow-2xl hover:bg-zinc-200 transition-colors z-50 group"
            aria-label="Scroll to top of tours"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}

interface TourCardProps {
  tour: typeof tours[0];
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, isWishlisted, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Wishlist animation state
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  const [showWishlistToast, setShowWishlistToast] = useState(false);

  // Share state
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const url = `${window.location.origin}${window.location.pathname}?tour=${tour.id}#tours`;
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(e);
    setIsWishlistAnimating(true);
    if (!isWishlisted) {
      setShowWishlistToast(true);
      setTimeout(() => setShowWishlistToast(false), 2000);
    }
    setTimeout(() => setIsWishlistAnimating(false), 300);
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -12, scale: 1.02 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() => setIsExpanded(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
        onMouseMove={handleMouseMove}
        className="group bg-zinc-900 rounded-3xl border border-white/10 hover:shadow-2xl hover:shadow-white/10 transition-shadow duration-500 cursor-pointer overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <AnimatePresence mode="wait">
            {(isHovered && tour.video) ? (
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
                key="img"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: isHovered ? 1.15 : 1,
                  x: isHovered ? mousePos.x * -30 : 0,
                  y: isHovered ? mousePos.y * -30 : 0
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: isHovered ? 0.2 : 0.7, ease: "easeOut" }}
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover absolute inset-0 origin-center"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            )}
          </AnimatePresence>

          <div className="absolute top-4 left-4 flex gap-2 z-10 text-xs sm:text-sm">
            {tour.tags.map((tag) => (
              <Badge key={`${tour.id}-${tag}`} className="bg-black/90 text-white hover:bg-black border border-white/20 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-20">
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm relative"
                aria-label="Share tour"
              >
                <AnimatePresence mode="wait">
                  {isCopied ? (
                    <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="w-5 h-5 text-green-400" />
                    </motion.div>
                  ) : (
                    <motion.div key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Share2 className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <button
                onClick={handleToggleWishlist}
                className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm relative"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <motion.div
                  animate={isWishlistAnimating ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </motion.div>
              </button>
            </div>
            <AnimatePresence>
              {showWishlistToast && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="bg-black/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10"
                >
                  Saved to Wishlist!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-white z-10">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {tour.rating}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            {tour.location}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-zinc-300 transition-colors">
              {tour.title}
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 text-sm sm:text-base text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {tour.duration}
            </div>
            <div className="font-bold text-white">
              From ${tour.price.toLocaleString()}
            </div>
          </div>
          <Button 
            className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 group/btn mt-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
          >
            View Details
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <TourModal
            tour={tour}
            isWishlisted={isWishlisted}
            onToggleWishlist={onToggleWishlist}
            onClose={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const TourCardSkeleton = () => (
  <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 animate-pulse">
    <div className="aspect-[16/10] bg-zinc-800"></div>
    <div className="p-8">
      <div className="h-4 w-24 bg-zinc-800 rounded mb-4"></div>
      <div className="h-8 w-4/5 bg-zinc-800 rounded mb-6"></div>
      <div className="flex gap-6 mb-8">
        <div className="h-4 w-20 bg-zinc-800 rounded"></div>
        <div className="h-4 w-24 bg-zinc-800 rounded"></div>
      </div>
      <div className="h-12 w-full bg-zinc-800 rounded-xl"></div>
    </div>
  </div>
);
