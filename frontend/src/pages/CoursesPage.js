import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './CoursesPage.css';

const CoursesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [minRating, setMinRating] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/courses/data/categories`);
      setCategories(response.data);
    } catch (error) {
      setCategories(['Technology', 'Business', 'Design', 'Marketing', 'Photography', 'Music']);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedDifficulty) params.difficulty = selectedDifficulty;
      if (minRating) params.minRating = minRating;
      if (searchTerm) params.search = searchTerm;

      const response = await axios.get(`${API_BASE_URL}/courses`, { params });
      console.log('Courses fetched:', response.data);
      setCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      console.error('API URL:', API_BASE_URL);
      // Set empty array instead of mock data to see actual errors
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedDifficulty, minRating, searchTerm]);

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, [fetchCategories, fetchCourses]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses();
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    setMinRating('');
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div className="courses-page">
      <div className="courses-header">
        <div className="container">
          <h1 className="page-title">All Courses</h1>
          <p className="page-subtitle">
            Discover thousands of courses to advance your skills
          </p>
        </div>
      </div>

      <div className="container">
        <div className="courses-controls">
          <form onSubmit={handleSearch} className="search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          <button
            className="btn btn-outline filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>
            </div>

            <button className="btn btn-outline" onClick={clearFilters}>
              <FiX />
              Clear Filters
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading courses...</div>
        ) : courses.length === 0 ? (
          <div className="no-courses">
            <p>No courses found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="courses-count">
              Found {courses.length} course{courses.length !== 1 ? 's' : ''}
            </div>
            <div className="courses-grid">
              {courses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;


