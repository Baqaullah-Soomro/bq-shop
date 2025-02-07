'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'sale5',
  name: 'Cocktail Party Dress',
  price: 149.99,
  originalPrice: 229.99,
  onSale: true,
  description: 'Elegant cocktail dress perfect for parties and semi-formal events.',
  images: ['/products/images/pic4.png'],
  category: 'Dresses',
  sizes: ['XS', 'S', 'M', 'L'],
  colors: ['Red', 'Black', 'Silver'],
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
  tags: ['Cocktail', 'Dress', 'Formal'],
  material: 'Silk',
  care: ['Dry Clean Only'],
  shipping: {
    free: true,
    estimatedDays: 3
  }
};

const recommendedProducts = [
  {
    id: 'dress2',
    name: 'Evening Gown Collection',
    price: 899.99,
    originalPrice: 1199.99,
    onSale: true,
    description: 'Exquisite evening gown for formal events.',
    images: ['/products/images/pic8.png'],
    category: 'Dresses',
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
    tags: ['Evening Wear', 'Formal'],
    material: 'Silk Chiffon',
    care: ['Professional Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 5
    }
  },
  {
    id: 'dress3',
    name: 'Designer Evening Wear',
    price: 749.99,
    originalPrice: 999.99,
    onSale: true,
    description: 'Sophisticated designer evening wear.',
    images: ['/products/images/pic9.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Gold', 'Silver'],
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
    tags: ['Designer', 'Evening'],
    material: 'Premium Blend',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 4
    }
  },
  {
    id: 'dress4',
    name: 'Sequin Party Dress',
    price: 299.99,
    originalPrice: 399.99,
    onSale: true,
    description: 'Glamorous sequin dress perfect for parties and celebrations.',
    images: ['/products/images/pic12.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rose Gold', 'Black'],
    rating: 4.7,
    topSelling: false,
    createdAt: new Date('2024-01-19').toISOString(),
    brand: 'Fashion Brand',
    availability: 'In Stock' as const,
    popularity: 78,
    reviews: {
      count: 32,
      averageRating: 4.7
    },
    tags: ['Party', 'Sequin', 'Glamour'],
    material: 'Sequin Fabric',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'dress5',
    name: 'Elegant Lace Gown',
    price: 599.99,
    originalPrice: 799.99,
    onSale: true,
    description: 'Timeless lace gown for special occasions.',
    images: ['/products/images/pic13.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Navy', 'Burgundy'],
    rating: 4.8,
    topSelling: true,
    createdAt: new Date('2024-01-21').toISOString(),
    brand: 'Designer Brand',
    availability: 'In Stock' as const,
    popularity: 86,
    reviews: {
      count: 38,
      averageRating: 4.8
    },
    tags: ['Lace', 'Formal', 'Special Occasion'],
    material: 'Premium Lace',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 4
    }
  }
];

export default function CocktailPartyDressPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
