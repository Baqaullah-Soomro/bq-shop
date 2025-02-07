export default function DeliveryDetailsPage() {
	const deliveryOptions = [
		{
			title: 'Standard Shipping',
			time: '3-5 business days',
			cost: 'Free on orders over $200',
			details: 'Available for all domestic orders. Tracking provided.'
		},
		{
			title: 'Express Shipping',
			time: '1-2 business days',
			cost: '$15',
			details: 'Available for domestic orders placed before 2 PM EST.'
		},
		{
			title: 'International Shipping',
			time: '7-14 business days',
			cost: 'Calculated at checkout',
			details: 'Available for most countries. Import duties may apply.'
		}
	];

	const deliveryInfo = [
		{
			title: 'Order Processing',
			content: 'Orders are processed within 24 hours on business days. You\'ll receive a confirmation email with tracking details once your order ships.'
		},
		{
			title: 'Tracking Your Order',
			content: 'Track your order anytime by logging into your account or using the tracking number provided in your shipping confirmation email.'
		},
		{
			title: 'Delivery Areas',
			content: 'We deliver to all 50 US states and most international locations. Some remote areas might experience longer delivery times.'
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Delivery Information</h1>

			<div className="mb-12">
				<h2 className="text-2xl font-semibold mb-6">Shipping Options</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{deliveryOptions.map((option, index) => (
						<div key={index} className="p-6 bg-gray-50 rounded-lg">
							<h3 className="font-semibold text-lg mb-2">{option.title}</h3>
							<div className="space-y-2">
								<p className="text-gray-600"><span className="font-medium">Delivery Time:</span> {option.time}</p>
								<p className="text-gray-600"><span className="font-medium">Cost:</span> {option.cost}</p>
								<p className="text-gray-600">{option.details}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-8">
				{deliveryInfo.map((info, index) => (
					<div key={index} className="border-b pb-8">
						<h2 className="text-2xl font-semibold mb-4">{info.title}</h2>
						<p className="text-gray-600">{info.content}</p>
					</div>
				))}
			</div>

			<div className="mt-12 p-6 bg-gray-50 rounded-lg">
				<h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
				<p className="text-gray-600 mb-4">
					If you have any questions about delivery or need to modify your delivery details, 
					our customer service team is here to help.
				</p>
				<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
					Contact Support
				</button>
			</div>
		</div>
	);
}