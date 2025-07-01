import ProfileSection from "@/components/ProfileSection";
import PortfolioSection from "@/components/PortfolioSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Demo = () => {
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
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <AuthButton />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-lg mx-auto pt-16 pb-8 space-y-8">
        {/* Profile Section */}
        <ProfileSection />

        {/* Work Experience Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Experience
            </h2>
            <p className="text-gray-600 text-sm">
              My professional journey and key achievements
            </p>
          </div>
          <WorkExperienceSection />
        </div>

        {/* Portfolio Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Portfolio
            </h2>
            <p className="text-gray-600 text-sm">
              Explore my latest projects and creative work
            </p>
          </div>
          <PortfolioSection />
        </div>
      </div>

      {/* Footer with huge gap */}
      <footer className="mt-32 mb-8 text-center">
        <p className="text-sm text-gray-400 font-light">info.in</p>
      </footer>
    </div>
  );
};

export default Demo;
