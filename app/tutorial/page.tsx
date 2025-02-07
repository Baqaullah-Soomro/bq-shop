export default function TutorialPage() {
	const tutorials = [
		{
			title: 'Getting Started with Shop.co',
			sections: [
				{
					heading: 'Creating an Account',
					content: 'Learn how to create and set up your Shop.co account.'
				},
				{
					heading: 'Profile Setup',
					content: 'Complete your profile with sizing and preferences.'
				},
				{
					heading: 'Navigation Guide',
					content: 'Understanding the Shop.co interface and features.'
				}
			]
		},
		{
			title: 'Shopping Guide',
			sections: [
				{
					heading: 'Finding Products',
					content: 'Using filters and search to find the perfect items.'
				},
				{
					heading: 'Size Selection',
					content: 'How to use our size guide for the best fit.'
				},
				{
					heading: 'Adding to Cart',
					content: 'Managing your shopping cart and saved items.'
				}
			]
		},
		{
			title: 'Checkout Process',
			sections: [
				{
					heading: 'Payment Methods',
					content: 'Available payment options and how to use them.'
				},
				{
					heading: 'Shipping Options',
					content: 'Understanding delivery times and costs.'
				},
				{
					heading: 'Order Confirmation',
					content: 'What happens after you place an order.'
				}
			]
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Development Tutorial</h1>

			<div className="mb-12">
				<p className="text-gray-600 max-w-3xl">
					Learn how to make the most of your Shop.co experience with our comprehensive tutorials. 
					Each guide provides step-by-step instructions to help you navigate and shop effectively.
				</p>
			</div>

			<div className="space-y-12">
				{tutorials.map((tutorial, index) => (
					<div key={index} className="bg-gray-50 rounded-lg p-8">
						<h2 className="text-2xl font-semibold mb-6">{tutorial.title}</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{tutorial.sections.map((section, sectionIndex) => (
								<div key={sectionIndex} className="border border-gray-200 rounded-lg p-6 hover:border-black transition-colors">
									<h3 className="font-semibold mb-3">{section.heading}</h3>
									<p className="text-gray-600 mb-4">{section.content}</p>
									<button className="text-black hover:text-gray-600 transition-colors flex items-center gap-2">
										Learn More
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</button>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="p-6 bg-gray-50 rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
					<p className="text-gray-600 mb-4">
						Watch our video guides for visual demonstrations of Shop.co features.
					</p>
					<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
						Watch Videos
					</button>
				</div>

				<div className="p-6 bg-gray-50 rounded-lg">
					<h2 className="text-xl font-semibold mb-4">Need Help?</h2>
					<p className="text-gray-600 mb-4">
						Can't find what you're looking for? Our support team is here to help.
					</p>
					<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
						Contact Support
					</button>
				</div>
			</div>
		</div>
	);
}