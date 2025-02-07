'use client';

import { useState } from 'react';
import { Product } from '@/lib/sanity.queries';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import ProductFilters, { FilterState } from '@/components/filters/ProductFilters';
import ProductCard from './ProductCard';
import Pagination from '@/components/Pagination';

interface ProductFilterClientProps {
	initialProducts: Product[];
	title?: string; // Optional title override
}

export default function ProductFilterClient({ initialProducts, title = 'All Products' }: ProductFilterClientProps) {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [filteredProducts, setFilteredProducts] = useState(initialProducts);
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 12;

	const handleFilterChange = (filters: FilterState) => {
		let filtered = initialProducts;

		if (filters.categories.length > 0) {
			filtered = filtered.filter(product => filters.categories.includes(product.category));
		}

		if (filters.colors.length > 0) {
			filtered = filtered.filter(product => 
				product.colors?.some(color => filters.colors.includes(color))
			);
		}

		if (filters.sizes.length > 0) {
			filtered = filtered.filter(product =>
				product.sizes?.some(size => filters.sizes.includes(size))
			);
		}

		if (filters.priceRange) {
			filtered = filtered.filter(product => {
				const finalPrice = product.discountPercent 
					? product.price * (1 - product.discountPercent / 100)
					: product.price;
				return finalPrice >= filters.priceRange.min && finalPrice <= filters.priceRange.max;
			});
		}

		setFilteredProducts(filtered);
		setCurrentPage(1);
	};

	const paginatedProducts = filteredProducts.slice(
		(currentPage - 1) * productsPerPage,
		currentPage * productsPerPage
	);

	return (
		<div>
			<div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
				<div>
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
					<p className="mt-2 text-sm text-gray-500">
						{filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
					</p>
				</div>

				<div className="flex items-center">
					<button
						type="button"
						className="flex items-center gap-x-2 text-gray-700 hover:text-gray-900 lg:hidden"
						onClick={() => setMobileFiltersOpen(true)}
					>
						<AdjustmentsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
						Filters
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
				<ProductFilters
					onFilterChange={handleFilterChange}
					mobileFiltersOpen={mobileFiltersOpen}
					setMobileFiltersOpen={setMobileFiltersOpen}
				/>

				<div className="lg:col-span-3">
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
						{paginatedProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
					{paginatedProducts.length === 0 && (
						<div className="text-center py-12">
							<h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
							<p className="text-gray-500">Try adjusting your filters</p>
						</div>
					)}
					{paginatedProducts.length > 0 && (
						<div className="mt-8">
							<Pagination
								currentPage={currentPage}
								totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
								onPageChange={setCurrentPage}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}