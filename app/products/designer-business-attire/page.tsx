'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'sale4',
  name: 'Designer Business Attire',
  price: 159.99,
  originalPrice: 259.99,
  onSale: true,
  description: 'Professional business attire with modern styling and comfortable fit.',
  images: ['/products/images/pic2.png'],
  category: 'Business',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Navy', 'Gray', 'Beige'],
  rating: 4.6,
  topSelling: true,
  createdAt: new Date('2024-01-15').toISOString(),
  brand: 'Designer Brand',
  availability: 'In Stock' as const,
  popularity: 75,
  reviews: {
    count: 30,
    averageRating: 4.3
  },
  tags: ['Business', 'Attire', 'Formal'],
  material: 'Wool',
  care: ['Dry Clean Only'],
  shipping: {
    free: true,
    estimatedDays: 3
  }
};

const recommendedProducts = [
  {
    id: 'suit5',
    name: 'Modern Business Suit',
    price: 599.99,
    originalPrice: 799.99,
    onSale: true,
    description: 'Contemporary business suit with modern tailoring.',
    images: ['/products/images/pic7.png'],
    category: 'Suits',
    sizes: ['36R', '38R', '40R', '42R', '44R'],
    colors: ['Navy', 'Charcoal'],
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
    tags: ['Business', 'Formal'],
    material: 'Wool Blend',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'suit6',
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
  }
];

export default function DesignerBusinessAttirePage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
