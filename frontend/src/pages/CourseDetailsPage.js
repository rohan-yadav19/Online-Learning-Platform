import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiUsers, FiClock, FiCheck, FiPlay } from 'react-icons/fi';
import Accordion from '../components/Accordion';
import ReviewCard from '../components/ReviewCard';
import Footer from '../components/Footer';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './CourseDetailsPage.css';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const userId = localStorage.getItem('userId');

  const fetchCourse = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      // Fallback to mock data
      setCourse({
        _id: id,
        title: 'Complete Web Development Bootcamp',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        thumbnail: 'https://via.placeholder.com/800x400?text=Course+Banner',
        category: 'Technology',
        instructor: {
          name: 'John Doe',
          avatar: '👨‍💻',
          bio: 'Senior Full Stack Developer with 10+ years of experience',
        },
        rating: 4.8,
        totalRatings: 1234,
        price: 89.99,
        studentsEnrolled: 5000,
        difficulty: 'Beginner',
        lessons: [
          { title: 'Introduction to HTML', duration: 15 },
          { title: 'CSS Fundamentals', duration: 25 },
          { title: 'JavaScript Basics', duration: 30 },
          { title: 'React Introduction', duration: 45 },
        ],
        whatYouWillLearn: [
          'Build modern web applications',
          'Master React and JavaScript',
          'Understand RESTful APIs',
          'Deploy applications to production',
          'Work with databases',
          'Implement authentication',
        ],
        curriculum: [
          {
            section: 'Getting Started',
            lessons: [
              { title: 'Course Introduction', duration: 10 },
              { title: 'Setting Up Your Environment', duration: 20 },
            ],
          },
          {
            section: 'HTML & CSS',
            lessons: [
              { title: 'HTML Basics', duration: 15 },
              { title: 'CSS Fundamentals', duration: 25 },
              { title: 'Responsive Design', duration: 30 },
            ],
          },
          {
            section: 'JavaScript',
            lessons: [
              { title: 'JavaScript Basics', duration: 30 },
              { title: 'DOM Manipulation', duration: 35 },
              { title: 'Async JavaScript', duration: 40 },
            ],
          },
        ],
        reviews: [
          {
            userName: 'Sarah Johnson',
            rating: 5,
            comment: 'Excellent course! Very comprehensive and well-structured.',
            createdAt: new Date(),
          },
          {
            userName: 'Mike Chen',
            rating: 5,
            comment: 'The instructor explains everything clearly. Highly recommended!',
            createdAt: new Date(),
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleEnroll = async () => {
    if (!userId) {
      alert('Please login to enroll');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/users/${userId}/enroll`, {
        courseId: id,
      });
      setIsEnrolled(true);
      navigate(`/learn/${id}`);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === 'Already enrolled') {
        setIsEnrolled(true);
        navigate(`/learn/${id}`);
      } else {
        alert('Enrollment failed. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading course details...</div>;
  }

  if (!course) {
    return <div className="no-course">Course not found</div>;
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FiStar
        key={i}
        className={`star-icon ${i < Math.floor(rating) ? 'filled' : ''}`}
      />
    ));
  };

  return (
    <div className="course-details-page">
      <div className="course-banner">
        <img
          src={course.thumbnail || 'https://via.placeholder.com/1200x400?text=Course+Banner'}
          alt={course.title}
        />
      </div>

      <div className="container">
        <div className="course-details-layout">
          <div className="course-main">
            <div className="course-header">
              <span className="course-category">{course.category}</span>
              <h1 className="course-title">{course.title}</h1>
              <div className="course-meta">
                <div className="course-rating">
                  {renderStars(course.rating)}
                  <span>{course.rating?.toFixed(1)}</span>
                  <span className="meta-text">
                    ({course.totalRatings || 0} ratings)
                  </span>
                </div>
                <div className="course-stats">
                  <span>
                    <FiUsers /> {course.studentsEnrolled || 0} students
                  </span>
                  <span>
                    <FiClock /> {course.lessons?.length || 0} lessons
                  </span>
                  <span>{course.difficulty || 'Beginner'}</span>
                </div>
              </div>
            </div>

            <div className="course-instructor">
              <div className="instructor-avatar">{course.instructor?.avatar || '👨‍🏫'}</div>
              <div>
                <div className="instructor-name">{course.instructor?.name || 'Instructor'}</div>
                <div className="instructor-bio">{course.instructor?.bio || 'Expert Instructor'}</div>
              </div>
            </div>

            <div className="course-section">
              <h2 className="section-heading">About This Course</h2>
              <p className="course-description">{course.description || 'Course description goes here...'}</p>
            </div>

            <div className="course-section">
              <h2 className="section-heading">What You'll Learn</h2>
              <ul className="learn-list">
                {course.whatYouWillLearn?.map((item, index) => (
                  <li key={index}>
                    <FiCheck className="check-icon" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="course-section">
              <h2 className="section-heading">Course Curriculum</h2>
              {course.curriculum?.map((section, index) => (
                <Accordion key={index} title={section.section || `Section ${index + 1}`}>
                  <ul className="curriculum-lessons">
                    {section.lessons?.map((lesson, lessonIndex) => (
                      <li key={lessonIndex}>
                        <FiPlay className="play-icon" />
                        <span>{lesson.title}</span>
                        <span className="lesson-duration">{lesson.duration} min</span>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </div>

            <div className="course-section">
              <h2 className="section-heading">Student Reviews</h2>
              <div className="reviews-list">
                {course.reviews?.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </div>
          </div>

          <div className="course-sidebar">
            <div className="enrollment-card">
              <div className="course-price">
                <span className="price-amount">${course.price || 0}</span>
              </div>
              <button
                className="btn btn-primary btn-lg enroll-button"
                onClick={handleEnroll}
              >
                {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
              </button>
              <div className="course-features">
                <div className="feature-item">
                  <FiCheck />
                  <span>Full lifetime access</span>
                </div>
                <div className="feature-item">
                  <FiCheck />
                  <span>Certificate of completion</span>
                </div>
                <div className="feature-item">
                  <FiCheck />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;


