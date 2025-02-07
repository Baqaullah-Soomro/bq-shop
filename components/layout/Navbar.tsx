'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import CartSlideout from '../cart/CartSlideout';
import AuthButtons from '../auth/AuthButtons';
import UserIcon from '@heroicons/react/20/solid/UserIcon';
import SearchBar from './SearchBar';


const navigation = [
  { name: 'Shop', href: '/shop' },
  { name: 'On Sale', href: '/sale' },
  { name: 'New Arrivals', href: '/new-arrivals' },
  { name: 'Brands', href: '/brands' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPromotion, setShowPromotion] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { items } = useCart();

  return (

    <div className="relative">
      {/* Promotion banner */}
      {showPromotion && (
        <div className="relative bg-black text-white text-center text-sm py-2 px-4">
          <p>
            Sign up and get 20% off to your first order.{' '}
            <Link href="/signup" className="underline">
              Sign Up Now
            </Link>
          </p>
          <button
            onClick={() => setShowPromotion(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:opacity-75"
          >
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close promotion</span>
          </button>
        </div>
      )}

      {/* Mobile navigation */}
      <nav className="lg:hidden flex items-center justify-between px-4 py-3 border-b">
        <button
          type="button"
          className="-m-2.5 p-2.5"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        <Link href="/" className="text-2xl font-bold">
          SHOP.CO
        </Link>

        <div className="flex items-center gap-4">
          <button 
            type="button" 
            className="p-2"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
          <button 
            className="relative"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBagIcon className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
          <div className="flex items-center gap-x-4">
            <AuthButtons />
          </div>
        </div>
      </nav>

          {/* Mobile Search Bar */}
          {showMobileSearch && (
          <div className="lg:hidden px-4 py-2 border-b">
            <SearchBar />
          </div>
          )}


      {/* Desktop navigation */}
      <nav className="hidden lg:block border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                SHOP.CO
              </Link>
              <div className="ml-10 flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <SearchBar />

              {/* Auth buttons */}
              <div className="ml-4">
                <AuthButtons />
              </div>

              {/* Cart */}
              <button
                type="button"
                className="relative ml-4 p-2 text-gray-800 hover:text-gray-600"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {items.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                    {items.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>
                SHOP.CO
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-6">
                <SearchBar />


              <div className="mt-6 flow-root">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart slideout */}
      <CartSlideout isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
