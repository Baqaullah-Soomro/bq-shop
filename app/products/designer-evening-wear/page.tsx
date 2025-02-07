'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'evening1',
  name: 'Designer Evening Wear',
  price: 749.99,
  originalPrice: 999.99,
  onSale: true,
  description: 'Sophisticated designer evening wear featuring modern cuts and premium fabrics. Perfect for special occasions and formal events.',
  images: ['/products/images/pic9.png'],
  category: 'Evening Wear',
  sizes: ['XS', 'S', 'M', 'L'],
  colors: ['Gold', 'Silver', 'Rose'],
  rating: 4.8,
  topSelling: true,
  createdAt: new Date('2024-01-24').toISOString(),
  brand: 'Designer Brand',
  availability: 'In Stock' as const,
  popularity: 85,
  reviews: {
    count: 35,
    averageRating: 4.8
  },
  tags: ['Designer', 'Evening', 'Formal'],
  material: 'Premium Blend',
  care: ['Dry Clean Only', 'Handle with Care'],
  shipping: {
    free: true,
    estimatedDays: 4
  }
};

const recommendedProducts = [
  {
    id: 'gown1',
    name: 'Evening Gown Collection',
    price: 899.99,
    originalPrice: 1199.99,
    onSale: true,
    description: 'Exquisite evening gown for formal events.',
    images: ['/products/images/pic8.png'],
    category: 'Gowns',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Burgundy', 'Midnight Blue'],
    rating: 4.9,
    topSelling: true,
    createdAt: new Date('2024-01-23').toISOString(),
    brand: 'Luxury Brand',
    availability: 'Pre-order' as const,
    popularity: 92,
    reviews: {
      count: 28,
      averageRating: 4.9
    },
    tags: ['Evening Wear', 'Luxury'],
    material: 'Silk Chiffon',
    care: ['Professional Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 5
    }
  },
  {
    id: 'dress1',
    name: 'Elegant Evening Dress',
    price: 649.99,
    originalPrice: 849.99,
    onSale: true,
    description: 'Stunning evening dress for special occasions.',
    images: ['/products/images/pic3.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Navy', 'Wine'],
    rating: 4.7,
    topSelling: true,
    createdAt: new Date('2024-01-19').toISOString(),
    brand: 'Designer Brand',
    availability: 'In Stock' as const,
    popularity: 78,
    reviews: {
      count: 32,
      averageRating: 4.7
    },
    tags: ['Evening', 'Formal'],
    material: 'Satin',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'dress6',
    name: 'Beaded Cocktail Dress',
    price: 449.99,
    originalPrice: 599.99,
    onSale: true,
    description: 'Elegant beaded cocktail dress for special events.',
    images: ['/products/images/pic16.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'Navy', 'Silver'],
    rating: 4.8,
    topSelling: true,
    createdAt: new Date('2024-01-16').toISOString(),
    brand: 'Designer Brand',
    availability: 'In Stock' as const,
    popularity: 83,
    reviews: {
      count: 34,
      averageRating: 4.8
    },
    tags: ['Cocktail', 'Beaded', 'Evening'],
    material: 'Beaded Fabric',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'dress7',
    name: 'Silk Evening Gown',
    price: 799.99,
    originalPrice: 999.99,
    onSale: true,
    description: 'Luxurious silk evening gown for formal occasions.',
    images: ['/products/images/pic17.png'],
    category: 'Gowns',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Emerald', 'Ruby', 'Sapphire'],
    rating: 4.9,
    topSelling: true,
    createdAt: new Date('2024-01-14').toISOString(),
    brand: 'Luxury Brand',
    availability: 'In Stock' as const,
    popularity: 87,
    reviews: {
      count: 40,
      averageRating: 4.9
    },
    tags: ['Evening', 'Silk', 'Formal'],
    material: 'Pure Silk',
    care: ['Professional Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 4
    }
  }
];

export default function DesignerEveningWearPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
