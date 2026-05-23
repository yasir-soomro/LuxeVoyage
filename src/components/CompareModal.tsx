import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { tours } from "@/src/data/travelData";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareTours: number[];
  onRemove: (tourId: number) => void;
}

export default function CompareModal({ isOpen, onClose, compareTours, onRemove }: CompareModalProps) {
  const selectedTours = compareTours.map(id => tours.find(t => t.id === id)).filter(Boolean) as typeof tours;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-900 rounded-[2rem] border border-white/10 overflow-y-auto shadow-2xl flex flex-col"
          >
            <div className="sticky top-0 z-20 bg-zinc-900/90 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Compare Tours</h2>
                <p className="text-zinc-400 text-sm mt-1">Side-by-side overview of selected experiences.</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 sm:p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <div className="p-6">
              {selectedTours.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">
                  No tours selected for comparison.
                </div>
              ) : (
                <div className="overflow-x-auto pb-6">
                  <div className="min-w-[800px] flex">
                    {/* Feature Column */}
                    <div className="w-48 shrink-0 flex flex-col pt-[180px] pr-6 border-r border-white/10 text-sm font-medium text-zinc-400 gap-y-4">
                      <div className="py-4 border-b border-white/5 uppercase tracking-wider text-xs">Overview</div>
                      <div className="py-4 border-b border-white/5 uppercase tracking-wider text-xs">Price</div>
                      <div className="py-4 border-b border-white/5 uppercase tracking-wider text-xs">Duration</div>
                      <div className="py-4 border-b border-white/5 uppercase tracking-wider text-xs">Rating</div>
                      <div className="py-4 border-b border-white/5 uppercase tracking-wider text-xs">Tags</div>
                      <div className="py-4 border-b border-white/5 uppercase tracking-wider text-xs">Included</div>
                    </div>

                    {/* Tours Columns */}
                    <div className="flex flex-1">
                      {selectedTours.map((tour) => (
                        <div key={tour.id} className="flex-1 min-w-[250px] flex flex-col px-6 relative">
                          <button
                            onClick={() => onRemove(tour.id)}
                            className="absolute top-2 right-6 p-1.5 bg-black/50 hover:bg-red-500/80 rounded-full text-white transition-colors z-10"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          {/* Image & Title */}
                          <div className="h-[160px] mb-5 rounded-xl overflow-hidden relative shadow-lg">
                            <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 flex flex-col justify-end">
                              <div className="text-white font-serif font-bold leading-tight">{tour.title}</div>
                            </div>
                          </div>

                          <div className="flex flex-col text-sm text-zinc-300 gap-y-4">
                            <div className="py-4 border-b border-white/5 h-[53px] flex items-center">
                              {tour.location}
                            </div>
                            <div className="py-4 border-b border-white/5 h-[53px] flex items-center font-bold text-white text-base">
                              ${tour.price.toLocaleString()}
                            </div>
                            <div className="py-4 border-b border-white/5 h-[53px] flex items-center">
                              {tour.duration}
                            </div>
                            <div className="py-4 border-b border-white/5 h-[53px] flex items-center text-yellow-400 font-bold">
                              ★ {tour.rating}
                            </div>
                            <div className="py-4 border-b border-white/5 h-[53px] flex items-center flex-wrap gap-1">
                              {tour.tags.map(tag => (
                                <span key={tag} className="bg-white/10 px-2 py-0.5 rounded-full text-xs text-white">{tag}</span>
                              ))}
                            </div>
                            <div className="py-4 border-b border-white/5">
                              <ul className="space-y-2">
                                {tour.included.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                                    <span className="text-xs">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
