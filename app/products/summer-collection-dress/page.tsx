'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'sale3',
  name: 'Summer Collection Dress',
  price: 79.99,
  originalPrice: 129.99,
  onSale: true,
  description: 'Light and breezy summer dress with floral patterns. Perfect for warm weather.',
  images: ['/products/images/pic12.png'],
  category: 'Dresses',
  sizes: ['XS', 'S', 'M', 'L'],
  colors: ['Yellow', 'Pink', 'Blue'],
  rating: 4.7,
  topSelling: false,
  createdAt: new Date('2024-01-10').toISOString(),
  brand: 'Casual Brand',
  availability: 'In Stock' as const,
  popularity: 60,
  reviews: {
    count: 20,
    averageRating: 4.2
  },
  tags: ['Summer', 'Dress', 'Casual'],
  material: 'Cotton',
  care: ['Machine Wash'],
  shipping: {
    free: false,
    estimatedDays: 5
  }
};

const recommendedProducts = [
  {
    id: 'summer1',
    name: 'Premium Casual Wear',
    price: 199.99,
    originalPrice: 299.99,
    onSale: true,
    description: 'Premium casual wear for everyday comfort.',
    images: ['/products/images/pic3.png'],
    category: 'Casual Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Beige', 'White'],
    rating: 4.3,
    topSelling: false,
    createdAt: new Date('2024-01-25').toISOString(),
    brand: 'Casual Brand',
    availability: 'Out of Stock' as const,
    popularity: 70,
    reviews: {
      count: 10,
      averageRating: 4.3
    },
    tags: ['Casual', 'Premium'],
    material: 'Cotton Blend',
    care: ['Machine Wash'],
    shipping: {
      free: true,
      estimatedDays: 2
    }
  },
  {
    id: 'summer2',
    name: 'Casual Day Dress',
    price: 89.99,
    originalPrice: 119.99,
    onSale: true,
    description: 'Comfortable everyday casual dress.',
    images: ['/products/images/pic1.png'],
    category: 'Casual Wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gray', 'Navy', 'Olive'],
    rating: 4.4,
    topSelling: false,
    createdAt: new Date('2024-01-05').toISOString(),
    brand: 'Casual Brand',
    availability: 'In Stock' as const,
    popularity: 70,
    reviews: {
      count: 15,
      averageRating: 4.4
    },
    tags: ['Casual', 'Everyday'],
    material: 'Cotton',
    care: ['Machine Wash'],
    shipping: {
      free: true,
      estimatedDays: 2
    }
  },
  {
    id: 'summer3',
    name: 'Floral Summer Dress',
    price: 119.99,
    originalPrice: 159.99,
    onSale: true,
    description: 'Beautiful floral print summer dress.',
    images: ['/products/images/pic26.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Blue Floral', 'Pink Floral', 'Yellow Floral'],
    rating: 4.7,
    topSelling: true,
    createdAt: new Date('2024-01-16').toISOString(),
    brand: 'Summer Brand',
    availability: 'In Stock' as const,
    popularity: 83,
    reviews: {
      count: 38,
      averageRating: 4.7
    },
    tags: ['Summer', 'Floral', 'Casual'],
    material: 'Cotton Voile',
    care: ['Machine Wash Cold'],
    shipping: {
      free: true,
      estimatedDays: 2
    }
  },
  {
    id: 'summer4',
    name: 'Beach Sundress',
    price: 99.99,
    originalPrice: 129.99,
    onSale: true,
    description: 'Light and airy sundress perfect for beach days.',
    images: ['/products/images/pic27.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ocean Blue', 'Coral', 'White'],
    rating: 4.6,
    topSelling: true,
    createdAt: new Date('2024-01-17').toISOString(),
    brand: 'Summer Brand',
    availability: 'In Stock' as const,
    popularity: 81,
    reviews: {
      count: 34,
      averageRating: 4.6
    },
    tags: ['Summer', 'Beach', 'Casual'],
    material: 'Cotton Blend',
    care: ['Machine Wash'],
    shipping: {
      free: true,
      estimatedDays: 2
    }
  }
];

export default function SummerCollectionDressPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
