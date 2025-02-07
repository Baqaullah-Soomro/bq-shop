'use client';

import Image from 'next/image'
import { getProducts } from '@/lib/sanity.queries'
import ProductGrid from '@/components/products/ProductGrid'
import Link from 'next/link'

export default async function GymPage() {
	const products = await getProducts();
	const gymProducts = products.filter(p => p.category === 'gym');
	const suggestedProducts = products
		.filter(p => p.category !== 'gym')
		.slice(0, 4);

	return (
		<main className="flex min-h-screen flex-col antialiased">
			{/* Hero Section with Parallax Effect */}
			<section className="relative bg-[#F2F0F1] py-20 overflow-hidden">
				<div className="absolute inset-0 opacity-10">
					<Image
						src="/products/images/dress-style-4.png"
						alt="Background Pattern"
						fill
						className="object-cover"
					/>
				</div>
				<div className="container-custom relative z-10">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
						<div className="space-y-6">
							<span className="inline-block px-4 py-2 bg-black text-white rounded-full text-sm">Gym Collection</span>
							<h1 className="font-integral text-5xl lg:text-6xl mb-4">Gym Style</h1>
							<p className="text-lg text-gray-600 mb-6 max-w-lg">
								Achieve your fitness goals in style with our performance-driven gym wear. Designed for comfort and maximum mobility.
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
									<div className="text-2xl font-bold">Premium</div>
									<div className="text-sm text-gray-600">Quality</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold">High</div>
									<div className="text-sm text-gray-600">Performance</div>
								</div>
								<div className="text-center">
									<div className="text-2xl font-bold">Maximum</div>
									<div className="text-sm text-gray-600">Comfort</div>
								</div>
							</div>
						</div>
						<div className="relative h-[500px] lg:h-[600px]">
							<Image
								src="/products/images/dress-style-4.png"
								alt="Gym Style Collection"
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
						{['Training Gear', 'Sports Bras', 'Performance Wear', 'Accessories'].map((category) => (
							<div key={category} className="group cursor-pointer p-4 text-center rounded-lg hover:bg-gray-50 transition">
								<Link href={`/shop?category=${category.toLowerCase().replace(' ', '-')}`} className="block">
									<h3 className="font-bold text-lg mb-2">{category}</h3>
									<p className="text-sm text-gray-600">Shop Now →</p>
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Performance Features */}
			<section className="py-16 bg-white">
				<div className="container-custom">
					<h2 className="font-integral text-3xl mb-8 text-center">Performance Features</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Link href="/size-guide" className="block">
							<div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
								<h3 className="font-bold text-xl mb-3">Moisture Wicking</h3>
								<p className="text-gray-600">Stay dry during intense workouts</p>
							</div>
						</Link>
						<Link href="/support" className="block">
							<div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
								<h3 className="font-bold text-xl mb-3">4-Way Stretch</h3>
								<p className="text-gray-600">Maximum flexibility for all movements</p>
							</div>
						</Link>
						<Link href="/blog?category=gym-style" className="block">
							<div className="text-center p-6 rounded-lg hover:bg-gray-50 transition">
								<h3 className="font-bold text-xl mb-3">Anti-Odor</h3>
								<p className="text-gray-600">Fresh feel throughout your workout</p>
							</div>
						</Link>
					</div>
				</div>
			</section>

			{/* Products Section */}
			<section id="products" className="py-16 bg-gray-50">
				<div className="container-custom">
					<ProductGrid
						title="GYM COLLECTION"
						products={gymProducts}
						viewAllLink="/shop?category=gym"
					/>
				</div>
			</section>

			{/* You May Also Like Section */}
			<section className="py-16 bg-white">
				<div className="container-custom">
					<h2 className="font-integral text-3xl mb-8">Complete Your Workout Look</h2>
					<ProductGrid
						title="SUGGESTED FOR YOU"
						products={suggestedProducts}
						viewAllLink="/shop"
					/>
				</div>
			</section>

		</main>
	)
}