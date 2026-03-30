import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'All Products — My Tech Store',
  description: 'Browse our complete catalog of tech products, accessories, and gadgets.',
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">All Products</h1>
        <p className="mt-2 text-surface-400">
          {products.length} product{products.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-surface-500 text-lg">No products found.</p>
          <p className="mt-2 text-surface-600 text-sm">Add products in your Cosmic dashboard to get started.</p>
        </div>
      )}
    </div>
  );
}