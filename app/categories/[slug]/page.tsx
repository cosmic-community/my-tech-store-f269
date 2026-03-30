// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) {
    return { title: 'Category Not Found — My Tech Store' };
  }
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  return {
    title: `${name} — My Tech Store`,
    description:
      getMetafieldValue(category.metadata?.description) || `Browse ${name} products at My Tech Store.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);
  const image = category.metadata?.image;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-500 mb-8">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-accent transition-colors">
          Categories
        </Link>
        <span>/</span>
        <span className="text-surface-300">{name}</span>
      </nav>

      {/* Category header */}
      <div className="relative rounded-xl overflow-hidden border border-surface-800 mb-10">
        {image ? (
          <img
            src={`${image.imgix_url}?w=1400&h=400&fit=crop&auto=format,compress`}
            alt={name}
            width={1400}
            height={400}
            className="w-full h-48 sm:h-64 object-cover"
          />
        ) : (
          <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-brand-600/30 to-accent/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{name}</h1>
          {description && <p className="mt-2 text-surface-300 max-w-2xl">{description}</p>}
          <p className="mt-2 text-sm text-surface-400">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-surface-500 text-lg">No products in this category yet.</p>
        </div>
      )}
    </div>
  );
}