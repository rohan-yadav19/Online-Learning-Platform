# LearnHub - Online Learning Platform

A modern, responsive online learning platform built with React.js, Express.js, and MongoDB. Features a clean, professional EdTech design with bright colors, soft gradients, and rounded cards.

## Features

- 🎓 **Landing Page** - Hero section, course categories, popular courses, and testimonials
- 📚 **Courses Listing** - Search, filter by category, difficulty, and rating
- 📖 **Course Details** - Comprehensive course information with curriculum accordion
- 👤 **User Dashboard** - Track progress, view enrolled courses, and recommendations
- 🎥 **Video Learning** - Interactive video player with lesson list and notes
- 🔧 **Admin Panel** - Course management, student management, and analytics

## Tech Stack

- **Frontend**: React.js, React Router, Axios, React Icons
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Styling**: CSS3 with modern design system

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
cd project1
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Set up Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning-platform
JWT_SECRET=your-secret-key-change-in-production
```

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services
```

### 6. Seed the Database (Optional)

To populate the database with sample data:

```bash
cd backend
node seed.js
```

### 7. Start the Backend Server

```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 8. Start the Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
project1/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Course.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── users.js
│   │   └── admin.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   ├── CourseCard.js
│   │   │   ├── CategoryCard.js
│   │   │   ├── ProgressBar.js
│   │   │   ├── Accordion.js
│   │   │   ├── ReviewCard.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── LandingPage.js
│   │   │   ├── CoursesPage.js
│   │   │   ├── CourseDetailsPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── VideoLearningPage.js
│   │   │   └── AdminPanel.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses (with filters)
- `GET /api/courses/:id` - Get course by ID
- `GET /api/courses/data/categories` - Get all categories

### Users
- `GET /api/users/:id/dashboard` - Get user dashboard data
- `POST /api/users/:id/enroll` - Enroll in a course
- `POST /api/users/:id/lessons/:lessonId/complete` - Mark lesson as complete

### Admin
- `GET /api/admin/dashboard` - Get admin dashboard stats
- `POST /api/admin/courses` - Create new course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course
- `GET /api/admin/students` - Get all students

## Usage

### Creating an Admin Account

1. Register a new account through the frontend
2. In MongoDB, update the user's role to 'admin':
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Testing the Application

1. Visit `http://localhost:3000` to see the landing page
2. Browse courses at `/courses`
3. View course details by clicking on any course
4. Register/Login to access the dashboard
5. Enroll in courses and track your progress
6. Access admin panel at `/admin` (admin role required)

## Design Features

- Modern gradient backgrounds
- Rounded cards with subtle shadows
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Clean typography and spacing
- Bright color palette with soft gradients
- Neumorphic design elements

## Future Enhancements

- User authentication with JWT tokens
- Payment integration
- Video upload and streaming
- Certificate generation
- Discussion forums
- Live chat support
- Email notifications
- Advanced search and filtering
- Course recommendations based on user behavior

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the repository.


