import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Clock, MapPin, ArrowRight, X, CheckCircle, Heart, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { tours } from "@/src/data/travelData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Tours() {
  const [activeTag, setActiveTag] = useState("All");
  const [selectedTour, setSelectedTour] = useState<null | typeof tours[0]>(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isLoadingTours, setIsLoadingTours] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [bookingDetails, setBookingDetails] = useState<{id: string, name: string, email: string, tourTitle: string} | null>(null);
  
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedTour || !selectedTour.images || selectedTour.images.length <= 1) return;
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) => (prev - 1 + selectedTour.images!.length) % selectedTour.images!.length);
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) => (prev + 1) % selectedTour.images!.length);
      }
    };

    if (isExpanded || selectedTour) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTour, isExpanded]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]);
  };

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tours.forEach((tour) => tour.tags.forEach((tag) => tags.add(tag)));
    const baseTags = ["All", ...Array.from(tags)];
    if (wishlist.length > 0) {
      baseTags.push("Saved");
    }
    return baseTags;
  }, [wishlist.length]);

  const filteredTours = useMemo(() => {
    if (activeTag === "Saved") return tours.filter(tour => wishlist.includes(tour.id));
    if (activeTag === "All") return tours;
    return tours.filter((tour) => tour.tags.includes(activeTag));
  }, [activeTag, wishlist]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const closeModal = () => {
    setSelectedTour(null);
    setIsExpanded(false);
    setCurrentImageIndex(0);
    setErrors({ name: "", email: "" });
    setName("");
    setEmail("");
    setIsBooking(false);
    setIsBooked(false);
    setBookingDetails(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTour && selectedTour.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedTour.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedTour && selectedTour.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedTour.images.length) % selectedTour.images.length);
    }
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
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
        tourTitle: selectedTour?.title || "",
        date: new Date().toISOString()
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('luxevoyage_bookings') || '[]');
      localStorage.setItem('luxevoyage_bookings', JSON.stringify([...existingBookings, newBooking]));
      
      setBookingDetails(newBooking);
      setIsBooked(true);
      
      setTimeout(() => {
        setIsBooked(false);
        closeModal();
      }, 5000);
    }, 1500);
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
                  onClick={() => { setSelectedTour(tour); setCurrentImageIndex(0); }} 
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
                <div className="relative w-full h-64 rounded-2xl mb-6 overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      src={selectedTour.images ? selectedTour.images[currentImageIndex] : selectedTour.image}
                      alt={`${selectedTour.title} - ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover absolute inset-0"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  
                  {selectedTour.images && selectedTour.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {selectedTour.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${
                              idx === currentImageIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
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

                {selectedTour.itinerary && (
                  <div className="border-t border-white/10 pt-6 mb-6">
                    <h4 className="text-white font-bold mb-4 text-lg">Itinerary</h4>
                    <div className="space-y-4">
                      {selectedTour.itinerary.map((day, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-black/50 text-white rounded-lg flex items-center justify-center font-bold">
                            D{day.day}
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-white font-medium">{day.title}</p>
                            <p className="text-zinc-400 text-sm mt-1">{day.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTour.included && (
                  <div className="border-t border-white/10 pt-6 mb-6">
                    <h4 className="text-white font-bold mb-4 text-lg">What's Included</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedTour.included.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-zinc-300 text-sm bg-black/30 p-2 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTour.reviews && (
                  <div className="border-t border-white/10 pt-6 mb-8">
                    <h4 className="text-white font-bold mb-4 text-lg">Traveler Reviews</h4>
                    <div className="space-y-4">
                      {selectedTour.reviews.map((review, idx) => (
                        <div key={idx} className="bg-black/50 p-4 rounded-xl">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-zinc-300 text-sm mb-2">{review.text}</p>
                          <p className="text-zinc-500 text-xs font-medium">— {review.author}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white font-bold mb-4">Book This Tour</h3>
                  {isBooked ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-900/10 border border-green-500/30 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Booking Confirmed!</h4>
                      
                      {bookingDetails && (
                        <div className="bg-black/50 p-4 rounded-xl text-left border border-white/5 space-y-3 mt-4 text-sm w-full">
                          <div className="flex justify-between items-center"><span className="text-zinc-500">Booking ID</span> <span className="text-white font-mono font-medium">{bookingDetails.id}</span></div>
                          <div className="flex justify-between items-center"><span className="text-zinc-500">Tour</span> <span className="text-white text-right max-w-[150px] truncate" title={bookingDetails.tourTitle}>{bookingDetails.tourTitle}</span></div>
                          <div className="flex justify-between items-center"><span className="text-zinc-500">Name</span> <span className="text-white text-right max-w-[150px] truncate" title={bookingDetails.name}>{bookingDetails.name}</span></div>
                          <div className="flex justify-between items-center"><span className="text-zinc-500">Email</span> <span className="text-white text-right truncate max-w-[150px]" title={bookingDetails.email}>{bookingDetails.email}</span></div>
                        </div>
                      )}
                      <p className="text-zinc-400 text-sm mt-4">A confirmation has been sent to your email.</p>
                    </motion.div>
                  ) : (
                    <form className="space-y-4" onSubmit={handleBooking} noValidate>
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
                          className={`w-full bg-black border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-white`} 
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
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
                          className={`w-full bg-black border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-white`} 
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                      </div>
                      <Button type="submit" disabled={isBooking} className="w-full bg-white text-black hover:bg-white/90">
                        {isBooking ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </Button>
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
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onClick, isWishlisted, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 cursor-pointer"
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
              animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
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
        <button
          onClick={onToggleWishlist}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10 backdrop-blur-sm"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>
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
