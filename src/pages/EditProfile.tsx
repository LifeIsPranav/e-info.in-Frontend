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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { LayoutDashboard, Eye, EyeOff, Settings } from "lucide-react";

const EditProfile = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const {
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
  }, [user]); // Remove initializeWithUserData from deps to prevent infinite loop

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
          onClick={() => (window.location.href = "/dashboard")}
          variant="outline"
          size="sm"
          className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
        <AuthButton />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-lg mx-auto pt-24 pb-40 space-y-20">
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
          canEdit={true}
          onProfileUpdate={updateProfile}
        />

        {/* Visibility Controls Section */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Visibility Settings
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Control which sections are visible on your public profile
          </p>

          <div className="space-y-4">
            {/* Section Visibility Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="show-links"
                    className="text-sm font-medium text-gray-700"
                  >
                    Links Section
                  </Label>
                </div>
                <Switch
                  id="show-links"
                  checked={visibilitySettings.showLinks}
                  onCheckedChange={(checked) =>
                    updateVisibilitySettings({
                      ...visibilitySettings,
                      showLinks: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="show-experience"
                    className="text-sm font-medium text-gray-700"
                  >
                    Experience Section
                  </Label>
                </div>
                <Switch
                  id="show-experience"
                  checked={visibilitySettings.showExperience}
                  onCheckedChange={(checked) =>
                    updateVisibilitySettings({
                      ...visibilitySettings,
                      showExperience: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="show-portfolio"
                    className="text-sm font-medium text-gray-700"
                  >
                    Portfolio Section
                  </Label>
                </div>
                <Switch
                  id="show-portfolio"
                  checked={visibilitySettings.showPortfolio}
                  onCheckedChange={(checked) =>
                    updateVisibilitySettings({
                      ...visibilitySettings,
                      showPortfolio: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="show-education"
                    className="text-sm font-medium text-gray-700"
                  >
                    Education Section
                  </Label>
                </div>
                <Switch
                  id="show-education"
                  checked={visibilitySettings.showEducation}
                  onCheckedChange={(checked) =>
                    updateVisibilitySettings({
                      ...visibilitySettings,
                      showEducation: checked,
                    })
                  }
                />
              </div>
            </div>

            {/* Title Visibility Control */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <Label
                    htmlFor="show-titles"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Show Section Titles & Descriptions
                  </Label>
                  <p className="text-xs text-gray-600 mt-1">
                    When disabled, only content will be shown without section
                    headers
                  </p>
                </div>
                <Switch
                  id="show-titles"
                  checked={visibilitySettings.showTitles}
                  onCheckedChange={(checked) =>
                    updateVisibilitySettings({
                      ...visibilitySettings,
                      showTitles: checked,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Editable Links Section - Closer to profile card */}
        <div className="-mt-14">
          <EditableLinksSection
            projects={projects}
            onProjectsUpdate={updateProjects}
          />
        </div>

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
