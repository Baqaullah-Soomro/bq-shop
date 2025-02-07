'use client';

import { FC } from 'react';
import { Product } from '@/lib/sanity.queries';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';
import { RatingStars } from '@/app/product/[id]/ProductDetails';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface RelatedProductsProps {
	currentProduct: Product;
	relatedProducts: Product[];
}

const RelatedProducts: FC<RelatedProductsProps> = ({ currentProduct, relatedProducts }) => {
	const { addItem } = useCart();

	const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
		e.preventDefault();
		const cartItem = {
			id: product._id,
			name: product.name,
			price: product.discountPercent ? product.price * (1 - product.discountPercent / 100) : product.price,
			image: urlFor(product.image).url(),
			size: product.sizes?.[0] || 'Default',
			quantity: 1,
			maxStock: product.stock || 100
		};
		addItem(cartItem);
		toast.success('Added to cart!');
	};

	// Filter related products by category and exclude current product
	const filteredProducts = relatedProducts
		.filter(product => product.category === currentProduct.category && product._id !== currentProduct._id)
		.slice(0, 4);

	return (
		<div className="border-t">
			<div className="max-w-[1440px] mx-auto px-2 py-12">
				<h2 className="text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					{filteredProducts.map((product) => (
						<Link
							key={product._id}
							href={`/product/${product._id}`}
							className="group relative"
						>
							<div className="relative aspect-[3/4] mb-4 bg-gray-100 rounded-lg overflow-hidden">
								{product.discountPercent && (
									<span className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full z-10">
										{product.discountPercent}% OFF
									</span>
								)}
								<Image
									src={urlFor(product.image).url()}
									alt={product.name}
									fill
									className="object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<button
										onClick={(e) => handleQuickAdd(e, product)}
										className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black hover:text-white transition-colors duration-300 text-sm"
									>
										<ShoppingBagIcon className="w-4 h-4" />
										Quick Add
									</button>
								</div>
							</div>
							<div className="space-y-1 text-center">
								<h3 className="text-sm font-medium line-clamp-1 group-hover:text-black/70 transition-colors">
									{product.name}
								</h3>
								<div className="flex items-center justify-center gap-2">
									<RatingStars rating={product.rating} size="sm" />
									<span className="text-xs text-gray-600">
										({product.reviews.count || 0})
									</span>
								</div>
								<div className="flex items-center justify-center gap-2">
									{product.discountPercent ? (
										<>
											<span className="font-bold">${(product.price * (1 - product.discountPercent / 100)).toFixed(2)}</span>
											<span className="text-xs text-gray-500 line-through">${product.price}</span>
										</>
									) : (
										<span className="font-bold">${product.price}</span>
									)}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default RelatedProducts;