'use client';

import Image from 'next/image';
import Link from 'next/link';

const brands = [
  {
    id: 1,
    name: 'Versace',
    logo: '/products/images/pic 18.jpg',
    description: 'Luxury Italian fashion house known for bold prints and elegant designs.',
  },
  {
    id: 2,
    name: 'Zara',
    logo: '/products/images/pic 19.jpg',
    description: 'Contemporary fashion brand offering trendy and affordable clothing.',
  },
  {
    id: 3,
    name: 'H&M',
    logo: '/products/images/pic 20.jpg',
    description: 'Swedish fashion company known for stylish, sustainable fashion.',
  },
  {
    id: 4,
    name: 'Nike',
    logo: '/products/images/pic 21.png',
    description: 'Leading athletic wear and footwear brand.',
  },
  {
    id: 5,
    name: 'Adidas',
    logo: '/products/images/pic 20.jpg',
    description: 'Iconic sportswear brand combining performance and style.',
  },
  {
    id: 6,
    name: 'Gucci',
    logo: '/products/images/pic 22.png',
    description: 'Italian luxury brand known for contemporary creativity and craftsmanship.',
  },
];

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Our Brands</h1>
        <p className="mt-4 text-base text-gray-500">
          Discover our curated selection of premium fashion brands.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={400}
                height={400}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{brand.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{brand.description}</p>
              <Link
                href={`/shop?brand=${brand.name.toLowerCase()}`}
                className="mt-4 inline-block text-sm font-medium text-black hover:text-gray-700"
              >
                View Collection →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
