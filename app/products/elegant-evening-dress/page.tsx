'use client';

import ProductDetails from '@/components/products/ProductDetails';
import RecommendedProducts from '@/components/products/RecommendedProducts';

const product = {
  id: 'sale1',
  name: 'Elegant Evening Dress',
  price: 129.99,
  originalPrice: 199.99,
  onSale: true,
  description: 'A stunning evening dress perfect for special occasions. Features delicate embroidery and a flattering silhouette.',
  images: ['/products/images/dress-style-1.png'],
  category: 'Dresses',
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
  colors: ['Black', 'Navy', 'Red'],
  rating: 4.8,
  topSelling: true,
  dressStyle: 'Evening',
  createdAt: new Date('2024-01-01').toISOString(),
  brand: 'Designer Brand',
  availability: 'Pre-order' as const,
  popularity: 95,
  reviews: {
    count: 50,
    averageRating: 4.5
  },
  tags: ['Evening', 'Dress', 'Formal'],
  material: 'Silk',
  care: ['Dry Clean Only'],
  shipping: {
    free: true,
    estimatedDays: 3
  }
};

const recommendedProducts = [
  {
    id: 'dress4',
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
    id: 'dress5',
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
    tags: ['Cocktail', 'Party'],
    material: 'Silk',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'dress8',
    name: 'Velvet Evening Gown',
    price: 549.99,
    originalPrice: 699.99,
    onSale: true,
    description: 'Luxurious velvet evening gown for formal events.',
    images: ['/products/images/pic18.png'],
    category: 'Gowns',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Deep Purple', 'Forest Green', 'Royal Blue'],
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
    material: 'Luxury Velvet',
    care: ['Dry Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 3
    }
  },
  {
    id: 'dress9',
    name: 'Embellished Evening Dress',
    price: 679.99,
    originalPrice: 849.99,
    onSale: true,
    description: 'Stunning embellished evening dress with intricate beadwork.',
    images: ['/products/images/pic19.png'],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    rating: 4.9,
    topSelling: true,
    createdAt: new Date('2024-01-13').toISOString(),
    brand: 'Luxury Brand',
    availability: 'In Stock' as const,
    popularity: 88,
    reviews: {
      count: 45,
      averageRating: 4.9
    },
    tags: ['Evening', 'Embellished', 'Luxury'],
    material: 'Embellished Fabric',
    care: ['Professional Clean Only'],
    shipping: {
      free: true,
      estimatedDays: 4
    }
  }
];

export default function ElegantEveningDressPage() {
  return (
    <>
      <ProductDetails product={product} />
      <RecommendedProducts products={recommendedProducts} />
    </>
  );
}
