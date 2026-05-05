export interface Perfume {
  id: string
  name: string
  brand: string
  price: number
  description: string
  longDescription: string
  category: "men" | "women" | "unisex"
  scent: "woody" | "floral" | "citrus" | "oriental" | "fresh"
  notes: {
    top: string[]
    heart: string[]
    base: string[]
  }
  sizes: { size: string; price: number }[]
  images: string[]
  featured: boolean
  bestseller: boolean
}

export const perfumes: Perfume[] = [
  {
    id: "noir-elegance",
    name: "Noir Élégance",
    brand: "NOORSCENTS",
    price: 295,
    description: "A mysterious blend of dark woods and precious oud",
    longDescription: "Noir Élégance captures the essence of midnight sophistication. This opulent fragrance opens with a burst of bergamot and black pepper, leading to a rich heart of oud and leather. The base notes of sandalwood and amber create a lasting impression of refined luxury.",
    category: "men",
    scent: "woody",
    notes: {
      top: ["Bergamot", "Black Pepper", "Cardamom"],
      heart: ["Oud", "Leather", "Rose"],
      base: ["Sandalwood", "Amber", "Musk"]
    },
    sizes: [
      { size: "30ml", price: 175 },
      { size: "50ml", price: 245 },
      { size: "100ml", price: 295 }
    ],
    images: [
        ],
    featured: true,
    bestseller: true
  },
  {
    id: "rose-imperiale",
    name: "Rose Impériale",
    brand: "NOORSCENTS",
    price: 320,
    description: "An exquisite bouquet of rare roses and precious florals",
    longDescription: "Rose Impériale is a tribute to the queen of flowers. This luxurious fragrance features the finest Bulgarian and Turkish roses, complemented by jasmine and peony. A warm base of vanilla and musk adds depth and sensuality to this timeless creation.",
    category: "women",
    scent: "floral",
    notes: {
      top: ["Bulgarian Rose", "Pink Pepper", "Bergamot"],
      heart: ["Turkish Rose", "Jasmine", "Peony"],
      base: ["Vanilla", "Musk", "Patchouli"]
    },
    sizes: [
      { size: "30ml", price: 195 },
      { size: "50ml", price: 265 },
      { size: "100ml", price: 320 }
    ],
    images: [
       ],
    featured: true,
    bestseller: true
  },
  {
    id: "soleil-dore",
    name: "Soleil Doré",
    brand: "NOORSCENTS",
    price: 275,
    description: "Radiant citrus notes kissed by golden sunshine",
    longDescription: "Soleil Doré embodies the warmth of a Mediterranean summer. Opening with sparkling notes of Italian bergamot and Sicilian lemon, this fragrance evolves into a heart of neroli and orange blossom. The sunny composition rests on a base of white cedar and aromatic sage.",
    category: "unisex",
    scent: "citrus",
    notes: {
      top: ["Bergamot", "Sicilian Lemon", "Grapefruit"],
      heart: ["Neroli", "Orange Blossom", "Jasmine"],
      base: ["White Cedar", "Sage", "Musk"]
    },
    sizes: [
      { size: "30ml", price: 165 },
      { size: "50ml", price: 225 },
      { size: "100ml", price: 275 }
    ],
    images: [
      ],
    featured: true,
    bestseller: false
  },
  {
    id: "velvet-oud",
    name: "Velvet Oud",
    brand: "NOORSCENTS",
    price: 450,
    description: "The pinnacle of luxury with rare Arabian oud",
    longDescription: "Velvet Oud represents the ultimate in perfumery craftsmanship. Featuring the finest aged oud from Cambodia, this majestic fragrance unfolds with saffron and rose, leading to a complex heart of oud and ambergris. The opulent base of sandalwood and frankincense creates an unforgettable trail.",
    category: "unisex",
    scent: "oriental",
    notes: {
      top: ["Saffron", "Rose", "Cardamom"],
      heart: ["Cambodian Oud", "Ambergris", "Incense"],
      base: ["Sandalwood", "Frankincense", "Musk"]
    },
    sizes: [
      { size: "30ml", price: 285 },
      { size: "50ml", price: 380 },
      { size: "100ml", price: 450 }
    ],
    images: [
      ],
    featured: true,
    bestseller: true
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    brand: "NOORSCENTS",
    price: 245,
    description: "Fresh marine notes with a sophisticated edge",
    longDescription: "Ocean Breeze captures the invigorating spirit of the sea. This refined aquatic fragrance opens with sea salt and green apple, flowing into a heart of water lily and marine accord. The clean base of driftwood and white tea creates a sophisticated finish.",
    category: "men",
    scent: "fresh",
    notes: {
      top: ["Sea Salt", "Green Apple", "Bergamot"],
      heart: ["Water Lily", "Marine Accord", "Lavender"],
      base: ["Driftwood", "White Tea", "Musk"]
    },
    sizes: [
      { size: "30ml", price: 145 },
      { size: "50ml", price: 195 },
      { size: "100ml", price: 245 }
    ],
    images: [
       ],
    featured: false,
    bestseller: false
  },
  {
    id: "jasmine-nights",
    name: "Jasmine Nights",
    brand: "NOORSCENTS",
    price: 285,
    description: "Intoxicating jasmine under a starlit sky",
    longDescription: "Jasmine Nights is a tribute to the enchanting evenings of the Orient. This seductive fragrance opens with mandarin and ylang-ylang, leading to an opulent heart of Indian jasmine and tuberose. The sensual base of vanilla and benzoin creates an unforgettable allure.",
    category: "women",
    scent: "floral",
    notes: {
      top: ["Mandarin", "Ylang-Ylang", "Pink Pepper"],
      heart: ["Indian Jasmine", "Tuberose", "Orange Blossom"],
      base: ["Vanilla", "Benzoin", "White Musk"]
    },
    sizes: [
      { size: "30ml", price: 175 },
      { size: "50ml", price: 235 },
      { size: "100ml", price: 285 }
    ],
    images: [
       ],
    featured: false,
    bestseller: true
  },
  {
    id: "amber-mystique",
    name: "Amber Mystique",
    brand: "NOORSCENTS",
    price: 310,
    description: "Warm amber wrapped in exotic spices",
    longDescription: "Amber Mystique is a journey through ancient trade routes. This enchanting fragrance opens with cinnamon and nutmeg, flowing into a heart of amber and labdanum. The rich base of vanilla and tonka bean creates a warm, enveloping embrace.",
    category: "unisex",
    scent: "oriental",
    notes: {
      top: ["Cinnamon", "Nutmeg", "Bergamot"],
      heart: ["Amber", "Labdanum", "Rose Absolute"],
      base: ["Vanilla", "Tonka Bean", "Benzoin"]
    },
    sizes: [
      { size: "30ml", price: 185 },
      { size: "50ml", price: 255 },
      { size: "100ml", price: 310 }
    ],
    images: [
      ],
    featured: false,
    bestseller: false
  },
  {
    id: "cedar-smoke",
    name: "Cedar & Smoke",
    brand: "NOORSCENTS",
    price: 265,
    description: "Smoky woods with a touch of wilderness",
    longDescription: "Cedar & Smoke evokes the mystique of ancient forests. This bold fragrance opens with black pepper and juniper, leading to a heart of Virginia cedar and guaiac wood. The smoky base of vetiver and birch tar creates a distinctive, memorable signature.",
    category: "men",
    scent: "woody",
    notes: {
      top: ["Black Pepper", "Juniper", "Bergamot"],
      heart: ["Virginia Cedar", "Guaiac Wood", "Cypress"],
      base: ["Vetiver", "Birch Tar", "Leather"]
    },
    sizes: [
      { size: "30ml", price: 155 },
      { size: "50ml", price: 215 },
      { size: "100ml", price: 265 }
    ],
    images: [
      
    ],
    featured: false,
    bestseller: false
  }
]

export const categories = [
  { id: "men", name: "For Him", description: "Bold and sophisticated fragrances" },
  { id: "women", name: "For Her", description: "Elegant and captivating scents" },
  { id: "unisex", name: "Unisex", description: "Universal luxury for all" }
]

export const scentFamilies = [
  { id: "woody", name: "Woody", description: "Warm and earthy" },
  { id: "floral", name: "Floral", description: "Romantic and feminine" },
  { id: "citrus", name: "Citrus", description: "Fresh and vibrant" },
  { id: "oriental", name: "Oriental", description: "Rich and exotic" },
  { id: "fresh", name: "Fresh", description: "Clean and invigorating" }
]
