'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function NewsletterSubscription() {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubscribe = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			toast.success('Successfully subscribed to newsletter!');
			setEmail('');
			setIsLoading(false);
		}, 1500);
	};

	return (
		<form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-[460px]">
			<div className="relative flex-1">
				<input
					type="email"
					placeholder="Enter your email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full bg-white rounded-[62px] py-4 px-6 text-black text-base placeholder:text-[#667085] focus:outline-none"
					required
				/>
			</div>
			<button 
				type="submit"
				disabled={isLoading}
				className="bg-white text-black rounded-[62px] px-8 py-4 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-base"
			>
				Subscribe to Newsletter
			</button>
		</form>
	);
}


