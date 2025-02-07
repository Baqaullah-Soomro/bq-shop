'use client';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { MinusIcon, PlusIcon, XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

interface CartSlideoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSlideout({ isOpen, onClose }: CartSlideoutProps) {
  const { items, removeItem, updateQuantity, getTotal, currency, error } = useCart();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-4 sm:pl-10">
        <div className={`pointer-events-auto w-screen max-w-[90%] xs:max-w-[85%] sm:max-w-md transform transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-full flex-col bg-white shadow-xl">
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-white px-3 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
            <button
            type="button"
            className="relative rounded-full p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            onClick={onClose}
            >
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Close panel</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-6 sm:py-6">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 sm:p-4 border border-red-200">
            <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
            <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-base font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-sm text-gray-500">Start shopping to add items to your cart.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
              onClick={onClose}
            >
              Continue Shopping
            </Link>
            </div>
          ) : (
            <ul role="list" className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}`} className="flex gap-3 py-4 sm:gap-4 sm:py-6">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 80px, 96px"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="sm:grid sm:grid-cols-2 sm:gap-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 sm:text-base">
                  <Link href={`/product/${item.id}`} onClick={onClose}>
                    {item.name}
                  </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                  Size: {item.size}
                  {item.color && ` • Color: ${item.color}`}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <p className="text-sm font-medium text-gray-900 sm:text-base">
                  {currency} {item.price.toFixed(2)}
                  </p>
                </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 sm:mt-0">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-2 py-1">
                  <button
                  onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                  className="rounded-full p-1.5 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  disabled={item.quantity <= 1}
                  >
                  <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                  className="rounded-full p-1.5 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                  disabled={item.maxStock ? item.quantity >= item.maxStock : false}
                  >
                  <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.size)}
                  className="text-sm font-medium text-black hover:text-gray-500"
                >
                  Remove
                </button>
                </div>
              </div>
              </li>
            ))}
            </ul>
          )}
          </div>

          {items.length > 0 && (
          <div className="border-t border-gray-200 px-3 py-4 sm:px-6 sm:py-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{currency} {getTotal().toFixed(2)}</p>
            </div>
            <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
            <div className="mt-6 space-y-3">
            <Link
              href="/checkout"
              onClick={(e) => {
              // Validate cart data before proceeding
              if (!items || items.length === 0) {
                e.preventDefault();
                return;
              }

              // Ensure all required item fields are present
              const validItems = items.every(item => 
                item.id && 
                item.name && 
                typeof item.price === 'number' && 
                item.image && 
                typeof item.quantity === 'number' && 
                item.size
              );

              if (!validItems) {
                e.preventDefault();
                console.error('Invalid cart items:', items);
                return;
              }

              onClose();
              }}
              className="flex w-full items-center justify-center rounded-md bg-black px-4 py-3 text-base font-medium text-white shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Proceed to Checkout
            </Link>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              onClick={onClose}
            >
              Continue Shopping
            </button>
            </div>
          </div>
          )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
