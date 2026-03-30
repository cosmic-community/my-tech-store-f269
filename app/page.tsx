import Link from 'next/link';
import { getFeaturedProducts, getCategories, getLatestReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ReviewCard from '@/components/ReviewCard';

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getLatestReviews(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-600/10 via-accent/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
            ⚡ Premium Tech Products
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Welcome to{' '}
            <span className="gradient-text">My Tech Store</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-surface-300 max-w-2xl mx-auto">
            Discover the latest tech products, accessories, and gadgets. Quality tech at competitive prices with verified customer reviews.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-accent hover:bg-accent-dark text-surface-950 font-semibold rounded-lg transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-3 border border-surface-600 hover:border-surface-400 text-white font-semibold rounded-lg transition-colors"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {products.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Featured Products</h2>
              <p className="mt-1 text-surface-400">Our top picks for you</p>
            </div>
            <Link
              href="/products"
              className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Shop by Category</h2>
              <p className="mt-1 text-surface-400">Find exactly what you need</p>
            </div>
            <Link
              href="/categories"
              className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              All categories →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Reviews */}
      {reviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Recent Reviews</h2>
              <p className="mt-1 text-surface-400">What our customers are saying</p>
            </div>
            <Link
              href="/reviews"
              className="text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              All reviews →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct />
            ))}
          </div>
        </section>
      )}
    </>
  );
}