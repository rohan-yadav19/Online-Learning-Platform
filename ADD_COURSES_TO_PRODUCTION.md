# How to Add Courses to Production

The production database is currently empty. Here are **3 ways** to add courses:

## Method 1: Using MongoDB Connection (Recommended)

This is the easiest method. Run the script locally with your production MongoDB URI.

### Steps:

1. **Get your production MongoDB URI from Render:**
   - Go to your Render dashboard
   - Find your MongoDB service (or MongoDB Atlas connection string)
   - Copy the connection string

2. **Run the script:**
   ```bash
   cd backend
   MONGODB_URI="your-production-mongodb-uri" node addCourses.js
   ```

   Example:
   ```bash
   MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/learning-platform" node addCourses.js
   ```

3. **Verify courses were added:**
   ```bash
   curl https://online-learning-platform-1-akti.onrender.com/api/courses
   ```

---

## Method 2: Using Admin Panel (If you have admin access)

1. **Login to your app as admin:**
   - Go to: https://online-learning-platform-chi-one.vercel.app/login
   - Login with admin credentials

2. **Navigate to Admin Panel:**
   - Go to: https://online-learning-platform-chi-one.vercel.app/admin

3. **Add courses manually:**
   - Click "Add New Course"
   - Fill in the course details
   - Submit

---

## Method 3: Using API with Admin Token

1. **Get admin token:**
   - Login as admin via the frontend
   - Copy the token from localStorage (in browser DevTools)

2. **Use the script:**
   ```bash
   cd backend
   # Edit addCoursesToProduction.js and add your token
   node addCoursesToProduction.js
   ```

   Or use curl:
   ```bash
   curl -X POST https://online-learning-platform-1-akti.onrender.com/api/admin/courses \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
     -d '{
       "title": "Complete Web Development Bootcamp",
       "description": "Master web development...",
       "category": "Technology",
       "price": 89.99,
       "difficulty": "Beginner",
       ...
     }'
   ```

---

## Quick Fix: Run This Command

If you have MongoDB Atlas or know your production MongoDB URI:

```bash
cd /Users/rohan/Desktop/project1/backend
MONGODB_URI="YOUR_PRODUCTION_MONGODB_URI" node addCourses.js
```

Replace `YOUR_PRODUCTION_MONGODB_URI` with your actual MongoDB connection string from Render/MongoDB Atlas.

---

## Verify Courses Are Added

After adding courses, verify they're accessible:

```bash
# Check if courses are returned
curl https://online-learning-platform-1-akti.onrender.com/api/courses

# Should return JSON array with courses
```

Or visit: https://online-learning-platform-chi-one.vercel.app/courses

---

## Troubleshooting

### "Courses not showing"
1. Check browser console for errors
2. Verify API URL is correct in frontend
3. Check CORS settings in backend
4. Verify courses exist in database

### "CORS Error"
- Make sure backend CORS includes your Vercel URL
- Check that both are using HTTPS

### "Empty array returned"
- Courses haven't been added to production database yet
- Use Method 1 above to add courses

