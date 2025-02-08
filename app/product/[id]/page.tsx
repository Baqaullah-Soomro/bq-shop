import { getProduct, getRelatedProducts, getProducts } from '@/lib/sanity.queries';
import ProductDetails from './ProductDetails';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product._id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(params.id);
    
    if (!product) {
      notFound();
    }

    const relatedProducts = await getRelatedProducts(product);
    return <ProductDetails product={product} relatedProducts={relatedProducts} />;
  } catch (error) {
    console.error('Error fetching product:', error);
    notFound();
  }
}


