'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	
	const renderPageNumbers = () => {
		return pages.map((page) => (
			<button
				key={page}
				onClick={() => onPageChange(page)}
				className={`px-4 py-2 text-sm ${
					currentPage === page
						? 'bg-black text-white'
						: 'text-gray-900 hover:bg-gray-100'
				} rounded-lg`}
			>
				{page}
			</button>
		));
	};

	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<ChevronLeftIcon className="h-4 w-4 mr-1" />
				Previous
			</button>
			{renderPageNumbers()}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="flex items-center px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Next
				<ChevronRightIcon className="h-4 w-4 ml-1" />
			</button>
		</div>
	);
}