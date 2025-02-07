import { getProducts } from '@/lib/sanity.queries';
import ProductFilterClient from '@/components/products/ProductFilterClient';

export default async function NewArrivalsPage() {
  const allProducts = await getProducts();
  
  // First try to get products marked as new
  let newArrivals = allProducts.filter(product => product.new === true);
  
  // If no products are marked as new, show the most recent products
  // For now, we'll just show the first 8 products since we don't have a createdAt field
  if (newArrivals.length === 0) {
    newArrivals = allProducts.slice(0, 8);
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-black/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              New Arrivals
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xl text-gray-300">
              Discover our latest collections and trending styles
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <ProductFilterClient 
          initialProducts={newArrivals} 
          title="Latest Products"
        />
      </div>
    </div>
  );
}



