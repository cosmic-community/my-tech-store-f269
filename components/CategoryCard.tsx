import Link from 'next/link';
import type { Category } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const image = category.metadata?.image;
  const name = getMetafieldValue(category.metadata?.name) || category.title;
  const description = getMetafieldValue(category.metadata?.description);

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="card-hover relative rounded-xl overflow-hidden border border-surface-800 bg-surface-900/60 aspect-[3/2]">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-600/30 to-accent/10" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/60 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
            {name}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-surface-300 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}