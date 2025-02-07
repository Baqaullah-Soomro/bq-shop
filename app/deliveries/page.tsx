export default function ManageDeliveriesPage() {
	const deliveryManagement = [
		{
			title: 'Track Your Delivery',
			content: [
				{
					heading: 'Real-Time Tracking',
					description: 'Monitor your package location in real-time through our tracking system.'
				},
				{
					heading: 'Delivery Updates',
					description: 'Receive notifications about your delivery status via email and SMS.'
				},
				{
					heading: 'Estimated Arrival',
					description: 'Get accurate delivery time estimates based on current shipment status.'
				}
			]
		},
		{
			title: 'Delivery Options',
			content: [
				{
					heading: 'Change Delivery Address',
					description: 'Update your delivery address before the package ships.'
				},
				{
					heading: 'Delivery Instructions',
					description: 'Add special instructions for the delivery driver.'
				},
				{
					heading: 'Delivery Scheduling',
					description: 'Choose a preferred delivery date and time window.'
				}
			]
		},
		{
			title: 'Problem Resolution',
			content: [
				{
					heading: 'Delayed Delivery',
					description: 'Contact support if your package is delayed beyond the estimated delivery date.'
				},
				{
					heading: 'Missing Package',
					description: 'Report missing packages and initiate an investigation.'
				},
				{
					heading: 'Damaged Items',
					description: 'Report damaged items and request returns or replacements.'
				}
			]
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Manage Deliveries</h1>

			<div className="space-y-12">
				{deliveryManagement.map((section, index) => (
					<div key={index}>
						<h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{section.content.map((item, itemIndex) => (
								<div key={itemIndex} className="p-6 bg-gray-50 rounded-lg">
									<h3 className="font-semibold mb-3">{item.heading}</h3>
									<p className="text-gray-600">{item.description}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="p-6 bg-gray-50 rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Track a Package</h2>
					<div className="flex gap-2">
						<input
							type="text"
							placeholder="Enter tracking number"
							className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
						/>
						<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
							Track
						</button>
					</div>
				</div>

				<div className="p-6 bg-gray-50 rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Need Assistance?</h2>
					<p className="text-gray-600 mb-4">
						Our support team is here to help with any delivery-related questions.
					</p>
					<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
						Contact Support
					</button>
				</div>
			</div>
		</div>
	);
}