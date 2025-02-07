export default function AccountPage() {
	const accountSections = [
		{
			title: 'Account Management',
			items: [
				{
					title: 'Creating an Account',
					content: 'Sign up with your email address and create a password. Verify your email to activate your account.'
				},
				{
					title: 'Account Security',
					content: 'Use a strong password and enable two-factor authentication for enhanced security.'
				},
				{
					title: 'Updating Information',
					content: 'Keep your profile up to date with current contact and shipping information.'
				}
			]
		},
		{
			title: 'Orders & History',
			items: [
				{
					title: 'Viewing Orders',
					content: 'Access your complete order history, including current and past orders.'
				},
				{
					title: 'Order Status',
					content: 'Track your orders in real-time from processing to delivery.'
				},
				{
					title: 'Order Details',
					content: 'View detailed information about each order, including items, prices, and shipping.'
				}
			]
		},
		{
			title: 'Preferences',
			items: [
				{
					title: 'Communication Preferences',
					content: 'Manage email subscriptions and notification settings.'
				},
				{
					title: 'Payment Methods',
					content: 'Save and manage your preferred payment methods securely.'
				},
				{
					title: 'Shipping Addresses',
					content: 'Save multiple shipping addresses for convenient checkout.'
				}
			]
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Account Information</h1>

			<div className="space-y-12">
				{accountSections.map((section, index) => (
					<div key={index}>
						<h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{section.items.map((item, itemIndex) => (
								<div key={itemIndex} className="p-6 bg-gray-50 rounded-lg">
									<h3 className="font-semibold mb-3">{item.title}</h3>
									<p className="text-gray-600">{item.content}</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="mt-12 p-6 bg-gray-50 rounded-lg">
				<h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
				<p className="text-gray-600 mb-6">
					Our customer service team is available to assist you with any account-related questions.
				</p>
				<div className="flex flex-wrap gap-4">
					<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
						Contact Support
					</button>
					<button className="border border-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors">
						View FAQs
					</button>
				</div>
			</div>
		</div>
	);
}