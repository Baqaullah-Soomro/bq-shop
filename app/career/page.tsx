export default function CareerPage() {
	const openPositions = [
		{
			title: 'Senior Fashion Designer',
			department: 'Design',
			location: 'New York',
			type: 'Full-time',
			description: 'Looking for an experienced fashion designer to join our creative team.'
		},
		{
			title: 'E-commerce Manager',
			department: 'Digital',
			location: 'Remote',
			type: 'Full-time',
			description: 'Manage and optimize our online shopping experience.'
		},
		{
			title: 'Supply Chain Coordinator',
			department: 'Operations',
			location: 'London',
			type: 'Full-time',
			description: 'Coordinate with suppliers and manage inventory logistics.'
		},
		{
			title: 'Customer Service Representative',
			department: 'Support',
			location: 'Remote',
			type: 'Part-time',
			description: 'Provide excellent customer support via email and phone.'
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Careers at Shop.co</h1>
			
			<div className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Join Our Team</h2>
				<p className="text-gray-600 max-w-3xl">
					We're always looking for talented individuals to join our growing team. At Shop.co, 
					you'll work with passionate people who are committed to revolutionizing the fashion industry.
				</p>
			</div>

			<div className="mb-16">
				<h2 className="text-2xl font-semibold mb-6">Why Work With Us</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-6 bg-gray-50 rounded-lg">
						<h3 className="font-semibold mb-2">Growth Opportunities</h3>
						<p className="text-gray-600">Career development and learning opportunities.</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg">
						<h3 className="font-semibold mb-2">Competitive Benefits</h3>
						<p className="text-gray-600">Health insurance, retirement plans, and more.</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg">
						<h3 className="font-semibold mb-2">Work-Life Balance</h3>
						<p className="text-gray-600">Flexible working hours and remote options.</p>
					</div>
				</div>
			</div>

			<div>
				<h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
				<div className="space-y-6">
					{openPositions.map((position, index) => (
						<div key={index} className="border rounded-lg p-6">
							<div className="flex flex-wrap justify-between items-start gap-4 mb-4">
								<div>
									<h3 className="text-xl font-semibold">{position.title}</h3>
									<p className="text-gray-600">{position.department}</p>
								</div>
								<div className="text-right">
									<p className="font-medium">{position.location}</p>
									<p className="text-gray-600">{position.type}</p>
								</div>
							</div>
							<p className="text-gray-600 mb-4">{position.description}</p>
							<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
								Apply Now
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}