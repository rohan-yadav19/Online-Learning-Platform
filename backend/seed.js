const mongoose = require('mongoose');
const Course = require('./models/Course');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-platform';

const sampleCourses = [
  {
    title: 'Complete Web Development Bootcamp',
    description: 'Master web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer.',
    thumbnail: 'https://via.placeholder.com/800x400?text=Web+Development',
    category: 'Technology',
    instructor: {
      name: 'John Doe',
      avatar: '👨‍💻',
      bio: 'Senior Full Stack Developer with 10+ years of experience',
    },
    price: 89.99,
    rating: 4.8,
    totalRatings: 1234,
    difficulty: 'Beginner',
    studentsEnrolled: 5000,
    whatYouWillLearn: [
      'Build modern web applications',
      'Master React and JavaScript',
      'Understand RESTful APIs',
      'Deploy applications to production',
      'Work with databases',
      'Implement authentication',
    ],
    lessons: [
      {
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
        title: 'JavaScript Basics',
        description: 'Introduction to JavaScript programming.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 30,
        order: 3,
        resources: [],
      },
      {
        title: 'React Introduction',
        description: 'Get started with React framework.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 45,
        order: 4,
        resources: [],
      },
    ],
    curriculum: [
      {
        section: 'Getting Started',
        lessons: [
          {
            title: 'Course Introduction',
            duration: 10,
            order: 1,
          },
          {
            title: 'Setting Up Your Environment',
            duration: 20,
            order: 2,
          },
        ],
      },
      {
        section: 'HTML & CSS',
        lessons: [
          {
            title: 'HTML Basics',
            duration: 15,
            order: 1,
          },
          {
            title: 'CSS Fundamentals',
            duration: 25,
            order: 2,
          },
          {
            title: 'Responsive Design',
            duration: 30,
            order: 3,
          },
        ],
      },
    ],
    reviews: [
      {
        userId: null,
        rating: 5,
        comment: 'Excellent course! Very comprehensive and well-structured.',
      },
      {
        userId: null,
        rating: 5,
        comment: 'The instructor explains everything clearly. Highly recommended!',
      },
    ],
  },
  {
    title: 'Advanced React Patterns',
    description: 'Learn advanced React patterns, hooks, performance optimization, and best practices for building scalable applications.',
    thumbnail: 'https://via.placeholder.com/800x400?text=React+Advanced',
    category: 'Technology',
    instructor: {
      name: 'Jane Smith',
      avatar: '👩‍💻',
      bio: 'React expert and software architect',
    },
    price: 79.99,
    rating: 4.9,
    totalRatings: 856,
    difficulty: 'Advanced',
    studentsEnrolled: 3200,
    whatYouWillLearn: [
      'Advanced React patterns',
      'Performance optimization',
      'State management',
      'Testing strategies',
    ],
    lessons: [
      {
        title: 'React Hooks Deep Dive',
        duration: 40,
        order: 1,
      },
      {
        title: 'Context API and State Management',
        duration: 35,
        order: 2,
      },
      {
        title: 'Performance Optimization',
        duration: 45,
        order: 3,
      },
    ],
    curriculum: [
      {
        section: 'Advanced Concepts',
        lessons: [
          {
            title: 'React Hooks Deep Dive',
            duration: 40,
            order: 1,
          },
        ],
      },
    ],
    reviews: [],
  },
  {
    title: 'Digital Marketing Mastery',
    description: 'Master digital marketing strategies including SEO, social media marketing, content marketing, and analytics.',
    thumbnail: 'https://via.placeholder.com/800x400?text=Digital+Marketing',
    category: 'Marketing',
    instructor: {
      name: 'Mike Johnson',
      avatar: '👨‍💼',
      bio: 'Marketing strategist with 15+ years of experience',
    },
    price: 99.99,
    rating: 4.7,
    totalRatings: 2100,
    difficulty: 'Intermediate',
    studentsEnrolled: 4500,
    whatYouWillLearn: [
      'SEO optimization',
      'Social media strategies',
      'Content marketing',
      'Analytics and tracking',
    ],
    lessons: [
      {
        title: 'Introduction to Digital Marketing',
        duration: 20,
        order: 1,
      },
      {
        title: 'SEO Fundamentals',
        duration: 30,
        order: 2,
      },
      {
        title: 'Social Media Marketing',
        duration: 35,
        order: 3,
      },
    ],
    curriculum: [],
    reviews: [],
  },
  {
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design. Create beautiful and functional designs.',
    thumbnail: 'https://via.placeholder.com/800x400?text=UI+UX+Design',
    category: 'Design',
    instructor: {
      name: 'Emily Rodriguez',
      avatar: '👩‍🎨',
      bio: 'Award-winning UI/UX designer',
    },
    price: 69.99,
    rating: 4.6,
    totalRatings: 1800,
    difficulty: 'Beginner',
    studentsEnrolled: 3800,
    whatYouWillLearn: [
      'Design principles',
      'User research',
      'Prototyping',
      'Design tools',
    ],
    lessons: [
      {
        title: 'Introduction to UI/UX',
        duration: 25,
        order: 1,
      },
      {
        title: 'Design Principles',
        duration: 30,
        order: 2,
      },
    ],
    curriculum: [],
    reviews: [],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample courses
    const courses = await Course.insertMany(sampleCourses);
    console.log(`Inserted ${courses.length} courses`);

    // Create sample admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin User',
      email: 'admin@learnhub.com',
      password: hashedPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('Created admin user: admin@learnhub.com / admin123');

    // Create sample student user
    const studentPassword = await bcrypt.hash('student123', 10);
    const student = new User({
      name: 'John Student',
      email: 'student@learnhub.com',
      password: studentPassword,
      role: 'student',
    });
    await student.save();
    console.log('Created student user: student@learnhub.com / student123');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();


