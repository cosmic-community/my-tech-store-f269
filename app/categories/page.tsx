import type { Metadata } from 'next';
import { getCategories } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'Categories — My Tech Store',
  description: 'Browse all product categories at My Tech Store.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Categories</h1>
        <p className="mt-2 text-surface-400">
          Browse {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'}
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-surface-500 text-lg">No categories found.</p>
          <p className="mt-2 text-surface-600 text-sm">Add categories in your Cosmic dashboard.</p>
        </div>
      )}
    </div>
  );
}