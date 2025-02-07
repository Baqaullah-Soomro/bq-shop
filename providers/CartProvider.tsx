'use client';

import { createContext, useEffect, useState } from 'react';
import { CartItem } from '@/hooks/useCart';
import { ReactNode } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number; maxStock?: number }) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  currency: string;
  setCurrency: (currency: string) => void;
  getTotal: () => number;
  error: string | null;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export default function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState('USD');
  const [error, setError] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedCurrency = localStorage.getItem('currency');
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        } else {
          setItems([]);
        }
      }
      
      if (savedCurrency) {
        setCurrency(savedCurrency);
      }
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart data');
      setItems([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      // Clean the items data before saving
      const cleanItems = items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        maxStock: item.maxStock
      }));

      const cartString = JSON.stringify(cleanItems);
      localStorage.setItem('cart', cartString);
      localStorage.setItem('currency', currency);
    } catch (err) {
      console.error('Error saving cart:', err);
      setError('Failed to save cart data');
    }
  }, [items, currency]);

  const addItem = (item: Omit<CartItem, 'quantity'> & { quantity?: number; maxStock?: number }) => {
    setError(null);
    try {
      console.log('Adding item to cart:', item); // Debug log
      console.log('Current cart state:', items); // Debug log
      setItems(currentItems => {
        const existingItemIndex = currentItems.findIndex(
          i => i.id === item.id && i.size === item.size
        );
        console.log('Found existing item at index:', existingItemIndex); // Debug log

        const quantity = item.quantity || 1;
        const maxStock = item.maxStock || Infinity;

        if (existingItemIndex > -1) {
          const newItems = [...currentItems];
          const newQuantity = newItems[existingItemIndex].quantity + quantity;
          
          if (newQuantity > maxStock) {
            console.log('Max stock reached:', maxStock); // Debug log
            setError(`Cannot add more items. Maximum stock (${maxStock}) reached.`);
            return currentItems;
          }

          newItems[existingItemIndex].quantity = newQuantity;
          console.log('Updated cart items:', newItems); // Debug log
          return newItems;
        }

        if (quantity > maxStock) {
          console.log('Initial quantity exceeds max stock:', maxStock); // Debug log
          setError(`Cannot add more items. Maximum stock (${maxStock}) reached.`);
          return currentItems;
        }

        const newItems = [...currentItems, { ...item, quantity }];
        console.log('New cart state:', newItems); // Debug log
        return newItems;
      });
    } catch (err) {
      console.error('Error adding item:', err); // Debug error log
      setError('Failed to add item to cart');
    }
  };

  const removeItem = (id: string, size: string) => {
    setError(null);
    try {
      setItems(currentItems => 
        currentItems.filter(item => !(item.id === id && item.size === size))
      );
    } catch (err) {
      setError('Failed to remove item from cart');
    }
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setError(null);
    try {
      if (quantity < 1) {
        setError('Quantity cannot be less than 1');
        return;
      }

      setItems(currentItems =>
        currentItems.map(item => {
          if (item.id === id && item.size === size) {
            if (item.maxStock && quantity > item.maxStock) {
              setError(`Cannot add more items. Maximum stock (${item.maxStock}) reached.`);
              return item;
            }
            return { ...item, quantity };
          }
          return item;
        })
      );
    } catch (err) {
      setError('Failed to update quantity');
    }
  };

  const clearCart = () => {
    setError(null);
    try {
      setItems([]);
    } catch (err) {
      setError('Failed to clear cart');
    }
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        currency,
        setCurrency,
        getTotal,
        error
      }}
    >
      {children}
      <Link
        href="/cart"
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50"
      >
        <div className="relative">
          <ShoppingBagIcon className="h-6 w-6" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </div>
      </Link>
    </CartContext.Provider>
  );
}
