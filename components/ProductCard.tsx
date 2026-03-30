import Link from 'next/link';
import type { Product } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import InventoryBadge from '@/components/InventoryBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.metadata?.price;
  const salePrice = product.metadata?.sale_price;
  const image = product.metadata?.featured_image;
  const category = product.metadata?.category;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);

  const hasSale = salePrice && salePrice > 0 && price && salePrice < price;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="card-hover rounded-xl overflow-hidden border border-surface-800 bg-surface-900/60">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-800">
          {image ? (
            <img
              src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-surface-600">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Sale badge */}
          {hasSale && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              SALE
            </span>
          )}

          {/* Inventory badge */}
          {inventoryStatus && (
            <div className="absolute top-3 right-3">
              <InventoryBadge status={inventoryStatus} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          {category && (
            <span className="text-xs font-medium text-accent uppercase tracking-wider">
              {getMetafieldValue(category.metadata?.name) || category.title}
            </span>
          )}

          <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-accent transition-colors line-clamp-1">
            {product.title}
          </h3>

          {product.metadata?.description && (
            <p className="mt-1 text-sm text-surface-400 line-clamp-2">
              {getMetafieldValue(product.metadata.description)}
            </p>
          )}

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            {hasSale ? (
              <>
                <span className="text-xl font-bold text-accent">${salePrice.toFixed(2)}</span>
                <span className="text-sm text-surface-500 line-through">${price.toFixed(2)}</span>
              </>
            ) : price ? (
              <span className="text-xl font-bold text-white">${price.toFixed(2)}</span>
            ) : (
              <span className="text-sm text-surface-500">Price not available</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}