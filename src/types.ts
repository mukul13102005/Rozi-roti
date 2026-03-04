export type Category = 
  | "Cotton Sarees" | "Banarasi Sarees" | "Silk Sarees" | "Festive Sarees" 
  | "Office Wear Sarees" | "Daily Wear Sarees" | "Wedding Collection" 
  | "Designer Collection" | "Premium Collection" | "Budget Collection" 
  | "Stitched Suits" | "Semi-Stitched Suits" | "Party Wear Suits" 
  | "Casual Suits" | "Bridal Collection" | "Festive Collection" 
  | "Limited Edition" | "Best Sellers" | "New Arrivals" | "Clearance Sale" 
  | "Summer Collection" | "Winter Collection" | "Ethnic Fusion" 
  | "Trending Now" | "Editor Picks";

export type ProductStatus = 'active' | 'draft' | 'archived';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type UserRole = 'customer' | 'admin' | 'manager';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  category: Category;
  images: string[];
  thumbnail: string;
  description: string;
  shortDescription: string;
  specifications: Record<string, string>;
  stock: number;
  sku: string;
  isBestseller: boolean;
  isFeatured: boolean;
  isNew: boolean;
  onSale: boolean;
  discountPercentage: number;
  badge?: "New" | "Hot" | "Sale" | "Limited";
  rating: number;
  reviews: number;
  fabric: string;
  care: string;
  sizes?: string[];
  colors?: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: Category;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  children?: Category[];
  productCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  usedCount: number;
  applicableCategories?: Category[];
  applicableProducts?: string[];
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

// Generate realistic products
export const generateProducts = (): Product[] => {
  const products: Product[] = [];
  const fabrics = ["Pure Cotton", "Silk Blend", "Chanderi", "Georgette", "Organza", "Banarasi Silk", "Tussar Silk"];
  const colors = ["Red", "Maroon", "Gold", "Green", "Blue", "Yellow", "Orange", "Pink", "Purple", "White"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  
  for (let i = 1; i <= 100; i++) {
    const category = CATEGORIES[i % CATEGORIES.length] as Category;
    const fabric = fabrics[i % fabrics.length];
    const isSale = i % 4 === 0;
    const isNew = i % 6 === 0;
    const isBestseller = i % 8 === 0;
    const basePrice = 1500 + (i * 75);
    const discountPercentage = isSale ? 15 + (i % 20) : 0;
    const price = Math.round(basePrice);
    const originalPrice = isSale ? Math.round(basePrice * (1 + discountPercentage / 100)) : price;
    
    products.push({
      id: `prod-${i}`,
      name: `${fabric} ${category} - Design ${i}`,
      slug: `${fabric.toLowerCase().replace(' ', '-')}-${category.toLowerCase().replace(' ', '-')}-${i}`,
      price,
      originalPrice,
      category,
      images: [
        `https://picsum.photos/seed/roziroti-${i}-a/800/1000`,
        `https://picsum.photos/seed/roziroti-${i}-b/800/1000`,
        `https://picsum.photos/seed/roziroti-${i}-c/800/1000`,
        `https://picsum.photos/seed/roziroti-${i}-d/800/1000`,
      ],
      thumbnail: `https://picsum.photos/seed/roziroti-${i}/400/500`,
      description: `Experience the elegance of Surat's finest craftsmanship. This exquisite ${category.toLowerCase()} is meticulously handcrafted from premium ${fabric.toLowerCase()}, featuring intricate traditional motifs and contemporary design elements. Perfect for making a lasting impression at weddings, festive celebrations, and special occasions. The luxurious fabric drapes beautifully, while the rich colors and detailed embroidery showcase the artistry of our skilled craftsmen.`,
      shortDescription: `Premium ${fabric} ${category} with traditional motifs and modern design.`,
      specifications: {
        'Fabric': fabric,
        'Color': colors[i % colors.length],
        'Length': '6.3 meters',
        'Width': '1.2 meters',
        'Weight': '450 grams',
        'Work Type': 'Hand Embroidery',
        'Occasion': category.includes('Wedding') ? 'Wedding' : 'Festive',
        'Collection': 'Spring/Summer 2024',
      },
      stock: Math.floor(Math.random() * 30) + 5,
      sku: `RR-${category.substring(0, 3).toUpperCase()}-${i.toString().padStart(4, '0')}`,
      isBestseller,
      isFeatured: i % 10 === 0,
      isNew,
      onSale: isSale,
      discountPercentage,
      badge: isNew ? "New" : (isBestseller ? "Hot" : (isSale ? "Sale" : (i % 15 === 0 ? "Limited" : undefined))),
      rating: 3.5 + (Math.random() * 1.5),
      reviews: Math.floor(Math.random() * 150) + 10,
      fabric,
      care: "Dry clean only. Store in cool, dry place away from direct sunlight. Do not bleach.",
      sizes: i % 3 === 0 ? sizes.slice(0, 4) : undefined,
      colors: i % 4 === 0 ? colors.slice(0, 5) : undefined,
      tags: [fabric, category, 'ethnic', 'traditional', 'handmade', 'surat', ...(isNew ? ['new'] : []), ...(isSale ? ['sale'] : [])],
      seoTitle: `${fabric} ${category} | Buy Online at RoziRoti by Ratna`,
      seoDescription: `Shop premium ${fabric.toLowerCase()} ${category.toLowerCase()} online. Traditional craftsmanship meets contemporary design. Free shipping available.`,
      seoKeywords: [fabric.toLowerCase(), category.toLowerCase(), 'ethnic wear', 'indian sarees', 'online shopping', 'surat fashion'],
      status: 'active',
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }
  return products;
};

export const INITIAL_PRODUCTS = generateProducts();
