import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="text-center px-4">
				<h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
				<p className="text-gray-600 mb-8 max-w-md mx-auto">
					Sorry, we couldn't find the product you're looking for. It might have been removed or is temporarily unavailable.
				</p>
				<div className="space-y-4">
					<Link 
						href="/shop" 
						className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition-colors"
					>
						Continue Shopping
					</Link>
					<p className="text-sm text-gray-500">
						Need help? <Link href="/support" className="text-black hover:underline">Contact Support</Link>
					</p>
				</div>
			</div>
		</div>
	);
}