// components/ReviewList.jsx
import ReviewItem from "./ReviewItem";

export default function ReviewList({ reviews }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Đánh giá từ khách hàng</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem
            key={review.id}
            user={review.user}
            comment={review.comment}
            createdAt={review.createdAt}
          />
        ))
      ) : (
        <p className="text-gray-500">Chưa có đánh giá nào.</p>
      )}
    </div>
  );
}
