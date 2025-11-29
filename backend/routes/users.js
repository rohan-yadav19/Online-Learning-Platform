const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');

// Get user dashboard data
router.get('/:id/dashboard', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('enrolledCourses.courseId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get recommended courses (not enrolled)
    const enrolledCourseIds = user.enrolledCourses.map(ec => ec.courseId._id);
    const recommendedCourses = await Course.find({
      _id: { $nin: enrolledCourseIds },
    }).limit(6).sort({ rating: -1 });

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        enrolledCourses: user.enrolledCourses,
      },
      recommendedCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll in course
router.post('/:id/enroll', async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const alreadyEnrolled = user.enrolledCourses.some(
      ec => ec.courseId.toString() === courseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    user.enrolledCourses.push({
      courseId,
      progress: 0,
      completedLessons: [],
    });

    await user.save();

    // Update course enrollment count
    await Course.findByIdAndUpdate(courseId, {
      $inc: { studentsEnrolled: 1 },
    });

    res.json({ message: 'Enrolled successfully', enrolledCourses: user.enrolledCourses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update lesson progress
router.post('/:id/lessons/:lessonId/complete', async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const enrolledCourse = user.enrolledCourses.find(
      ec => ec.courseId.toString() === courseId
    );

    if (!enrolledCourse) {
      return res.status(400).json({ message: 'Not enrolled in this course' });
    }

    if (!enrolledCourse.completedLessons.includes(req.params.lessonId)) {
      enrolledCourse.completedLessons.push(req.params.lessonId);
      
      // Calculate progress
      const course = await Course.findById(courseId);
      const totalLessons = course.lessons.length;
      enrolledCourse.progress = Math.round(
        (enrolledCourse.completedLessons.length / totalLessons) * 100
      );
    }

    await user.save();
    res.json({ message: 'Lesson marked as completed', progress: enrolledCourse.progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


