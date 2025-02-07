'use client';

import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import Link from 'next/link';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, currency, error } = useCart();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    // Validate cart data before proceeding
    if (!items || items.length === 0) {
      return;
    }

    // Ensure all required item fields are present
    const validItems = items.every(item => 
      item.id && 
      item.name && 
      typeof item.price === 'number' && 
      item.image && 
      typeof item.quantity === 'number' && 
      item.size
    );

    if (!validItems) {
      console.error('Invalid cart items:', items);
      return;
    }

    router.push('/checkout');
  };



  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your cart is empty</h1>
          <p className="mt-4 text-base text-gray-500">Continue shopping to add items to your cart.</p>
          <div className="mt-6">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
          </div>
        )}

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    width={128}
                    height={128}
                  />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                    <div className="flex justify-between">
                      <h3 className="text-sm">
                      <Link href={`/product/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                        {item.name}
                      </Link>
                      </h3>
                    </div>
                    <div className="mt-1 flex text-sm">
                      <p className="text-gray-500">Size: {item.size}</p>
                      {item.color && <p className="ml-4 text-gray-500">Color: {item.color}</p>}
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {currency} {item.price.toFixed(2)}
                    </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="flex items-center border border-gray-200 rounded-md">
                            <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-600 disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            >
                            <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-4 text-gray-900">{item.quantity}</span>
                            <button
                            type="button"
                            className="p-2 text-gray-500 hover:text-gray-600 disabled:opacity-50"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            disabled={item.maxStock ? item.quantity >= item.maxStock : false}
                            >
                            <PlusIcon className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => removeItem(item.id, item.size)}
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {currency} {getTotal().toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">Order total</dt>
                <dd className="text-base font-medium text-gray-900">
                  {currency} {getTotal().toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
                    <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="w-full rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-50"
                    >
                    Proceed to Checkout
                    </button>

            </div>
          </section>
        </form>
      </div>
    </div>
  );
}
