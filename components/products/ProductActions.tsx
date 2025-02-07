'use client';

import { useState } from 'react';
import { Product } from '@/lib/sanity.queries';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface ProductActionsProps {
	product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
	const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
	const [quantity, setQuantity] = useState(1);
	const { addItem } = useCart();

	const handleAddToCart = () => {
		const cartItem = {
			id: product._id,
			name: product.name,
			price: product.discountPercent 
				? product.price * (1 - product.discountPercent / 100)
				: product.price,
			image: product.image,
			size: selectedSize,
			quantity,
			maxStock: product.stock || 100
		};
		
		addItem(cartItem);
		toast.success(`${product.name} added to cart!`);
	};

	return (
		<div className="mt-8 space-y-4">
			<div className="flex items-center gap-4">
				<div className="flex items-center">
					<button
						onClick={() => setQuantity(Math.max(1, quantity - 1))}
						className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:border-black"
					>
						<MinusIcon className="h-4 w-4" />
					</button>
					<span className="w-12 text-center">{quantity}</span>
					<button
						onClick={() => setQuantity(quantity + 1)}
						className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:border-black"
					>
						<PlusIcon className="h-4 w-4" />
					</button>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-2">
				{product.sizes?.map((size) => (
					<button
						key={size}
						onClick={() => setSelectedSize(size)}
						className={`py-2 px-4 text-sm border rounded-lg ${
							selectedSize === size
								? 'border-black bg-black text-white'
								: 'border-gray-200 hover:border-black'
						}`}
					>
						{size}
					</button>
				))}
			</div>

			<button
				onClick={handleAddToCart}
				className="w-full bg-black text-white py-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
			>
				Add to Cart
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
				</svg>
			</button>
		</div>
	);
}