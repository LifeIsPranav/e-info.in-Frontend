import React, { createContext, useContext, useState, useEffect } from "react";
import {
  PersonProfile,
  ProjectLink,
  defaultProfile,
  defaultProjects,
} from "@/lib/profileData";
import {
  PortfolioProject,
  defaultPortfolioProjects,
} from "@/lib/portfolioData";
import {
  WorkExperienceData,
  defaultWorkExperiences,
} from "@/lib/workExperienceData";
import type { EducationData } from "@/components/Education";
import { defaultEducation } from "@/lib/educationData";

interface ProfileContextType {
  // Profile data
  profile: PersonProfile;
  projects: ProjectLink[];
  portfolioProjects: PortfolioProject[];
  workExperiences: WorkExperienceData[];
  education: EducationData[];

  // Update functions
  updateProfile: (profile: PersonProfile) => void;
  updateProjects: (projects: ProjectLink[]) => void;
  updatePortfolioProjects: (projects: PortfolioProject[]) => void;
  updateWorkExperiences: (experiences: WorkExperienceData[]) => void;
  updateEducation: (education: EducationData[]) => void;

  // Utility functions
  initializeWithUserData: (userData: any) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = "fusion_profile_data";

// Utility function to clean React elements from objects
const cleanReactElements = (obj: any): any => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map(cleanReactElements);

  // If it's a React element, return null
  if (obj.$$typeof || obj._owner || obj.props) return null;

  // Clean object properties
  const cleaned: any = {};
  for (const [key, value] of Object.entries(obj)) {
    cleaned[key] = cleanReactElements(value);
  }
  return cleaned;
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with default values
  const [profile, setProfile] = useState<PersonProfile>(defaultProfile);
  const [projects, setProjects] = useState<ProjectLink[]>(defaultProjects);
  const [portfolioProjects, setPortfolioProjects] = useState<
    PortfolioProject[]
  >(defaultPortfolioProjects);
  const [workExperiences, setWorkExperiences] = useState<WorkExperienceData[]>(
    defaultWorkExperiences,
  );
  const [education, setEducation] = useState<EducationData[]>(defaultEducation);

  // Load data from localStorage on mount
  useEffect(() => {
    // Always clear localStorage on mount to avoid React element issues
    console.log("Clearing localStorage to prevent React element errors");
    localStorage.removeItem(STORAGE_KEY);

    // Use default data
    setProfile(defaultProfile);
    setProjects(defaultProjects);
    setPortfolioProjects(defaultPortfolioProjects);
    setWorkExperiences(defaultWorkExperiences);
    setEducation(defaultEducation);
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    try {
      const dataToSave = {
        profile,
        projects,
        portfolioProjects,
        workExperiences,
        education,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
      console.warn("Failed to save profile data to localStorage:", error);
    }
  }, [profile, projects, portfolioProjects, workExperiences, education]);

  const updateProfile = (newProfile: PersonProfile) => {
    setProfile(newProfile);
    console.log("Profile updated:", newProfile);
  };

  const updateProjects = (newProjects: ProjectLink[]) => {
    setProjects(newProjects);
    console.log("Projects updated:", newProjects);
  };

  const updatePortfolioProjects = (newProjects: PortfolioProject[]) => {
    setPortfolioProjects(newProjects);
    console.log("Portfolio projects updated:", newProjects);
  };

  const updateWorkExperiences = (newExperiences: WorkExperienceData[]) => {
    setWorkExperiences(newExperiences);
    console.log("Work experiences updated:", newExperiences);
  };

  const updateEducation = (newEducation: EducationData[]) => {
    setEducation(newEducation);
    console.log("Education updated:", newEducation);
  };

  const initializeWithUserData = (userData: any) => {
    if (userData) {
      setProfile((prev) => ({
        ...prev,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
        profileImage: userData.avatar || prev.profileImage,
      }));
    }
  };

  const value: ProfileContextType = {
    profile,
    projects,
    portfolioProjects,
    workExperiences,
    education,
    updateProfile,
    updateProjects,
    updatePortfolioProjects,
    updateWorkExperiences,
    updateEducation,
    initializeWithUserData,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
