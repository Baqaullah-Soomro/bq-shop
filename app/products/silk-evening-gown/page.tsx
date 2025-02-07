'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
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
};

const recommendedProducts = [
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
  }
];

export default function SilkEveningGownPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
