
export type Category = 'Suits' | 'Sarees';
export type SubCategory = 
  | 'Semi-Stitched Suits' | 'Ready-Made Suits' | 'Party Wear Suits' | 'Daily Wear Suits'
  | 'Wedding Sarees' | 'Party Wear Sarees' | 'Daily Wear Sarees' | 'Budget Sarees';

export interface Product {
  id: string;
  name: string;
  category: Category;
  subCategory: SubCategory;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isFestival?: boolean;
  fabric: string;
  color: string;
  pattern: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
  date: string;
  customer: {
    name: string;
    email: string;
  };
}

export const CATEGORIES: { name: Category; sub: SubCategory[] }[] = [
  {
    name: 'Suits',
    sub: ['Semi-Stitched Suits', 'Ready-Made Suits', 'Party Wear Suits', 'Daily Wear Suits']
  },
  {
    name: 'Sarees',
    sub: ['Wedding Sarees', 'Party Wear Sarees', 'Daily Wear Sarees', 'Budget Sarees']
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Banarasi Silk Saree',
    category: 'Sarees',
    subCategory: 'Wedding Sarees',
    price: 4999,
    originalPrice: 8999,
    image: 'https://picsum.photos/seed/saree1/600/800',
    rating: 4.8,
    reviews: 124,
    stock: 5,
    isBestSeller: true,
    fabric: 'Pure Banarasi Silk',
    color: 'Red',
    pattern: 'Zari Work',
    description: 'Exquisite handwoven Banarasi silk saree with intricate zari work, perfect for weddings and grand occasions.'
  },
  {
    id: '2',
    name: 'Floral Print Georgette Suit',
    category: 'Suits',
    subCategory: 'Daily Wear Suits',
    price: 1299,
    originalPrice: 2499,
    image: 'https://picsum.photos/seed/suit1/600/800',
    rating: 4.5,
    reviews: 89,
    stock: 12,
    isTrending: true,
    fabric: 'Georgette',
    color: 'Blue',
    pattern: 'Floral',
    description: 'Lightweight and comfortable floral print georgette suit set, ideal for daily elegance.'
  },
  {
    id: '3',
    name: 'Embroidered Velvet Party Suit',
    category: 'Suits',
    subCategory: 'Party Wear Suits',
    price: 3499,
    originalPrice: 5999,
    image: 'https://picsum.photos/seed/suit2/600/800',
    rating: 4.9,
    reviews: 56,
    stock: 3,
    isFestival: true,
    fabric: 'Premium Velvet',
    color: 'Maroon',
    pattern: 'Embroidery',
    description: 'Rich velvet suit with heavy gold embroidery, designed for festive celebrations and evening parties.'
  },
  {
    id: '4',
    name: 'Traditional Kanjeevaram Saree',
    category: 'Sarees',
    subCategory: 'Wedding Sarees',
    price: 7999,
    originalPrice: 12999,
    image: 'https://picsum.photos/seed/saree2/600/800',
    rating: 5.0,
    reviews: 42,
    stock: 2,
    isBestSeller: true,
    fabric: 'Kanjeevaram Silk',
    color: 'Gold',
    pattern: 'Traditional',
    description: 'Authentic Kanjeevaram silk saree with traditional motifs and a grand pallu.'
  },
  {
    id: '5',
    name: 'Cotton Daily Wear Saree',
    category: 'Sarees',
    subCategory: 'Daily Wear Sarees',
    price: 899,
    originalPrice: 1599,
    image: 'https://picsum.photos/seed/saree3/600/800',
    rating: 4.3,
    reviews: 210,
    stock: 25,
    fabric: 'Pure Cotton',
    color: 'Green',
    pattern: 'Plain',
    description: 'Breathable and soft pure cotton saree for everyday comfort and style.'
  },
  {
    id: '6',
    name: 'Semi-Stitched Anarkali Suit',
    category: 'Suits',
    subCategory: 'Semi-Stitched Suits',
    price: 2199,
    originalPrice: 3999,
    image: 'https://picsum.photos/seed/suit3/600/800',
    rating: 4.6,
    reviews: 74,
    stock: 8,
    isTrending: true,
    fabric: 'Chanderi Silk',
    color: 'Pink',
    pattern: 'Solid',
    description: 'Elegant semi-stitched Anarkali suit that can be customized to your perfect fit.'
  }
];
