'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'gown1',
  name: 'Evening Gown Collection',
  price: 899.99,
  originalPrice: 1199.99,
  onSale: true,
  description: 'Exquisite evening gown featuring delicate embellishments and flowing silhouette. Perfect for formal events and black-tie occasions.',
  images: ['/products/images/pic8.png'],
  category: 'Gowns',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Burgundy', 'Midnight Blue', 'Emerald'],
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
  tags: ['Evening Wear', 'Formal', 'Luxury'],
  material: 'Silk Chiffon',
  care: ['Professional Clean Only', 'Store in Garment Bag'],
  shipping: {
    free: true,
    estimatedDays: 5
  }
};

const recommendedProducts = [
  {
    id: 'gown2',
    name: 'Designer Evening Wear',
    price: 749.99,
    originalPrice: 999.99,
    onSale: true,
    description: 'Sophisticated designer evening wear.',
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
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 4
    }
  },
  {
    id: 'gown3',
    name: 'Cocktail Party Dress',
    price: 149.99,
    originalPrice: 229.99,
    onSale: true,
    description: 'Elegant cocktail dress for parties.',
    images: ['/products/images/pic4.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Black'],
    rating: 4.8,
    topSelling: true,
    createdAt: new Date('2024-01-20').toISOString(),
    brand: 'Designer Brand',
    availability: 'In Stock' as const,
    popularity: 80,
    reviews: {
      count: 40,
      averageRating: 4.5
    },
    tags: ['Cocktail', 'Formal'],
    material: 'Silk',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'gown4',
    name: 'Mermaid Evening Gown',
    price: 849.99,
    originalPrice: 1099.99,
    onSale: true,
    description: 'Stunning mermaid-style evening gown with train.',
    images: ['/products/images/pic20.png'],
    category: 'Gowns',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Navy', 'Burgundy', 'Emerald'],
    rating: 4.9,
    topSelling: true,
    createdAt: new Date('2024-01-11').toISOString(),
    brand: 'Luxury Brand',
    availability: 'In Stock' as const,
    popularity: 89,
    reviews: {
      count: 42,
      averageRating: 4.9
    },
    tags: ['Evening', 'Mermaid', 'Formal'],
    material: 'Premium Satin',
    care: ['Professional Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 4
    }
  },
  {
    id: 'gown5',
    name: 'Ball Gown Evening Dress',
    price: 999.99,
    originalPrice: 1299.99,
    onSale: true,
    description: 'Classic ball gown style evening dress with full skirt.',
    images: ['/products/images/pic21.png'],
    category: 'Gowns',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Royal Blue', 'Wine Red', 'Black'],
    rating: 4.9,
    topSelling: true,
    createdAt: new Date('2024-01-09').toISOString(),
    brand: 'Luxury Brand',
    availability: 'In Stock' as const,
    popularity: 91,
    reviews: {
      count: 48,
      averageRating: 4.9
    },
    tags: ['Evening', 'Ball Gown', 'Luxury'],
    material: 'Premium Tulle & Satin',
    care: ['Professional Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 5
    }
  }
];

export default function EveningGownCollectionPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
