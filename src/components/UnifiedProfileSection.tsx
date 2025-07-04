import { useState, useEffect, useRef } from "react";
import UnifiedDigitalCard from "@/components/UnifiedDigitalCard";
import LinkButton from "@/components/LinkButton";
import {
  PersonProfile,
  ProjectLink,
  defaultProfile,
  defaultProjects,
} from "@/lib/profileData";

interface UnifiedProfileSectionProps {
  profile?: Partial<PersonProfile>;
  projects?: ProjectLink[];
  className?: string;
  onDirectLink?: (href: string) => void;
  canEdit?: boolean; // Controls whether edit button shows
  onProfileUpdate?: (profile: PersonProfile) => void;
  onProjectsUpdate?: (projects: ProjectLink[]) => void;
}

export default function UnifiedProfileSection({
  profile = {},
  projects = defaultProjects,
  className = "",
  onDirectLink,
  canEdit = false,
  onProfileUpdate,
  onProjectsUpdate,
}: UnifiedProfileSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const digitalCardRef = useRef<{ handleOutsideClick: () => void }>(null);

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] =
    useState<PersonProfile>(defaultProfile);

  // Merge provided profile with defaults
  const finalProfile = { ...defaultProfile, ...profile };

  // Initialize editing profile when profile changes
  useEffect(() => {
    setEditingProfile(finalProfile);
  }, [profile]);

  const handleDirectLink = (href: string) => {
    if (onDirectLink) {
      onDirectLink(href);
    } else {
      // Default behavior
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const handleStartEdit = () => {
    setEditingProfile(finalProfile);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onProfileUpdate) {
      onProfileUpdate(editingProfile);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingProfile(finalProfile);
    setIsEditing(false);
  };

  const handleProfileChange = (updatedProfile: PersonProfile) => {
    setEditingProfile(updatedProfile);
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
        <UnifiedDigitalCard
          ref={digitalCardRef}
          profile={isEditing ? editingProfile : finalProfile}
          isEditing={isEditing}
          canEdit={canEdit}
          onEdit={handleStartEdit}
          onSave={handleSave}
          onCancel={handleCancel}
          onProfileChange={handleProfileChange}
        />
      </div>
    </div>
  );
}

// Export types for easy use
export type { PersonProfile, ProjectLink };
