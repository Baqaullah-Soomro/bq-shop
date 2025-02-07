import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Product } from '@/lib/sanity.queries';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'
        }`}
      />
    ));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size: 'Medium', // Default size
      quantity: 1,
      maxStock: product.stock || 100
    };
    
    addItem(cartItem);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link href={`/product/${product.id}`} className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <button
        onClick={handleAddToCart}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
      >
        <ShoppingBagIcon className="h-5 w-5" />
        Add to Cart
      </button>
        <div className="mt-4 flex flex-col items-center text-center">
        <h3 className="text-sm text-gray-700">{product.name}</h3>
        <div className="mt-1 flex items-center justify-center">
          {renderStars(product.rating)}
          <span className="ml-1 text-sm text-gray-500">{product.rating}</span>
        </div>
        <div className="mt-2 flex flex-col items-center">
          <p className="text-sm font-medium text-gray-900">${product.price}</p>
          {product.originalPrice && (
          <p className="text-sm text-gray-500 line-through">
            ${product.originalPrice}
            <span className="ml-2 text-red-500">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </p>
          )}
        </div>

      </div>
    </Link>
  );
}
