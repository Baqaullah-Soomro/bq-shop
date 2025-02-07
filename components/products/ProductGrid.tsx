'use client';

import Link from 'next/link';
import { Product } from '@/lib/sanity.queries';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductGrid({ title, products, viewAllLink }: ProductGridProps) {
  // Take only the first 4 products
  const displayProducts = products.slice(0, 4);

  return (
    <div className="py-16 sm:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {/* Add empty placeholders if less than 4 products */}
          {[...Array(Math.max(0, 4 - displayProducts.length))].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-[1/1.2] bg-gray-100 rounded-lg" />
          ))}
        </div>

        {viewAllLink && (
          <div className="text-center mt-12">
            <Link 
              href={viewAllLink} 
              className="inline-block px-8 py-3 border-2 border-black text-black font-medium hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >
              View All
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
