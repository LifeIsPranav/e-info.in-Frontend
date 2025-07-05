# Frontend-Backend Integration Guide

This guide explains how to connect the frontend with the backend API and configure everything properly.

## Table of Contents

1. [Quick Setup](#quick-setup)
2. [Environment Configuration](#environment-configuration)
3. [Using API Services](#using-api-services)
4. [Authentication Flow](#authentication-flow)
5. [Profile Management](#profile-management)
6. [Error Handling](#error-handling)
7. [Testing the Integration](#testing-the-integration)

---

## Quick Setup

### 1. Copy Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your backend URL
# VITE_API_BASE_URL=http://localhost:5000/api
```

### 2. Install Additional Dependencies (if needed)

The project already includes all necessary dependencies, but if you encounter issues:

```bash
npm install
```

### 3. Update ProfileContext to Use Backend

The existing `ProfileContext` needs to be modified to use the backend API instead of local state.

---

## Environment Configuration

### Frontend (.env)

```env
# Required - Backend API URL
VITE_API_BASE_URL=http://localhost:5000/api

# Optional - Feature flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SEARCH=true
VITE_ENABLE_FILE_UPLOAD=true

# Optional - File upload limits
VITE_MAX_FILE_SIZE=5242880
VITE_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp
```

### Backend (.env) - For your backend server

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/digitalprofile

# JWT
JWT_SECRET=your-super-secure-secret-key-here
JWT_EXPIRES_IN=7d

# File Upload (if using cloud storage)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_BUCKET_NAME=your-bucket-name
```

---

## Using API Services

### Basic API Calls

```typescript
import { api } from "@/services/api";

// Login user
const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.login({ email, password });
    if (response.success) {
      console.log("User logged in:", response.data?.user);
      // Token is automatically stored in localStorage
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

// Get user profile
const fetchProfile = async () => {
  try {
    const response = await api.getProfile();
    if (response.success) {
      console.log("Profile data:", response.data);
    }
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
};

// Update profile
const updateProfile = async (profileData) => {
  try {
    const response = await api.updateBasicProfile(profileData);
    if (response.success) {
      console.log("Profile updated successfully");
    }
  } catch (error) {
    console.error("Failed to update profile:", error);
  }
};
```

### Using React Hooks

```typescript
import { useAuth, useProfile } from '@/hooks/useApi';

function LoginComponent() {
  const { login, loading, error } = useAuth();

  const handleLogin = async () => {
    const result = await login({
      email: 'user@example.com',
      password: 'password123'
    });

    if (result?.success) {
      // Login successful - navigate to dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <button onClick={handleLogin} disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>
  );
}

function ProfileEditor() {
  const { updateBasicProfile, loading } = useProfile();

  const handleSave = async (profileData) => {
    const result = await updateBasicProfile(profileData);
    if (result?.success) {
      // Profile updated - show success message
      console.log('Profile saved successfully');
    }
  };

  return (
    <button onClick={() => handleSave(profileData)} disabled={loading}>
      {loading ? 'Saving...' : 'Save Profile'}
    </button>
  );
}
```

---

## Authentication Flow

### 1. Update AuthContext to Use Backend

```typescript
// src/contexts/AuthContext.tsx (modified)
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await api.verifyToken();
          if (response.success && response.data?.user) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        return response;
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 2. Update ProfileContext to Use Backend

```typescript
// src/contexts/ProfileContext.tsx (modified)
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';
import { useAuth } from './AuthContext';

const ProfileContext = createContext(undefined);

export function ProfileProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [visibilitySettings, setVisibilitySettings] = useState({
    showLinks: true,
    showExperience: true,
    showPortfolio: true,
    showEducation: true,
    showTitles: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load profile data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadProfileData();
    }
  }, [isAuthenticated, user]);

  const loadProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await api.getProfile();

      if (response.success && response.data) {
        const data = response.data;
        setProfile(data.profile);
        setProjects(data.links || []);
        setPortfolioProjects(data.portfolio || []);
        setWorkExperiences(data.experiences || []);
        setEducation(data.education || []);
        setVisibilitySettings(data.visibilitySettings || visibilitySettings);
      }
    } catch (error) {
      console.error('Failed to load profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (newProfile) => {
    try {
      const response = await api.updateBasicProfile(newProfile);
      if (response.success) {
        setProfile(newProfile);
      }
      return response;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const updateProjects = async (newProjects) => {
    try {
      const response = await api.updateLinks(newProjects);
      if (response.success) {
        setProjects(newProjects);
      }
      return response;
    } catch (error) {
      console.error('Failed to update projects:', error);
      throw error;
    }
  };

  // Similar update functions for other sections...

  return (
    <ProfileContext.Provider value={{
      profile,
      projects,
      portfolioProjects,
      workExperiences,
      education,
      visibilitySettings,
      isLoading,
      updateProfile,
      updateProjects,
      updatePortfolioProjects,
      updateWorkExperiences,
      updateEducation,
      updateVisibilitySettings,
      loadProfileData,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}
```

---

## Profile Management

### Loading Profile Data

```typescript
// In any component
import { useProfile } from '@/contexts/ProfileContext';

function ProfileComponent() {
  const {
    profile,
    projects,
    visibilitySettings,
    isLoading,
    updateProfile
  } = useProfile();

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  const handleUpdateProfile = async (newData) => {
    try {
      await updateProfile(newData);
      // Success notification will be shown automatically
    } catch (error) {
      // Error notification will be shown automatically
      console.error('Update failed:', error);
    }
  };

  return (
    <div>
      <h1>{profile?.name}</h1>
      <p>{profile?.bio}</p>
      {/* Your profile UI here */}
    </div>
  );
}
```

### File Upload Example

```typescript
import { useFileUpload } from '@/hooks/useApi';

function ImageUpload() {
  const { uploadFile, loading } = useFileUpload();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, 'profile');
      if (result?.success && result.data?.url) {
        // Use the uploaded file URL
        console.log('File uploaded:', result.data.url);
        // Update profile with new image URL
        updateProfile({ ...profile, profileImage: result.data.url });
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
      }}
      disabled={loading}
    />
  );
}
```

---

## Error Handling

### Global Error Handler

```typescript
// src/utils/errorHandler.ts
export const handleApiError = (error: any) => {
  console.error("API Error:", error);

  // Handle specific error types
  if (error.message?.includes("401")) {
    // Unauthorized - redirect to login
    localStorage.removeItem("authToken");
    window.location.href = "/auth";
    return;
  }

  if (error.message?.includes("403")) {
    // Forbidden - show access denied message
    alert("Access denied. You do not have permission to perform this action.");
    return;
  }

  if (error.message?.includes("404")) {
    // Not found - handle gracefully
    console.log("Resource not found");
    return;
  }

  // Generic error handling
  alert("An error occurred. Please try again.");
};
```

### Component Error Boundaries

```typescript
// src/components/ErrorBoundary.tsx (update existing)
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Send error to monitoring service in production
    if (import.meta.env.PROD) {
      // Send to Sentry, LogRocket, etc.
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We're sorry for the inconvenience. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## Testing the Integration

### 1. Start Backend Server

```bash
# In your backend directory
npm start
# Server should be running on http://localhost:5000
```

### 2. Start Frontend Development Server

```bash
# In your frontend directory
npm run dev
# Frontend should be running on http://localhost:8080
```

### 3. Test Authentication

1. Go to `/auth` and try registering a new account
2. Try logging in with the created account
3. Check if the token is stored in localStorage
4. Navigate to `/mycard` and see if profile loads

### 4. Test Profile Updates

1. Edit profile information in `/mycard`
2. Check browser network tab to see API calls
3. Verify data is saved by refreshing the page

### 5. Test Public Profile

1. Create a profile with username "johndoe"
2. Visit `/johndoe` to see the public profile
3. Test visibility settings by toggling sections

---

## Common Issues and Solutions

### 1. CORS Errors

**Problem:** Browser blocks API requests due to CORS policy.

**Solution:** Configure CORS in your backend:

```javascript
// In your backend server.js
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    credentials: true,
  }),
);
```

### 2. Token Expiration

**Problem:** User gets logged out unexpectedly.

**Solution:** Implement token refresh or extend token expiry time in backend.

### 3. Network Errors

**Problem:** API calls fail due to network issues.

**Solution:** Implement retry logic and offline detection:

```typescript
// In api.ts
const makeRequestWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

### 4. Environment Variables Not Loading

**Problem:** API calls go to wrong URL.

**Solution:**

- Ensure `.env` file is in project root
- Restart development server after changing `.env`
- Use `console.log(import.meta.env.VITE_API_BASE_URL)` to debug

---

## Deployment Configuration

### Production Environment Variables

```env
# Production .env
VITE_API_BASE_URL=https://your-backend-domain.com/api
VITE_ENABLE_ANALYTICS=true
VITE_SENTRY_DSN=your-production-sentry-dsn
```

### Build and Deploy

```bash
# Build for production
npm run build

# The dist/ folder contains your built frontend
# Deploy this to your hosting service (Vercel, Netlify, etc.)
```

This integration guide provides everything you need to connect your frontend with the backend API. The API service handles all the HTTP requests, the hooks provide React-friendly interfaces, and the context manages global state with backend synchronization.
