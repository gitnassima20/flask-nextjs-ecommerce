'use client';

import Link from 'next/link';
import CartButton from './CartButton';
import CartDrawer from '../cart/CartDrawer';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and main navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              E-Commerce Store
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-gray-900"
              >
                Categories
              </Link>
            </div>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            <CartButton />
            <Link
              href="/admin/products"
              className="text-gray-600 hover:text-gray-900"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
      <CartDrawer />
    </nav>
  );
}
