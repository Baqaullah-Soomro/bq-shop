export default function PaymentsPage() {
	const paymentSections = [
		{
			title: 'Payment Methods',
			content: [
				{
					heading: 'Credit/Debit Cards',
					description: 'We accept all major credit and debit cards including Visa, Mastercard, and American Express.'
				},
				{
					heading: 'Digital Wallets',
					description: 'Pay using PayPal, Apple Pay, or Google Pay for quick and secure checkout.'
				},
				{
					heading: 'Bank Transfer',
					description: 'Direct bank transfer options available for select regions.'
				}
			]
		},
		{
			title: 'Payment Security',
			content: [
				{
					heading: 'Secure Transactions',
					description: 'All payments are encrypted and processed through secure payment gateways.'
				},
				{
					heading: 'Fraud Protection',
					description: 'Advanced fraud detection systems to protect your transactions.'
				},
				{
					heading: 'Data Protection',
					description: 'Your payment information is never stored on our servers.'
				}
			]
		},
		{
			title: 'Billing Information',
			content: [
				{
					heading: 'Managing Payment Methods',
					description: 'Add, edit, or remove payment methods from your account.'
				},
				{
					heading: 'Billing Address',
					description: 'Update billing addresses associated with your payment methods.'
				},
				{
					heading: 'Payment History',
					description: 'View and download your payment history and receipts.'
				}
			]
		}
	];

	const acceptedPayments = [
		{ name: 'Visa', icon: '/icons/visa.svg' },
		{ name: 'Mastercard', icon: '/icons/mastercard.svg' },
		{ name: 'PayPal', icon: '/icons/paypal.svg' },
		{ name: 'Apple Pay', icon: '/icons/applepay.svg' },
		{ name: 'Google Pay', icon: '/icons/googlepay.svg' }
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Payments</h1>

			<div className="mb-12">
				<h2 className="text-2xl font-semibold mb-6">Accepted Payment Methods</h2>
				<div className="flex flex-wrap gap-6 items-center">
					{acceptedPayments.map((payment, index) => (
						<div key={index} className="flex items-center gap-2">
							<img src={payment.icon} alt={payment.name} className="h-8" />
							<span className="text-gray-600">{payment.name}</span>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-12">
				{paymentSections.map((section, index) => (
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

			<div className="mt-12 p-6 bg-gray-50 rounded-lg">
				<h2 className="text-2xl font-semibold mb-4">Payment Support</h2>
				<p className="text-gray-600 mb-6">
					Having trouble with a payment? Our support team is here to help resolve any payment-related issues.
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