'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';
import ReviewForm from './ReviewForm';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import RecommendedProducts from '@/components/products/RecommendedProducts';
import { Product } from '@/lib/sanity.queries';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem, setCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState('Product Details');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState<Array<{
    id: string;
    rating: number;
    title: string;
    comment: string;
    name: string;
    date: string;
  }>>([]);
  const [editingReview, setEditingReview] = useState<{
    id: string;
    rating: number;
    title: string;
    comment: string;
    name: string;
    date: string;
  } | undefined>(undefined);

  const handleReviewSubmit = (review: {
    rating: number;
    title: string;
    comment: string;
    name: string;
    email: string;
  }) => {
    const newReview = {
      id: Math.random().toString(36).substr(2, 9),
      ...review,
      date: new Date().toLocaleDateString()
    };
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    toast.success('Review submitted successfully!');
    };

    const handleEditReview = (review: {
    rating: number;
    title: string;
    comment: string;
    name: string;
    email: string;
    }) => {
    if (editingReview) {
      const updatedReviews = reviews.map((r) =>
      r.id === editingReview.id
        ? { ...r, ...review, date: new Date().toLocaleDateString() }
        : r
      );
      setReviews(updatedReviews);
        setEditingReview(undefined);
      setShowReviewForm(false);
      toast.success('Review updated successfully!');
    }
    };

    const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter((r) => r.id !== reviewId));
      toast.success('Review deleted successfully!');
    }
    };

    const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      size: selectedSize,
      quantity,
      maxStock: product.stock || 100
    };
    
    addItem(cartItem);
    toast.success(`${product.name} added to cart!`);
    setCartOpen(true);
    };

  return (
    <div className="bg-white">
      <div className="container-custom py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <Link href="/shop" className="text-gray-500 hover:text-gray-700">
            Shop
          </Link>
          <span className="text-gray-500">/</span>
          <Link href={`/shop?category=${product.category.toLowerCase()}`} className="text-gray-500 hover:text-gray-700">
            {product.category}
          </Link>
          <span className="text-gray-500">/</span>
          <span className="font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover object-center w-full h-full"
                priority
              />
              {product.originalPrice && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={classNames(
                    'relative aspect-square overflow-hidden rounded-lg bg-gray-100',
                    selectedImage === index ? 'ring-2 ring-black' : ''
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover object-center w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product details */}
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      'h-5 w-5',
                      product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{product.rating}/5</span>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-red-500 font-medium">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-4 text-gray-600">{product.description}</p>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-medium">Available Colors</h3>
                <div className="flex items-center gap-2 mt-2">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-sm font-medium">Choose Size</h3>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={classNames(
                      'py-2 px-4 text-sm border rounded-lg',
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-black'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:border-black"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:border-black"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
              >
                Add to Cart
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
            </div>

            {/* Additional product information */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Brand:</span>
                <span className="text-sm text-gray-600">{product.brand}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Category:</span>
                <span className="text-sm text-gray-600">{product.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details, Reviews, and FAQs Section */}
      <div className="mt-24">
        {/* Product Details Tabs */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex gap-8" aria-label="Product Information">
              {['Product Details', 'Rating & Reviews', 'FAQs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-medium relative ${
                    activeTab === tab 
                      ? 'text-black border-b-2 border-black' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Product Details Content */}
          {activeTab === 'Product Details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <h3 className="text-lg font-semibold mb-4">Material & Care</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Material: {product.material}</li>
                  {product.care?.map((instruction, index) => (
                    <li key={index}>• {instruction}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Size & Fit</h3>
                <ul className="text-gray-600 space-y-2 mb-6">
                  <li>• Available sizes: {product.sizes.join(', ')}</li>
                  <li>• Regular fit</li>
                  <li>• True to size</li>
                </ul>

                <h3 className="text-lg font-semibold mb-4">Shipping & Returns</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• {product.shipping?.free ? 'Free shipping' : 'Standard shipping rates apply'}</li>
                  <li>• Estimated delivery: {product.shipping?.estimatedDays} days</li>
                  <li>• Free returns within 30 days</li>
                  <li>• See our full return policy</li>
                </ul>
              </div>
            </div>
          )}

            {/* Rating & Reviews Content */}
            {activeTab === 'Rating & Reviews' && (
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-8">
                <h2 className="text-xl font-semibold">
                All Reviews <span className="text-gray-500">({product.reviews.count + reviews.length})</span>
                </h2>
                <div className="flex items-center gap-2">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={`h-5 w-5 ${
                    rating < Math.floor(product.reviews.averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-200'
                    }`}
                  />
                  ))}
                </div>
                <span className="text-gray-700">{product.reviews.averageRating} out of 5</span>
                </div>
              </div>
              <button 
                onClick={() => setShowReviewForm(true)}
                className="bg-black text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
              >
                Write a Review
              </button>
              </div>

              {/* Review List */}
              <div className="space-y-8">
                {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-8">
                  <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <StarIcon
                      key={star}
                      className={`h-4 w-4 ${
                        star < review.rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                      />
                    ))}
                    </div>
                    <span className="text-sm text-gray-500">by {review.name}</span>
                    <span className="text-sm text-gray-500">• {review.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                    onClick={() => {
                      setEditingReview(review);
                      setShowReviewForm(true);
                    }}
                    className="text-sm text-gray-500 hover:text-black"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                    >
                    Delete
                    </button>
                  </div>
                  </div>
                  <h3 className="font-medium mb-2">{review.title}</h3>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
                ))}
              </div>

              {/* Review Form Modal */}
              {showReviewForm && (
                <ReviewForm
                onSubmit={editingReview ? handleEditReview : handleReviewSubmit}
                onClose={() => {
                  setShowReviewForm(false);
                  setEditingReview(undefined);
                }}
                editReview={editingReview}
                />
              )}
            </div>
            )}


          {/* FAQs Content */}
          {activeTab === 'FAQs' && (
            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: 'What sizes are available?',
                  answer: `This ${product.category.toLowerCase()} is available in sizes ${product.sizes.join(', ')}. Please refer to our size guide for detailed measurements to find your perfect fit.`
                },
                {
                  question: 'How long does shipping take?',
                  answer: `Standard shipping takes ${product.shipping?.estimatedDays} business days. ${
                    product.shipping?.free ? 'Shipping is free for this item.' : 'Standard shipping rates apply.'
                  }`
                },
                {
                  question: 'What is your return policy?',
                  answer: 'We offer free returns within 30 days of purchase. Items must be unworn, unwashed, and have original tags attached.'
                },
                {
                  question: 'How do I care for this product?',
                  answer: `${product.care?.join('. ')}`
                }
              ].map((faq, index) => (
                <div key={index} className="mb-6">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left font-medium text-gray-900 p-4 hover:bg-gray-50 rounded-lg"
                  >
                    <span>{faq.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="mt-2 px-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
