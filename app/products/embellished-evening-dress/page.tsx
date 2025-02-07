'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'dress9',
  name: 'Embellished Evening Dress',
  price: 649.99,
  originalPrice: 849.99,
  onSale: true,
  description: 'Stunning embellished evening dress for special occasions.',
  images: ['/products/images/pic19.png'],
  category: 'Dresses',
  sizes: ['XS', 'S', 'M', 'L'],
  colors: ['Gold', 'Silver', 'Black'],
  rating: 4.9,
  topSelling: true,
  createdAt: new Date('2024-01-10').toISOString(),
  brand: 'Luxury Brand',
  availability: 'In Stock' as const,
  popularity: 88,
  reviews: {
    count: 44,
    averageRating: 4.9
  },
  tags: ['Evening', 'Embellished', 'Formal'],
  material: 'Embellished Fabric',
  care: ['Professional Clean Only'],
  shipping: {
    free: true,
    estimatedDays: 4
  }
};

const recommendedProducts = [
  {
    id: 'dress8',
    name: 'Velvet Evening Gown',
    price: 549.99,
    originalPrice: 749.99,
    onSale: true,
    description: 'Luxurious velvet evening gown for formal occasions.',
    images: ['/products/images/pic18.png'],
    category: 'Gowns',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Deep Red', 'Navy', 'Black'],
    rating: 4.8,
    topSelling: true,
    createdAt: new Date('2024-01-12').toISOString(),
    brand: 'Designer Brand',
    availability: 'In Stock' as const,
    popularity: 85,
    reviews: {
      count: 36,
      averageRating: 4.8
    },
    tags: ['Evening', 'Velvet', 'Formal'],
    material: 'Premium Velvet',
    care: ['Professional Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 4
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
  }
];

export default function EmbellishedEveningDressPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
