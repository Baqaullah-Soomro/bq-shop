export default function TermsPage() {
	const sections = [
		{
			title: 'Terms of Use',
			content: `By accessing and using Shop.co, you agree to comply with and be bound by these terms and conditions. 
			We reserve the right to modify these terms at any time, and your continued use of the site constitutes agreement 
			to any modifications.`
		},
		{
			title: 'Account Registration',
			content: `Users must register an account to make purchases. You are responsible for maintaining the 
			confidentiality of your account information and for all activities under your account. You must provide 
			accurate and complete information during registration.`
		},
		{
			title: 'Product Information',
			content: `We strive to display accurate product information, including prices and availability. However, 
			we reserve the right to correct any errors and to change or update information at any time without prior notice.`
		},
		{
			title: 'Pricing and Payment',
			content: `All prices are in USD unless otherwise stated. We accept major credit cards and other payment methods 
			as indicated at checkout. Orders are not binding until payment is processed and you receive an order confirmation.`
		},
		{
			title: 'Shipping and Delivery',
			content: `Delivery times are estimates only. We are not responsible for delays beyond our control. Risk of loss 
			and title for items pass to you upon delivery to the carrier.`
		},
		{
			title: 'Returns and Refunds',
			content: `Items may be returned within 30 days of delivery. Items must be unworn, unwashed, and have original 
			tags attached. Refunds will be processed to the original payment method.`
		},
		{
			title: 'Intellectual Property',
			content: `All content on Shop.co, including text, graphics, logos, and images, is our property and protected 
			by copyright and other intellectual property laws.`
		},
		{
			title: 'Limitation of Liability',
			content: `Shop.co shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
			resulting from your use of or inability to use our services.`
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
			
			<div className="mb-8">
				<p className="text-gray-600">
					Last updated: {new Date().toLocaleDateString()}
				</p>
			</div>

			<div className="space-y-8">
				{sections.map((section, index) => (
					<div key={index} className="border-b pb-8">
						<h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
						<p className="text-gray-600 whitespace-pre-line">{section.content}</p>
					</div>
				))}
			</div>

			<div className="mt-12 p-6 bg-gray-50 rounded-lg">
				<h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
				<p className="text-gray-600 mb-4">
					If you have any questions about these Terms & Conditions, please contact us:
				</p>
				<ul className="text-gray-600 space-y-2">
					<li>Email: legal@shop.co</li>
					<li>Phone: 1-800-SHOP-CO</li>
					<li>Address: 123 Fashion Street, New York, NY 10001</li>
				</ul>
			</div>
		</div>
	);
}