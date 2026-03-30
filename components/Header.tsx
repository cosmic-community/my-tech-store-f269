import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-800 bg-surface-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-white group-hover:text-accent transition-colors">
              My Tech Store
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-surface-300 hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-surface-300 hover:text-accent transition-colors"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium text-surface-300 hover:text-accent transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/reviews"
              className="text-sm font-medium text-surface-300 hover:text-accent transition-colors"
            >
              Reviews
            </Link>
          </nav>

          {/* Mobile nav */}
          <nav className="flex sm:hidden items-center gap-4">
            <Link href="/products" className="text-sm text-surface-300 hover:text-accent transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-sm text-surface-300 hover:text-accent transition-colors">
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}