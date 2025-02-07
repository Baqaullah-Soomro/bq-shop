'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const Footer = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = (href: string) => {
    router.push(href);
  };


  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setEmail('');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#F2F0F1] text-white">
      <Toaster position="top-center" />
      {/* Newsletter Section */}
      <div className="container-custom py-8 sm:py-12 lg:py-16">
        <div className="bg-black rounded-[20px] p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
          <h3 className="font-integral text-[28px] sm:text-[32px] lg:text-[40px] leading-tight text-center md:text-left">
            STAY UPTO DATE ABOUT<br className="hidden sm:block" /> OUR LATEST OFFERS
          </h3>
                <div className="flex-1 max-w-md w-full">
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white rounded-full py-3 sm:py-4 pl-4 sm:pl-6 pr-[120px] sm:pr-[180px] text-black text-sm sm:text-base"
                  required
                  />
                  <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white text-sm sm:text-base rounded-full px-3 sm:px-6 py-1.5 sm:py-2 border border-white hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                  {isLoading ? 'Subscribing...' : (
                    <>
                    Subscribe
                    <span className="hidden sm:inline"> to Newsletter</span>
                    </>
                  )}
                  </button>
                </form>
                </div>
        </div>
      </div>

        {/* Main Footer */}
        <div className="container-custom pb-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand Column - full width on mobile */}
          <div className="col-span-2 md:col-span-2">
            <div onClick={() => navigate('/')} className="block mb-4 cursor-pointer">
              <h2 className="font-integral text-[32px] text-black">SHOP.CO</h2>
            </div>
          <p className="text-gray-400 mb-6">
            We have clothes that suits your style and<br />which you're proud to wear. From<br />women to men.
          </p>
            <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Image src="/icons/xTwitter.svg" alt="Twitter" width={24} height={24} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Image src="/icons/facebook.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <Image src="/icons/github.svg" alt="Github" width={24} height={24} />
            </a>
            </div>
          </div>

          {/* Company Column */}
          <div>
          <h4 className="font-bold text-black mb-4">COMPANY</h4>
            <ul className="space-y-3 text-gray-400">
            <li onClick={() => navigate('/about')} className="hover:text-black cursor-pointer transition-colors">About</li>
            <li onClick={() => navigate('/features')} className="hover:text-black cursor-pointer transition-colors">Features</li>
            <li onClick={() => navigate('/works')} className="hover:text-black cursor-pointer transition-colors">Works</li>
            <li onClick={() => navigate('/career')} className="hover:text-black cursor-pointer transition-colors">Career</li>
            </ul>
          </div>

          {/* Help Column */}
          <div>
          <h4 className="font-bold text-black mb-4">HELP</h4>
            <ul className="space-y-3 text-gray-400">
            <li onClick={() => navigate('/support')} className="hover:text-black cursor-pointer transition-colors">Customer Support</li>
            <li onClick={() => navigate('/delivery')} className="hover:text-black cursor-pointer transition-colors">Delivery Details</li>
            <li onClick={() => navigate('/terms')} className="hover:text-black cursor-pointer transition-colors">Terms & Conditions</li>
            <li onClick={() => navigate('/privacy')} className="hover:text-black cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>

          {/* FAQ Column */}
          <div>
          <h4 className="font-bold text-black mb-4">FAQ</h4>
            <ul className="space-y-3 text-gray-400">
            <li onClick={() => navigate('/account')} className="hover:text-black cursor-pointer transition-colors">Account</li>
            <li onClick={() => navigate('/deliveries')} className="hover:text-black cursor-pointer transition-colors">Manage Deliveries</li>
            <li onClick={() => navigate('/orders')} className="hover:text-black cursor-pointer transition-colors">Orders</li>
            <li onClick={() => navigate('/payments')} className="hover:text-black cursor-pointer transition-colors">Payments</li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
          <h4 className="font-bold text-black mb-4">RESOURCES</h4>
            <ul className="space-y-3 text-gray-400">
            <li onClick={() => navigate('/ebooks')} className="hover:text-black cursor-pointer transition-colors">Free eBooks</li>
            <li onClick={() => navigate('/tutorial')} className="hover:text-black cursor-pointer transition-colors">Development Tutorial</li>
            <li onClick={() => navigate('/blog')} className="hover:text-black cursor-pointer transition-colors">How to - Blog</li>
            <li onClick={() => navigate('/youtube')} className="hover:text-black cursor-pointer transition-colors">Youtube Playlist</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">Shop.co {new Date().getFullYear()} All Rights Reserved</p>
          <div className="flex gap-3">
            <Image src="/icons/visa.svg" alt="Visa" width={32} height={20} />
            <Image src="/icons/mastercard.svg" alt="Mastercard" width={32} height={20} />
            <Image src="/icons/paypal.svg" alt="PayPal" width={32} height={20} />
            <Image src="/icons/applepay.svg" alt="Apple Pay" width={32} height={20} />
            <Image src="/icons/googlepay.svg" alt="Google Pay" width={32} height={20} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
