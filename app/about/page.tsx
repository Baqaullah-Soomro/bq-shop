export default function AboutPage() {
	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">About Shop.co</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
				<div>
					<h2 className="text-2xl font-semibold mb-4">Our Story</h2>
					<p className="text-gray-600 mb-6">
						Founded in 2024, Shop.co has grown from a small startup to a leading fashion retailer. 
						We believe in providing high-quality clothing that combines style, comfort, and affordability.
					</p>
					<p className="text-gray-600 mb-6">
						Our mission is to make fashion accessible to everyone while maintaining high standards of 
						quality and sustainability in our production processes.
					</p>
				</div>
				<div>
					<h2 className="text-2xl font-semibold mb-4">Our Values</h2>
					<ul className="space-y-4 text-gray-600">
						<li className="flex items-start gap-2">
							<span className="font-semibold">Quality:</span> We source the finest materials and work with skilled artisans.
						</li>
						<li className="flex items-start gap-2">
							<span className="font-semibold">Sustainability:</span> Committed to eco-friendly practices and ethical manufacturing.
						</li>
						<li className="flex items-start gap-2">
							<span className="font-semibold">Innovation:</span> Constantly evolving to meet modern fashion needs.
						</li>
						<li className="flex items-start gap-2">
							<span className="font-semibold">Customer Focus:</span> Your satisfaction is our top priority.
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}