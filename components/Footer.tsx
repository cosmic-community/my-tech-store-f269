import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-surface-800 bg-surface-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚡</span>
              <span className="text-lg font-bold text-white">My Tech Store</span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed">
              Your destination for premium tech products, accessories, and gadgets at competitive prices.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-surface-400 hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-surface-400 hover:text-accent transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-surface-400 hover:text-accent transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">About</h3>
            <p className="text-sm text-surface-400 leading-relaxed">
              Built with Next.js and powered by Cosmic CMS. Content is fully manageable from the Cosmic dashboard.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-800 text-center">
          <p className="text-xs text-surface-500">
            &copy; {new Date().getFullYear()} My Tech Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}