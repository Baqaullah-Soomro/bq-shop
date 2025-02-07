import { getProduct, getRelatedProducts, getProducts } from '@/lib/sanity.queries';
import ProductDetails from './ProductDetails';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product._id,
  }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  const relatedProducts = await getRelatedProducts(product);

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}


