'use client';

import { useState, FC, useEffect } from 'react';
import { Product } from '@/lib/sanity.queries';
import { urlFor } from '@/sanity/lib/image';
import RelatedProducts from '@/components/products/RelatedProducts';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import ReviewForm from '@/components/products/ReviewForm';
import FAQs from '@/components/products/FAQs';

interface Review {
	id: string;
	rating: number;
	title: string;
	text: string;
	name: string;
	email?: string;
	date: string;
	images?: string[];
	helpful: number;
	edited?: boolean;
	editedAt?: string;
	lastEditedFields?: string[];
}

interface ReviewDraft {
	id: string;
	content: Omit<Review, 'id' | 'date' | 'helpful'>;
	lastSaved: string;
}

interface ReviewHistory {
	id: string;
	changes: {
		timestamp: string;
		fields: string[];
		previousValues: { [key: string]: any };
	}[];
}

export const RatingStars: FC<{ rating: number | undefined; size?: 'sm' | 'md' | 'lg' }> = ({ 
	rating = 0, 
	size = 'md' 
}) => {
	const sizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-6 w-6',
		lg: 'h-8 w-8'
	};

	return (
		<div className="flex items-center gap-1">
			{[1, 2, 3, 4, 5].map((star) => (
				<StarIcon
					key={star}
					className={`${sizeClasses[size]} ${
						star <= (rating || 0)
							? 'text-yellow-400'
							: star - (rating || 0) < 1
							? 'text-yellow-400 opacity-50'
							: 'text-gray-200'
					}`}
				/>
			))}
		</div>
	);
};

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};

interface ProductDetailsProps {
	product: Product;
	relatedProducts: Product[];
}

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedSize, setSelectedSize] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [activeTab, setActiveTab] = useState('Rating & Reviews');
	const [showReviewForm, setShowReviewForm] = useState(false);
	const { addItem } = useCart();

	// Add useEffect to update color and size when product loads
	useEffect(() => {
		if (product) {
			setSelectedColor(product.colors?.[0] || '');
			setSelectedSize(product.sizes?.[0] || '');
		}
	}, [product]);
	const [reviewSort, setReviewSort] = useState<'latest' | 'highest' | 'lowest'>('latest');
	const [reviewFilter, setReviewFilter] = useState<number | null>(null);
	const [editingReview, setEditingReview] = useState<Review | null>(null);
	const [reviewHistories, setReviewHistories] = useState<{ [key: string]: ReviewHistory }>({});
	const [showEditHistory, setShowEditHistory] = useState<string | null>(null);
	const [reviewDrafts, setReviewDrafts] = useState<{ [key: string]: ReviewDraft }>({});
	const [showVersionComparison, setShowVersionComparison] = useState<string | null>(null);
	const [reviews, setReviews] = useState<Review[]>([
		{
			id: '1',
			rating: 5,
			title: 'Perfect fit and great quality',
			text: 'The material is excellent and the sizing is spot on. Very happy with this purchase!',
			name: 'Sarah M.',
			date: '2024-01-15',
			images: ['/products/images/dress-style-1.png'],
			helpful: 24
		},
		{
			id: '2',
			rating: 4,
			title: 'Good but could be better',
			text: 'Nice design and comfortable, but the color is slightly different from the pictures.',
			name: 'Michael R.',
			date: '2024-01-10',
			helpful: 12
		}
	]);

	const handleEditReview = (review: Review) => {
		// Check for existing draft
		const existingDraft = reviewDrafts[review.id];
		if (existingDraft) {
			if (window.confirm('You have an unsaved draft. Would you like to continue editing it?')) {
				setEditingReview({ ...review, ...existingDraft.content });
			} else {
				setEditingReview(review);
			}
		} else {
			setEditingReview(review);
		}
		
		// Store current state in history
		setReviewHistories(prev => ({
			...prev,
			[review.id]: {
				id: review.id,
				changes: [
					...(prev[review.id]?.changes || []),
					{
						timestamp: new Date().toISOString(),
						fields: [],
						previousValues: { ...review }
					}
				]
			}
		}));
		setShowReviewForm(true);
	};

	const saveDraft = (reviewId: string, content: Omit<Review, 'id' | 'date' | 'helpful'>) => {
		setReviewDrafts(prev => ({
			...prev,
			[reviewId]: {
				id: reviewId,
				content,
				lastSaved: new Date().toISOString()
			}
		}));
		toast.success('Draft saved');
	};

	const discardDraft = (reviewId: string) => {
		if (window.confirm('Are you sure you want to discard this draft?')) {
			setReviewDrafts(prev => {
				const { [reviewId]: _, ...rest } = prev;
				return rest;
			});
			toast.success('Draft discarded');
		}
	};

	const handleUndoEdit = (reviewId: string) => {
		const history = reviewHistories[reviewId];
		if (history && history.changes.length > 0) {
			const lastChange = history.changes[history.changes.length - 1];
			setReviews(reviews.map(r => 
				r.id === reviewId ? { ...r, ...lastChange.previousValues } : r
			));
			setReviewHistories(prev => ({
				...prev,
				[reviewId]: {
					...prev[reviewId],
					changes: prev[reviewId].changes.slice(0, -1)
				}
			}));
			toast.success('Changes reverted successfully');
		}
	};

	const handleDeleteReview = (reviewId: string) => {
		if (window.confirm('Are you sure you want to delete this review?')) {
			setReviews(reviews.filter(review => review.id !== reviewId));
			toast.success('Review deleted successfully');
		}
	};

	const handleReviewSubmit = (review: { 
		rating: number; 
		title: string; 
		text: string; 
		images: File[];
		name: string;
		email: string;
	}) => {
		if (editingReview) {
			// Compare changes
			const changedFields: string[] = [];
			if (review.rating !== editingReview.rating) changedFields.push('rating');
			if (review.title !== editingReview.title) changedFields.push('title');
			if (review.text !== editingReview.text) changedFields.push('text');
			if (review.name !== editingReview.name) changedFields.push('name');
			if (review.email !== editingReview.email) changedFields.push('email');
			if (review.images.length > 0) changedFields.push('images');

			// Update review history
			setReviewHistories(prev => ({
				...prev,
				[editingReview.id]: {
					id: editingReview.id,
					changes: [
						...(prev[editingReview.id]?.changes || []),
						{
							timestamp: new Date().toISOString(),
							fields: changedFields,
							previousValues: { ...editingReview }
						}
					]
				}
			}));

			// Update the review
			const updatedReview = {
				...editingReview,
				rating: review.rating,
				title: review.title,
				text: review.text,
				name: review.name,
				email: review.email,
				images: review.images.map(file => URL.createObjectURL(file)),
				edited: true,
				editedAt: new Date().toISOString(),
				lastEditedFields: changedFields
			};

			setReviews(reviews.map(r => r.id === editingReview.id ? updatedReview : r));
			toast.success('Review updated successfully!');
		} else {
			// Add new review
			const newReview: Review = {
				id: Date.now().toString(),
				rating: review.rating,
				title: review.title,
				text: review.text,
				name: review.name,
				email: review.email,
				date: new Date().toISOString().split('T')[0],
				helpful: 0,
				images: review.images.map(file => URL.createObjectURL(file))
			};
			setReviews([newReview, ...reviews]);
			toast.success('Review submitted successfully!');
		}
		setEditingReview(null);
	};

	const handleHelpful = (reviewId: string) => {
		setReviews(reviews.map(review => 
			review.id === reviewId 
				? { ...review, helpful: review.helpful + 1 }
				: review
		));
	};

	const sortedAndFilteredReviews = reviews
		.filter(review => !reviewFilter || review.rating === reviewFilter)
		.sort((a, b) => {
			if (reviewSort === 'latest') return new Date(b.date).getTime() - new Date(a.date).getTime();
			if (reviewSort === 'highest') return b.rating - a.rating;
			return a.rating - b.rating;
		});

	const handleAddToCart = () => {
		if (!selectedSize) {
			toast.error('Please select a size');
			return;
		}

		const cartItem = {
			id: product._id,
			name: product.name,
			price: product.discountPercent 
				? product.price * (1 - product.discountPercent / 100)
				: product.price,
			image: urlFor(product.images?.[0] || product.image).url(),
			size: selectedSize,
			color: selectedColor,
			quantity,
			maxStock: product.stock || 100
		};

		addItem(cartItem);
		toast.success('Added to cart!');
	};

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
					<p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
					<Link href="/shop" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900">
						Continue Shopping
					</Link>
				</div>
			</div>
		);
	}

	const breadcrumbs = [
		{ name: 'Home', href: '/' },
		{ name: 'Shop', href: '/shop' },
		{ name: product.category, href: `/shop?category=${product.category}` },
		{ name: product.name, href: '#' },
	];

	const handleQuantityChange = (type: 'increase' | 'decrease') => {
		if (type === 'increase') {
			setQuantity(prev => prev + 1);
		} else if (type === 'decrease' && quantity > 1) {
			setQuantity(prev => prev - 1);
		}
	};

	return (
		<div className="bg-white">
			{/* Breadcrumb */}
			<nav className="max-w-[1440px] mx-auto px-2 py-3">
				<ol className="flex items-center space-x-2 text-sm">
					{breadcrumbs.map((item, index) => (
						<li key={item.name} className="flex items-center text-gray-500">
							{index > 0 && <span className="mx-2 text-gray-400">/</span>}
							{item.href === '#' ? (
								<span>{item.name}</span>
							) : (
								<Link href={item.href} className="hover:text-black">
									{item.name}
								</Link>
							)}
						</li>
					))}
				</ol>
			</nav>

			<div className="mx-auto max-w-[1440px] px-2">
				{/* Product Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
					{/* Image Gallery */}
					<div className="space-y-4">

						<div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-lg">
							<Image
								src={urlFor(product.images?.[selectedImage] || product.image).url()}
								alt={product.name}
								className="object-cover"
								fill
								priority
							/>
						</div>
						<div className="grid grid-cols-4 gap-4">
							{(product.images?.length ? product.images : [product.image]).map((image, index) => (
								<button
									key={index}
									onClick={() => setSelectedImage(index)}
									className={classNames(
										'relative h-24 cursor-pointer overflow-hidden rounded-lg',
										selectedImage === index ? 'ring-2 ring-black' : 'ring-1 ring-gray-200'
									)}
								>
									<Image
										src={urlFor(image).url()}
										alt={product.name}
										className="object-cover"
										fill
									/>
								</button>
							))}
						</div>
					</div>

					  {/* Product Details */}
					  <div className="lg:py-8">
						<h1 className="text-[40px] font-bold text-black mb-4">{product.name}</h1>
						
						{/* Rating */}
						<div className="flex items-center gap-4 mb-6">
							<div className="flex items-center gap-2">
								<RatingStars rating={product.rating || 0} size="lg" />
								<span className="text-lg font-medium">{(product.rating || 0).toFixed(1)}</span>
							</div>
							<div className="h-6 w-px bg-gray-200" />
							<button
								onClick={() => {
									setActiveTab('Rating & Reviews');
									document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' });
								}}
								className="text-sm text-gray-600 hover:text-black"
							>
								{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
							</button>
						</div>

						{/* Price and Discount Section */}
						<div className="flex items-center gap-4 mb-8">
							{product.discountPercent ? (
								<>
									<div className="flex flex-col">
										<div className="flex items-center gap-3">
											<span className="text-[32px] font-bold text-black">
												${(product.price * (1 - product.discountPercent / 100)).toFixed(2)}
											</span>
											<span className="text-[20px] text-gray-500 line-through">
												${product.price}
											</span>
										</div>
										<div className="flex items-center gap-2 mt-1">
											<span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
												{product.discountPercent}% OFF
											</span>
											<span className="text-sm text-gray-600">
												Save ${(product.price * (product.discountPercent / 100)).toFixed(2)}
											</span>
										</div>
									</div>
								</>
							) : (
								<span className="text-[32px] font-bold">${product.price}</span>
							)}
						</div>

						<p className="text-gray-600 mb-8">{product.description}</p>

						{/* Color Selection */}
						{product.colors && product.colors.length > 0 && (
						  <div className="mb-8">
							<h3 className="text-base font-semibold mb-4">Select Colors</h3>
							<div className="flex gap-3">
							  {product.colors.map((color) => (
								<button
								  key={color}
								  onClick={() => setSelectedColor(color)}
								  className={classNames(
									'w-8 h-8 rounded-full border-2',
									selectedColor === color ? 'border-black' : 'border-transparent'
								  )}
								  style={{ backgroundColor: color.toLowerCase() }}
								/>
							  ))}
							</div>
						  </div>
						)}

						{/* Size Selection */}
						{product.sizes && product.sizes.length > 0 && (
						  <div className="mb-8">
							<h3 className="text-base font-semibold mb-4">Choose Size</h3>
							<div className="flex gap-3">
							  {product.sizes.map((size) => (
								<button
								  key={size}
								  onClick={() => setSelectedSize(size)}
								  className={classNames(
									'px-6 py-2.5 rounded-full text-sm font-medium transition-colors',
									selectedSize === size
									  ? 'bg-black text-white'
									  : 'bg-[#F0F0F0] text-black hover:bg-[#E8E8E8]'
								  )}
								>
								  {size}
								</button>
							  ))}
							</div>
						  </div>
						)}

						{/* Quantity and Add to Cart */}
						<div className="flex gap-4 mb-8">
						  <div className="flex items-center border rounded-full">
							<button
							  onClick={() => handleQuantityChange('decrease')}
							  className="p-3 hover:bg-[#F0F0F0] rounded-l-full transition-colors"
							>
							  <MinusIcon className="h-4 w-4" />
							</button>
							<span className="w-12 text-center font-medium">{quantity}</span>
							<button
							  onClick={() => handleQuantityChange('increase')}
							  className="p-3 hover:bg-[#F0F0F0] rounded-r-full transition-colors"
							>
							  <PlusIcon className="h-4 w-4" />
							</button>
						  </div>
						  <button 
							onClick={handleAddToCart}
							className="flex-1 bg-black text-white py-3 px-6 rounded-full hover:bg-gray-900 transition-colors"
						  >
							Add to Cart
						  </button>
						</div>

						  </div>

						  {/* Product Details */}
						  <div className="lg:py-8">
							{/* Keep existing product details content */}
						  </div>
						</div>

						{/* Tabs Section */}
						<div className="border-t">
						  <div className="flex justify-center gap-6 border-b max-w-[1200px] mx-auto">
							{['Product Details', 'Rating & Reviews', 'FAQs'].map((tab) => (
							  <button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={classNames(
								  'py-3 px-4 text-base font-medium border-b-2 -mb-px transition-colors text-center',
								  activeTab === tab
									? 'border-black text-black'
									: 'border-transparent text-[#666666] hover:text-black'
								)}
							  >
								{tab}
							  </button>
							))}
						  </div>

						  <div className="py-6">
							{activeTab === 'Rating & Reviews' && (
								<div id="reviews-section" className="max-w-[1200px] mx-auto px-2 sm:px-4">
									{/* Reviews header with responsive layout */}
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8">
										<div>
											<h3 className="text-xl sm:text-2xl font-bold">Customer Reviews ({reviews.length})</h3>
											<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4">
												<div className="flex flex-wrap gap-2">
													{[5,4,3,2,1].map(rating => (
														<button
															key={rating}
															onClick={() => setReviewFilter(reviewFilter === rating ? null : rating)}
															className={`flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm transition-colors ${
																reviewFilter === rating 
																	? 'bg-black text-white' 
																	: 'bg-gray-50 hover:bg-gray-100'
															}`}
														>
															<RatingStars rating={rating} size="sm" />
															<span className="ml-1">({
																reviews.filter(review => Math.floor(review.rating) === rating).length
															})</span>
														</button>
													))}
												</div>
												<select
													value={reviewSort}
													onChange={(e) => setReviewSort(e.target.value as typeof reviewSort)}
													className="w-full sm:w-auto px-4 py-2 border rounded-full text-sm"
												>
													<option value="latest">Latest</option>
													<option value="highest">Highest Rated</option>
													<option value="lowest">Lowest Rated</option>
												</select>
											</div>
										</div>
										<button
											onClick={() => setShowReviewForm(true)}
											className="w-full sm:w-auto px-6 py-2.5 bg-black text-white rounded-full hover:bg-gray-900 text-sm font-medium"
										>
											Write a Review
										</button>
									</div>

									{/* Review cards with responsive layout */}
									<div className="space-y-6 sm:space-y-8">
										{sortedAndFilteredReviews.map((review) => (
											<div key={review.id} className="border-b pb-6 sm:pb-8">
												<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
													<div>
														<div className="flex items-center gap-2 flex-wrap">
															<h4 className="font-medium">{review.name}</h4>
															{review.edited && (
																<span className="text-xs text-gray-500">
																	(edited {new Date(review.editedAt!).toLocaleDateString()})
																</span>
															)}
														</div>
														<div className="flex items-center gap-2 mt-1">
															<RatingStars rating={review.rating} size="sm" />
															<span className="text-sm text-gray-500">
																{new Date(review.date).toLocaleDateString()}
															</span>
														</div>
													</div>
													<div className="flex flex-wrap items-center gap-2">
														{reviewDrafts[review.id] && (
															<span className="text-xs sm:text-sm text-yellow-600">
																Draft saved {new Date(reviewDrafts[review.id].lastSaved).toLocaleString()}
															</span>
														)}
														<div className="flex flex-wrap gap-2">
															{reviewHistories[review.id]?.changes.length > 0 && (
																<>
																	<button
																		onClick={() => setShowVersionComparison(showVersionComparison === review.id ? null : review.id)}
																		className="px-3 py-1.5 text-sm text-gray-500 hover:text-black"
																	>
																		Compare
																	</button>
																	<button
																		onClick={() => handleUndoEdit(review.id)}
																		className="px-3 py-1.5 text-sm text-gray-500 hover:text-black"
																	>
																		Undo
																	</button>
																</>
															)}
															<button
																onClick={() => handleEditReview(review)}
																className="px-3 py-1.5 text-sm border rounded-full hover:bg-gray-50"
															>
																Edit
															</button>
															<button
																onClick={() => handleDeleteReview(review.id)}
																className="px-3 py-1.5 text-sm border border-red-200 text-red-500 rounded-full hover:bg-red-50"
															>
																Delete
															</button>
														</div>
													</div>
												</div>

												{/* Version comparison with responsive layout */}
												{showVersionComparison === review.id && (
													<div className="mt-4 bg-gray-50 p-4 rounded-lg">
														<h5 className="font-medium mb-4">Version Comparison</h5>
														<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
															<div>
																<h6 className="font-medium mb-2">Current Version</h6>
																<div className="bg-white p-4 rounded border">
																	<div className="flex items-center gap-2 mb-2">
																		<RatingStars rating={review.rating} size="sm" />
																		<span className="text-sm text-gray-500">{review.rating.toFixed(1)}</span>
																	</div>
																	{review.title && <p className="font-medium mb-2">{review.title}</p>}
																	<p className="text-gray-600 text-sm">{review.text}</p>
																</div>
															</div>
															<div className="mt-4 sm:mt-0">
																<h6 className="font-medium mb-2">Previous Version</h6>
																{reviewHistories[review.id]?.changes.length > 0 && (
																	<div className="bg-white p-4 rounded border">
																		<div className="flex items-center gap-2 mb-2">
																			<RatingStars 
																				rating={reviewHistories[review.id].changes[0].previousValues.rating} 
																				size="sm" 
																			/>
																			<span className="text-sm text-gray-500">
																				{reviewHistories[review.id].changes[0].previousValues.rating.toFixed(1)}
																			</span>
																		</div>
																		{reviewHistories[review.id].changes[0].previousValues.title && (
																			<p className="font-medium mb-2">
																				{reviewHistories[review.id].changes[0].previousValues.title}
																			</p>
																		)}
																		<p className="text-gray-600 text-sm">
																			{reviewHistories[review.id].changes[0].previousValues.text}
																		</p>
																	</div>
																)}
															</div>
														</div>
													</div>
												)}

												{/* Review content with responsive layout */}
												{review.title && (
													<h5 className="font-medium mb-2 mt-4">{review.title}</h5>
												)}
												<p className="text-gray-600 text-sm sm:text-base mb-4">{review.text}</p>
												{review.images && review.images.length > 0 && (
													<div className="flex flex-wrap gap-3 mb-4">
														{review.images.map((image, index) => (
															<div key={index} className="relative h-16 w-16 sm:h-20 sm:w-20">
																<Image
																	src={image}
																	alt={`Review image ${index + 1}`}
																	fill
																	className="object-cover rounded"
																/>
															</div>
														))}
													</div>
												)}
												<button
													onClick={() => handleHelpful(review.id)}
													className="text-sm text-gray-500 hover:text-black flex items-center gap-1"
												>
													<span>Helpful</span>
													<span className="text-xs">({review.helpful})</span>
												</button>
											</div>
										))}
									</div>


									{reviews.length === 0 && (
										<div className="text-center py-8">
											<p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
										</div>
									)}
								</div>
							)}
							{activeTab === 'Product Details' && (
                <div className="max-w-[1200px] mx-auto px-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                      <div className="prose max-w-none">
                        <p className="text-gray-600">{product.description}</p>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="p-1 bg-black rounded-full mt-1">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>Premium quality {product.category.toLowerCase()} material</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="p-1 bg-black rounded-full mt-1">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>Carefully crafted design details</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="p-1 bg-black rounded-full mt-1">
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            <span>Perfect fit with size-specific measurements</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                          <span className="text-gray-600">Material</span>
                          <span className="font-medium">{product.material || 'Premium Fabric'}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                          <span className="text-gray-600">Available Colors</span>
                          <span className="font-medium">{product.colors?.join(', ') || 'Multiple options'}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                          <span className="text-gray-600">Size Range</span>
                          <span className="font-medium">{product.sizes?.join(', ') || 'Standard sizing'}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                          <span className="text-gray-600">Care Instructions</span>
                          <span className="font-medium">Machine washable, follow label instructions</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-b pb-3">
                          <span className="text-gray-600">Style</span>
                          <span className="font-medium">{product.style || 'Contemporary'}</span>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4m8-8v16" />
                            </svg>
                            <div>
                              <p className="font-medium">Free Standard Shipping</p>
                              <p className="text-sm text-gray-600">3-5 business days</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3" />
                            </svg>
                            <div>
                              <p className="font-medium">Easy Returns</p>
                              <p className="text-sm text-gray-600">30-day return window</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
							)}
							{activeTab === 'FAQs' && (
								<div className="max-w-[1200px] mx-auto px-2">
									<FAQs />
								</div>
							)}
						</div>
					</div>

					<RelatedProducts
						currentProduct={product}
						relatedProducts={relatedProducts.filter(p => p._id !== product._id)}
					/>

					{showReviewForm && (
						<ReviewForm
							onSubmit={handleReviewSubmit}
							onClose={() => {
								if (editingReview) {
									saveDraft(editingReview.id, {
										rating: editingReview.rating,
										title: editingReview.title,
										text: editingReview.text,
										name: editingReview.name,
										email: editingReview.email || '',
										images: editingReview.images || []
									});
								}
								setShowReviewForm(false);
								setEditingReview(null);
							}}
							editReview={editingReview || undefined}
							draft={editingReview ? reviewDrafts[editingReview.id] : undefined}
						/>
					)}
				</div>
			</div>
		);
	}