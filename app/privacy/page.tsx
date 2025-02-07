export default function PrivacyPolicyPage() {
	const sections = [
		{
			title: 'Information We Collect',
			content: `We collect information that you provide directly to us, including:
			• Name, email address, and contact information
			• Billing and shipping addresses
			• Payment information (processed securely through our payment providers)
			• Order history and preferences
			• Communications with our customer service team`
		},
		{
			title: 'How We Use Your Information',
			content: `We use the information we collect to:
			• Process your orders and payments
			• Communicate with you about orders and services
			• Send marketing communications (with your consent)
			• Improve our website and services
			• Detect and prevent fraud
			• Comply with legal obligations`
		},
		{
			title: 'Information Sharing',
			content: `We share your information with:
			• Payment processors and shipping carriers to fulfill orders
			• Service providers who assist our operations
			• Law enforcement when required by law
			We do not sell your personal information to third parties.`
		},
		{
			title: 'Data Security',
			content: `We implement appropriate technical and organizational measures to protect your personal information. 
			However, no method of transmission over the Internet is 100% secure.`
		},
		{
			title: 'Cookies and Tracking',
			content: `We use cookies and similar technologies to:
			• Keep you logged in
			• Remember your preferences
			• Analyze site traffic and usage
			• Personalize content and ads
			You can control cookies through your browser settings.`
		},
		{
			title: 'Your Rights',
			content: `You have the right to:
			• Access your personal information
			• Correct inaccurate information
			• Request deletion of your information
			• Opt-out of marketing communications
			• Export your data`
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
			
			<div className="mb-8">
				<p className="text-gray-600">
					Last updated: {new Date().toLocaleDateString()}
				</p>
				<p className="text-gray-600 mt-4">
					This Privacy Policy describes how Shop.co ("we," "us," or "our") collects, uses, 
					and shares your personal information when you use our website.
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
					If you have any questions about our Privacy Policy or how we handle your information, please contact us:
				</p>
				<ul className="text-gray-600 space-y-2">
					<li>Email: privacy@shop.co</li>
					<li>Phone: 1-800-SHOP-CO</li>
					<li>Address: 123 Fashion Street, New York, NY 10001</li>
				</ul>
			</div>
		</div>
	);
}