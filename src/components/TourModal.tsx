import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Clock, MapPin, X, CheckCircle, Heart, Loader2, ChevronLeft, ChevronRight, Share2, Check } from "lucide-react";
import { tours } from "@/src/data/travelData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TourModalProps {
  tour: typeof tours[0];
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  onClose: () => void;
}

export default function TourModal({ tour, isWishlisted, onToggleWishlist, onClose }: TourModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Booking state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "" });
  const [bookingDetails, setBookingDetails] = useState<{id: string, name: string, email: string, tourTitle: string} | null>(null);

  // Wishlist animation state
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);

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

  // Reviews state
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [addedReviews, setAddedReviews] = useState<{author: string, text: string, rating: number}[]>([]);
  const [isMountedModal, setIsMountedModal] = useState(false);

  useEffect(() => {
    setIsReviewSubmitted(false);
    setIsMountedModal(true);
    try {
      const saved = localStorage.getItem(`luxevoyage_reviews_${tour.id}`);
      if (saved) {
        setAddedReviews(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, [tour.id]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(e);
    setIsWishlistAnimating(true);
    setTimeout(() => setIsWishlistAnimating(false), 300);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!newReviewText.trim() || !newReviewAuthor.trim()) return;
    
    setIsSubmittingReview(true);
    setTimeout(() => {
      const newReview = { 
        author: newReviewAuthor, 
        text: newReviewText, 
        rating: newReviewRating 
      };
      const updatedReviews = [newReview, ...addedReviews];
      setAddedReviews(updatedReviews);
      localStorage.setItem(`luxevoyage_reviews_${tour.id}`, JSON.stringify(updatedReviews));
      
      setNewReviewText("");
      setNewReviewAuthor("");
      setNewReviewRating(5);
      setIsSubmittingReview(false);
      setIsReviewSubmitted(true);
      setTimeout(() => setIsReviewSubmitted(false), 2500);
    }, 800);
  };

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
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
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
        onClose();
        setName("");
        setEmail("");
        setBookingDetails(null);
        setCurrentImageIndex(0);
      }, 5000);
    }, 1500);
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ isolation: 'isolate' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-zinc-900 rounded-[2rem] border border-white/10 overflow-y-auto shadow-2xl flex flex-col"
      >
        <div className="relative h-64 sm:h-80 md:h-96 w-full flex-shrink-0 bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={`img-modal-${currentImageIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={tour.images ? tour.images[currentImageIndex] : tour.image}
                alt={tour.title}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
            </motion.div>
          </AnimatePresence>
          
          {tour.images && tour.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 z-20 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 z-20 backdrop-blur-sm transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute top-4 left-4 flex gap-2 z-10 text-xs sm:text-sm">
            {tour.tags.map((tag) => (
              <Badge key={`modal-${tour.id}-${tag}`} className="bg-black/90 text-white hover:bg-black border border-white/20 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm shadow-md cursor-pointer"
              aria-label="Share tour"
            >
              <AnimatePresence mode="wait">
                {isCopied ? (
                  <motion.div key="check-modal" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="w-5 h-5 text-green-400" />
                  </motion.div>
                ) : (
                  <motion.div key="share-modal" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Share2 className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
            <button
              onClick={handleWishlistClick}
              className="p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm shadow-md cursor-pointer"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <motion.div animate={isWishlistAnimating ? { scale: [1, 1.4, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
                <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </motion.div>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/50 text-white hover:bg-red-500/80 transition-colors backdrop-blur-sm shadow-md cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 sm:px-10 bg-zinc-900 flex-grow border-t border-white/10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              {tour.location}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                {tour.title}
              </h3>
              <div className="bg-black/50 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold text-white self-start sm:self-auto border border-white/5 shadow-inner">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 
                {tour.rating} <span className="text-zinc-400 font-normal">({tour.reviews?.length || 0} reviews)</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 text-sm sm:text-base text-zinc-400 pb-8 border-b border-white/10">
              <div className="flex items-center gap-2 shadow-sm">
                <Clock className="w-4 h-4" />
                {tour.duration}
              </div>
              <div className="font-bold text-white shadow-sm">
                From ${tour.price.toLocaleString()}
              </div>
            </div>

            {tour.images && tour.images.length > 1 && (
              <div className="flex gap-3 pb-8 overflow-x-auto snap-x [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {tour.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`relative flex-shrink-0 w-24 sm:w-32 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all snap-start focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer ${idx === currentImageIndex ? 'border-white opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <Image src={img} alt={`${tour.title} thumbnail ${idx + 1}`} fill className="object-cover" referrerPolicy="no-referrer" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h4 className="text-2xl font-bold text-white mb-6">About this Tour</h4>
                  <p className="text-zinc-400 leading-relaxed text-base">
                    {tour.description}
                  </p>
                </div>

                {tour.itinerary && (
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6">Itinerary</h4>
                    <div className="space-y-6">
                      {tour.itinerary.map((day, idx) => (
                        <div key={idx} className="flex gap-5">
                          <div className="flex-shrink-0 w-12 h-12 bg-black/50 text-white rounded-xl border border-white/5 flex items-center justify-center font-bold shadow-md">
                            D{day.day}
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="text-white font-medium text-lg">{day.title}</p>
                            <p className="text-zinc-400 text-sm mt-1">{day.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tour.included && (
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-6">What's Included</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {tour.included.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-zinc-300 text-sm bg-black/30 p-4 rounded-xl border border-white/5 shadow-sm">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-8 lg:sticky lg:top-8 self-start w-full">
                <div className="bg-black/50 p-6 sm:p-8 rounded-[2rem] border border-white/5 w-full shadow-xl">
                  <h4 className="text-2xl font-bold text-white mb-6">Book This Tour</h4>
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
                    <form className="space-y-5" onSubmit={handleBooking} noValidate onClick={(e) => e.stopPropagation()}>
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
                      <Button type="submit" disabled={isBooking} className="w-full bg-white text-black hover:bg-white/90 font-bold h-14 rounded-xl text-base mt-2 cursor-pointer shadow-lg">
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

                {((tour.reviews && tour.reviews.length > 0) || addedReviews.length > 0) && (
                  <div className="pt-4 w-full">
                    <h4 className="text-xl font-bold text-white mb-6">Traveler Reviews</h4>
                    <div className="space-y-4">
                      <AnimatePresence initial={false}>
                        {[...addedReviews, ...(tour.reviews || [])].slice(0, Math.max(3, addedReviews.length)).map((review, idx) => (
                          <motion.div 
                            key={`${tour.id}-${review.author}-${idx}`}
                            initial={idx === 0 && addedReviews.length > 0 ? { opacity: 0, y: -20, height: 0 } : false}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            className="bg-black/30 border border-white/5 p-5 rounded-2xl shadow-sm overflow-hidden"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-white text-sm font-medium">{review.author}</span>
                              <div className="flex items-center gap-0.5">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed italic">"{review.text}"</p>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    <div className="bg-zinc-800/30 p-6 rounded-2xl border border-white/5 mt-6 mb-2 shadow-inner min-h-[200px]">
                      <AnimatePresence mode="wait">
                        {isReviewSubmitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center py-6 h-full text-center"
                          >
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                              <Check className="w-6 h-6 text-green-500" />
                            </div>
                            <h5 className="text-white font-medium text-lg">Review Submitted!</h5>
                            <p className="text-zinc-400 text-sm mt-1">Thank you for sharing your experience.</p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <h5 className="text-white font-medium mb-4 text-sm">Write a Review</h5>
                            <form onSubmit={handleReviewSubmit} onClick={(e) => e.stopPropagation()} className="space-y-4">
                              <div className="flex items-center gap-2 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setNewReviewRating(star)}
                                    className="focus:outline-none cursor-pointer hover:scale-110 transition-transform"
                                  >
                                    <Star className={`w-5 h-5 transition-colors ${star <= newReviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-600'}`} />
                                  </button>
                                ))}
                              </div>
                              <input
                                type="text"
                                placeholder="Your Name"
                                value={newReviewAuthor}
                                onChange={(e) => setNewReviewAuthor(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                                required
                              />
                              <textarea
                                placeholder="Share your experience..."
                                value={newReviewText}
                                onChange={(e) => setNewReviewText(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-white/30 h-24 resize-none transition-colors"
                                required
                              />
                              <Button 
                                type="submit" 
                                disabled={isSubmittingReview || !newReviewText.trim() || !newReviewAuthor.trim()} 
                                className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl h-12 font-medium cursor-pointer transition-colors"
                              >
                                {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Review"}
                              </Button>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
