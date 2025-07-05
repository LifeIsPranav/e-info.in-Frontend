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

## Additional Endpoints (Missing from Initial Documentation)

### File Upload

**POST** `/api/upload`

**Headers:** `Authorization: Bearer jwt_token_here`, `Content-Type: multipart/form-data`

**Request Body (Form Data):**

```
file: [File] - The file to upload
type: "profile" | "portfolio" | "education" - The context of the upload
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "url": "https://your-cdn.com/uploads/1234567890-filename.jpg",
    "fileName": "profile-image.jpg",
    "fileSize": 2048576,
    "fileType": "image/jpeg"
  }
}
```

### Search and Discovery

**GET** `/api/public/search`

**Query Parameters:**

- `q` (string): Search query
- `limit` (number, optional): Number of results (default: 10, max: 50)

**Example:** `/api/public/search?q=designer&limit=5`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "profiles": [
      {
        "username": "johndoe",
        "name": "John Doe",
        "title": "Senior UI/UX Designer",
        "profileImage": "https://example.com/profile.jpg",
        "bio": "Passionate designer creating beautiful experiences",
        "location": "San Francisco, CA"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 5
  }
}
```

### Analytics

**GET** `/api/analytics/profile`

**Headers:** `Authorization: Bearer jwt_token_here`

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "totalViews": 1250,
    "weeklyViews": 85,
    "monthlyViews": 340,
    "topReferrers": [
      { "source": "google.com", "count": 45 },
      { "source": "linkedin.com", "count": 32 },
      { "source": "direct", "count": 28 }
    ],
    "viewsHistory": [
      { "date": "2024-01-01", "views": 12 },
      { "date": "2024-01-02", "views": 15 }
    ],
    "popularSections": [
      { "section": "portfolio", "views": 420 },
      { "section": "experience", "views": 380 },
      { "section": "links", "views": 290 }
    ]
  }
}
```

**POST** `/api/analytics/view`

**Request Body:**

```json
{
  "username": "johndoe",
  "referrer": "https://google.com",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "View tracked successfully"
}
```

### Password Reset

**POST** `/api/auth/forgot-password`

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Password reset email sent successfully"
}
```

**POST** `/api/auth/reset-password`

**Request Body:**

```json
{
  "token": "reset-token-from-email",
  "newPassword": "newSecurePassword123"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

### Email Verification

**POST** `/api/auth/request-verification`

**Headers:** `Authorization: Bearer jwt_token_here`

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Verification email sent successfully"
}
```

**POST** `/api/auth/verify-email`

**Request Body:**

```json
{
  "token": "verification-token-from-email"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": {
    "user": {
      "id": "user_id_here",
      "email": "john@example.com",
      "isEmailVerified": true
    }
  }
}
```

### Admin/Moderation Endpoints (Optional)

**GET** `/api/admin/users`

**Headers:** `Authorization: Bearer admin_jwt_token_here`

**Query Parameters:**

- `page` (number): Page number
- `limit` (number): Items per page
- `search` (string): Search term

**Response (Success - 200):**

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_id",
        "username": "johndoe",
        "email": "john@example.com",
        "name": "John Doe",
        "isEmailVerified": true,
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "lastLogin": "2024-01-15T12:00:00.000Z"
      }
    ],
    "total": 150,
    "page": 1,
    "limit": 20
  }
}
```

**PUT** `/api/admin/users/:userId/status`

**Headers:** `Authorization: Bearer admin_jwt_token_here`

**Request Body:**

```json
{
  "isActive": false,
  "reason": "Violation of terms of service"
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

### 4. Complete Route Structure

```javascript
// routes/profile.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");
const { body, validationResult } = require("express-validator");

// GET /api/profile - Get user's complete profile data
router.get("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ userId: req.user.id });

    // Create default profile if none exists
    if (!profile) {
      profile = new Profile({
        userId: req.user.id,
        username: req.user.username,
        profile: {
          name: req.user.name,
          email: req.user.email,
          bio: "",
          title: "",
          location: "",
          profileImage: req.user.avatar || "",
          skills: [],
          instantMessageSubject: "Let's Connect!",
        },
        visibilitySettings: {
          showLinks: true,
          showExperience: true,
          showPortfolio: true,
          showEducation: true,
          showTitles: true,
        },
        links: [],
        experiences: [],
        portfolio: [],
        education: [],
      });
      await profile.save();
    }

    res.json({
      success: true,
      data: {
        profile: profile.profile,
        visibilitySettings: profile.visibilitySettings,
        links: profile.links,
        experiences: profile.experiences,
        portfolio: profile.portfolio,
        education: profile.education,
      },
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
router.put(
  "/basic",
  [
    auth,
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: errors.array(),
        });
      }

      const profile = await Profile.findOneAndUpdate(
        { userId: req.user.id },
        {
          $set: {
            profile: req.body,
            updatedAt: new Date(),
          },
        },
        { new: true, upsert: true },
      );

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: { profile: profile.profile },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

// PUT /api/profile/visibility - Update visibility settings
router.put("/visibility", auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          visibilitySettings: req.body,
          updatedAt: new Date(),
        },
      },
      { new: true, upsert: true },
    );

    res.json({
      success: true,
      message: "Visibility settings updated successfully",
      data: { visibilitySettings: profile.visibilitySettings },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// PUT /api/profile/links - Update links section
router.put("/links", auth, async (req, res) => {
  try {
    const { links } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          links: links,
          updatedAt: new Date(),
        },
      },
      { new: true, upsert: true },
    );

    res.json({
      success: true,
      message: "Links updated successfully",
      data: { links: profile.links },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// PUT /api/profile/experiences - Update experiences section
router.put("/experiences", auth, async (req, res) => {
  try {
    const { experiences } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          experiences: experiences,
          updatedAt: new Date(),
        },
      },
      { new: true, upsert: true },
    );

    res.json({
      success: true,
      message: "Experiences updated successfully",
      data: { experiences: profile.experiences },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// PUT /api/profile/portfolio - Update portfolio section
router.put("/portfolio", auth, async (req, res) => {
  try {
    const { portfolio } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          portfolio: portfolio,
          updatedAt: new Date(),
        },
      },
      { new: true, upsert: true },
    );

    res.json({
      success: true,
      message: "Portfolio updated successfully",
      data: { portfolio: profile.portfolio },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// PUT /api/profile/education - Update education section
router.put("/education", auth, async (req, res) => {
  try {
    const { education } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        $set: {
          education: education,
          updatedAt: new Date(),
        },
      },
      { new: true, upsert: true },
    );

    res.json({
      success: true,
      message: "Education updated successfully",
      data: { education: profile.education },
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

### 5. File Upload Route

```javascript
// routes/upload.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middleware/auth");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Allow only images and PDFs
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images and PDFs are allowed"));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: fileFilter,
});

// POST /api/upload - Upload file
router.post("/", auth, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: fileUrl,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
});

module.exports = router;
```

### 6. Public Profile Route

```javascript
// routes/public.js
const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const User = require("../models/User");
const Analytics = require("../models/Analytics");

// GET /api/public/:username - Get public profile
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Find profile data
    const profile = await Profile.findOne({ userId: user._id });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Track profile view (optional - for analytics)
    try {
      await Analytics.create({
        profileId: profile._id,
        type: "view",
        timestamp: new Date(),
        metadata: {
          userAgent: req.headers["user-agent"],
          referrer: req.headers.referer || "direct",
        },
      });
    } catch (analyticsError) {
      console.error("Analytics tracking failed:", analyticsError);
    }

    // Filter sections based on visibility settings
    const sections = {};

    if (profile.visibilitySettings.showLinks && profile.links.length > 0) {
      sections.links = profile.links;
    }

    if (
      profile.visibilitySettings.showExperience &&
      profile.experiences.length > 0
    ) {
      sections.experiences = profile.experiences;
    }

    if (
      profile.visibilitySettings.showPortfolio &&
      profile.portfolio.length > 0
    ) {
      sections.portfolio = profile.portfolio;
    }

    if (
      profile.visibilitySettings.showEducation &&
      profile.education.length > 0
    ) {
      sections.education = profile.education;
    }

    res.json({
      success: true,
      data: {
        username: user.username,
        profile: profile.profile,
        visibilitySettings: profile.visibilitySettings,
        sections: sections,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// GET /api/public/check-username/:username - Check username availability
router.get("/check-username/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const existingUser = await User.findOne({ username });

    res.json({
      success: true,
      available: !existingUser,
      message: existingUser
        ? "Username is already taken"
        : "Username is available",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// GET /api/public/search - Search profiles
router.get("/search", async (req, res) => {
  try {
    const { q: query, limit = 10 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters long",
      });
    }

    const searchLimit = Math.min(parseInt(limit), 50);

    // Search in users and profiles
    const profiles = await Profile.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          $or: [
            { "user.username": { $regex: query, $options: "i" } },
            { "user.name": { $regex: query, $options: "i" } },
            { "profile.title": { $regex: query, $options: "i" } },
            { "profile.bio": { $regex: query, $options: "i" } },
            { "profile.skills": { $regex: query, $options: "i" } },
          ],
        },
      },
      {
        $project: {
          username: "$user.username",
          name: "$user.name",
          title: "$profile.title",
          profileImage: "$profile.profileImage",
          bio: "$profile.bio",
          location: "$profile.location",
        },
      },
      {
        $limit: searchLimit,
      },
    ]);

    res.json({
      success: true,
      data: {
        profiles: profiles,
        total: profiles.length,
        limit: searchLimit,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
});

module.exports = router;
```

### 5. Database Models

```javascript
// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    avatar: {
      type: String,
      default: "",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
    emailVerificationToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.emailVerificationToken;
  delete user.passwordResetToken;
  delete user.passwordResetExpires;
  return user;
};

module.exports = mongoose.model("User", userSchema);
```

```javascript
// models/Profile.js
const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      index: true,
    },

    // Basic Profile Information
    profile: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      bio: { type: String, default: "" },
      title: { type: String, default: "" },
      location: { type: String, default: "" },
      profileImage: { type: String, default: "" },
      resumeUrl: { type: String, default: "" },
      skills: [{ type: String }],
      instantMessageSubject: { type: String, default: "Let's Connect!" },
    },

    // Visibility Settings
    visibilitySettings: {
      showLinks: { type: Boolean, default: true },
      showExperience: { type: Boolean, default: true },
      showPortfolio: { type: Boolean, default: true },
      showEducation: { type: Boolean, default: true },
      showTitles: { type: Boolean, default: true },
    },

    // Links Section
    links: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        href: { type: String, required: true },
        icon: { type: String, default: "" },
        order: { type: Number, default: 0 },
      },
    ],

    // Experience Section
    experiences: [
      {
        id: { type: String, required: true },
        company: { type: String, required: true },
        position: { type: String, required: true },
        duration: { type: String, required: true },
        location: { type: String, default: "" },
        description: { type: String, default: "" },
        achievements: [{ type: String }],
        icon: { type: String, default: "" },
        order: { type: Number, default: 0 },
      },
    ],

    // Portfolio Section
    portfolio: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, default: "" },
        category: { type: String, default: "" },
        href: { type: String, default: "" },
        icon: { type: String, default: "" },
        images: [
          {
            id: { type: String, required: true },
            url: { type: String, required: true },
            title: { type: String, default: "" },
            description: { type: String, default: "" },
          },
        ],
        order: { type: Number, default: 0 },
      },
    ],

    // Education Section
    education: [
      {
        id: { type: String, required: true },
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        duration: { type: String, required: true },
        location: { type: String, default: "" },
        description: { type: String, default: "" },
        type: {
          type: String,
          enum: ["degree", "certification", "certificate", "course"],
          default: "degree",
        },
        gpa: { type: String, default: "" },
        websiteUrl: { type: String, default: "" },
        imageUrl: { type: String, default: "" },
        icon: { type: String, default: "" },
        courses: [{ type: String }],
        achievements: [{ type: String }],
        order: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Index for searching
profileSchema.index({
  "profile.title": "text",
  "profile.bio": "text",
  "profile.skills": "text",
});

module.exports = mongoose.model("Profile", profileSchema);
```

```javascript
// models/Analytics.js
const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    type: {
      type: String,
      enum: ["view", "link_click", "section_view"],
      required: true,
    },
    metadata: {
      userAgent: String,
      referrer: String,
      ipAddress: String,
      country: String,
      city: String,
      section: String, // For section_view type
      linkUrl: String, // For link_click type
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Index for analytics queries
analyticsSchema.index({ profileId: 1, timestamp: -1 });
analyticsSchema.index({ profileId: 1, type: 1, timestamp: -1 });

module.exports = mongoose.model("Analytics", analyticsSchema);
```

### 6. Authentication Middleware

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

    if (!user || !user.isActive) {
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

### 7. Additional Middleware

```javascript
// middleware/validation.js
const { body, validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }
  next();
};

const validateRegistration = [
  body("username")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),
  handleValidationErrors,
];

const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

module.exports = {
  validateRegistration,
  validateLogin,
  handleValidationErrors,
};
```

```javascript
// middleware/rateLimiter.js
const rateLimit = require("express-rate-limit");

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message,
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 requests per windowMs
  "Too many authentication attempts, please try again later",
);

const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  "Too many requests, please try again later",
);

const uploadLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  10, // limit each IP to 10 uploads per hour
  "Too many file uploads, please try again later",
);

module.exports = {
  authLimiter,
  generalLimiter,
  uploadLimiter,
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
