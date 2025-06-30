import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import EditableProfileSection from "@/components/EditableProfileSection";
import EditableLinksSection from "@/components/EditableLinksSection";
import EditablePortfolioSection from "@/components/EditablePortfolioSection";
import EditableExperienceSection from "@/components/EditableExperienceSection";
import Logo from "@/components/Logo";
import AuthButton from "@/components/AuthButton";
import { Link } from "react-router-dom";
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

const EditProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<PersonProfile>(defaultProfile);
  const [projects, setProjects] = useState<ProjectLink[]>(defaultProjects);
  const [portfolioProjects, setPortfolioProjects] = useState<
    PortfolioProject[]
  >(defaultPortfolioProjects);
  const [workExperiences, setWorkExperiences] = useState<WorkExperienceData[]>(
    defaultWorkExperiences,
  );

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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Logo />
      </div>

      {/* Navigation - Top Right */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <Link
          to="/demo"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Demo
        </Link>
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Home
        </Link>
        <AuthButton />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-lg mx-auto pt-16 pb-8 space-y-8">
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

        {/* Editable Portfolio Section */}
        <EditablePortfolioSection
          projects={portfolioProjects}
          onProjectsUpdate={handlePortfolioProjectsUpdate}
        />
      </div>
    </div>
  );
};

export default EditProfile;
