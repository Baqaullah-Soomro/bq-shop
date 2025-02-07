import { Product } from '@/lib/sanity.queries';
import ProductCard from './ProductCard';

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductGrid({ title, products, viewAllLink }: ProductGridProps) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
          {viewAllLink && (
            <a href={viewAllLink} className="text-sm font-medium text-gray-600 hover:text-gray-900">
              View All
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
