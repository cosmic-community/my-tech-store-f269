import type { Review } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = false }: ReviewCardProps) {
  const rating = review.metadata?.rating ?? 0;
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous';
  const comment = getMetafieldValue(review.metadata?.comment);
  const verified = review.metadata?.verified_purchase;
  const product = review.metadata?.product;

  const isVerified =
    verified === true || verified === 'true' || verified === 'True' || verified === 'Yes';

  return (
    <div className="rounded-xl border border-surface-800 bg-surface-900/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <StarRating rating={rating} size="sm" />
            <span className="text-sm font-medium text-surface-300">{rating}/5</span>
          </div>
          <p className="mt-1 text-sm font-semibold text-white">{reviewerName}</p>
        </div>
        {isVerified && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Verified
          </span>
        )}
      </div>

      {comment && (
        <p className="mt-3 text-sm text-surface-300 leading-relaxed">{comment}</p>
      )}

      {showProduct && product && (
        <div className="mt-3 pt-3 border-t border-surface-800">
          <p className="text-xs text-surface-500">
            Review for{' '}
            <span className="text-accent font-medium">{product.title}</span>
          </p>
        </div>
      )}
    </div>
  );
}