'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { searchProducts } from '@/lib/sanity.queries';
import type { Product } from '@/lib/sanity.queries';
import { urlFor } from '@/sanity/lib/image';

export default function SearchBar() {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState<Product[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	useEffect(() => {
		const fetchResults = async () => {
			if (query.length > 0) {
				setIsLoading(true);
				try {
					const searchResults = await searchProducts(query);
					setResults(searchResults);
					setIsOpen(true);
				} catch (error) {
					console.error('Search error:', error);
				} finally {
					setIsLoading(false);
				}
			} else {
				setResults([]);
				setIsOpen(false);
			}
		};

		const debounceTimer = setTimeout(fetchResults, 300);
		return () => clearTimeout(debounceTimer);
	}, [query]);


	return (
		<div ref={searchRef} className="relative w-full max-w-md">
			<div className="relative">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for products..."
					className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
				/>
				<MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
			</div>

			{isOpen && results.length > 0 && (
				<div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
					<div className="max-h-96 overflow-y-auto">
						{results.map((product) => (
							<Link
								key={product._id}
								href={`/product/${product._id}`}
								onClick={() => setIsOpen(false)}
								className="flex items-center p-4 hover:bg-gray-50 transition-colors"
							>
								<div className="w-16 h-16 relative flex-shrink-0">
									<Image
										src={urlFor(product.image).width(64).height(64).url()}
										alt={product.name}
										fill
										className="object-cover rounded"
									/>
								</div>
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-900">{product.name}</p>
									<p className="text-sm text-gray-500">${product.price}</p>
								</div>
							</Link>
						))}
					</div>
					<Link
						href="/shop"
						onClick={() => setIsOpen(false)}
						className="block w-full text-center py-3 text-sm text-gray-600 hover:bg-gray-50 border-t"
					>
						View All Products
					</Link>
				</div>
			)}

			{isOpen && query.length > 0 && results.length === 0 && !isLoading && (
				<div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 text-center text-gray-500">
					No results found
				</div>
			)}
		</div>
	);
}