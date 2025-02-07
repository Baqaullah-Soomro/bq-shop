'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'sale6',
  name: 'Premium Casual Wear',
  price: 89.99,
  originalPrice: 149.99,
  onSale: true,
  description: 'Stylish casual wear combining comfort with contemporary design.',
  images: ['/products/images/pic3.png'],
  category: 'Casual',
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Gray', 'Navy', 'White'],
  rating: 4.5,
  topSelling: false,
  createdAt: new Date('2024-01-25').toISOString(),
  brand: 'Casual Brand',
  availability: 'Out of Stock' as const,
  popularity: 50,
  reviews: {
    count: 10,
    averageRating: 4.0
  },
  tags: ['Casual', 'Contemporary', 'Comfortable'],
  material: 'Cotton Blend',
  care: ['Machine Wash Cold'],
  shipping: {
    free: true,
    estimatedDays: 3
  }
};

const recommendedProducts = [
  {
    id: 'casual1',
    name: 'Summer Collection Dress',
    price: 129.99,
    originalPrice: 179.99,
    onSale: true,
    description: 'Light and breezy summer dress.',
    images: ['/products/images/pic2.png'],
    category: 'Casual Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Blue', 'Pink'],
    rating: 4.5,
    topSelling: false,
    createdAt: new Date('2024-01-10').toISOString(),
    brand: 'Casual Brand',
    availability: 'In Stock' as const,
    popularity: 75,
    reviews: {
      count: 20,
      averageRating: 4.5
    },
    tags: ['Summer', 'Casual'],
    material: 'Cotton Blend',
    care: ['Machine Wash'],
    shipping: {
      free: true,
      estimatedDays: 2
    }
  },
  {
    id: 'casual2',
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
    id: 'casual3',
    name: 'Premium Linen Dress',
    price: 159.99,
    originalPrice: 199.99,
    onSale: true,
    description: 'High-quality linen dress for effortless style.',
    images: ['/products/images/pic24.png'],
    category: 'Casual Wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Natural', 'Sage', 'Sand'],
    rating: 4.7,
    topSelling: true,
    createdAt: new Date('2024-01-15').toISOString(),
    brand: 'Premium Brand',
    availability: 'In Stock' as const,
    popularity: 82,
    reviews: {
      count: 28,
      averageRating: 4.7
    },
    tags: ['Casual', 'Linen', 'Premium'],
    material: 'Pure Linen',
    care: ['Machine Wash Cold'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'casual4',
    name: 'Casual Maxi Dress',
    price: 139.99,
    originalPrice: 179.99,
    onSale: true,
    description: 'Flowing maxi dress perfect for casual occasions.',
    images: ['/products/images/pic25.png'],
    category: 'Casual Wear',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral Print', 'Solid Navy', 'Dusty Rose'],
    rating: 4.6,
    topSelling: true,
    createdAt: new Date('2024-01-18').toISOString(),
    brand: 'Casual Brand',
    availability: 'In Stock' as const,
    popularity: 79,
    reviews: {
      count: 32,
      averageRating: 4.6
    },
    tags: ['Casual', 'Maxi', 'Comfortable'],
    material: 'Rayon Blend',
    care: ['Machine Wash'],
    shipping: {
      free: true,
      estimatedDays: 2
    }
  }
];

export default function PremiumCasualWearPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
