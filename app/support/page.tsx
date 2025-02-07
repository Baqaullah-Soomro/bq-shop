export default function CustomerSupportPage() {
	const supportCategories = [
		{
			title: 'Orders & Shipping',
			questions: [
				{ q: 'How do I track my order?', a: 'You can track your order by logging into your account and visiting the order history section.' },
				{ q: 'What are the shipping costs?', a: 'We offer free shipping on orders over $200. Standard shipping rates apply for orders below this amount.' },
				{ q: 'How long will delivery take?', a: 'Delivery typically takes 3-5 business days for domestic orders and 7-14 days for international orders.' }
			]
		},
		{
			title: 'Returns & Refunds',
			questions: [
				{ q: 'What is your return policy?', a: 'We offer free returns within 30 days of purchase. Items must be unworn with original tags attached.' },
				{ q: 'How do I return an item?', a: 'Log into your account, go to order history, select the item to return, and follow the return instructions.' },
				{ q: 'When will I receive my refund?', a: 'Refunds are processed within 5-7 business days after we receive your return.' }
			]
		},
		{
			title: 'Product & Sizing',
			questions: [
				{ q: 'How do I find my size?', a: 'Check our size guide for detailed measurements. Each product page includes specific sizing information.' },
				{ q: 'Are the colors accurate in photos?', a: 'We strive to display colors accurately, but slight variations may occur due to screen settings.' },
				{ q: 'Can I modify my order?', a: 'Orders can be modified within 1 hour of placement. Contact customer support for assistance.' }
			]
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Customer Support</h1>

			<div className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="p-6 bg-gray-50 rounded-lg">
						<h3 className="font-semibold mb-2">Email Support</h3>
						<p className="text-gray-600">support@shop.co</p>
						<p className="text-gray-600">24/7 Response Time</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg">
						<h3 className="font-semibold mb-2">Phone Support</h3>
						<p className="text-gray-600">1-800-SHOP-CO</p>
						<p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg">
						<h3 className="font-semibold mb-2">Live Chat</h3>
						<p className="text-gray-600">Available 24/7</p>
						<button className="mt-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
							Start Chat
						</button>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
				<div className="space-y-8">
					{supportCategories.map((category, index) => (
						<div key={index}>
							<h3 className="text-xl font-semibold mb-4">{category.title}</h3>
							<div className="space-y-4">
								{category.questions.map((item, qIndex) => (
									<div key={qIndex} className="p-6 bg-gray-50 rounded-lg">
										<h4 className="font-semibold mb-2">{item.q}</h4>
										<p className="text-gray-600">{item.a}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}