import { useState, useEffect, useRef } from "react";
import DigitalCard from "@/components/DigitalCard";
import LinkButton from "@/components/LinkButton";
import ExpandableCard from "@/components/ExpandableCard";

// Types for the compound component
export interface PersonProfile {
  name: string;
  jobTitle: string;
  bio: string;
  email: string;
  website: string;
  location: string;
  profileImage: string;
  resumeUrl?: string;
}

export interface ProjectLink {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  projectDetails: string;
}

export interface CardWithLinksProps {
  profile: PersonProfile;
  links: ProjectLink[];
  className?: string;
  onLinkClick?: (linkId: string, href: string) => void;
  onDirectLink?: (href: string) => void;
  onCardConfigure?: () => void;
}

// Default profile for fallback
const DEFAULT_PROFILE: PersonProfile = {
  name: "Alex Johnson",
  jobTitle: "UI/UX Designer",
  bio: "Creating digital experiences that matter. Clean, functional, human-centered design.",
  email: "alex@example.com",
  website: "alexjohnson.design",
  location: "San Francisco",
  profileImage: "/placeholder.svg",
  resumeUrl: "https://drive.google.com/file/d/example/view",
};

// Custom hook for managing card and links state
export const useCardWithLinks = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const digitalCardRef = useRef<{ handleOutsideClick: () => void }>(null);

  const handleLinkClick = (linkId: string, href: string) => {
    if (expandedCard === linkId) {
      setExpandedCard(null);
    } else {
      setExpandedCard(linkId);
    }
  };

  const handleDirectLink = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const closeAllCards = () => {
    setExpandedCard(null);
    if (digitalCardRef.current) {
      digitalCardRef.current.handleOutsideClick();
    }
  };

  // Close expandable cards and flip digital card back when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      // Always close expandable cards when clicking outside the main container
      if (containerRef.current && !containerRef.current.contains(target)) {
        closeAllCards();
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

  return {
    expandedCard,
    containerRef,
    digitalCardRef,
    handleLinkClick,
    handleDirectLink,
    closeAllCards,
    setExpandedCard,
  };
};

// Main compound component
export default function CardWithLinks({
  profile = DEFAULT_PROFILE,
  links = [],
  className = "",
  onLinkClick,
  onDirectLink,
  onCardConfigure,
}: CardWithLinksProps) {
  const {
    expandedCard,
    containerRef,
    digitalCardRef,
    handleLinkClick: defaultHandleLinkClick,
    handleDirectLink: defaultHandleDirectLink,
  } = useCardWithLinks();

  // Use custom handlers if provided, otherwise use defaults
  const finalHandleLinkClick = onLinkClick || defaultHandleLinkClick;
  const finalHandleDirectLink = onDirectLink || defaultHandleDirectLink;

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-lg mx-auto space-y-6 ${className}`}
    >
      {/* Digital Card */}
      <div className="digital-card-container">
        <DigitalCard
          ref={digitalCardRef}
          name={profile.name}
          jobTitle={profile.jobTitle}
          bio={profile.bio}
          email={profile.email}
          website={profile.website}
          location={profile.location}
          profileImage={profile.profileImage}
          resumeUrl={profile.resumeUrl}
          onConfigureClick={onCardConfigure}
        />
      </div>

      {/* Links */}
      {links.length > 0 && (
        <div className="space-y-2">
          {links.map((link) => (
            <div key={link.id}>
              {/* Expandable Card */}
              <ExpandableCard
                title={link.title}
                description={link.description}
                imageUrl={link.imageUrl}
                projectDetails={link.projectDetails}
                href={link.href}
                isOpen={expandedCard === link.id}
                onClose={() => finalHandleLinkClick(link.id, link.href)}
              />

              {/* Link Button */}
              <LinkButton
                href={link.href}
                title={link.title}
                description={link.description}
                icon={link.icon}
                onExpand={() => finalHandleLinkClick(link.id, link.href)}
                onDirectLink={() => finalHandleDirectLink(link.href)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Export types for external use
export type { PersonProfile, ProjectLink, CardWithLinksProps };

// Export the hook for advanced usage
export { useCardWithLinks };
