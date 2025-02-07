'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  discount?: string;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  discount,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addItem({
      id,
      name,
      price,
      image,
      color: '',
      size: ''
    });
    toast.success(`${name} added to cart!`);
  };

  return (
    <Link href={`/product/${id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={image}
          alt={name}
          width={400}
          height={400}
          className="object-cover object-center w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          priority
        />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            {discount}
          </div>
        )}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Add to Cart
        </button>
      </div>
        <div className="mt-4 flex flex-col items-center text-center">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <div className="mt-2 flex flex-col items-center gap-2">
          <p className="font-medium text-gray-900">${price}</p>
          {originalPrice && (
          <p className="text-sm text-gray-500 line-through">${originalPrice}</p>
          )}
        </div>
        <div className="mt-1 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? 'text-yellow-400'
              : 'text-gray-200'
            }`}
          />
          ))}
          <span className="text-sm text-gray-500">({rating})</span>
        </div>
        </div>
    </Link>
  );
}
