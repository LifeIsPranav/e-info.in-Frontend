import UnifiedProfileSection from "@/components/UnifiedProfileSection";
import LinkButton from "@/components/LinkButton";
import PortfolioSection from "@/components/PortfolioSection";
import WorkExperienceSection from "@/components/WorkExperienceSection";
import EducationSection from "@/components/EducationSection";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import StarButton from "@/components/StarButton";
import { useProfile } from "@/contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Demo = () => {
  const { profile, projects, portfolioProjects, workExperiences, education } =
    useProfile();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Logo />
      </div>

      {/* Navigation - Top Right */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <StarButton />
        <AuthButton />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-lg mx-auto pt-24 pb-24 space-y-12">
        {/* Profile Section */}
        <UnifiedProfileSection profile={profile} canEdit={false} />

        {/* Links Section */}
        {projects.length > 0 && (
          <div className="space-y-2">
            {projects.map((project) => (
              <LinkButton
                key={project.id}
                href={project.href}
                title={project.title}
                description={project.description}
                icon={project.icon}
                onDirectLink={(href) =>
                  window.open(href, "_blank", "noopener,noreferrer")
                }
              />
            ))}
          </div>
        )}

        {/* Work Experience Section */}
        {workExperiences.length > 0 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Experience
              </h2>
              <p className="text-gray-600 text-sm">
                My professional journey and key achievements
              </p>
            </div>
            <WorkExperienceSection experiences={workExperiences} />
          </div>
        )}

        {/* Portfolio Section */}
        {portfolioProjects.length > 0 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Portfolio
              </h2>
              <p className="text-gray-600 text-sm">
                Explore my latest projects and creative work
              </p>
            </div>
            <PortfolioSection projects={portfolioProjects} />
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Education & Certifications
              </h2>
              <p className="text-gray-600 text-sm">
                My educational journey and professional certifications
              </p>
            </div>
            <EducationSection education={education} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Demo;
