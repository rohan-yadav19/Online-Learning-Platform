#!/bin/bash

# Script to add courses to production database
# Usage: ./addToProduction.sh YOUR_MONGODB_URI

if [ -z "$1" ]; then
    echo "❌ Error: MongoDB URI required"
    echo "Usage: ./addToProduction.sh YOUR_MONGODB_URI"
    echo ""
    echo "Example:"
    echo "./addToProduction.sh mongodb+srv://user:pass@cluster.mongodb.net/dbname"
    exit 1
fi

echo "🚀 Adding courses to production database..."
echo "📡 MongoDB URI: ${1:0:20}..." # Show first 20 chars only

MONGODB_URI="$1" node addCourses.js

echo ""
echo "✅ Done! Check your production API:"
echo "   curl https://online-learning-platform-1-akti.onrender.com/api/courses"

