'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQ {
	question: string;
	answer: string;
}

const defaultFAQs: FAQ[] = [
	{
		question: "What's your return policy?",
		answer: "We offer a 30-day return policy for all unworn items in their original condition with tags attached. Shipping costs for returns are the responsibility of the customer unless the item is defective."
	},
	{
		question: "How do I find my size?",
		answer: "Please refer to our size guide for detailed measurements. Each product page includes specific measurements. If you're between sizes, we recommend sizing up for a more comfortable fit."
	},
	{
		question: "How long does shipping take?",
		answer: "Domestic orders typically arrive within 3-5 business days. International shipping can take 7-14 business days depending on the destination. Express shipping options are available at checkout."
	},
	{
		question: "Do you ship internationally?",
		answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see exact shipping costs at checkout after entering your address."
	},
	{
		question: "How do I care for this item?",
		answer: "Care instructions are provided on the product label and product page. Generally, we recommend following the specific care label instructions to maintain the quality of your garment."
	}
];

export default function FAQs() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className="max-w-4xl mx-auto">
			<div className="space-y-4">
				{defaultFAQs.map((faq, index) => (
					<div key={index} className="border rounded-lg">
						<button
							className="w-full px-6 py-4 flex justify-between items-center text-left"
							onClick={() => setOpenIndex(openIndex === index ? null : index)}
						>
							<span className="font-medium">{faq.question}</span>
							<ChevronDownIcon
								className={`w-5 h-5 transition-transform ${
									openIndex === index ? 'transform rotate-180' : ''
								}`}
							/>
						</button>
						{openIndex === index && (
							<div className="px-6 pb-4">
								<p className="text-gray-600">{faq.answer}</p>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}