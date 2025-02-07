// This is a mock API client - replace with your actual API implementation

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}

// Mock data
const products: Product[] = [
  {
    id: '1',
    name: 'T-shirt with Tape Details',
    description: 'Classic cotton t-shirt with modern tape details',
    price: 120,
    image: 'https://placehold.co/500x500/eee/999?text=T-shirt',
    images: ['https://placehold.co/500x500/eee/999?text=T-shirt'],
    category: 'T-Shirts',
    rating: 4.5,
    reviewCount: 42,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Gray'],
    inStock: true,
  },
  {
    id: '2',
    name: 'Classic Hoodie',
    description: 'Comfortable cotton blend hoodie',
    price: 180,
    image: 'https://placehold.co/500x500/eee/999?text=Hoodie',
    images: ['https://placehold.co/500x500/eee/999?text=Hoodie'],
    category: 'Hoodies',
    rating: 4.8,
    reviewCount: 65,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Navy'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with modern fit',
    price: 240,
    image: 'https://placehold.co/500x500/eee/999?text=Jacket',
    images: ['https://placehold.co/500x500/eee/999?text=Jacket'],
    category: 'Jackets',
    rating: 4.6,
    reviewCount: 28,
    sizes: ['S', 'M', 'L'],
    colors: ['Blue', 'Black'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Cargo Pants',
    description: 'Versatile cargo pants with multiple pockets',
    price: 160,
    image: 'https://placehold.co/500x500/eee/999?text=Pants',
    images: ['https://placehold.co/500x500/eee/999?text=Pants'],
    category: 'Pants',
    rating: 4.3,
    reviewCount: 37,
    sizes: ['30', '32', '34', '36'],
    colors: ['Khaki', 'Olive', 'Black'],
    inStock: true,
  }
];

export async function getProducts(options: {
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredProducts = [...products];

  // Apply filters
  if (options.category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === options.category?.toLowerCase()
    );
  }

  if (options.search) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(options.search?.toLowerCase() || '')
    );
  }

  // Apply sorting
  if (options.sort) {
    switch (options.sort) {
      case 'price-low-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  // Apply pagination
  const page = options.page || 1;
  const limit = options.limit || 12;
  const start = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(start, start + limit);

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    totalPages: Math.ceil(filteredProducts.length / limit),
  };
}

export async function getProduct(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const product = products.find((p) => p.id === id);
  if (!product) throw new Error('Product not found');

  return product;
}

export async function getCategories() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    { id: '1', name: 'T-Shirts' },
    { id: '2', name: 'Jeans' },
    { id: '3', name: 'Shirts' },
    { id: '4', name: 'Jackets' },
  ];
}

export async function submitOrder(order: any) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate order submission
  return {
    orderId: 'ORD' + Math.random().toString(36).substr(2, 9),
    status: 'success',
  };
}
