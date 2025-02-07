'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'suit1',
  name: 'Modern Business Suit',
  price: 599.99,
  originalPrice: 799.99,
  onSale: true,
  description: 'Contemporary business suit crafted with premium materials and modern tailoring for the professional who demands both style and comfort.',
  images: ['/products/images/pic7.png'],
  category: 'Suits',
  sizes: ['36R', '38R', '40R', '42R', '44R'],
  colors: ['Navy', 'Charcoal', 'Black'],
  rating: 4.7,
  topSelling: true,
  createdAt: new Date('2024-01-22').toISOString(),
  brand: 'Premium Brand',
  availability: 'In Stock' as const,
  popularity: 88,
  reviews: {
    count: 45,
    averageRating: 4.7
  },
  tags: ['Business', 'Formal', 'Professional'],
  material: 'Wool Blend',
  care: ['Dry Clean Only', 'No Bleach', 'Cool Iron'],
  shipping: {
    free: true,
    estimatedDays: 3
  }
};

const recommendedProducts = [
  {
    id: 'suit2',
    name: 'Classic Formal Suit',
    price: 549.99,
    originalPrice: 699.99,
    onSale: true,
    description: 'Timeless formal suit for any occasion.',
    images: ['/products/images/pic5.png'],
    category: 'Suits',
    sizes: ['38R', '40R', '42R'],
    colors: ['Black', 'Navy'],
    rating: 4.6,
    topSelling: true,
    createdAt: new Date('2024-01-15').toISOString(),
    brand: 'Premium Brand',
    availability: 'In Stock' as const,
    popularity: 82,
    reviews: {
      count: 35,
      averageRating: 4.6
    },
    tags: ['Formal', 'Business'],
    material: 'Wool',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'suit3',
    name: 'Designer Business Attire',
    price: 799.99,
    originalPrice: 999.99,
    onSale: true,
    description: 'Premium designer business attire.',
    images: ['/products/images/pic6.png'],
    category: 'Suits',
    sizes: ['36R', '38R', '40R', '42R'],
    colors: ['Gray', 'Blue'],
    rating: 4.8,
    topSelling: false,
    createdAt: new Date('2024-01-18').toISOString(),
    brand: 'Designer Brand',
    availability: 'In Stock' as const,
    popularity: 75,
    reviews: {
      count: 25,
      averageRating: 4.8
    },
    tags: ['Designer', 'Business'],
    material: 'Premium Wool',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 4
    }
  },
  {
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
  },
  {
    id: 'suit10',
    name: 'Three-Piece Business Suit',
    price: 749.99,
    originalPrice: 949.99,
    onSale: true,
    description: 'Classic three-piece business suit for the modern professional.',
    images: ['/products/images/pic23.png'],
    category: 'Suits',
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Gray Pinstripe', 'Navy Pinstripe'],
    rating: 4.8,
    topSelling: true,
    createdAt: new Date('2024-01-07').toISOString(),
    brand: 'Premium Brand',
    availability: 'In Stock' as const,
    popularity: 86,
    reviews: {
      count: 38,
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

export default function ModernBusinessSuitPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
