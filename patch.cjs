const fs = require('fs');
const content = fs.readFileSync('src/components/Tours.tsx', 'utf-8');

const targetContent = "const TourCard: React.FC<TourCardProps> = ({ tour, isWishlisted, onToggleWishlist }) => {";
const endTargetContent = "};\n\nconst TourCardSkeleton";

const startIndex = content.indexOf(targetContent);
const endIndex = content.indexOf(endTargetContent);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find targets");
  process.exit(1);
}

const replacement = `const TourCard: React.FC<TourCardProps> = ({ tour, isWishlisted, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Wishlist animation state
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  const [showWishlistToast, setShowWishlistToast] = useState(false);

  // Share state
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const url = \`\${window.location.origin}\${window.location.pathname}?tour=\${tour.id}#tours\`;
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
        whileHover={{ y: -8 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onClick={() => setIsExpanded(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
                animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover absolute inset-0"
                referrerPolicy="no-referrer"
              />
            )}
          </AnimatePresence>

          <div className="absolute top-4 left-4 flex gap-2 z-10 text-xs sm:text-sm">
            {tour.tags.map((tag) => (
              <Badge key={\`\${tour.id}-\${tag}\`} className="bg-black/90 text-white hover:bg-black border border-white/20 backdrop-blur-sm">
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
                  <Heart className={\`w-5 h-5 transition-colors \${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}\`} />
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
              From \${tour.price.toLocaleString()}
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
`;

const newContent = content.substring(0, startIndex) + replacement + content.substring(endIndex);
fs.writeFileSync('src/components/Tours.tsx', newContent);
console.log("Patched successfully");
