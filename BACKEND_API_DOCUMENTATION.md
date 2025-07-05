# Backend API Documentation for Digital Profile App

## Overview

This document provides a complete guide for building the backend API for the Digital Profile application. Users can create personalized digital profiles accessible at `/:username` with customizable sections including links, experience, portfolio, and education.

## Table of Contents

1. [Database Schema](#database-schema)
2. [Authentication Endpoints](#authentication-endpoints)
3. [User Management](#user-management)
4. [Profile Management](#profile-management)
5. [Public Profile Access](#public-profile-access)
6. [Data Models](#data-models)
7. [Setup Instructions](#setup-instructions)

---

## Database Schema

### Recommended Database Structure (MongoDB/PostgreSQL)

```javascript
// Users Collection/Table
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  avatar: String (URL, optional),
  isEmailVerified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}

// Profiles Collection/Table
{
  _id: ObjectId,
  userId: ObjectId (reference to Users),
  username: String (reference, indexed),

  // Basic Profile Data
  name: String,
  email: String,
  bio: String,
  title: String,
  location: String,
  profileImage: String (URL),
  resumeUrl: String (URL, optional),
  skills: [String],
  instantMessageSubject: String,

  // Visibility Settings
  visibilitySettings: {
    showLinks: Boolean (default: true),
    showExperience: Boolean (default: true),
    showPortfolio: Boolean (default: true),
    showEducation: Boolean (default: true),
    showTitles: Boolean (default: true)
  },

  // Profile Sections
  links: [{
    id: String,
    title: String,
    description: String,
    href: String,
    icon: String (icon name),
    order: Number
  }],

  experiences: [{
    id: String,
    company: String,
    position: String,
    duration: String,
    location: String,
    description: String,
    achievements: [String],
    icon: String,
    order: Number
  }],

  portfolio: [{
    id: String,
    title: String,
    description: String,
    category: String,
    href: String (optional),
    icon: String,
    images: [{
      id: String,
      url: String,
      title: String,
      description: String
    }],
    order: Number
  }],

  education: [{
    id: String,
    institution: String,
    degree: String,
    duration: String,
    location: String,
    description: String,
    type: String (enum: degree, certification, certificate, course),
    gpa: String (optional),
    websiteUrl: String (optional),
    imageUrl: String (optional),
    icon: String,
    courses: [String],
    achievements: [String],
    order: Number
  }],

  createdAt: Date,
  updatedAt: Date
}
```

---

## Authentication Endpoints

### 1. User Registration

**POST** `/api/auth/register`

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id_here",
      "username": "johndoe",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": null,
      "isEmailVerified": false
    },
    "token": "jwt_token_here"
  }
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "message": "Username already exists",
  "errors": ["Username 'johndoe' is already taken"]
}
```

### 2. User Login

**POST** `/api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id_here",
      "username": "johndoe",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": "https://example.com/avatar.jpg"
    },
    "token": "jwt_token_here"
  }
}
```

### 3. Logout

**POST** `/api/auth/logout`

**Headers:** `Authorization: Bearer jwt_token_here`

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 4. Verify Token

**GET** `/api/auth/verify`

**Headers:** `Authorization: Bearer jwt_token_here`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id_here",
      "username": "johndoe",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

---

## User Management

### 1. Get Current User Profile

**GET** `/api/user/profile`

**Headers:** `Authorization: Bearer jwt_token_here`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id_here",
      "username": "johndoe",
      "email": "john@example.com",
      "name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "isEmailVerified": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 2. Update User Account

**PUT** `/api/user/account`

**Headers:** `Authorization: Bearer jwt_token_here`

**Request Body:**

```json
{
  "name": "John Updated Doe",
  "username": "johnupdated",
  "instantMessageSubject": "Let's Connect!"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Account updated successfully",
  "data": {
    "user": {
      "id": "user_id_here",
      "username": "johnupdated",
      "email": "john@example.com",
      "name": "John Updated Doe"
    }
  }
}
```

### 3. Delete User Account

**DELETE** `/api/user/account`

**Headers:** `Authorization: Bearer jwt_token_here`

**Request Body:**

```json
{
  "username": "johndoe",
  "confirmDeletion": true
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## Profile Management

### 1. Get User's Profile Data

**GET** `/api/profile`

**Headers:** `Authorization: Bearer jwt_token_here`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "profile": {
      "name": "John Doe",
      "email": "john@example.com",
      "bio": "Passionate UI/UX Designer creating beautiful digital experiences",
      "title": "Senior UI/UX Designer",
      "location": "San Francisco, CA",
      "profileImage": "https://example.com/profile.jpg",
      "resumeUrl": "https://example.com/resume.pdf",
      "skills": ["UI Design", "Figma", "React"],
      "instantMessageSubject": "Let's Connect!"
    },
    "visibilitySettings": {
      "showLinks": true,
      "showExperience": true,
      "showPortfolio": true,
      "showEducation": true,
      "showTitles": true
    },
    "links": [
      {
        "id": "link_1",
        "title": "LinkedIn",
        "description": "Connect with me professionally",
        "href": "https://linkedin.com/in/johndoe",
        "icon": "LinkedIn",
        "order": 1
      }
    ],
    "experiences": [
      {
        "id": "exp_1",
        "company": "TechCorp",
        "position": "Senior UI/UX Designer",
        "duration": "2022 - Present",
        "location": "San Francisco, CA",
        "description": "Leading design initiatives for mobile applications",
        "achievements": [
          "Increased user engagement by 40%",
          "Led a team of 5 designers"
        ],
        "icon": "Briefcase",
        "order": 1
      }
    ],
    "portfolio": [
      {
        "id": "portfolio_1",
        "title": "Mobile Banking App",
        "description": "Complete redesign of mobile banking experience",
        "category": "UI/UX Design",
        "href": "https://example.com/project",
        "icon": "Smartphone",
        "images": [
          {
            "id": "img_1",
            "url": "https://example.com/image1.jpg",
            "title": "Login Screen",
            "description": "Clean and intuitive login interface"
          }
        ],
        "order": 1
      }
    ],
    "education": [
      {
        "id": "edu_1",
        "institution": "University of California",
        "degree": "Bachelor of Arts in Design",
        "duration": "2016 - 2020",
        "location": "Berkeley, CA",
        "description": "Focused on digital design and user experience",
        "type": "degree",
        "gpa": "3.8/4.0",
        "websiteUrl": "https://berkeley.edu",
        "imageUrl": "https://example.com/university.jpg",
        "icon": "GraduationCap",
        "courses": ["Design Thinking", "User Research", "Prototyping"],
        "achievements": ["Dean's List", "Design Award 2020"],
        "order": 1
      }
    ]
  }
}
```

### 2. Update Basic Profile Information

**PUT** `/api/profile/basic`

**Headers:** `Authorization: Bearer jwt_token_here`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "bio": "Updated bio text",
  "title": "Senior UI/UX Designer",
  "location": "New York, NY",
  "profileImage": "https://example.com/new-profile.jpg",
  "resumeUrl": "https://example.com/updated-resume.pdf",
  "skills": ["UI Design", "Figma", "React", "TypeScript"],
  "instantMessageSubject": "Let's Collaborate!"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "profile": {
      // Updated profile data
    }
  }
}
```

### 3. Update Visibility Settings

**PUT** `/api/profile/visibility`

**Headers:** `Authorization: Bearer jwt_token_here`

**Request Body:**

```json
{
  "showLinks": true,
  "showExperience": false,
  "showPortfolio": true,
  "showEducation": true,
  "showTitles": false
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Visibility settings updated successfully",
  "data": {
    "visibilitySettings": {
      "showLinks": true,
      "showExperience": false,
      "showPortfolio": true,
      "showEducation": true,
      "showTitles": false
    }
  }
}
```

### 4. Update Links Section

**PUT** `/api/profile/links`

**Headers:** `Authorization: Bearer jwt_token_here`

**Request Body:**

```json
{
  "links": [
    {
      "id": "link_1",
      "title": "LinkedIn",
      "description": "Professional network",
      "href": "https://linkedin.com/in/johndoe",
      "icon": "LinkedIn",
      "order": 1
    },
    {
      "id": "link_2",
      "title": "GitHub",
      "description": "Code repository",
      "href": "https://github.com/johndoe",
      "icon": "GitHub",
      "order": 2
    }
  ]
}
```

### 5. Update Experience Section

**PUT** `/api/profile/experiences`

**Headers:** `Authorization: Bearer jwt_token_here`

**Request Body:**

```json
{
  "experiences": [
    {
      "id": "exp_1",
      "company": "TechCorp Inc.",
      "position": "Senior UI/UX Designer",
      "duration": "2022 - Present",
      "location": "San Francisco, CA",
      "description": "Leading design initiatives",
      "achievements": [
        "Increased user engagement by 40%",
        "Led design team of 5 people"
      ],
      "icon": "Briefcase",
      "order": 1
    }
  ]
}
```

### 6. Update Portfolio Section

**PUT** `/api/profile/portfolio`

**Headers:** `Authorization: Bearer jwt_token_here`

**Request Body:**

```json
{
  "portfolio": [
    {
      "id": "portfolio_1",
      "title": "Mobile Banking App",
      "description": "Complete redesign project",
      "category": "UI/UX Design",
      "href": "https://example.com/project",
      "icon": "Smartphone",
      "images": [
        {
          "id": "img_1",
          "url": "https://example.com/image1.jpg",
          "title": "Login Screen",
          "description": "Clean login interface"
        }
      ],
      "order": 1
    }
  ]
}
```

### 7. Update Education Section

**PUT** `/api/profile/education`

**Headers:** `Authorization: Bearer jwt_token_here`

**Request Body:**

```json
{
  "education": [
    {
      "id": "edu_1",
      "institution": "University of California",
      "degree": "Bachelor of Arts in Design",
      "duration": "2016 - 2020",
      "location": "Berkeley, CA",
      "description": "Focused on digital design",
      "type": "degree",
      "gpa": "3.8/4.0",
      "websiteUrl": "https://berkeley.edu",
      "imageUrl": "https://example.com/university.jpg",
      "icon": "GraduationCap",
      "courses": ["Design Thinking", "User Research"],
      "achievements": ["Dean's List"],
      "order": 1
    }
  ]
}
```

---

## Public Profile Access

### 1. Get Public Profile by Username

**GET** `/api/public/:username`

**Parameters:**

- `username` (string): The username of the profile to fetch

**Example:** `/api/public/johndoe`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "username": "johndoe",
    "profile": {
      "name": "John Doe",
      "bio": "Passionate UI/UX Designer",
      "title": "Senior UI/UX Designer",
      "location": "San Francisco, CA",
      "profileImage": "https://example.com/profile.jpg",
      "resumeUrl": "https://example.com/resume.pdf",
      "skills": ["UI Design", "Figma", "React"]
    },
    "visibilitySettings": {
      "showLinks": true,
      "showExperience": true,
      "showPortfolio": true,
      "showEducation": true,
      "showTitles": true
    },
    "sections": {
      "links": [
        // Only included if visibilitySettings.showLinks is true
      ],
      "experiences": [
        // Only included if visibilitySettings.showExperience is true
      ],
      "portfolio": [
        // Only included if visibilitySettings.showPortfolio is true
      ],
      "education": [
        // Only included if visibilitySettings.showEducation is true
      ]
    }
  }
}
```

**Response (Not Found - 404):**

```json
{
  "success": false,
  "message": "Profile not found",
  "error": "No profile found for username 'johndoe'"
}
```

### 2. Check Username Availability

**GET** `/api/public/check-username/:username`

**Parameters:**

- `username` (string): Username to check

**Response (Available - 200):**

```json
{
  "success": true,
  "available": true,
  "message": "Username is available"
}
```

**Response (Taken - 200):**

```json
{
  "success": true,
  "available": false,
  "message": "Username is already taken"
}
```

---

## Data Models

### Profile Data Structure

```typescript
interface PersonProfile {
  name: string;
  email: string;
  bio: string;
  title: string;
  location: string;
  profileImage: string;
  resumeUrl?: string;
  skills?: string[];
  instantMessageSubject: string;
}

interface VisibilitySettings {
  showLinks: boolean;
  showExperience: boolean;
  showPortfolio: boolean;
  showEducation: boolean;
  showTitles: boolean;
}

interface ProjectLink {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  order: number;
}

interface WorkExperience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  icon: string;
  order: number;
}

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  href?: string;
  icon: string;
  images: PortfolioImage[];
  order: number;
}

interface PortfolioImage {
  id: string;
  url: string;
  title: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  description: string;
  type: "degree" | "certification" | "certificate" | "course";
  gpa?: string;
  websiteUrl?: string;
  imageUrl?: string;
  icon: string;
  courses: string[];
  achievements: string[];
  order: number;
}
```

---

## Setup Instructions

### 1. Basic Express Server Setup

```javascript
// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose"); // For MongoDB
// const { Pool } = require('pg'); // For PostgreSQL

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Database connection (MongoDB example)
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/digitalprofile",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/public", require("./routes/public"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. Environment Variables (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/digitalprofile
# OR for PostgreSQL:
# DATABASE_URL=postgresql://username:password@localhost:5432/digitalprofile

# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=7d

# Email Configuration (for verification)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload (if using cloud storage)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1
```

### 3. Required Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1",
    "express-rate-limit": "^6.10.0",
    "multer": "^1.4.5-lts.1",
    "nodemailer": "^6.9.4"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### 4. Sample Route Structure

```javascript
// routes/profile.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth"); // JWT verification middleware
const Profile = require("../models/Profile");

// GET /api/profile - Get user's profile data
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data: { profile },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// PUT /api/profile/basic - Update basic profile info
router.put("/basic", auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: req.body },
      { new: true, upsert: true },
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { profile },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
```

### 5. Authentication Middleware

```javascript
// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
```

---

## Important Notes

1. **Security**: Always hash passwords using bcrypt, use HTTPS in production, and implement rate limiting.

2. **Validation**: Use express-validator or similar libraries to validate all incoming data.

3. **Error Handling**: Implement comprehensive error handling for all routes.

4. **File Uploads**: For profile images and portfolio images, consider using cloud storage (AWS S3, Cloudinary) instead of local storage.

5. **Database Indexing**: Create indexes on frequently queried fields like username, email, and userId.

6. **Caching**: Consider implementing Redis caching for frequently accessed public profiles.

7. **API Versioning**: Prefix your routes with version numbers (e.g., `/api/v1/profile`).

This documentation provides a complete foundation for building your backend. Start with the basic Express setup, implement authentication, then gradually add the profile management features. Each endpoint is designed to work seamlessly with your existing frontend components.
