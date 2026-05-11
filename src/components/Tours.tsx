import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Clock, MapPin, ArrowRight, X, CheckCircle, Heart, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { tours } from "@/src/data/travelData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Tours() {
  const [activeTag, setActiveTag] = useState("All");
  const [sortOrder, setSortOrder] = useState<"def" | "asc" | "desc">("def");
  const [isLoadingTours, setIsLoadingTours] = useState(true);

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Booking state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [bookingDetails, setBookingDetails] = useState<{id: string, name: string, email: string, tourTitle: string} | null>(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tour.images) {
      setCurrentImageIndex((prev) => (prev + 1) % tour.images!.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tour.images) {
      setCurrentImageIndex((prev) => (prev - 1 + tour.images!.length) % tour.images!.length);
    }
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    let hasError = false;
    const newErrors = { name: "", email: "" };

    if (!name.trim()) {
      newErrors.name = "Name is required.";
      hasError = true;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    setErrors({ name: "", email: "" });
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      
      const bookingId = `BKG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      const newBooking = {
        id: bookingId,
        name,
        email,
        tourTitle: tour.title,
        date: new Date().toISOString()
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('luxevoyage_bookings') || '[]');
      localStorage.setItem('luxevoyage_bookings', JSON.stringify([...existingBookings, newBooking]));
      
      setBookingDetails(newBooking);
      setIsBooked(true);
      
      setTimeout(() => {
        setIsBooked(false);
        setIsExpanded(false);
        setName("");
        setEmail("");
        setBookingDetails(null);
        setCurrentImageIndex(0);
      }, 5000);
    }, 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={!isExpanded ? { y: -8 } : {}}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => { if (!isExpanded) setIsExpanded(true); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:shadow-2xl hover:shadow-white/10 transition-shadow duration-500 ${!isExpanded ? 'cursor-pointer' : ''} ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
    >
      <div className={`relative ${isExpanded ? 'h-64 sm:h-80 md:h-96 w-full' : 'aspect-[16/10]'} overflow-hidden`}>
        <AnimatePresence mode="wait">
          {(!isExpanded && isHovered && tour.video) ? (
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
              key={`img-${currentImageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: (!isExpanded && isHovered) ? 1.1 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              src={isExpanded && tour.images ? tour.images[currentImageIndex] : tour.image}
              alt={tour.title}
              className="w-full h-full object-cover absolute inset-0"
              referrerPolicy="no-referrer"
            />
          )}
        </AnimatePresence>

        {isExpanded && tour.images && tour.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90 z-20 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90 z-20 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {tour.images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentImageIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 flex gap-2 z-10 text-xs sm:text-sm">
          {tour.tags.map((tag) => (
            <Badge key={`${tour.id}-${tag}`} className="bg-black/90 text-white hover:bg-black border border-white/20 backdrop-blur-sm">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={onToggleWishlist}
            className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
          {isExpanded && (
            <button
              onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
              className="p-2.5 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors backdrop-blur-sm"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        {!isExpanded && (
          <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold text-white z-10">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {tour.rating}
          </div>
        )}
      </div>

      <div className={`p-6 sm:p-8 ${isExpanded ? 'bg-zinc-900 border-t border-white/10' : ''}`}>
        <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          {tour.location}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-zinc-300 transition-colors">
            {tour.title}
          </h3>
          {isExpanded && (
            <div className="bg-black/50 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold text-white self-start sm:self-auto border border-white/5 whitespace-nowrap">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 
              {tour.rating} <span className="text-zinc-400 font-normal">({tour.reviews?.length || 0} reviews)</span>
            </div>
          )}
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

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-white/10">
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">About this Tour</h4>
                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                      {tour.description}
                    </p>
                  </div>

                  {tour.itinerary && (
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Itinerary</h4>
                      <div className="space-y-4">
                        {tour.itinerary.map((day, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 text-white rounded-xl border border-white/5 flex items-center justify-center font-bold text-sm sm:text-base">
                              D{day.day}
                            </div>
                            <div className="flex flex-col justify-center">
                              <p className="text-white font-medium text-sm sm:text-base">{day.title}</p>
                              <p className="text-zinc-400 text-xs sm:text-sm mt-1">{day.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {tour.included && (
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">What's Included</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {tour.included.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-zinc-300 text-sm bg-black/30 p-4 rounded-xl border border-white/5">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="bg-black/50 p-6 sm:p-8 rounded-2xl border border-white/5">
                    <h4 className="text-xl font-bold text-white mb-6">Book This Tour</h4>
                    {isBooked ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-900/10 border border-green-500/30 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-3"
                      >
                        <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <h4 className="text-xl font-bold text-white">Booking Confirmed!</h4>
                        
                        {bookingDetails && (
                          <div className="bg-black/50 p-4 rounded-xl text-left border border-white/5 space-y-3 mt-4 text-sm w-full text-zinc-300">
                            <div className="flex justify-between items-center"><span className="text-zinc-500">Booking ID</span> <span className="font-mono text-white">{bookingDetails.id}</span></div>
                            <div className="flex justify-between items-center"><span className="text-zinc-500">Name</span> <span className="text-white truncate max-w-[150px]">{bookingDetails.name}</span></div>
                          </div>
                        )}
                        <p className="text-zinc-400 text-sm mt-3">A confirmation has been sent to your email.</p>
                      </motion.div>
                    ) : (
                      <form className="space-y-4" onSubmit={handleBooking} noValidate onClick={(e) => e.stopPropagation()}>
                        <div>
                          <input 
                            name="name" 
                            type="text" 
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) setErrors({...errors, name: ""});
                            }}
                            placeholder="Your Name" 
                            aria-label="Your Name" 
                            className={`w-full bg-black border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-white transition-colors`} 
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-2 ml-1">{errors.name}</p>}
                        </div>
                        <div>
                          <input 
                            name="email" 
                            type="email" 
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) setErrors({...errors, email: ""});
                            }}
                            placeholder="Your Email" 
                            aria-label="Your Email" 
                            className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl p-4 text-white focus:outline-none focus:ring-1 focus:ring-white transition-colors`} 
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-2 ml-1">{errors.email}</p>}
                        </div>
                        <Button type="submit" disabled={isBooking} className="w-full bg-white text-black hover:bg-white/90 font-bold h-14 rounded-xl text-base mt-2">
                          {isBooking ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Confirm Booking"
                          )}
                        </Button>
                      </form>
                    )}
                  </div>

                  {tour.reviews && tour.reviews.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-lg font-bold text-white mb-4">Traveler Reviews</h4>
                      <div className="space-y-3">
                        {tour.reviews.slice(0, 3).map((review, idx) => (
                          <div key={idx} className="bg-black/30 border border-white/5 p-5 rounded-2xl">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-white text-sm font-medium">{review.author}</span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed italic">"{review.text}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isExpanded && (
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
        )}
      </div>
    </motion.div>
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
