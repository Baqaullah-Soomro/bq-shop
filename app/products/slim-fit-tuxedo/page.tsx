'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'suit3',
  name: 'Slim Fit Tuxedo',
  price: 899.99,
  originalPrice: 1199.99,
  onSale: true,
  description: 'Modern slim fit tuxedo for special occasions.',
  images: ['/products/images/pic11.png'],
  category: 'Suits',
  sizes: ['36R', '38R', '40R', '42R'],
  colors: ['Black', 'Midnight Blue'],
  rating: 4.9,
  topSelling: true,
  createdAt: new Date('2024-01-10').toISOString(),
  brand: 'Luxury Brand',
  availability: 'In Stock' as const,
  popularity: 89,
  reviews: {
    count: 42,
    averageRating: 4.9
  },
  tags: ['Formal', 'Tuxedo', 'Special Occasion'],
  material: 'Premium Wool',
  care: ['Dry Clean Only'],
  shipping: {
    free: true,
    estimatedDays: 4
  }
};

const recommendedProducts = [
  {
    id: 'suit2',
    name: 'Executive Pinstripe Suit',
    price: 679.99,
    originalPrice: 899.99,
    onSale: true,
    description: 'Classic pinstripe suit for the modern executive.',
    images: ['/products/images/pic10.png'],
    category: 'Suits',
    sizes: ['38R', '40R', '42R', '44R'],
    colors: ['Navy Pinstripe', 'Gray Pinstripe'],
    rating: 4.6,
    topSelling: false,
    createdAt: new Date('2024-01-15').toISOString(),
    brand: 'Premium Brand',
    availability: 'In Stock' as const,
    popularity: 82,
    reviews: {
      count: 28,
      averageRating: 4.6
    },
    tags: ['Business', 'Executive', 'Pinstripe'],
    material: 'Wool',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'suit1',
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
    id: 'suit4',
    name: 'Classic Formal Suit',
    price: 249.99,
    originalPrice: 399.99,
    onSale: true,
    description: 'Sophisticated formal suit crafted from premium materials.',
    images: ['/products/images/pic1.png'],
    category: 'Formal Wear',
    sizes: ['38', '40', '42', '44', '46'],
    colors: ['Black', 'Navy', 'Gray'],
    rating: 4.9,
    topSelling: true,
    createdAt: new Date('2024-01-05').toISOString(),
    brand: 'Premium Brand',
    availability: 'In Stock' as const,
    popularity: 90,
    reviews: {
      count: 100,
      averageRating: 4.8
    },
    tags: ['Formal', 'Suit', 'Business'],
    material: 'Wool',
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

export default function SlimFitTuxedoPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
