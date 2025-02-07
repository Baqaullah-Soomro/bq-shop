export default function WorksPage() {
	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">How Shop.co Works</h1>
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
				<div>
					<h2 className="text-2xl font-semibold mb-6">Our Process</h2>
					<div className="space-y-6">
						<div className="flex gap-4">
							<div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
							<div>
								<h3 className="font-semibold mb-2">Browse & Select</h3>
								<p className="text-gray-600">Explore our wide range of clothing and accessories. Use filters to find exactly what you're looking for.</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
							<div>
								<h3 className="font-semibold mb-2">Add to Cart</h3>
								<p className="text-gray-600">Choose your size and color, then add items to your cart. Review your selections before checkout.</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
							<div>
								<h3 className="font-semibold mb-2">Checkout</h3>
								<p className="text-gray-600">Secure checkout process with multiple payment options. Enter shipping details for delivery.</p>
							</div>
						</div>

						<div className="flex gap-4">
							<div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">4</div>
							<div>
								<h3 className="font-semibold mb-2">Delivery</h3>
								<p className="text-gray-600">Fast shipping with order tracking. Get your items delivered right to your doorstep.</p>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-2xl font-semibold mb-6">Why Choose Us</h2>
					<div className="space-y-6">
						<div className="p-6 bg-gray-50 rounded-lg">
							<h3 className="font-semibold mb-2">Quality Assurance</h3>
							<p className="text-gray-600">Every item undergoes strict quality checks before shipping.</p>
						</div>

						<div className="p-6 bg-gray-50 rounded-lg">
							<h3 className="font-semibold mb-2">Fast Delivery</h3>
							<p className="text-gray-600">Quick processing and shipping to get your items to you faster.</p>
						</div>

						<div className="p-6 bg-gray-50 rounded-lg">
							<h3 className="font-semibold mb-2">Customer Support</h3>
							<p className="text-gray-600">Dedicated support team to assist you every step of the way.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}