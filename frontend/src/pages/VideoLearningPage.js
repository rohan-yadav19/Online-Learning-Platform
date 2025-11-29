import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheck, FiDownload, FiChevronLeft } from 'react-icons/fi';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './VideoLearningPage.css';

const VideoLearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCourse = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}`);
      const courseData = response.data;
      setCourse(courseData);
      
      // Set first lesson as current
      if (courseData.lessons && courseData.lessons.length > 0) {
        setCurrentLesson(courseData.lessons[0]);
      }

      // Fetch user progress
      try {
        const userResponse = await axios.get(`${API_BASE_URL}/users/${userId}/dashboard`);
        const enrolledCourse = userResponse.data.user.enrolledCourses.find(
          ec => ec.courseId._id === courseId || ec.courseId === courseId
        );
        if (enrolledCourse) {
          setCompletedLessons(enrolledCourse.completedLessons || []);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    } catch (error) {
      // Fallback to mock data
      const mockCourse = {
        _id: courseId,
        title: 'Complete Web Development Bootcamp',
        lessons: [
          {
            _id: '1',
            title: 'Introduction to HTML',
            description: 'Learn the basics of HTML structure and elements.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: 15,
            order: 1,
            resources: [
              { title: 'HTML Cheat Sheet', url: '#' },
              { title: 'Practice Exercises', url: '#' },
            ],
          },
          {
            _id: '2',
            title: 'CSS Fundamentals',
            description: 'Master CSS styling and layout techniques.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: 25,
            order: 2,
            resources: [
              { title: 'CSS Reference', url: '#' },
            ],
          },
          {
            _id: '3',
            title: 'JavaScript Basics',
            description: 'Introduction to JavaScript programming.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: 30,
            order: 3,
            resources: [],
          },
        ],
      };
      setCourse(mockCourse);
      if (mockCourse.lessons && mockCourse.lessons.length > 0) {
        setCurrentLesson(mockCourse.lessons[0]);
      }
    } finally {
      setLoading(false);
    }
  }, [courseId, userId]);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchCourse();
  }, [userId, courseId, navigate, fetchCourse]);

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    setNotes('');
  };

  const handleCompleteLesson = async () => {
    if (!currentLesson || completedLessons.includes(currentLesson._id)) return;

    try {
      await axios.post(`${API_BASE_URL}/users/${userId}/lessons/${currentLesson._id}/complete`, {
        courseId: courseId,
      });
      setCompletedLessons([...completedLessons, currentLesson._id]);
    } catch (error) {
      // Fallback - just update local state
      setCompletedLessons([...completedLessons, currentLesson._id]);
    }
  };

  if (loading) {
    return <div className="loading">Loading course...</div>;
  }

  if (!course) {
    return <div className="no-course">Course not found</div>;
  }

  const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId);

  return (
    <div className="video-learning-page">
      <div className="video-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <FiChevronLeft />
          Back to Dashboard
        </button>
        <h1 className="course-title">{course.title}</h1>
      </div>

      <div className="video-layout">
        <div className="video-main">
          <div className="video-player-container">
            {currentLesson ? (
              <>
                <div className="video-wrapper">
                  <iframe
                    src={currentLesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                    title={currentLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-player"
                  />
                </div>
                <div className="video-info">
                  <h2 className="lesson-title">{currentLesson.title}</h2>
                  <p className="lesson-description">{currentLesson.description || 'Lesson description'}</p>
                  <button
                    className={`btn ${isLessonCompleted(currentLesson._id) ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={handleCompleteLesson}
                    disabled={isLessonCompleted(currentLesson._id)}
                  >
                    <FiCheck />
                    {isLessonCompleted(currentLesson._id) ? 'Completed' : 'Mark as Complete'}
                  </button>
                </div>
              </>
            ) : (
              <div className="no-lesson">Select a lesson to start learning</div>
            )}
          </div>

          <div className="notes-section">
            <h3 className="notes-title">My Notes</h3>
            <textarea
              className="notes-textarea"
              placeholder="Take notes while learning..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
            />
            <button className="btn btn-primary">Save Notes</button>
          </div>

          {currentLesson?.resources && currentLesson.resources.length > 0 && (
            <div className="resources-section">
              <h3 className="resources-title">Resources</h3>
              <div className="resources-list">
                {currentLesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    className="resource-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiDownload />
                    <span>{resource.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="video-sidebar">
          <h3 className="sidebar-title">Course Content</h3>
          <div className="lessons-list">
            {course.lessons?.map((lesson, index) => {
              const isCompleted = isLessonCompleted(lesson._id);
              const isActive = currentLesson?._id === lesson._id;
              return (
                <button
                  key={lesson._id || index}
                  className={`lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="lesson-number">{index + 1}</div>
                  <div className="lesson-content">
                    <div className="lesson-item-title">{lesson.title}</div>
                    <div className="lesson-item-duration">{lesson.duration} min</div>
                  </div>
                  {isCompleted && <FiCheck className="lesson-check" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLearningPage;


