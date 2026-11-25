
import { useState } from "react";
import { Star } from "lucide-react";

export default function Reviews({ carId }) {
  const key = `reviews_${carId}`;
  const [reviews, setReviews] = useState(
    () => JSON.parse(localStorage.getItem(key) || "[]")
  );
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("user") || "null")?.name || ""
  );
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("5");

  function addReview(e) {
    e.preventDefault();

    const newReview = {
      id: Date.now(),
      name: name.trim(),
      comment: comment.trim(),
      rating: Number(rating)
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(key, JSON.stringify(updated));
    setComment("");
  }

  return (
    <section className="reviews-section">
      <p className="section-label">CUSTOMER FEEDBACK</p>
      <h2>What Our Customers Say</h2>

      <form className="review-form" onSubmit={addReview}>
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button className="primary-button">Submit Review</button>
      </form>

      <div className="review-list">
        {reviews.length === 0 && <p>No reviews yet. Be the first to review!</p>}

        {reviews.map((review) => (
          <article className="review-card" key={review.id}>
            <h4>{review.name}</h4>
            <div className="review-stars">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>
            <p>{review.comment}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
