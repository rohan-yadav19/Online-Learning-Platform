import React from 'react';
import { FiStar } from 'react-icons/fi';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={`review-star ${i < rating ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user">
          <div className="review-avatar">
            {review.userName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <div className="review-name">{review.userName || 'Anonymous'}</div>
            <div className="review-date">
              {new Date(review.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="review-rating">{renderStars(review.rating || 5)}</div>
      </div>
      <p className="review-comment">{review.comment || 'Great course!'}</p>
    </div>
  );
};

export default ReviewCard;


