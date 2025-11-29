import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiUsers, FiClock } from 'react-icons/fi';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id || course.id}`} className="course-card">
      <div className="course-card-thumbnail">
        <img
          src={course.thumbnail || 'https://via.placeholder.com/400x250?text=Course+Image'}
          alt={course.title}
        />
        <div className="course-card-badge">{course.difficulty || 'Beginner'}</div>
      </div>
      <div className="course-card-content">
        <div className="course-card-category">{course.category || 'Technology'}</div>
        <h3 className="course-card-title">{course.title || 'Course Title'}</h3>
        <p className="course-card-instructor">
          {course.instructor?.name || 'Instructor Name'}
        </p>
        <div className="course-card-meta">
          <div className="course-card-rating">
            <FiStar className="star-icon" />
            <span>{course.rating?.toFixed(1) || '4.5'}</span>
            <span className="meta-text">
              ({course.totalRatings || 0} reviews)
            </span>
          </div>
          <div className="course-card-stats">
            <span>
              <FiUsers /> {course.studentsEnrolled || 0}
            </span>
            <span>
              <FiClock /> {course.lessons?.length || 0} lessons
            </span>
          </div>
        </div>
        <div className="course-card-footer">
          <span className="course-card-price">
            ${course.price || 0}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;


