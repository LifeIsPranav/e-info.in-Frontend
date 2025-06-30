import { useState, useEffect, useRef } from "react";
import DigitalCard from "@/components/DigitalCard";
import LinkButton from "@/components/LinkButton";
import ExpandableCard from "@/components/ExpandableCard";
import {
  PersonProfile,
  ProjectLink,
  defaultProfile,
  defaultProjects,
} from "@/lib/profileData";

interface ProfileSectionProps {
  profile?: Partial<PersonProfile>;
  projects?: ProjectLink[];
  className?: string;
  onLinkClick?: (linkId: string, href: string) => void;
  onDirectLink?: (href: string) => void;
}

export default function ProfileSection({
  profile = {},
  projects = defaultProjects,
  className = "",
  onLinkClick,
  onDirectLink,
}: ProfileSectionProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const digitalCardRef = useRef<{ handleOutsideClick: () => void }>(null);

  // Merge provided profile with defaults
  const finalProfile = { ...defaultProfile, ...profile };

  const handleLinkClick = (linkId: string, href: string) => {
    if (onLinkClick) {
      onLinkClick(linkId, href);
    } else {
      // Default behavior
      if (expandedCard === linkId) {
        setExpandedCard(null);
      } else {
        setExpandedCard(linkId);
      }
    }
  };

  const handleDirectLink = (href: string) => {
    if (onDirectLink) {
      onDirectLink(href);
    } else {
      // Default behavior
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  // Close expandable cards and flip digital card back when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Always close expandable cards when clicking outside the main container
      if (containerRef.current && !containerRef.current.contains(target)) {
        setExpandedCard(null);
        if (digitalCardRef.current) {
          digitalCardRef.current.handleOutsideClick();
        }
        return;
      }

      // If clicking inside the container, check if it's on links or empty space (not the digital card)
      if (containerRef.current && containerRef.current.contains(target)) {
        const digitalCardElement = target.closest(".digital-card-container");

        // If not clicking on the digital card itself, flip it back
        if (!digitalCardElement && digitalCardRef.current) {
          digitalCardRef.current.handleOutsideClick();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-lg mx-auto space-y-6 ${className}`}
    >
      {/* Digital Card */}
      <div className="digital-card-container">
        <DigitalCard
          ref={digitalCardRef}
          name={finalProfile.name}
          jobTitle={finalProfile.jobTitle}
          bio={finalProfile.bio}
          email={finalProfile.email}
          website={finalProfile.website}
          location={finalProfile.location}
          profileImage={finalProfile.profileImage}
          resumeUrl={finalProfile.resumeUrl}
          skills={finalProfile.skills}
        />
      </div>

      {/* Links */}
      <div className="space-y-2">
        {projects.map((project) => (
          <div key={project.id}>
            <ExpandableCard
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              projectDetails={project.projectDetails}
              href={project.href}
              isOpen={expandedCard === project.id}
              onClose={() => setExpandedCard(null)}
            />
            <LinkButton
              href={project.href}
              title={project.title}
              description={project.description}
              icon={project.icon}
              onExpand={() => handleLinkClick(project.id, project.href)}
              onDirectLink={() => handleDirectLink(project.href)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Export types for easy use
export type { PersonProfile, ProjectLink };
