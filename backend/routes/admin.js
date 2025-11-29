const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');

// Get admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments();
    const totalRevenue = await Course.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$price', '$studentsEnrolled'] } },
        },
      },
    ]);

    const recentCourses = await Course.find().sort({ createdAt: -1 }).limit(5);
    const topCourses = await Course.find().sort({ studentsEnrolled: -1 }).limit(5);

    res.json({
      stats: {
        totalStudents,
        totalCourses,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalInstructors: await User.countDocuments({ role: 'instructor' }),
      },
      recentCourses,
      topCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create course
router.post('/courses', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update course
router.put('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete course
router.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


