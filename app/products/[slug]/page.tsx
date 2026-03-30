// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import InventoryBadge from '@/components/InventoryBadge';
import ReviewCard from '@/components/ReviewCard';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return { title: 'Product Not Found — My Tech Store' };
  }
  return {
    title: `${product.title} — My Tech Store`,
    description: getMetafieldValue(product.metadata?.description) || `Shop ${product.title} at My Tech Store.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);

  const price = product.metadata?.price;
  const salePrice = product.metadata?.sale_price;
  const featuredImage = product.metadata?.featured_image;
  const gallery = product.metadata?.gallery;
  const category = product.metadata?.category;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const sku = getMetafieldValue(product.metadata?.sku);
  const description = getMetafieldValue(product.metadata?.description);

  const hasSale = salePrice && salePrice > 0 && price && salePrice < price;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
      : 0;

  // Collect all images (featured + gallery)
  const allImages = [
    ...(featuredImage ? [featuredImage] : []),
    ...(Array.isArray(gallery) ? gallery : []),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-500 mb-8">
        <Link href="/" className="hover:text-accent transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-accent transition-colors">
          Products
        </Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-accent transition-colors"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-surface-300">{product.title}</span>
      </nav>

      {/* Product layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-4">
          {allImages.length > 0 ? (
            <>
              <div className="rounded-xl overflow-hidden border border-surface-800 bg-surface-900 aspect-square">
                <img
                  src={`${allImages[0]!.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.slice(1, 5).map((img, i) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden border border-surface-800 bg-surface-900 aspect-square"
                    >
                      <img
                        src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                        alt={`${product.title} gallery ${i + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-xl border border-surface-800 bg-surface-900 aspect-square flex items-center justify-center text-surface-600">
              <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Product details */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-xs font-medium text-accent uppercase tracking-wider hover:text-accent-light transition-colors"
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}

          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">{product.title}</h1>

          {/* Rating summary */}
          {reviews.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <StarRating rating={Math.round(averageRating)} size="sm" />
              <span className="text-sm text-surface-400">
                {averageRating.toFixed(1)} ({reviews.length} review
                {reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            {hasSale ? (
              <>
                <span className="text-3xl font-bold text-accent">
                  ${salePrice.toFixed(2)}
                </span>
                <span className="text-xl text-surface-500 line-through">
                  ${price.toFixed(2)}
                </span>
                <span className="text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                  Save ${(price - salePrice).toFixed(2)}
                </span>
              </>
            ) : price ? (
              <span className="text-3xl font-bold text-white">${price.toFixed(2)}</span>
            ) : (
              <span className="text-lg text-surface-500">Price not available</span>
            )}
          </div>

          {/* Meta info */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {inventoryStatus && <InventoryBadge status={inventoryStatus} />}
            {sku && (
              <span className="text-xs text-surface-500 bg-surface-800/60 px-2.5 py-1 rounded-full">
                SKU: {sku}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div className="mt-6 pt-6 border-t border-surface-800">
              <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Description
              </h2>
              <p className="text-surface-300 leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Reviews section */}
      <section className="mt-16 pt-10 border-t border-surface-800">
        <h2 className="text-2xl font-bold text-white mb-6">
          Customer Reviews
          {reviews.length > 0 && (
            <span className="text-surface-500 text-lg font-normal ml-2">
              ({reviews.length})
            </span>
          )}
        </h2>

        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-surface-500">No reviews yet for this product.</p>
        )}
      </section>
    </div>
  );
}