'use client';

import Image from 'next/image'
import Link from 'next/link'
import CustomerReviews from '@/components/CustomerReviews'
import ProductGrid from '@/components/products/ProductGrid';
import { getProducts } from '@/lib/sanity.queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';



export default async function Home() {
  const products = await getProducts();
  // Get all new products and take exactly 4
  const newArrivals = products
    .filter(p => p.new === true)
    .slice(0, 4);
  // Get 4 products for top selling
  const topSelling = products.slice(0, 4);

  // If we don't have enough new products, fill with regular products
  if (newArrivals.length < 4) {
    const regularProducts = products
      .filter(p => !p.new)
      .slice(0, 4 - newArrivals.length);
    newArrivals.push(...regularProducts);
  }



  return (
    <main className="flex min-h-screen flex-col antialiased">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-6 xl:gap-8 items-center">
            <div className="relative z-10 px-4 sm:px-6 lg:px-0">
            {/* Star decoration top right */}
            <div className="absolute -top-8 sm:-top-10 right-0 animate-pulse">
              <Image 
              src="/icons/small-star.svg" 
              alt="Decorative star" 
              width={32}
              height={32}
              className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[40px] md:h-[40px]"
              />
            </div>
            
            <h1 className="hero-heading">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p className="hero-description">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <Link href="/shop" className="hero-button">
              Shop Now
            </Link>
            
            {/* Star decoration bottom left */}
            <div className="absolute -bottom-8 sm:-bottom-10 left-0 animate-pulse delay-75">
              <Image 
              src="/icons/big-star.svg" 
              alt="Decorative star" 
              width={32}
              height={32}
              className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[40px] md:h-[40px]"
              />
            </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0 -mb-16">
              <div className="relative w-full aspect-[3/4] sm:aspect-[3/4] md:aspect-[3/4] lg:aspect-[3/4] xl:aspect-[3/4] overflow-hidden rounded-lg">
              <Image
                src="/products/images/header-homepage.png"
                alt="Fashion models wearing stylish outfits"
                fill
                className="object-cover h-[100%] bottom-0 -m-0 w-full"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                quality={100}
              />
              </div>
              {/* Star decoration top right */}
              <div className="absolute -top-8 sm:-top-10 right-4 animate-pulse delay-150 z-10">
              <Image 
                src="/icons/big-star.svg" 
                alt="Decorative star" 
                width={32}
                height={32}
                className="w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] md:w-[40px] md:h-[40px]"
              />
              </div>
            </div>
          </div>
          </div>
        </section>



      {/* Brands Section */}
      <section className="bg-black py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            <Image 
              src="/icons/versace-logo.svg" 
              alt="Versace" 
              width={140}
              height={40}
              className="brightness-0 invert"
            />
            <Image 
              src="/icons/zara-logo.svg" 
              alt="Zara" 
              width={140}
              height={40}
              className="brightness-0 invert"
            />
            <Image 
              src="/icons/gucci-logo.svg" 
              alt="Gucci" 
              width={140}
              height={40}
              className="brightness-0 invert"
            />
            <Image 
              src="/icons/prada-logo.svg" 
              alt="Prada" 
              width={140}
              height={40}
              className="brightness-0 invert"
            />
            <Image 
              src="/icons/calvin-klein-logo.svg" 
              alt="Calvin Klein" 
              width={140}
              height={40}
              className="brightness-0 invert"
            />
          </div>
        </div>
      </section>

        {/* New Arrivals Section */}
        <ProductGrid
        title="NEW ARRIVALS"
        products={newArrivals}
        viewAllLink="/new-arrivals"
        />

        {/* Top Selling Section */}
        <ProductGrid
        title="TOP SELLING"
        products={topSelling}
        viewAllLink="/shop"
        />


      {/* Browse by Dress Style Section */}
      <section className="py-8 sm:py-12 lg:py-[60px] bg-[#F2F0F1]">
        <div className="container-custom">
          <h2 className="font-integral text-[32px] sm:text-[40px] lg:text-[48px] text-center mb-6 sm:mb-8 lg:mb-[48px] px-4">
            BROWSE BY DRESS STYLE
          </h2>
          
          <div className="bg-white rounded-[20px] p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Casual Card */}
                <div className="relative bg-white rounded-[20px] overflow-hidden">
                  <Link href="/category/casual" className="block">
                    <div className="relative h-[200px] sm:h-[220px] lg:h-[260px]">
                      <Image
                        src="/products/images/dress-style-1.png"
                        alt="Casual Style"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6">
                        <span className="font-satoshi text-[24px] sm:text-[28px] lg:text-[32px] font-bold">Casual</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Party Card */}
                <div className="relative bg-white rounded-[20px] overflow-hidden">
                  <Link href="/category/party" className="block">
                    <div className="relative h-[200px] sm:h-[220px] lg:h-[260px]">
                      <Image
                        src="/products/images/dress-style-2.png"
                        alt="Party Style"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6">
                        <span className="font-satoshi text-[24px] sm:text-[28px] lg:text-[32px] font-bold">Party</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Formal Card */}
                <div className="relative bg-white rounded-[20px] overflow-hidden">
                  <Link href="/category/formal" className="block">
                    <div className="relative h-[200px] sm:h-[220px] lg:h-[260px]">
                      <Image
                        src="/products/images/dress-style-3.png"
                        alt="Formal Style"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6">
                        <span className="font-satoshi text-[24px] sm:text-[28px] lg:text-[32px] font-bold">Formal</span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Gym Card */}
                <div className="relative bg-white rounded-[20px] overflow-hidden">
                  <Link href="/category/gym" className="block">
                    <div className="relative h-[200px] sm:h-[220px] lg:h-[260px]">
                      <Image
                        src="/products/images/dress-style-4.png"
                        alt="Gym Style"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6">
                        <span className="font-satoshi text-[24px] sm:text-[28px] lg:text-[32px] font-bold">Gym</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        <section className="customer-reviews">
          <div className="container-custom">
          <CustomerReviews />
          </div>
        </section>


    </main>
  )
}
