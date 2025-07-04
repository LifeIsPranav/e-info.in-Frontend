import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import UnifiedProfileSection from "@/components/UnifiedProfileSection";
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

const EditProfile = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const {
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
  } = useProfile();
  const navigate = useNavigate();

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Initialize profile with user data if available
  useEffect(() => {
    if (user) {
      initializeWithUserData(user);
    }
  }, [user, initializeWithUserData]);

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
        <UnifiedProfileSection
          profile={profile}
          projects={projects}
          canEdit={true}
          onProfileUpdate={updateProfile}
          onProjectsUpdate={updateProjects}
        />

        {/* Editable Links Section */}
        <EditableLinksSection
          projects={projects}
          onProjectsUpdate={updateProjects}
        />

        {/* Editable Experience Section */}
        <EditableExperienceSection
          experiences={workExperiences}
          onExperiencesUpdate={updateWorkExperiences}
        />

        {/* Editable Portfolio Section */}
        <EditablePortfolioSection
          projects={portfolioProjects}
          onProjectsUpdate={updatePortfolioProjects}
        />

        {/* Editable Education Section */}
        <EditableEducationSection
          education={education}
          onEducationUpdate={updateEducation}
        />
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
