import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import Dashboard from './pages/Dashboard';
import VideoLearningPage from './pages/VideoLearningPage';
import AdminPanel from './pages/AdminPanel';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Layout><LandingPage /></Layout>} />
          <Route path="/courses" element={<Layout><CoursesPage /></Layout>} />
          <Route path="/course/:id" element={<Layout><CourseDetailsPage /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/learn/:courseId" element={<Layout><VideoLearningPage /></Layout>} />
          <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

