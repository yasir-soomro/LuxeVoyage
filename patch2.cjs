const fs = require('fs');
const content = fs.readFileSync('src/components/Tours.tsx', 'utf-8');

const targetContent = `const TourCard: React.FC<TourCardProps> = ({ tour, isWishlisted, onToggleWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);`;

const newContentStr = `const TourCard: React.FC<TourCardProps> = ({ tour, isWishlisted, onToggleWishlist }) => {
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
  };`;

const targetDiv = `<motion.div
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
      >`;

const newDiv = `<motion.div
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
      >`;

const targetImg = `<motion.img
                key="img"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: isHovered ? 1.1 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover absolute inset-0"
                referrerPolicy="no-referrer"
                loading="lazy"
              />`;

const newImg = `<motion.img
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
              />`;

let result = content.replace(targetContent, newContentStr);
result = result.replace(targetDiv, newDiv);
result = result.replace(targetImg, newImg);

fs.writeFileSync('src/components/Tours.tsx', result);
console.log("Patched successfully");
