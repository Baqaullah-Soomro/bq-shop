export default function BlogPage() {
	const blogPosts = [
		{
			title: 'How to Build a Capsule Wardrobe',
			excerpt: 'Learn the essentials of creating a versatile and sustainable wardrobe that works for any season.',
			image: '/products/images/pic1.png',
			category: 'Style Tips',
			date: 'March 1, 2024'
		},
		{
			title: 'Sustainable Fashion: A Beginner\'s Guide',
			excerpt: 'Discover how to make environmentally conscious fashion choices without compromising on style.',
			image: '/products/images/pic2.png',
			category: 'Sustainability',
			date: 'February 28, 2024'
		},
		{
			title: 'Caring for Your Clothes',
			excerpt: 'Expert tips on how to maintain and extend the life of your favorite garments.',
			image: '/products/images/pic3.png',
			category: 'Maintenance',
			date: 'February 25, 2024'
		},
		{
			title: 'Spring Fashion Trends 2024',
			excerpt: 'Stay ahead of the curve with our comprehensive guide to this season\'s hottest trends.',
			image: '/products/images/pic4.png',
			category: 'Trends',
			date: 'February 20, 2024'
		},
		{
			title: 'Dressing for Your Body Type',
			excerpt: 'Find the most flattering styles and cuts for your unique body shape.',
			image: '/products/images/pic5.png',
			category: 'Style Tips',
			date: 'February 15, 2024'
		},
		{
			title: 'Mixing and Matching Colors',
			excerpt: 'Master the art of color coordination to create stunning outfits.',
			image: '/products/images/pic6.png',
			category: 'Style Tips',
			date: 'February 10, 2024'
		}
	];

	const categories = ['All', 'Style Tips', 'Sustainability', 'Maintenance', 'Trends'];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Fashion Blog</h1>

			<div className="mb-12">
				<p className="text-gray-600 max-w-3xl">
					Discover fashion tips, styling advice, and the latest trends in our blog. 
					Learn how to make the most of your wardrobe and develop your personal style.
				</p>
			</div>

			<div className="mb-8">
				<div className="flex flex-wrap gap-4">
					{categories.map((category, index) => (
						<button
							key={index}
							className="px-4 py-2 rounded-lg border border-gray-200 hover:border-black transition-colors"
						>
							{category}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{blogPosts.map((post, index) => (
					<div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
						<div className="aspect-[16/9] relative">
							<img
								src={post.image}
								alt={post.title}
								className="object-cover w-full h-full"
							/>
						</div>
						<div className="p-6">
							<div className="flex justify-between items-center mb-2">
								<span className="text-sm text-gray-500">{post.category}</span>
								<span className="text-sm text-gray-500">{post.date}</span>
							</div>
							<h3 className="text-xl font-semibold mb-2">{post.title}</h3>
							<p className="text-gray-600 mb-4">{post.excerpt}</p>
							<button className="text-black hover:text-gray-600 transition-colors flex items-center gap-2">
								Read More
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="mt-12 p-6 bg-gray-50 rounded-lg">
				<h2 className="text-2xl font-semibold mb-4">Subscribe to Our Blog</h2>
				<p className="text-gray-600 mb-6">
					Get the latest fashion tips and trends delivered straight to your inbox.
				</p>
				<div className="flex gap-4">
					<input
						type="email"
						placeholder="Enter your email"
						className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
					/>
					<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
						Subscribe
					</button>
				</div>
			</div>
		</div>
	);
}