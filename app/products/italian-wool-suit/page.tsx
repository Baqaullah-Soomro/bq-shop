'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'suit9',
  name: 'Italian Wool Suit',
  price: 899.99,
  originalPrice: 1199.99,
  onSale: true,
  description: 'Premium Italian wool suit with exceptional tailoring.',
  images: ['/products/images/pic22.png'],
  category: 'Suits',
  sizes: ['38R', '40R', '42R', '44R'],
  colors: ['Charcoal', 'Navy', 'Brown'],
  rating: 4.9,
  topSelling: true,
  createdAt: new Date('2024-01-08').toISOString(),
  brand: 'Luxury Brand',
  availability: 'In Stock' as const,
  popularity: 90,
  reviews: {
    count: 52,
    averageRating: 4.9
  },
  tags: ['Italian', 'Luxury', 'Business'],
  material: 'Italian Wool',
  care: ['Professional Clean Only'],
  shipping: {
    free: true,
    estimatedDays: 4
  }
};

const recommendedProducts = [
  {
    id: 'suit7',
    name: 'Executive Wool Blazer',
    price: 399.99,
    originalPrice: 549.99,
    onSale: true,
    description: 'Premium wool blazer for the modern executive.',
    images: ['/products/images/pic14.png'],
    category: 'Blazers',
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Charcoal', 'Navy', 'Brown'],
    rating: 4.7,
    topSelling: false,
    createdAt: new Date('2024-01-17').toISOString(),
    brand: 'Premium Brand',
    availability: 'In Stock' as const,
    popularity: 79,
    reviews: {
      count: 25,
      averageRating: 4.7
    },
    tags: ['Business', 'Executive', 'Blazer'],
    material: 'Premium Wool',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'suit8',
    name: 'Professional Dress Pants',
    price: 179.99,
    originalPrice: 249.99,
    onSale: true,
    description: 'High-quality dress pants for professional settings.',
    images: ['/products/images/pic15.png'],
    category: 'Pants',
    sizes: ['30x32', '32x32', '34x32', '36x32'],
    colors: ['Black', 'Gray', 'Navy'],
    rating: 4.8,
    topSelling: true,
    createdAt: new Date('2024-01-20').toISOString(),
    brand: 'Designer Brand',
    availability: 'In Stock' as const,
    popularity: 84,
    reviews: {
      count: 30,
      averageRating: 4.8
    },
    tags: ['Professional', 'Business', 'Pants'],
    material: 'Wool Blend',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'suit10',
    name: 'Three-Piece Business Suit',
    price: 749.99,
    originalPrice: 999.99,
    onSale: true,
    description: 'Classic three-piece business suit for the modern professional.',
    images: ['/products/images/pic23.png'],
    category: 'Suits',
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Navy', 'Gray', 'Black'],
    rating: 4.8,
    topSelling: true,
    createdAt: new Date('2024-01-06').toISOString(),
    brand: 'Premium Brand',
    availability: 'In Stock' as const,
    popularity: 86,
    reviews: {
      count: 48,
      averageRating: 4.8
    },
    tags: ['Business', 'Three-Piece', 'Professional'],
    material: 'Wool Blend',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  }
];

export default function ItalianWoolSuitPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
