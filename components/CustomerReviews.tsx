'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const reviews = [
	{
		id: 1,
		name: "Sarah M.",
		rating: 5,
		review: "I'm blown away by the quality and style of the clothes! The customer service was exceptional, and my order arrived earlier than expected.",
		verified: true
	},
	{
		id: 2,
		name: "Alex K.",
		rating: 5,
		review: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
		verified: true
	},
	{
		id: 3,
		name: "James L.",
		rating: 5,
		review: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
		verified: true
	}
];

const CustomerReviews = () => {
	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="text-[40px] font-integral text-center mb-12">OUR HAPPY CUSTOMERS</h2>
				<div className="relative">
					<Swiper
						modules={[Navigation, Pagination]}
						spaceBetween={24}
						slidesPerView={1}
						speed={800}
						navigation={{
							prevEl: '.custom-prev',
							nextEl: '.custom-next',
						}}
						pagination={{
							el: '.custom-pagination',
							clickable: true,
							bulletClass: 'custom-bullet',
							bulletActiveClass: 'custom-bullet-active',
						}}
						breakpoints={{
							640: {
								slidesPerView: 2,
								spaceBetween: 24,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 24,
							},
						}}
						className="reviews-swiper !pb-12"
					>
						{reviews.map((review) => (
							<SwiperSlide key={review.id} className="h-auto">
								<div className="bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
									<div className="flex items-center mb-4">
										{[...Array(review.rating)].map((_, index) => (
											<svg
												key={index}
												className="h-5 w-5 text-yellow-400"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
										))}
									</div>
									<p className="text-gray-600 mb-6 text-lg leading-relaxed">{review.review}</p>
									<div className="flex items-center">
										<span className="font-satoshi font-bold text-lg">{review.name}</span>
										{review.verified && (
											<svg className="w-5 h-5 ml-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
												<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
											</svg>
										)}
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="flex items-center justify-center gap-4 mt-8">
						<button className="custom-prev w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-black transition-colors">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>
						<div className="custom-pagination flex gap-2"></div>
						<button className="custom-next w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:border-black transition-colors">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CustomerReviews;
