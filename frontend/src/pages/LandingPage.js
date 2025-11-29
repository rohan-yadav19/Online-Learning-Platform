import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiUsers, FiTrendingUp } from 'react-icons/fi';
import CategoryCard from '../components/CategoryCard';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './LandingPage.css';

const LandingPage = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [categories] = useState([
    { name: 'Technology', icon: '💻', count: 45 },
    { name: 'Business', icon: '📊', count: 32 },
    { name: 'Design', icon: '🎨', count: 28 },
    { name: 'Marketing', icon: '📈', count: 35 },
    { name: 'Photography', icon: '📷', count: 20 },
    { name: 'Music', icon: '🎵', count: 18 },
  ]);

  const [testimonials] = useState([
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      image: '👩‍💻',
      text: 'The courses here transformed my career. I learned practical skills that I use every day at work.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Manager',
      image: '👨‍💼',
      text: 'Best investment I\'ve made in my professional development. The instructors are top-notch.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Graphic Designer',
      image: '👩‍🎨',
      text: 'The design courses are comprehensive and up-to-date. Highly recommend to anyone in creative fields.',
      rating: 5,
    },
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/courses?minRating=4`);
        setPopularCourses(response.data.slice(0, 6));
      } catch (error) {
        // Fallback to mock data
        setPopularCourses([
          {
            _id: '1',
            title: 'Complete Web Development Bootcamp',
            category: 'Technology',
            instructor: { name: 'John Doe' },
            rating: 4.8,
            totalRatings: 1234,
            price: 89.99,
            studentsEnrolled: 5000,
            lessons: [{}, {}, {}, {}],
            difficulty: 'Beginner',
          },
          {
            _id: '2',
            title: 'Advanced React Patterns',
            category: 'Technology',
            instructor: { name: 'Jane Smith' },
            rating: 4.9,
            totalRatings: 856,
            price: 79.99,
            studentsEnrolled: 3200,
            lessons: [{}, {}, {}],
            difficulty: 'Advanced',
          },
        ]);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Learn Without Limits
            </h1>
            <p className="hero-subtitle">
              Start, switch, or advance your career with thousands of courses, Professional Certificates, and degrees from world-class instructors.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary btn-lg">
                Explore Courses
                <FiArrowRight />
              </Link>
              <Link to="/dashboard" className="btn btn-outline btn-lg">
                Start Learning
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <FiUsers />
                <div>
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Students</div>
                </div>
              </div>
              <div className="stat-item">
                <FiTrendingUp />
                <div>
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Courses</div>
                </div>
              </div>
              <div className="stat-item">
                <FiStar />
                <div>
                  <div className="stat-number">4.8</div>
                  <div className="stat-label">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">
            Discover courses in your favorite subjects
          </p>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                category={category.name}
                icon={category.icon}
                count={category.count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="section courses-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Popular Courses</h2>
              <p className="section-subtitle">
                Most enrolled courses this month
              </p>
            </div>
            <Link to="/courses" className="btn btn-outline">
              View All
              <FiArrowRight />
            </Link>
          </div>
          <div className="courses-grid">
            {popularCourses.map((course) => (
              <CourseCard key={course._id || course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle">
            Join thousands of satisfied learners
          </p>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FiStar key={i} className="star-filled" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{testimonial.image}</div>
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;


