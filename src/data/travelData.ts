export const destinations = [
  {
    id: 1,
    name: "Amalfi Coast",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&q=80&w=1000",
    description: "Dramatic cliffs and turquoise waters meet colorful villages.",
    category: "Coastal"
  },
  {
    id: 2,
    name: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000",
    description: "Ancient temples, traditional tea houses, and serene gardens.",
    category: "Cultural"
  },
  {
    id: 3,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000",
    description: "Iconic blue-domed churches overlooking the Aegean Sea.",
    category: "Coastal"
  },
  {
    id: 4,
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?auto=format&fit=crop&q=80&w=1000",
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
    image: "https://images.unsplash.com/photo-1523528283115-9bf9b1aa992a?auto=format&fit=crop&q=80&w=1000",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    images: [
      "https://images.unsplash.com/photo-1523528283115-9bf9b1aa992a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1516483638261-f40af5eb2756?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&q=80&w=1000"
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
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1504829857797-cb23428c946e?auto=format&fit=crop&q=80&w=1000"
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
      "https://images.unsplash.com/photo-1547471080-7cb2ac647087?auto=format&fit=crop&q=80&w=1000",
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
    avatar: "https://i.pravatar.cc/150?u=elena"
  },
  {
    id: 2,
    name: "James Chen",
    role: "Adventure Enthusiast",
    content: "The Swiss Alps expedition was life-changing. The guides were professional and the views were beyond words. Highly recommend!",
    avatar: "https://i.pravatar.cc/150?u=james"
  }
];
