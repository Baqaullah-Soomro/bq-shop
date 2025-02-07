import { create } from 'zustand';
import { Product } from './useProducts';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartStore {
  items: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const useCart = create<CartStore>((set, get) => ({
  items: [],
  cartOpen: false,
  setCartOpen: (open) => set({ cartOpen: open }),
  
  addItem: (product, size) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { product, quantity: 1, size }],
      };
    });
  },

  removeItem: (productId, size) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.product.id === productId && item.size === size)
      ),
    }));
  },

  updateQuantity: (productId, size, quantity) => {
    if (quantity < 1) return;
    
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const { items } = get();
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
}));

export default useCart;
