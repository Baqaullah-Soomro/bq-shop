import { useContext } from 'react';
import { CartContext } from '@/providers/CartProvider';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color?: string;
  maxStock?: number;
  sku?: string;
  variant?: {
    id: string;
    name: string;
    price?: number;
  };
  metadata?: Record<string, any>;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
  getTotal: () => number;
  error: string | null;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
