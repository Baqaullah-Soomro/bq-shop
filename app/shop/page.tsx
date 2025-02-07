import { getProducts } from '@/lib/sanity.queries';
import ProductFilterClient from '@/components/products/ProductFilterClient';

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-black/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Shop Collection
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xl text-gray-300">
              Explore our curated collection of premium fashion
            </p>
          </div>
        </div>
      </div>

        <div className="container-custom py-12">
        <ProductFilterClient 
          initialProducts={products} 
          title="All Products"
        />
        </div>
    </div>
  );
}


