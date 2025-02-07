import { getProducts } from '@/lib/sanity.queries';
import ProductFilterClient from '@/components/products/ProductFilterClient';

export default async function SalePage() {
  const allProducts = await getProducts();
  const saleProducts = allProducts.filter(product => product.discountPercent && product.discountPercent > 0);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-black/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Sale
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xl text-gray-300">
              Incredible deals on your favorite styles
            </p>
          </div>
        </div>
      </div>

        <div className="container-custom py-12">
        <ProductFilterClient 
          initialProducts={saleProducts} 
          title="Sale Items"
        />
        </div>
    </div>
  );
}

