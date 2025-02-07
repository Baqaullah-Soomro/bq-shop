'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
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
  }
];

export default function ProfessionalDressPantsPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
