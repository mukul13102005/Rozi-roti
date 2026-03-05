
export type Category = 
  | "Cotton Sarees" | "Banarasi Sarees" | "Silk Sarees" | "Festive Sarees" 
  | "Office Wear Sarees" | "Daily Wear Sarees" | "Wedding Collection" 
  | "Designer Collection" | "Premium Collection" | "Budget Collection" 
  | "Stitched Suits" | "Semi-Stitched Suits" | "Party Wear Suits" 
  | "Casual Suits" | "Bridal Collection" | "Festive Collection" 
  | "Limited Edition" | "Best Sellers" | "New Arrivals" | "Clearance Sale" 
  | "Summer Collection" | "Winter Collection" | "Ethnic Fusion" 
  | "Trending Now" | "Editor Picks";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: Category;
  image: string;
  description: string;
  stock: number;
  isBestseller: boolean;
  isFeatured: boolean;
  badge?: "New" | "Hot" | "Sale" | "Limited";
  rating: number;
  reviews: number;
  fabric: string;
  care: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  customer: {
    name: string;
    email: string;
    address: string;
  };
}

export const CATEGORIES: Category[] = [
  "Cotton Sarees", "Banarasi Sarees", "Silk Sarees", "Festive Sarees",
  "Office Wear Sarees", "Daily Wear Sarees", "Wedding Collection",
  "Designer Collection", "Premium Collection", "Budget Collection",
  "Stitched Suits", "Semi-Stitched Suits", "Party Wear Suits",
  "Casual Suits", "Bridal Collection", "Festive Collection",
  "Limited Edition", "Best Sellers", "New Arrivals", "Clearance Sale",
  "Summer Collection", "Winter Collection", "Ethnic Fusion",
  "Trending Now", "Editor Picks"
];

// Helper to generate 50+ products
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const fabrics = ["Pure Cotton", "Silk Blend", "Chanderi", "Georgette", "Organza", "Banarasi Silk", "Kanchipuram Silk", "Linen Silk"];
  const colors = ["Royal Maroon", "Golden Beige", "Emerald Green", "Midnight Blue", "Rose Pink", "Turquoise", "Saffron", "Ivory"];
  const patterns = ["Zari Border", "Floral Embroidery", "Geometric Print", "Traditional Butta", "Modern Abstract"];
  
  for (let i = 1; i <= 60; i++) {
    const category = CATEGORIES[i % CATEGORIES.length];
    const fabric = fabrics[i % fabrics.length];
    const color = colors[i % colors.length];
    const pattern = patterns[i % patterns.length];
    const isSale = i % 5 === 0;
    const price = 1500 + (i * 120);
    const originalPrice = isSale ? price * 1.3 : price;
    
    products.push({
      id: `prod-${i}`,
      name: `${color} ${fabric} ${category.replace(" Collection", "")} with ${pattern}`,
      price: Math.round(price),
      originalPrice: Math.round(originalPrice),
      category,
      image: `https://picsum.photos/seed/ethnic-fashion-${i}/600/800`,
      description: `Elevate your ethnic wardrobe with this exquisite ${color} ${category}. Handcrafted from the finest ${fabric}, it features intricate ${pattern} that showcases the rich heritage of Surat's textile artistry. Designed for the modern woman who values tradition and style.`,
      stock: Math.floor(Math.random() * 20) + 5,
      isBestseller: i % 7 === 0,
      isFeatured: i % 10 === 0,
      badge: i % 12 === 0 ? "Limited" : (i % 8 === 0 ? "Hot" : (isSale ? "Sale" : (i % 15 === 0 ? "New" : undefined))),
      rating: 4 + (Math.random() * 1),
      reviews: Math.floor(Math.random() * 150) + 20,
      fabric,
      care: "Dry clean only recommended. Store in a muslin cloth to maintain the fabric's luster and prevent zari darkening."
    });
  }
  return products;
};

export const INITIAL_PRODUCTS = generateProducts();
