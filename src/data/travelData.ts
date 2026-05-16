export const appData = {
  hero: {
    badge: "Beyond the Ordinary",
    title: "The World,",
    italicTitle: "Refined.",
    backgroundImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=2000"
  },
  navbar: {
    logo: "LuxeVoyage",
    links: [
      { name: "Destinations", href: "#destinations" },
      { name: "Tours", href: "#tours" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ]
  },
  footer: {
    description: "Crafting extraordinary journeys for the discerning traveler. Explore the world with elegance and ease.",
    companyLinks: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#contact" },
      { name: "Press", href: "#contact" },
      { name: "Blog", href: "#destinations" },
    ],
    supportLinks: [
      { name: "Help Center", href: "#contact" },
      { name: "Safety Information", href: "#about" },
      { name: "Cancellation Options", href: "#contact" },
      { name: "Our COVID-19 Response", href: "#about" },
    ],
    socialLinks: [
      { name: "Instagram", url: "#" },
      { name: "Twitter", url: "#" },
      { name: "Facebook", url: "#" },
      { name: "Youtube", url: "#" },
    ],
    legalLinks: [
      { name: "Privacy Policy", href: "#contact" },
      { name: "Terms of Service", href: "#contact" },
      { name: "Cookie Policy", href: "#contact" },
    ],
    copyright: "© 2024 LuxeVoyage. All rights reserved."
  }
};

export const destinations = [
  {
    id: 1,
    name: "Amalfi Coast",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?auto=format&fit=crop&q=80&w=1000",
    description: "Dramatic cliffs and turquoise waters meet colorful villages.",
    category: "Coastal"
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80&w=1000",
    description: "Ancient temples, traditional tea houses, and serene gardens.",
    category: "Cultural"
  },
  {
    id: 3,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=1000",
    description: "Iconic blue-domed churches overlooking the Aegean Sea.",
    category: "Coastal"
  },
  {
    id: 4,
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=1000",
    description: "Majestic snow-capped peaks and pristine mountain lakes.",
    category: "Adventure"
  }
];

export const tours = [
  {
    id: 1,
    title: "Tuscan Wine & Culinary Tour",
    location: "Tuscany, Italy",
    price: 2499,
    duration: "8 Days",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&q=80&w=1000",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    images: [
      "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1504675099198-7023dd85f5a3?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Luxury", "Culinary"],
    description: "Experience the heart of Italy with private vineyard tours, exclusive cooking classes with local chefs, and stays in historic villas.",
    itinerary: [
      { day: 1, title: "Arrival in Florence", desc: "Welcome dinner and wine pairing." },
      { day: 2, title: "Chianti Region", desc: "Vineyard tours and cheese tasting." },
      { day: 3, title: "Siena & San Gimignano", desc: "Historical tours and pasta making class." },
    ],
    included: ["7 Nights Luxury Accommodation", "All meals & wine pairings", "Private transfers", "Expert local guide"],
    reviews: [
      { author: "Sarah M.", text: "Absolutely phenomenal experience! The food was incredible.", rating: 5 },
      { author: "David K.", text: "A truly luxurious way to see Tuscany.", rating: 5 }
    ]
  },
  {
    id: 2,
    title: "Northern Lights Expedition",
    location: "Reykjavik, Iceland",
    price: 3200,
    duration: "6 Days",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1531366930499-41f6693d15dc?auto=format&fit=crop&q=80&w=1000",
    video: "https://www.w3schools.com/html/movie.mp4",
    images: [
      "https://images.unsplash.com/photo-1531366930499-41f6693d15dc?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1520769945061-0a448c463865?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Adventure", "Nature"],
    description: "Chase the aurora borealis across the dramatic Icelandic landscape, featuring glacier hikes and geothermal spa visits.",
    itinerary: [
      { day: 1, title: "Welcome to Reykjavik", desc: "City tour and Blue Lagoon visit." },
      { day: 2, title: "Golden Circle", desc: "Geysers, waterfalls, and national parks." },
      { day: 3, title: "South Coast Adventure", desc: "Glacier hike and black sand beaches." },
    ],
    included: ["5 Nights Premium Accommodation", "Super Jeep tours", "Thermal spa entries", "Winter gear rental"],
    reviews: [
      { author: "Emily R.", text: "Seeing the Northern Lights was a dream come true.", rating: 5 },
      { author: "Mark T.", text: "Very well organized, but quite cold!", rating: 4 }
    ]
  },
  {
    id: 3,
    title: "Safari in Serengeti",
    location: "Tanzania",
    price: 4500,
    duration: "10 Days",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    images: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1614027164847-1b28cfe1fa60?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1523805009056-963b516de0b0?auto=format&fit=crop&q=80&w=1000"
    ],
    tags: ["Wildlife", "Exclusive"],
    description: "Witness the Great Migration on this exclusive safari, staying in luxury eco-lodges deep within the Serengeti plains.",
    itinerary: [
      { day: 1, title: "Arusha Arrival", desc: "Transfer to lodge and brief orientation." },
      { day: 2, title: "Tarangire National Park", desc: "First game drive spotting elephants." },
      { day: 3, title: "Serengeti Plains", desc: "Following the Great Migration." },
    ],
    included: ["9 Nights Luxury Eco-Lodge", "All game drives in 4x4", "Domestic flights", "Park fees"],
    reviews: [
      { author: "Jessica H.", text: "The wildlife viewing was out of this world.", rating: 5 },
      { author: "Michael B.", text: "Our guide was incredibly knowledgeable. Worth every penny.", rating: 5 }
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Elena Rodriguez",
    role: "Luxury Traveler",
    content: "LuxeVoyage curated the most incredible trip to Kyoto. Every detail was perfect, from the private tea ceremony to the hidden ryokan.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "James Chen",
    role: "Adventure Enthusiast",
    content: "The Swiss Alps expedition was life-changing. The guides were professional and the views were beyond words. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  }
];
