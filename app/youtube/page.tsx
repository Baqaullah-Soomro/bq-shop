export default function YoutubePage() {
	const playlists = [
		{
			title: 'Style Guides',
			videos: [
				{
					title: 'Building a Basic Wardrobe',
					duration: '15:30',
					views: '25K',
					thumbnail: '/products/images/pic1.png'
				},
				{
					title: 'Color Coordination Tips',
					duration: '12:45',
					views: '18K',
					thumbnail: '/products/images/pic2.png'
				},
				{
					title: 'Accessorizing Basics',
					duration: '10:20',
					views: '20K',
					thumbnail: '/products/images/pic3.png'
				}
			]
		},
		{
			title: 'Fashion Tips & Tricks',
			videos: [
				{
					title: 'Styling for Different Occasions',
					duration: '18:15',
					views: '30K',
					thumbnail: '/products/images/pic4.png'
				},
				{
					title: 'Seasonal Fashion Guide',
					duration: '14:50',
					views: '22K',
					thumbnail: '/products/images/pic5.png'
				},
				{
					title: 'Mixing Patterns',
					duration: '11:35',
					views: '15K',
					thumbnail: '/products/images/pic6.png'
				}
			]
		},
		{
			title: 'Shopping Tutorials',
			videos: [
				{
					title: 'Finding Your Perfect Size',
					duration: '13:25',
					views: '28K',
					thumbnail: '/products/images/pic7.png'
				},
				{
					title: 'Smart Shopping Tips',
					duration: '16:40',
					views: '19K',
					thumbnail: '/products/images/pic8.png'
				},
				{
					title: 'Sale Season Guide',
					duration: '12:15',
					views: '24K',
					thumbnail: '/products/images/pic9.png'
				}
			]
		}
	];

	return (
		<div className="container-custom py-16">
			<h1 className="text-4xl font-bold mb-8">Fashion Video Guides</h1>

			<div className="mb-12">
				<p className="text-gray-600 max-w-3xl">
					Watch our curated collection of fashion tutorials and style guides. 
					Subscribe to our channel for weekly fashion tips and updates.
				</p>
			</div>

			<div className="space-y-16">
				{playlists.map((playlist, index) => (
					<div key={index}>
						<h2 className="text-2xl font-semibold mb-6">{playlist.title}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{playlist.videos.map((video, videoIndex) => (
								<div key={videoIndex} className="bg-gray-50 rounded-lg overflow-hidden group">
									<div className="aspect-video relative">
										<img
											src={video.thumbnail}
											alt={video.title}
											className="object-cover w-full h-full"
										/>
										<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
											<button className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
												</svg>
											</button>
										</div>
									</div>
									<div className="p-4">
										<h3 className="font-semibold mb-2">{video.title}</h3>
										<div className="flex justify-between text-sm text-gray-500">
											<span>{video.duration}</span>
											<span>{video.views} views</span>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="mt-12 p-6 bg-gray-50 rounded-lg">
				<h2 className="text-2xl font-semibold mb-4">Subscribe to Our Channel</h2>
				<p className="text-gray-600 mb-6">
					Never miss a video! Subscribe to our YouTube channel for the latest fashion content.
				</p>
				<button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
					Visit Our Channel
				</button>
			</div>
		</div>
	);
}