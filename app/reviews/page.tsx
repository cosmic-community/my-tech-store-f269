import type { Metadata } from 'next';
import { getReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';

export const metadata: Metadata = {
  title: 'Customer Reviews — My Tech Store',
  description: 'Read verified customer reviews for products at My Tech Store.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
      : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Customer Reviews</h1>
        <div className="mt-2 flex items-center gap-4 text-surface-400">
          <span>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
          {reviews.length > 0 && (
            <>
              <span>·</span>
              <span>{averageRating.toFixed(1)} average rating</span>
            </>
          )}
        </div>
      </div>

      {sortedReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-surface-500 text-lg">No reviews yet.</p>
          <p className="mt-2 text-surface-600 text-sm">
            Reviews will appear here once customers start leaving feedback.
          </p>
        </div>
      )}
    </div>
  );
}