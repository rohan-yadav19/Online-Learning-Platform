import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category, icon, count }) => {
  return (
    <Link to={`/courses?category=${category}`} className="category-card">
      <div className="category-icon">{icon}</div>
      <h3 className="category-title">{category}</h3>
      <p className="category-count">{count || 0} courses</p>
    </Link>
  );
};

export default CategoryCard;


