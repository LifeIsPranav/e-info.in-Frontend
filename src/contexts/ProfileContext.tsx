import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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

interface VisibilitySettings {
  showLinks: boolean;
  showExperience: boolean;
  showPortfolio: boolean;
  showEducation: boolean;
  showTitles: boolean;
}

interface ProfileContextType {
  // Profile data
  profile: PersonProfile;
  projects: ProjectLink[];
  portfolioProjects: PortfolioProject[];
  workExperiences: WorkExperienceData[];
  education: EducationData[];

  // Visibility settings
  visibilitySettings: VisibilitySettings;

  // Update functions
  updateProfile: (profile: PersonProfile) => void;
  updateProjects: (projects: ProjectLink[]) => void;
  updatePortfolioProjects: (projects: PortfolioProject[]) => void;
  updateWorkExperiences: (experiences: WorkExperienceData[]) => void;
  updateEducation: (education: EducationData[]) => void;
  updateVisibilitySettings: (settings: VisibilitySettings) => void;

  // Utility functions
  initializeWithUserData: (userData: any) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = "fusion_profile_data";

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
  const [visibilitySettings, setVisibilitySettings] =
    useState<VisibilitySettings>({
      showLinks: true,
      showExperience: true,
      showPortfolio: true,
      showEducation: true,
      showTitles: true,
    });

  // Clear localStorage once on mount to avoid React element issues
  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
    console.log("Cleared localStorage to prevent React element errors");
  }, []);

  // Save data to localStorage whenever state changes (disabled to prevent loops)
  // useEffect(() => {
  //   try {
  //     const dataToSave = {
  //       profile,
  //       projects,
  //       portfolioProjects,
  //       workExperiences,
  //       education,
  //     };
  //     localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  //   } catch (error) {
  //     console.warn("Failed to save profile data to localStorage:", error);
  //   }
  // }, [profile, projects, portfolioProjects, workExperiences, education]);

  const updateProfile = useCallback((newProfile: PersonProfile) => {
    setProfile(newProfile);
    console.log("Profile updated:", newProfile);
  }, []);

  const updateProjects = useCallback((newProjects: ProjectLink[]) => {
    setProjects(newProjects);
    console.log("Projects updated:", newProjects);
  }, []);

  const updatePortfolioProjects = useCallback(
    (newProjects: PortfolioProject[]) => {
      setPortfolioProjects(newProjects);
      console.log("Portfolio projects updated:", newProjects);
    },
    [],
  );

  const updateWorkExperiences = useCallback(
    (newExperiences: WorkExperienceData[]) => {
      setWorkExperiences(newExperiences);
      console.log("Work experiences updated:", newExperiences);
    },
    [],
  );

  const updateEducation = useCallback((newEducation: EducationData[]) => {
    setEducation(newEducation);
    console.log("Education updated:", newEducation);
  }, []);

  const updateVisibilitySettings = useCallback(
    (newSettings: VisibilitySettings) => {
      setVisibilitySettings(newSettings);
      console.log("Visibility settings updated:", newSettings);
    },
    [],
  );

  const initializeWithUserData = useCallback((userData: any) => {
    if (userData) {
      setProfile((prev) => ({
        ...prev,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
        profileImage: userData.avatar || prev.profileImage,
      }));
    }
  }, []); // Empty dependency array since we use functional state update

  const value: ProfileContextType = {
    profile,
    projects,
    portfolioProjects,
    workExperiences,
    education,
    visibilitySettings,
    updateProfile,
    updateProjects,
    updatePortfolioProjects,
    updateWorkExperiences,
    updateEducation,
    updateVisibilitySettings,
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
