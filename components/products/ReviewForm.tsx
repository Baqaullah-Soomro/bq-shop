'use client';

import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { XMarkIcon, PhotoIcon, EyeIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import toast from 'react-hot-toast';

const validateReview = (values: {
	rating: number;
	title: string;
	text: string;
	name: string;
	email: string;
}) => {
	const errors: { [key: string]: string } = {};
	
	if (values.rating === 0) errors.rating = 'Please select a rating';
	if (!values.text.trim()) errors.text = 'Please write a review';
	if (values.text.length < 10) errors.text = 'Review must be at least 10 characters';
	if (!values.name.trim()) errors.name = 'Please enter your name';
	if (!values.email.trim()) errors.email = 'Please enter your email';
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email';
	
	return errors;
};

const validateImageFile = (file: File) => {
	const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
	const maxSize = 5 * 1024 * 1024; // 5MB
	return validTypes.includes(file.type) && file.size <= maxSize;
};

interface ReviewFormProps {
	onSubmit: (review: {
		rating: number;
		title: string;
		text: string;
		images: File[];
		name: string;
		email: string;
	}) => void;
	onClose: () => void;
	editReview?: {
		id: string;
		rating: number;
		title: string;
		text: string;
		name: string;
		email?: string;
		images?: string[];
	};
	draft?: {
		id: string;
		content: {
			rating: number;
			title: string;
			text: string;
			name: string;
			email?: string;
			images?: string[];
		};
		lastSaved: string;
	};
}

export default function ReviewForm({ onSubmit, onClose, editReview, draft }: ReviewFormProps) {
	const [formState, setFormState] = useState({
		rating: draft?.content.rating || editReview?.rating || 0,
		title: draft?.content.title || editReview?.title || '',
		text: draft?.content.text || editReview?.text || '',
		name: draft?.content.name || editReview?.name || '',
		email: draft?.content.email || editReview?.email || '',
		images: [] as File[],
		existingImages: draft?.content.images || editReview?.images || []
	});
	
	const [hoveredStar, setHoveredStar] = useState(0);
	const [autosaveTimer, setAutosaveTimer] = useState<NodeJS.Timeout | null>(null);
	const [lastSaved, setLastSaved] = useState<string | null>(draft?.lastSaved || null);
	const [hasChanges, setHasChanges] = useState(false);
	const [isPreview, setIsPreview] = useState(false);
	const [charCount, setCharCount] = useState(0);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isDirty, setIsDirty] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		setCharCount(formState.text.length);
	}, [formState.text]);

	useEffect(() => {
		if (hasChanges && editReview) {
			if (autosaveTimer) clearTimeout(autosaveTimer);
			const timer = setTimeout(() => {
				const now = new Date().toISOString();
				setLastSaved(now);
				onClose();
				setHasChanges(false);
			}, 3000);
			setAutosaveTimer(timer);
		}
		return () => {
			if (autosaveTimer) clearTimeout(autosaveTimer);
		};
	}, [formState, hasChanges, editReview, autosaveTimer, onClose]);

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (isDirty) {
				e.preventDefault();
				e.returnValue = '';
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [isDirty]);

	const handleChange = (field: string, value: any) => {
		setFormState(prev => ({ ...prev, [field]: value }));
		setIsDirty(true);
		setHasChanges(true);
		setErrors(prev => ({ ...prev, [field]: '' }));
	};

	const handleRestoreDraft = () => {
		if (draft) {
			setFormState({
				rating: draft.content.rating,
				title: draft.content.title,
				text: draft.content.text,
				name: draft.content.name,
				email: draft.content.email || '',
				images: [],
				existingImages: draft.content.images || []
			});
			toast.success('Draft restored');
		}
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(e.target.files || []);
		const totalImages = newFiles.length + formState.existingImages.length;
		
		if (totalImages > 5) {
			setErrors(prev => ({ ...prev, images: 'Maximum 5 images allowed' }));
			return;
		}

		const validFiles = newFiles.filter(file => {
			const isValid = validateImageFile(file);
			if (!isValid) {
				setErrors(prev => ({
					...prev,
					images: 'Invalid file type or size exceeds 5MB'
				}));
				return false;
			}
			return true;
		});

		setFormState(prev => ({
			...prev,
			images: [...prev.images, ...validFiles]
		}));
		setIsDirty(true);
	};

	const removeImage = (index: number, type: 'new' | 'existing') => {
		setFormState(prev => ({
			...prev,
			[type === 'new' ? 'images' : 'existingImages']: 
				prev[type === 'new' ? 'images' : 'existingImages'].filter((_, i) => i !== index)
		}));
		setIsDirty(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const validationErrors = validateReview(formState);
		
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		setIsSubmitting(true);
		try {
			await onSubmit({
				rating: formState.rating,
				title: formState.title,
				text: formState.text,
				name: formState.name,
				email: formState.email,
				images: formState.images
			});
			toast.success(editReview ? 'Review updated successfully' : 'Review submitted successfully');
			setIsDirty(false);
			onClose();
		} catch (error) {
			toast.error('Failed to submit review. Please try again.');
			setErrors({ submit: 'Failed to submit review. Please try again.' });
		} finally {
			setIsSubmitting(false);
		}
	};

	const closeWithConfirmation = () => {
		if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to close?')) {
			return;
		}
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-6">
					<div>
						<h2 className="text-2xl font-bold">
							{editReview ? 'Edit Review' : 'Write a Review'}
						</h2>
						{lastSaved && (
							<p className="text-sm text-gray-500">
								Last saved: {new Date(lastSaved).toLocaleString()}
							</p>
						)}
					</div>
					<div className="flex items-center gap-4">
						{draft && (
							<button
								onClick={handleRestoreDraft}
								className="text-sm text-blue-600 hover:text-blue-800"
							>
								Restore Draft
							</button>
						)}
						<button
							onClick={() => setIsPreview(!isPreview)}
							className="text-gray-500 hover:text-black"
							title={isPreview ? 'Edit' : 'Preview'}
						>
							{isPreview ? <PencilIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
						</button>
						<button
							onClick={closeWithConfirmation}
							className="text-gray-500 hover:text-black"
						>
							<XMarkIcon className="w-6 h-6" />
						</button>
					</div>
				</div>

				{hasChanges && (
					<div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm">
						Saving...
					</div>
				)}

				{isPreview ? (
					<div className="space-y-4">
						<div className="flex items-center gap-2">
							<div className="flex">
								{[...Array(5)].map((_, i) => (
									<StarIcon
										key={i}
										className={`h-5 w-5 ${
											i < formState.rating ? 'text-yellow-400' : 'text-gray-200'
										}`}
									/>
								))}
							</div>
							<span className="text-sm text-gray-500">{formState.rating}/5</span>
						</div>
						<div>
							<span className="text-sm text-gray-500">By {formState.name}</span>
						</div>
						{formState.title && <h3 className="font-medium text-lg">{formState.title}</h3>}
						<p className="text-gray-600 whitespace-pre-wrap">{formState.text}</p>
						<div className="flex gap-4 flex-wrap">
							{formState.existingImages.map((src, index) => (
								<div key={`existing-${index}`} className="relative h-24 w-24">
									<Image
										src={src}
										alt={`Review image ${index + 1}`}
										fill
										className="object-cover rounded"
									/>
								</div>
							))}
							{formState.images.map((file, index) => (
								<div key={`new-${index}`} className="relative h-24 w-24">
									<Image
										src={URL.createObjectURL(file)}
										alt={`New image ${index + 1}`}
										fill
										className="object-cover rounded"
									/>
								</div>
							))}
						</div>
					</div>
				) : (
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label className="block mb-2">Rating <span className="text-red-500">*</span></label>
							<div className="flex gap-2">
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										type="button"
										onMouseEnter={() => setHoveredStar(star)}
										onMouseLeave={() => setHoveredStar(0)}
										onClick={() => handleChange('rating', star)}
									>
										<StarIcon
											className={`h-8 w-8 ${
												star <= (hoveredStar || formState.rating) ? 'text-yellow-400' : 'text-gray-200'
											}`}
										/>
									</button>
								))}
							</div>
							{errors.rating && (
								<p className="text-red-500 text-sm mt-1">{errors.rating}</p>
							)}
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block mb-2">Name <span className="text-red-500">*</span></label>
								<input
									type="text"
									value={formState.name}
									onChange={(e) => handleChange('name', e.target.value)}
									className={`w-full px-4 py-2 border rounded-lg ${
										errors.name ? 'border-red-500' : ''
									}`}
									placeholder="Your name"
								/>
								{errors.name && (
									<p className="text-red-500 text-sm mt-1">{errors.name}</p>
								)}
							</div>
							<div>
								<label className="block mb-2">Email <span className="text-red-500">*</span></label>
								<input
									type="email"
									value={formState.email}
									onChange={(e) => handleChange('email', e.target.value)}
									className={`w-full px-4 py-2 border rounded-lg ${
										errors.email ? 'border-red-500' : ''
									}`}
									placeholder="Your email"
								/>
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">{errors.email}</p>
								)}
							</div>
						</div>

						<div>
							<label className="block mb-2">Title</label>
							<input
								type="text"
								value={formState.title}
								onChange={(e) => handleChange('title', e.target.value)}
								className="w-full px-4 py-2 border rounded-lg"
								placeholder="Summarize your review (optional)"
								maxLength={100}
							/>
						</div>

						<div>
							<label className="block mb-2">Review <span className="text-red-500">*</span></label>
							<textarea
								value={formState.text}
								onChange={(e) => handleChange('text', e.target.value)}
								className={`w-full px-4 py-2 border rounded-lg h-32 ${
									errors.text ? 'border-red-500' : ''
								}`}
								placeholder="Write your review here..."
								maxLength={1000}
							/>
							<div className="flex justify-between mt-1">
								{errors.text && (
									<p className="text-red-500 text-sm">{errors.text}</p>
								)}
								<div className={`text-sm ${charCount > 900 ? 'text-red-500' : 'text-gray-500'}`}>
									{charCount}/1000
								</div>
							</div>
						</div>

						<div>
							<label className="block mb-2">Images (Optional, max 5)</label>
							<div className="mt-2 flex flex-wrap gap-4">
								{formState.existingImages.map((src, index) => (
									<div key={`existing-${index}`} className="relative group">
										<div className="relative h-24 w-24">
											<Image
												src={src}
												alt={`Existing image ${index + 1}`}
												fill
												className="object-cover rounded"
											/>
										</div>
										<button
											type="button"
											onClick={() => removeImage(index, 'existing')}
											className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<XMarkIcon className="w-4 h-4" />
										</button>
									</div>
								))}
								{formState.images.map((file, index) => (
									<div key={`new-${index}`} className="relative group">
										<div className="relative h-24 w-24">
											<Image
												src={URL.createObjectURL(file)}
												alt={`New image ${index + 1}`}
												fill
												className="object-cover rounded"
											/>
										</div>
										<button
											type="button"
											onClick={() => removeImage(index, 'new')}
											className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<XMarkIcon className="w-4 h-4" />
										</button>
									</div>
								))}
								{formState.existingImages.length + formState.images.length < 5 && (
									<label className="h-24 w-24 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer hover:border-gray-400">
										<PhotoIcon className="w-8 h-8 text-gray-400" />
										<input
											type="file"
											className="hidden"
											accept="image/jpeg,image/png,image/webp"
											multiple
											onChange={handleImageUpload}
										/>
									</label>
								)}
							</div>
							{errors.images && (
								<p className="text-red-500 text-sm mt-1">{errors.images}</p>
							)}
						</div>

						<div className="flex gap-4 pt-4">
							<button
								type="submit"
								disabled={isSubmitting}
								className={`flex-1 bg-black text-white py-3 px-6 rounded-full transition-colors ${
									isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'
								}`}
							>
								{isSubmitting ? 'Submitting...' : editReview ? 'Update Review' : 'Submit Review'}
							</button>
							<button
								type="button"
								onClick={closeWithConfirmation}
								className="flex-1 border py-3 px-6 rounded-full hover:bg-gray-50"
							>
								Cancel
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
