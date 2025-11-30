const axios = require('axios');

// Production API URL
const API_URL = 'https://online-learning-platform-1-akti.onrender.com/api';

const courses = [
  {
    title: 'Complete Web Development Bootcamp',
    description: 'Master web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and become a full-stack developer. This comprehensive course covers everything from basics to advanced concepts.',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    category: 'Technology',
    instructor: {
      name: 'John Doe',
      avatar: '👨‍💻',
      bio: 'Senior Full Stack Developer with 10+ years of experience building scalable web applications',
    },
    price: 89.99,
    rating: 4.8,
    totalRatings: 1234,
    difficulty: 'Beginner',
    studentsEnrolled: 5000,
    whatYouWillLearn: [
      'Build modern web applications from scratch',
      'Master React and JavaScript fundamentals',
      'Understand RESTful APIs and backend development',
      'Deploy applications to production',
      'Work with databases (MongoDB, SQL)',
      'Implement authentication and authorization',
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
          { title: 'CSS Reference Guide', url: '#' },
        ],
      },
      {
        title: 'JavaScript Basics',
        description: 'Introduction to JavaScript programming and core concepts.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 30,
        order: 3,
        resources: [],
      },
      {
        title: 'React Introduction',
        description: 'Get started with React framework and build your first component.',
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
            description: 'Welcome to the course!',
            duration: 10,
            order: 1,
          },
          {
            title: 'Setting Up Your Development Environment',
            description: 'Install and configure your tools',
            duration: 20,
            order: 2,
          },
        ],
      },
      {
        section: 'HTML & CSS Fundamentals',
        lessons: [
          {
            title: 'HTML Basics',
            description: 'Learn HTML structure and semantic elements',
            duration: 15,
            order: 1,
          },
          {
            title: 'CSS Fundamentals',
            description: 'Master CSS styling and layout',
            duration: 25,
            order: 2,
          },
          {
            title: 'Responsive Design',
            description: 'Create mobile-friendly layouts',
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
        comment: 'Excellent course! Very comprehensive and well-structured. Perfect for beginners.',
        createdAt: new Date(),
      },
      {
        userId: null,
        rating: 5,
        comment: 'The instructor explains everything clearly. Highly recommended!',
        createdAt: new Date(),
      },
    ],
  },
  {
    title: 'Python Programming Mastery',
    description: 'Learn Python from scratch to advanced level. Master data structures, algorithms, web development with Django, and data science with pandas. Perfect for beginners and intermediate learners.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4f18c48?w=800&h=400&fit=crop',
    category: 'Technology',
    instructor: {
      name: 'Sarah Chen',
      avatar: '👩‍💻',
      bio: 'Python expert and data scientist with 8+ years of experience',
    },
    price: 79.99,
    rating: 4.9,
    totalRatings: 2100,
    difficulty: 'Intermediate',
    studentsEnrolled: 6800,
    whatYouWillLearn: [
      'Python programming fundamentals',
      'Object-oriented programming concepts',
      'Data structures and algorithms',
      'Web development with Django',
      'Data analysis with pandas and NumPy',
      'API development and testing',
    ],
    lessons: [
      {
        title: 'Python Basics',
        description: 'Introduction to Python syntax and basic concepts.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 20,
        order: 1,
        resources: [
          { title: 'Python Documentation', url: '#' },
        ],
      },
      {
        title: 'Data Structures',
        description: 'Learn lists, dictionaries, tuples, and sets.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 35,
        order: 2,
        resources: [],
      },
      {
        title: 'Object-Oriented Programming',
        description: 'Master classes, objects, and inheritance.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 40,
        order: 3,
        resources: [],
      },
      {
        title: 'Django Web Framework',
        description: 'Build web applications with Django.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 50,
        order: 4,
        resources: [],
      },
    ],
    curriculum: [
      {
        section: 'Python Fundamentals',
        lessons: [
          {
            title: 'Python Basics',
            description: 'Getting started with Python',
            duration: 20,
            order: 1,
          },
          {
            title: 'Control Flow',
            description: 'Conditionals and loops',
            duration: 25,
            order: 2,
          },
        ],
      },
      {
        section: 'Advanced Topics',
        lessons: [
          {
            title: 'Data Structures',
            description: 'Working with complex data types',
            duration: 35,
            order: 1,
          },
          {
            title: 'Object-Oriented Programming',
            description: 'Classes and objects',
            duration: 40,
            order: 2,
          },
        ],
      },
    ],
    reviews: [
      {
        userId: null,
        rating: 5,
        comment: 'Amazing course! Sarah explains everything in detail. Worth every penny!',
        createdAt: new Date(),
      },
      {
        userId: null,
        rating: 5,
        comment: 'Best Python course I\'ve taken. The Django section is particularly helpful.',
        createdAt: new Date(),
      },
    ],
  },
  {
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design. Create beautiful, functional, and user-friendly designs. Master design tools like Figma and Adobe XD.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    category: 'Design',
    instructor: {
      name: 'Emily Rodriguez',
      avatar: '👩‍🎨',
      bio: 'Award-winning UI/UX designer with 12+ years of experience at top tech companies',
    },
    price: 69.99,
    rating: 4.7,
    totalRatings: 1800,
    difficulty: 'Beginner',
    studentsEnrolled: 4200,
    whatYouWillLearn: [
      'Core design principles and theory',
      'User research and persona development',
      'Wireframing and prototyping',
      'Design tools (Figma, Adobe XD)',
      'Color theory and typography',
      'Responsive design patterns',
    ],
    lessons: [
      {
        title: 'Introduction to UI/UX Design',
        description: 'Understanding the fundamentals of design thinking.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 25,
        order: 1,
        resources: [
          { title: 'Design Principles Guide', url: '#' },
        ],
      },
      {
        title: 'Design Principles',
        description: 'Learn balance, contrast, hierarchy, and more.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 30,
        order: 2,
        resources: [],
      },
      {
        title: 'User Research Methods',
        description: 'Conduct effective user research and interviews.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 35,
        order: 3,
        resources: [],
      },
      {
        title: 'Prototyping with Figma',
        description: 'Create interactive prototypes using Figma.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 40,
        order: 4,
        resources: [],
      },
    ],
    curriculum: [
      {
        section: 'Design Foundations',
        lessons: [
          {
            title: 'Introduction to UI/UX',
            description: 'What is UI/UX design?',
            duration: 25,
            order: 1,
          },
          {
            title: 'Design Principles',
            description: 'Core principles of good design',
            duration: 30,
            order: 2,
          },
        ],
      },
      {
        section: 'Practical Skills',
        lessons: [
          {
            title: 'User Research Methods',
            description: 'How to conduct user research',
            duration: 35,
            order: 1,
          },
          {
            title: 'Prototyping with Figma',
            description: 'Hands-on prototyping tutorial',
            duration: 40,
            order: 2,
          },
        ],
      },
    ],
    reviews: [
      {
        userId: null,
        rating: 5,
        comment: 'Great introduction to UI/UX design. Emily is an excellent instructor!',
        createdAt: new Date(),
      },
      {
        userId: null,
        rating: 4,
        comment: 'Very informative course. Would love to see more advanced topics.',
        createdAt: new Date(),
      },
    ],
  },
];

async function addCoursesToProduction() {
  console.log('🚀 Adding courses to production...\n');
  
  // Note: This requires admin authentication
  // You'll need to either:
  // 1. Login as admin and get a token, or
  // 2. Temporarily remove auth from the admin route, or
  // 3. Use the MongoDB connection method instead
  
  console.log('⚠️  Note: This script requires admin authentication.');
  console.log('💡 Alternative: Use the addCourses.js script with production MONGODB_URI\n');
  
  for (const course of courses) {
    try {
      const response = await axios.post(`${API_URL}/admin/courses`, course, {
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if you have a token
          // 'Authorization': `Bearer YOUR_ADMIN_TOKEN`
        },
      });
      console.log(`✅ Added: ${course.title}`);
    } catch (error) {
      console.error(`❌ Failed to add ${course.title}:`, error.response?.data?.message || error.message);
    }
  }
  
  console.log('\n✨ Done!');
}

// Uncomment to run:
// addCoursesToProduction();

module.exports = { courses, addCoursesToProduction };

