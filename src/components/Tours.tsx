import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Clock, MapPin, ArrowRight, ArrowUp, Check, Heart, Share2, Search } from "lucide-react";
import { tours } from "@/src/data/travelData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useMapFocus } from "@/src/context/MapContext";

const TourModal = dynamic(() => import("./TourModal"), { ssr: false });
const CompareModal = dynamic(() => import("./CompareModal"), { ssr: false });

export default function Tours() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [sortOrder, setSortOrder] = useState<"def" | "asc" | "desc">("def");
  const [isLoadingTours, setIsLoadingTours] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [compareTours, setCompareTours] = useState<number[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const toggleCompare = (id: number) => {
    setCompareTours(prev => {
      if (prev.includes(id)) return prev.filter(tId => tId !== id);
      if (prev.length >= 3) return prev; // Maximum 3 tours for comparison
      return [...prev, id];
    });
  };

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

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('luxevoyage_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch (e) {
      // Ignore
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('luxevoyage_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isMounted]);

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
    
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter((tour) => tour.title.toLowerCase().includes(q));
    }
    
    if (activeTag !== "All") {
      result = result.filter((tour) => tour.tags.includes(activeTag));
    }

    result = [...result];

    if (sortOrder === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeTag, wishlist, sortOrder, searchQuery]);

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
                    isCompared={compareTours.includes(tour.id)}
                    onToggleCompare={(e) => {
                      e.stopPropagation();
                      toggleCompare(tour.id);
                    }}
                    compareDisabled={compareTours.length >= 3 && !compareTours.includes(tour.id)}
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
        <div className="flex flex-col gap-6 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:w-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-zinc-900 border border-white/10 text-white text-sm rounded-full pl-11 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-white transition-colors hover:bg-zinc-800"
                aria-label="Search tours filter"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
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
                  isCompared={compareTours.includes(tour.id)}
                  onToggleCompare={(e) => {
                    e.stopPropagation();
                    toggleCompare(tour.id);
                  }}
                  compareDisabled={compareTours.length >= 3 && !compareTours.includes(tour.id)}
                />
              ))}
            </AnimatePresence>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {compareTours.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none"
          >
            <div className="max-w-7xl mx-auto flex justify-center">
              <div className="bg-zinc-900/90 backdrop-blur-md border border-white/20 rounded-full py-3 px-6 shadow-2xl flex items-center gap-6 pointer-events-auto">
                <span className="text-white text-sm font-medium">
                  {compareTours.length} {compareTours.length === 1 ? 'tour' : 'tours'} selected
                </span>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 rounded-full px-4 h-9"
                    onClick={() => setCompareTours([])}
                  >
                    Clear
                  </Button>
                  <Button 
                    className="bg-white text-black hover:bg-zinc-200 rounded-full px-6 h-9 font-medium"
                    onClick={() => setIsCompareModalOpen(true)}
                  >
                    Compare
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CompareModal 
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareTours={compareTours}
        onRemove={toggleCompare}
      />

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
  isCompared?: boolean;
  onToggleCompare?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  compareDisabled?: boolean;
}

const TourCard: React.FC<TourCardProps> = ({ tour, isWishlisted, onToggleWishlist, isCompared, onToggleCompare, compareDisabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { setFocusLocation } = useMapFocus();

  const handleCardClick = () => {
    if ((tour as any).coordinates) {
      setFocusLocation((tour as any).coordinates);
      document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsExpanded(true);
    }
  };

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
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
        onMouseMove={handleMouseMove}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${tour.title}`}
        className="group bg-zinc-900 rounded-3xl border border-white/10 hover:shadow-2xl hover:shadow-white/10 transition-shadow duration-500 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
              <motion.div
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
                className="absolute inset-0 origin-center"
              >
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </motion.div>
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
                className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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

          {/* Image Caption overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h4 className="text-white text-2xl font-serif font-bold drop-shadow-lg">{tour.title}</h4>
              <div className="flex items-center gap-1.5 text-zinc-200 text-sm mt-2 drop-shadow-md">
                <MapPin className="w-4 h-4" />
                {tour.location}
              </div>
            </motion.div>
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
          
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 mb-6 text-sm sm:text-base text-zinc-400">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {tour.duration}
              </div>
              <div className="font-bold text-white">
                From ${tour.price.toLocaleString()}
              </div>
            </div>

            <label 
              className={`flex items-center gap-2 text-sm z-20 ${compareDisabled && !isCompared ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-white transition-colors'} ${isCompared ? 'text-white font-medium' : ''}`} 
              onClick={(e) => e.stopPropagation()}
            >
              <input 
                type="checkbox"
                checked={isCompared}
                onChange={onToggleCompare}
                disabled={compareDisabled && !isCompared}
                className="w-4 h-4 rounded bg-zinc-800 border-zinc-600 accent-white cursor-pointer"
                aria-label={`Compare ${tour.title}`}
              />
              Compare
            </label>
          </div>
          <Button 
            className="w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 group/btn mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            aria-label={`View details for ${tour.title}`}
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
