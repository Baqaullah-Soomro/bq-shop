export default function EbooksPage() {
	const ebooks = [
		{
			title: 'Style Guide 2024',
			description: 'A comprehensive guide to this year\'s fashion trends and style tips.',
			image: '/products/images/pic1.png',
			category: 'Fashion Guide'
		},
		{
			title: 'Sustainable Fashion',
			description: 'Learn about sustainable fashion practices and eco-friendly clothing choices.',
			image: '/products/images/pic2.png',
			category: 'Sustainability'
		},
		{
			title: 'Wardrobe Essentials',
			description: 'Build the perfect capsule wardrobe with these timeless pieces.',
			image: '/products/images/pic3.png',
			category: 'Fashion Guide'
		},
		{
			title: 'Care Guide',
			description: 'Expert tips on how to care for and maintain your clothing.',
			image: '/products/images/pic4.png',
			category: 'Maintenance'
		},
		{
			title: 'Size Guide',
			description: 'Comprehensive sizing information for all our clothing categories.',
			image: '/products/images/pic5.png',
			category: 'Shopping Guide'
		},
		{
			title: 'Shopping Smart',
			description: 'Tips and tricks for making smart fashion investments.',
			image: '/products/images/pic6.png',
			category: 'Shopping Guide'
		}
	];

	const categories = ['All', 'Fashion Guide', 'Sustainability', 'Maintenance', 'Shopping Guide'];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Free Fashion eBooks</h1>

			<div className="mb-12">
				<p className="text-gray-600 max-w-3xl">
					Explore our collection of free fashion eBooks. From style guides to sustainable fashion tips, 
					these resources will help you make informed fashion choices.
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
				{ebooks.map((book, index) => (
					<div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
						<div className="aspect-[4/3] relative">
							<img
								src={book.image}
								alt={book.title}
								className="object-cover w-full h-full"
							/>
						</div>
						<div className="p-6">
							<span className="text-sm text-gray-500 mb-2 block">{book.category}</span>
							<h3 className="text-xl font-semibold mb-2">{book.title}</h3>
							<p className="text-gray-600 mb-4">{book.description}</p>
							<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors w-full">
								Download PDF
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="mt-12 p-6 bg-gray-50 rounded-lg">
				<h2 className="text-2xl font-semibold mb-4">Subscribe for Updates</h2>
				<p className="text-gray-600 mb-6">
					Get notified when we release new eBooks and fashion guides.
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