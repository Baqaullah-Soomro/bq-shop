'use client';

import Image from 'next/image'
import { getProducts } from '@/lib/sanity.queries'
import ProductGrid from '@/components/products/ProductGrid'
import Link from 'next/link'

export default async function PartyPage() {
	const products = await getProducts();
	const partyProducts = products.filter(p => p.category === 'party');
	const suggestedProducts = products
		.filter(p => p.category !== 'party')
		.slice(0, 4);

	return (
		<main className="flex min-h-screen flex-col antialiased">
			{/* Hero Section with Parallax Effect */}
			<section className="relative bg-[#F2F0F1] py-20 overflow-hidden">
				<div className="absolute inset-0 opacity-10">
					<Image
						src="/products/images/dress-style-2.png"
						alt="Background Pattern"
						fill
						className="object-cover"
					/>
				</div>
				<div className="container-custom relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
						<div className="space-y-6">
							<span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm">Party Collection</span>
							<h1 className="font-integral text-5xl lg:text-6xl mb-4">Party Style</h1>
							<p className="text-lg text-gray-600 mb-6 max-w-lg">
								Make a statement at every event with our stunning party wear collection. From elegant gowns to chic cocktail dresses.
							</p>
							<div className="flex gap-4">
								<Link href="#products" className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition">
									Shop Collection
								</Link>
								<Link href="/size-guide" className="border border-black px-8 py-3 rounded-full hover:bg-gray-100 transition">
									Size Guide
								</Link>
							</div>
							<div className="grid grid-cols-3 gap-4 mt-8">
								<div className="text-center">
									<div className="text-2xl font-bold">{partyProducts.length}+</div>
									<div className="text-sm text-gray-600">Styles</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold">New</div>
									<div className="text-sm text-gray-600">Arrivals</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold">Premium</div>
									<div className="text-sm text-gray-600">Quality</div>
								</div>
							</div>
						</div>
						<div className="relative h-[500px] lg:h-[600px]">
							<Image
								src="/products/images/dress-style-2.png"
								alt="Party Style Collection"
								fill
								className="object-cover rounded-2xl shadow-2xl"
								priority
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Categories */}
			<section className="py-16 bg-white">
				<div className="container-custom">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{['Evening Gowns', 'Cocktail Dresses', 'Accessories', 'Shoes'].map((category) => (
							<div key={category} className="group cursor-pointer p-4 text-center rounded-lg hover:bg-gray-50 transition">
								<h3 className="font-bold text-lg mb-2">{category}</h3>
								<p className="text-sm text-gray-600">Shop Now →</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Products Section */}
			<section id="products" className="py-16 bg-gray-50">
				<div className="container-custom">
					<ProductGrid
						title="PARTY COLLECTION"
						products={partyProducts}
						viewAllLink="/shop"
					/>
				</div>
			</section>

			{/* Style Tips Section */}
			<section className="py-16 bg-white">
				<div className="container-custom">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
							<h3 className="font-bold text-xl mb-3">Perfect Fit</h3>
							<p className="text-gray-600">Find your perfect size with our detailed size guide</p>
						</div>
						<div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
							<h3 className="font-bold text-xl mb-3">Styling Tips</h3>
							<p className="text-gray-600">Expert advice on accessorizing your party wear</p>
						</div>
						<div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
							<h3 className="font-bold text-xl mb-3">Care Guide</h3>
							<p className="text-gray-600">How to maintain your party wear's elegance</p>
						</div>
					</div>
				</div>
			</section>

			{/* You May Also Like Section */}
			<section className="py-16 bg-gray-50">
				<div className="container-custom">
					<h2 className="font-integral text-3xl mb-8">Complete Your Look</h2>
					<ProductGrid
						products={suggestedProducts}
						viewAllLink="/shop" title={''}					/>
				</div>
			</section>

			{/* Newsletter Section */}
			<section className="py-16 bg-black text-white">
				<div className="container-custom text-center">
					<h2 className="font-integral text-3xl mb-4">Stay Updated</h2>
					<p className="mb-8">Subscribe for exclusive party wear updates and special offers</p>
					<div className="max-w-md mx-auto flex gap-4">
						<input 
							type="email" 
							placeholder="Enter your email" 
							className="flex-1 px-4 py-3 rounded-full text-black"
						/>
						<button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition">
							Subscribe
						</button>
					</div>
				</div>
			</section>
		</main>
	)
}