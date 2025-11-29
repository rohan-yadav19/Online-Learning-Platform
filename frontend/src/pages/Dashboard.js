import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import ProgressBar from '../components/ProgressBar';
import CourseCard from '../components/CourseCard';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './Dashboard.css';

const Dashboard = () => {
  const userId = localStorage.getItem('userId');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/dashboard`);
      setDashboardData(response.data);
    } catch (error) {
      // Fallback to mock data
      setDashboardData({
        user: {
          name: localStorage.getItem('userName') || 'John Doe',
          email: 'john@example.com',
          enrolledCourses: [
            {
              courseId: {
                _id: '1',
                title: 'Complete Web Development Bootcamp',
                thumbnail: 'https://via.placeholder.com/400x250?text=Course+1',
                lessons: [{}, {}, {}, {}],
              },
              progress: 65,
            },
            {
              courseId: {
                _id: '2',
                title: 'Advanced React Patterns',
                thumbnail: 'https://via.placeholder.com/400x250?text=Course+2',
                lessons: [{}, {}, {}],
              },
              progress: 30,
            },
          ],
        },
        recommendedCourses: [
          {
            _id: '3',
            title: 'Digital Marketing Mastery',
            category: 'Marketing',
            instructor: { name: 'Mike Johnson' },
            rating: 4.7,
            totalRatings: 2100,
            price: 99.99,
            studentsEnrolled: 4500,
            lessons: [{}, {}, {}, {}, {}],
            difficulty: 'Intermediate',
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchDashboardData();
    }
  }, [userId, fetchDashboardData]);

  if (!userId) {
    return (
      <div className="dashboard-auth">
        <div className="container">
          <div className="auth-message">
            <h2>Please login to access your dashboard</h2>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  const { user, recommendedCourses } = dashboardData || {};

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-layout">
          <Sidebar />
          <div className="dashboard-main">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Welcome back, {user?.name}!</h1>
              <p className="dashboard-subtitle">Continue your learning journey</p>
            </div>

            <div className="profile-card">
              <div className="profile-info">
                <div className="profile-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <div className="profile-name">{user?.name}</div>
                  <div className="profile-email">{user?.email}</div>
                </div>
              </div>
              <div className="profile-stats">
                <div className="stat-box">
                  <div className="stat-value">{user?.enrolledCourses?.length || 0}</div>
                  <div className="stat-label">Enrolled Courses</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">
                    {user?.enrolledCourses?.reduce((acc, ec) => acc + ec.progress, 0) / (user?.enrolledCourses?.length || 1) || 0}%
                  </div>
                  <div className="stat-label">Avg Progress</div>
                </div>
                <div className="stat-box">
                  <div className="stat-value">
                    {user?.enrolledCourses?.filter(ec => ec.progress === 100).length || 0}
                  </div>
                  <div className="stat-label">Completed</div>
                </div>
              </div>
            </div>

            <div className="dashboard-section">
              <h2 className="section-title">My Courses</h2>
              {user?.enrolledCourses?.length === 0 ? (
                <div className="no-courses">
                  <p>You haven't enrolled in any courses yet.</p>
                  <Link to="/courses" className="btn btn-primary">
                    Browse Courses
                  </Link>
                </div>
              ) : (
                <div className="my-courses-list">
                  {user?.enrolledCourses?.map((enrollment, index) => {
                    const course = enrollment.courseId;
                    return (
                      <div key={index} className="my-course-card">
                        <div className="my-course-thumbnail">
                          <img
                            src={course?.thumbnail || 'https://via.placeholder.com/200x120?text=Course'}
                            alt={course?.title}
                          />
                        </div>
                        <div className="my-course-content">
                          <h3 className="my-course-title">{course?.title}</h3>
                          <ProgressBar progress={enrollment.progress || 0} />
                          <div className="my-course-actions">
                            <Link
                              to={`/learn/${course?._id || course?.id}`}
                              className="btn btn-primary"
                            >
                              <FiPlay />
                              Continue Learning
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {recommendedCourses && recommendedCourses.length > 0 && (
              <div className="dashboard-section">
                <h2 className="section-title">Recommended for You</h2>
                <div className="recommended-courses">
                  {recommendedCourses.map((course) => (
                    <CourseCard key={course._id || course.id} course={course} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


