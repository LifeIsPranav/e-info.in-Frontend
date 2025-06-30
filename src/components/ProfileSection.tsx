import { useState, useEffect, useRef } from "react";
import DigitalCard from "@/components/DigitalCard";
import LinkButton from "@/components/LinkButton";
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
  onDirectLink?: (href: string) => void;
}

export default function ProfileSection({
  profile = {},
  projects = defaultProjects,
  className = "",
  onDirectLink,
}: ProfileSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const digitalCardRef = useRef<{ handleOutsideClick: () => void }>(null);

  // Merge provided profile with defaults
  const finalProfile = { ...defaultProfile, ...profile };

  const handleDirectLink = (href: string) => {
    if (onDirectLink) {
      onDirectLink(href);
    } else {
      // Default behavior
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  // Close digital card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Close digital card when clicking outside the main container
      if (containerRef.current && !containerRef.current.contains(target)) {
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
          <LinkButton
            key={project.id}
            href={project.href}
            title={project.title}
            description={project.description}
            icon={project.icon}
            onDirectLink={() => handleDirectLink(project.href)}
          />
        ))}
      </div>
    </div>
  );
}

// Export types for easy use
export type { PersonProfile, ProjectLink };
