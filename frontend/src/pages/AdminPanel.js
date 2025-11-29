import React, { useState, useEffect } from 'react';
import { FiUsers, FiBook, FiDollarSign, FiTrendingUp, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import './AdminPanel.css';

const AdminPanel = () => {
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    difficulty: 'Beginner',
    instructor: { name: '', avatar: '', bio: '' },
    whatYouWillLearn: [''],
    lessons: [{ title: '', duration: '', description: '' }],
  });

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      alert('Access denied. Admin only.');
      window.location.href = '/';
      return;
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, coursesRes, studentsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/admin/dashboard`),
        axios.get(`${API_BASE_URL}/courses`),
        axios.get(`${API_BASE_URL}/admin/students`),
      ]);
      setStats(statsRes.data.stats);
      setCourses(coursesRes.data);
      setStudents(studentsRes.data);
    } catch (error) {
      // Fallback to mock data
      setStats({
        totalStudents: 50000,
        totalCourses: 500,
        totalRevenue: 2500000,
        totalInstructors: 150,
      });
      setCourses([
        {
          _id: '1',
          title: 'Complete Web Development Bootcamp',
          studentsEnrolled: 5000,
          price: 89.99,
        },
      ]);
      setStudents([
        { _id: '1', name: 'John Doe', email: 'john@example.com' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/admin/courses`, formData);
      alert('Course created successfully!');
      setShowAddForm(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        difficulty: 'Beginner',
        instructor: { name: '', avatar: '', bio: '' },
        whatYouWillLearn: [''],
        lessons: [{ title: '', duration: '', description: '' }],
      });
      fetchDashboardData();
    } catch (error) {
      alert('Error creating course');
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/courses/${courseId}`);
      fetchDashboardData();
    } catch (error) {
      alert('Error deleting course');
    }
  };

  if (loading) {
    return <div className="loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel">
      <div className="container">
        <div className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
            <FiPlus />
            Add New Course
          </button>
        </div>

        {showAddForm && (
          <div className="add-course-form">
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Course Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Instructor Name</label>
                <input
                  type="text"
                  value={formData.instructor.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instructor: { ...formData.instructor, name: e.target.value },
                    })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Create Course
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon students">
              <FiUsers />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.totalStudents?.toLocaleString() || 0}</div>
              <div className="stat-label">Total Students</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon courses">
              <FiBook />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.totalCourses || 0}</div>
              <div className="stat-label">Total Courses</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon revenue">
              <FiDollarSign />
            </div>
            <div className="stat-content">
              <div className="stat-value">${stats?.totalRevenue?.toLocaleString() || 0}</div>
              <div className="stat-label">Total Revenue</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon instructors">
              <FiTrendingUp />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stats?.totalInstructors || 0}</div>
              <div className="stat-label">Instructors</div>
            </div>
          </div>
        </div>

        <div className="admin-sections">
          <div className="admin-section">
            <h2 className="section-title">Course Management</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Students</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id}>
                      <td>{course.title}</td>
                      <td>{course.studentsEnrolled || 0}</td>
                      <td>${course.price || 0}</td>
                      <td>
                        <button className="btn-icon" title="Edit">
                          <FiEdit />
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDelete(course._id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-section">
            <h2 className="section-title">Student Management</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Enrolled Courses</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 10).map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.enrolledCourses?.length || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;


