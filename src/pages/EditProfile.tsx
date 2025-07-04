import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import EditableProfileSection from "@/components/EditableProfileSection";
import EditableLinksSection from "@/components/EditableLinksSection";
import EditablePortfolioSection from "@/components/EditablePortfolioSection";
import EditableExperienceSection from "@/components/EditableExperienceSection";
import EditableEducationSection from "@/components/EditableEducationSection";
import Logo from "@/components/Logo";
import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
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

const EditProfile = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PersonProfile>(defaultProfile);
  const [projects, setProjects] = useState<ProjectLink[]>(defaultProjects);
  const [portfolioProjects, setPortfolioProjects] = useState<
    PortfolioProject[]
  >(defaultPortfolioProjects);
  const [workExperiences, setWorkExperiences] = useState<WorkExperienceData[]>(
    defaultWorkExperiences,
  );
  const [education, setEducation] = useState<EducationData[]>(defaultEducation);

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Initialize profile with user data if available
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        profileImage: user.avatar || prev.profileImage,
      }));
    }
  }, [user]);

  const handleProfileUpdate = (updatedProfile: PersonProfile) => {
    setProfile(updatedProfile);
    // Here you would typically save to a backend
    console.log("Profile updated:", updatedProfile);
  };

  const handleProjectsUpdate = (updatedProjects: ProjectLink[]) => {
    setProjects(updatedProjects);
    // Here you would typically save to a backend
    console.log("Projects updated:", updatedProjects);
  };

  const handlePortfolioProjectsUpdate = (
    updatedPortfolioProjects: PortfolioProject[],
  ) => {
    setPortfolioProjects(updatedPortfolioProjects);
    // Here you would typically save to a backend
    console.log("Portfolio projects updated:", updatedPortfolioProjects);
  };

  const handleWorkExperiencesUpdate = (
    updatedWorkExperiences: WorkExperienceData[],
  ) => {
    setWorkExperiences(updatedWorkExperiences);
    // Here you would typically save to a backend
    console.log("Work experiences updated:", updatedWorkExperiences);
  };

  const handleEducationUpdate = (updatedEducation: EducationData[]) => {
    setEducation(updatedEducation);
    // Here you would typically save to a backend
    console.log("Education updated:", updatedEducation);
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading..." />
      </div>
    );
  }

  // Redirect will handle navigation for unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Logo />
      </div>

      {/* Navigation - Top Right */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          size="sm"
          className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <AuthButton />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-lg mx-auto pt-16 pb-16 space-y-8">
        {/* Info Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            My Profile
          </h2>
          <p className="text-gray-600 text-sm">
            Customize your digital card and links below
          </p>
        </div>

        {/* Editable Profile Section */}
        <EditableProfileSection
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
        />

        {/* Editable Links Section */}
        <EditableLinksSection
          projects={projects}
          onProjectsUpdate={handleProjectsUpdate}
        />

        {/* Editable Experience Section */}
        <EditableExperienceSection
          experiences={workExperiences}
          onExperiencesUpdate={handleWorkExperiencesUpdate}
        />

        {/* Editable Portfolio Section */}
        <EditablePortfolioSection
          projects={portfolioProjects}
          onProjectsUpdate={handlePortfolioProjectsUpdate}
        />

        {/* Editable Education Section */}
        <EditableEducationSection
          education={education}
          onEducationUpdate={handleEducationUpdate}
        />
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
