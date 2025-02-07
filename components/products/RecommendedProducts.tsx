import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/sanity.queries';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import ProductCard from './ProductCard';

interface RecommendedProductsProps {
  title?: string;
  products: Product[];
}

export default function RecommendedProducts({ title = "YOU MIGHT ALSO LIKE", products }: RecommendedProductsProps) {
  return (
    <div className="container-custom py-16">
      <h2 className="text-2xl font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
