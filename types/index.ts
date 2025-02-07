export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  onSale: boolean;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  rating: number;
  topSelling: boolean;
  createdAt: string;
  brand: string;
  availability: 'In Stock' | 'Out of Stock';
  popularity: number;
  reviews: {
    count: number;
    averageRating: number;
  };
  tags: string[];
  material: string;
  care: string[];
  shipping: {
    free: boolean;
    estimatedDays: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}
