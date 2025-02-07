'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import PriceRangeFilter from './PriceRangeFilter';

export interface FilterState {
  categories: string[];
  colors: string[];
  sizes: string[];
  dressStyle: string[];
  priceRange: {
    min: number;
    max: number;
  };
}

export const initialFilters: FilterState = {
  categories: [],
  colors: [],
  sizes: [],
  dressStyle: [],
  priceRange: {
    min: 50,
    max: 200
  }
};

export const categories = [
  { name: 'T-Shirts', value: 'tshirt' },
  { name: 'Shorts', value: 'short' },
  { name: 'Shirts', value: 'shirt' },
  { name: 'Hoodies', value: 'hoodie' },
  { name: 'Jeans', value: 'jeans' }
];
export const colors = [
  { name: 'White', value: 'bg-white' },
  { name: 'Black', value: 'bg-black' },
  { name: 'Navy', value: 'bg-blue-900' },
  { name: 'Gray', value: 'bg-gray-500' },
  { name: 'Beige', value: 'bg-[#F5F5DC]' },
  { name: 'Brown', value: 'bg-[#964B00]' },
  { name: 'Burgundy', value: 'bg-[#800020]' },
  { name: 'Olive', value: 'bg-[#808000]' },
  { name: 'Khaki', value: 'bg-[#C3B091]' },
  { name: 'Charcoal', value: 'bg-gray-800' },
  { name: 'Cream', value: 'bg-[#FFFDD0]' },
  { name: 'Denim', value: 'bg-blue-700' }
];
export const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
export const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
}

const getSizeDescription = (size: string) => {
  switch (size) {
    case 'XX-Small':
      return 'Fits chest size 30-32 inches';
    case 'X-Small':
      return 'Fits chest size 34-36 inches';
    case 'Small':
      return 'Fits chest size 38-40 inches';
    case 'Medium':
      return 'Fits chest size 42-44 inches';
    case 'Large':
      return 'Fits chest size 46-48 inches';
    case 'X-Large':
      return 'Fits chest size 50-52 inches';
    case 'XX-Large':
      return 'Fits chest size 54-56 inches';
    case '3X-Large':
      return 'Fits chest size 58-60 inches';
    case '4X-Large':
      return 'Fits chest size 62-64 inches';
    default:
      return '';
  }
};

const formatSize = (size: string) => {
  switch (size) {
    case 'XX-Small':
      return 'XXS';
    case 'X-Small':
      return 'XS';
    case 'X-Large':
      return 'XL';
    case 'XX-Large':
      return 'XXL';
    case '3X-Large':
      return '3XL';
    case '4X-Large':
      return '4XL';
    default:
      return size;
  }
};

export default function ProductFilters({ onFilterChange, mobileFiltersOpen, setMobileFiltersOpen }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const handlePriceChange = (priceRange: { min: number; max: number }) => {
    const newFilters = {
      ...filters,
      priceRange
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFilterChange = (type: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [type]: type !== 'priceRange' && Array.isArray(filters[type])
        ? (filters[type] as string[]).includes(value)
          ? (filters[type] as string[]).filter(item => item !== value)
          : [...(filters[type] as string[]), value]
        : filters[type]
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const filtersContent = (
    <div className="space-y-6">
      <div className="border-b pb-6">
        <PriceRangeFilter
          min={initialFilters.priceRange.min}
          max={initialFilters.priceRange.max}
          onChange={handlePriceChange}
        />
      </div>

      {/* Categories */}
      <div className="border-b pb-6">
        <h3 className="text-sm font-medium text-gray-900">Categories</h3>
        <div className="mt-4 space-y-4">
            {categories.map((category) => (
            <label key={category.value} className="flex items-center">
              <input
              type="checkbox"
              checked={filters.categories.includes(category.value)}
              onChange={() => handleFilterChange('categories', category.value)}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-3 text-sm text-gray-600">{category.name}</span>
            </label>
            ))}
        </div>
      </div>

      {/* Colors */}
      <div className="border-b pb-6">
        <h3 className="text-sm font-medium text-gray-900">Colors</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleFilterChange('colors', color.name)}
              className={`w-8 h-8 rounded-full border-2 ${color.value} ${
                filters.colors.includes(color.name)
                  ? 'border-black ring-2 ring-black ring-offset-1'
                  : 'border-gray-200'
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="border-b pb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-900">Size</h3>
          <button
            onClick={() => window.open('/size-guide', '_blank')}
            className="text-xs text-gray-600 hover:text-black underline"
          >
            Size Guide
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {sizes.map((size) => {
            const sizeInfo = getSizeDescription(size);
            return (
              <button
                key={size}
                onClick={() => handleFilterChange('sizes', size)}
                className={`px-3 py-2 text-sm rounded-lg border relative group ${
                  filters.sizes.includes(size)
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                title={sizeInfo}
              >
                <span>{formatSize(size)}</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {sizeInfo}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dress Style */}
      <div className="border-b pb-6">
        <h3 className="text-sm font-medium text-gray-900">Dress Style</h3>
        <div className="mt-4 space-y-4">
          {dressStyles.map((style) => (
            <label key={style} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.dressStyle.includes(style)}
                onChange={() => handleFilterChange('dressStyle', style)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-3 text-sm text-gray-600">{style}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => onFilterChange(filters)}
        className="mt-6 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4 px-4">
                  {filtersContent}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop filter section */}
      <div className="hidden lg:block">
        {filtersContent}
      </div>
    </>
  );
}
