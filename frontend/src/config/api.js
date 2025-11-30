// Use REACT_APP_API_URL for Vercel deployment, fallback to production URL or localhost
const API_BASE_URL = 
  process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === "production"
    ? "https://online-learning-platform-1-akti.onrender.com/api"
    : "http://localhost:5001/api");

export default API_BASE_URL;
