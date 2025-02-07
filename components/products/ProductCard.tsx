'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/sanity.queries';
import { StarIcon } from '@heroicons/react/20/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import { urlFor } from '@/sanity/lib/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();

  const renderStars = (rating: number = 4.5) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        className={`h-3 w-3 sm:h-4 sm:w-4 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'
        }`}
      />
    ));
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.discountPercent ? product.price * (1 - product.discountPercent / 100) : product.price,
      image: imageUrl,
      size: product.sizes[0],
      quantity: 1,
      maxStock: product.stock || 100
    };
    
    addItem(cartItem);
    toast.success('Added to cart!');
  };

  const getProductUrl = (product: Product) => {
    return `/product/${product._id}`;
  };

  const imageUrl = urlFor(product.image).url();
  const discountedPrice = product.discountPercent 
    ? product.price * (1 - product.discountPercent / 100) 
    : null;

  return (
    <Link
      href={getProductUrl(product)}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[1/1.2] overflow-hidden rounded-lg bg-gray-100">
      <div className="absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-105">
        <Image
        src={imageUrl}
        alt={product.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        className="object-cover object-center transition-opacity duration-300"
        priority
        />
      </div>
        {product.discountPercent && (
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col items-end gap-1">
          <div className="bg-red-100 text-red-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
          {product.discountPercent}% OFF
          </div>
          <div className="bg-black/80 text-white px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
          Save ${(product.price * (product.discountPercent / 100)).toFixed(2)}
          </div>
        </div>
        )}
        
        <div 
        className={`absolute inset-x-2 sm:inset-x-4 bottom-2 sm:bottom-4 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        >
        <button
          onClick={handleQuickAdd}
          className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-black text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm sm:text-base"
        >
          <ShoppingBagIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          Quick Add
        </button>
        </div>
      </div>
      
      <div className="mt-4 space-y-1 sm:space-y-2 group-hover:translate-y-[-4px] transition-transform duration-300 text-center px-2 sm:px-4 pb-4">
      <h3 className="text-sm sm:text-base font-medium text-gray-900 transition-colors duration-300 group-hover:text-black">
        {product.name}
      </h3>
      <div className="flex items-center justify-center gap-0.5 sm:gap-1">
        {renderStars()}
        <span className="ml-1 text-xs sm:text-sm text-gray-500">4.5/5</span>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 sm:gap-2">
        {discountedPrice ? (
        <>
        <span className="text-base sm:text-lg font-medium text-black">${discountedPrice.toFixed(2)}</span>
        <span className="text-xs sm:text-sm text-gray-500 line-through">${product.price}</span>
        </>
        ) : (
        <span className="text-base sm:text-lg font-medium text-black">${product.price}</span>
        )}
        </div>
      </div>
      </div>
    </Link>
  );
}
