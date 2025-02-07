export default function FeaturesPage() {
	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Our Features</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div className="p-6 bg-gray-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Free Shipping</h3>
					<p className="text-gray-600">
						Enjoy free shipping on all orders over $200. International shipping available.
					</p>
				</div>

				<div className="p-6 bg-gray-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Easy Returns</h3>
					<p className="text-gray-600">
						Simple returns within 30 days. Free return shipping on all orders.
					</p>
				</div>

				<div className="p-6 bg-gray-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
					<p className="text-gray-600">
						Multiple secure payment options including credit cards and PayPal.
					</p>
				</div>

				<div className="p-6 bg-gray-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Size Guide</h3>
					<p className="text-gray-600">
						Detailed size guides for all products to ensure the perfect fit.
					</p>
				</div>

				<div className="p-6 bg-gray-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
					<p className="text-gray-600">
						Round-the-clock customer support to assist you with any queries.
					</p>
				</div>

				<div className="p-6 bg-gray-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Quality Guarantee</h3>
					<p className="text-gray-600">
						High-quality products with satisfaction guarantee on every purchase.
					</p>
				</div>
			</div>
		</div>
	);
}