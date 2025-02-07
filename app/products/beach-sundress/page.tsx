'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'dress13',
  name: 'Beach Sundress',
  price: 89.99,
  originalPrice: 129.99,
  onSale: true,
  description: 'Perfect sundress for beach days and summer outings.',
  images: ['/products/images/pic27.png'],
  category: 'Dresses',
  sizes: ['XS', 'S', 'M', 'L'],
  colors: ['Blue', 'Yellow', 'Pink'],
  rating: 4.5,
  topSelling: false,
  createdAt: new Date('2024-01-19').toISOString(),
  brand: 'Fashion Brand',
  availability: 'In Stock' as const,
  popularity: 75,
  reviews: {
    count: 24,
    averageRating: 4.5
  },
  tags: ['Beach', 'Summer', 'Casual'],
  material: 'Cotton Blend',
  care: ['Machine Washable'],
  shipping: {
    free: true,
    estimatedDays: 3
  }
};

const recommendedProducts = [
  {
    id: 'dress12',
    name: 'Floral Summer Dress',
    price: 129.99,
    originalPrice: 179.99,
    onSale: true,
    description: 'Light and breezy floral dress for summer days.',
    images: ['/products/images/pic26.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Print'],
    rating: 4.7,
    topSelling: true,
    createdAt: new Date('2024-01-16').toISOString(),
    brand: 'Fashion Brand',
    availability: 'In Stock' as const,
    popularity: 81,
    reviews: {
      count: 32,
      averageRating: 4.7
    },
    tags: ['Summer', 'Floral', 'Casual'],
    material: 'Cotton',
    care: ['Machine Washable'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'dress10',
    name: 'Premium Linen Dress',
    price: 199.99,
    originalPrice: 299.99,
    onSale: true,
    description: 'High-quality linen dress for casual elegance.',
    images: ['/products/images/pic24.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Beige', 'Light Blue'],
    rating: 4.7,
    topSelling: true,
    createdAt: new Date('2024-01-15').toISOString(),
    brand: 'Premium Brand',
    availability: 'In Stock' as const,
    popularity: 82,
    reviews: {
      count: 35,
      averageRating: 4.7
    },
    tags: ['Casual', 'Linen', 'Summer'],
    material: 'Premium Linen',
    care: ['Machine Washable'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'dress11',
    name: 'Casual Maxi Dress',
    price: 149.99,
    originalPrice: 229.99,
    onSale: true,
    description: 'Comfortable and stylish maxi dress for casual occasions.',
    images: ['/products/images/pic25.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Olive', 'Burgundy'],
    rating: 4.6,
    topSelling: true,
    createdAt: new Date('2024-01-18').toISOString(),
    brand: 'Fashion Brand',
    availability: 'In Stock' as const,
    popularity: 80,
    reviews: {
      count: 28,
      averageRating: 4.6
    },
    tags: ['Casual', 'Maxi', 'Summer'],
    material: 'Cotton Blend',
    care: ['Machine Washable'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  }
];

export default function BeachSundressPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
