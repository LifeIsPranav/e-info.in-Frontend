import { PersonProfile, ProjectLink } from "@/components/CardWithLinks";

// Common social media icons (as JSX elements)
export const socialIcons = {
  dribbble: (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.5 2.252 3.5 2.252 5.7-.3-.1-3.3-.6-6.07-.3-.3-.7-.6-1.5-1-2.2 3-1.2 4.518-2.9 4.818-3.2zm-1.6-1.3c-.3.3-1.7 1.9-4.6 3-.9-1.7-1.9-3.1-2.1-3.3 2.3-.3 4.6 0 6.7.3zM7.818 1.802c.2.2 1.2 1.6 2.1 3.2-2.6.7-4.9.7-5.2.7.4-1.8 1.5-3.3 3.1-3.9zm-3.1 5.8s.1 0 .1 0c.3 0 3.1 0 5.9-.8.2.4.4.8.5 1.2l-.2.1c-2.9 1-4.4 3.6-4.6 3.8-.1-.8-.1-1.6 0-2.4.2-1.1.6-2 1.3-2.9zm1.4 6.7c.2-.3 1.4-2.4 4-3.3l.1-.1c.8 2.1 1.1 3.8 1.2 4.3-1.3.5-2.5.5-3.5.3-.8-.2-1.5-.7-1.8-1.2zm6.7 1.2c-.1-.6-.4-2.3-1.2-4.4 2.6-.4 4.9.2 5.2.3-.4 2-1.7 3.6-3.4 4.2-.2 0-.4-.1-.6-.1z" />
    </svg>
  ),
  behance: (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 2-5.101 2-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  figma: (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038H8.148zm7.704 0c2.476 0 4.49 2.015 4.49 4.491s-2.014 4.49-4.49 4.49c-2.476 0-4.491-2.014-4.491-4.49s2.015-4.491 4.491-4.491zm0 7.51c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019-3.019 1.355-3.019 3.019 1.354 3.019 3.019 3.019zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.491 2.014 4.491 4.49S10.624 24 8.148 24zm0-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.354 3.019-3.019-1.355-3.019-3.019-3.019z" />
    </svg>
  ),
  email: (
    <svg
      className="w-4 h-4 text-black"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  github: (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  twitter: (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  ),
  instagram: (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  youtube: (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  portfolio: (
    <svg
      className="w-4 h-4 text-black"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2h2a2 2 0 002-2v-2z"
      />
    </svg>
  ),
  website: (
    <svg
      className="w-4 h-4 text-black"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  ),
};

// Utility functions for creating common profile types
export const createDesignerProfile = (
  overrides: Partial<PersonProfile> = {},
): PersonProfile => ({
  name: "Alex Johnson",
  jobTitle: "UI/UX Designer",
  bio: "Creating digital experiences that matter. Clean, functional, human-centered design.",
  email: "alex@example.com",
  website: "alexjohnson.design",
  location: "San Francisco",
  profileImage: "/placeholder.svg",
  resumeUrl: "https://drive.google.com/file/d/example/view",
  ...overrides,
});

export const createDeveloperProfile = (
  overrides: Partial<PersonProfile> = {},
): PersonProfile => ({
  name: "Sarah Chen",
  jobTitle: "Full Stack Developer",
  bio: "Building scalable web applications with modern technologies. Passionate about clean code and user experience.",
  email: "sarah@example.com",
  website: "sarahchen.dev",
  location: "New York",
  profileImage: "/placeholder.svg",
  resumeUrl: "https://drive.google.com/file/d/example/view",
  ...overrides,
});

export const createFreelancerProfile = (
  overrides: Partial<PersonProfile> = {},
): PersonProfile => ({
  name: "Mike Rodriguez",
  jobTitle: "Creative Freelancer",
  bio: "Helping brands tell their story through compelling design and digital experiences.",
  email: "mike@example.com",
  website: "mikerodriguez.co",
  location: "Remote",
  profileImage: "/placeholder.svg",
  ...overrides,
});

// Utility functions for creating common link sets
export const createDesignerLinks = (
  baseUrls: Partial<Record<string, string>> = {},
): ProjectLink[] => [
  {
    id: "dribbble",
    title: "Dribbble",
    description: "Design Portfolio",
    href: baseUrls.dribbble || "https://dribbble.com",
    icon: socialIcons.dribbble,
    imageUrl:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=240&fit=crop",
    projectDetails:
      "Featured UI/UX design shots including mobile app interfaces, web designs, and branding projects. Check out my latest work and creative explorations.",
  },
  {
    id: "behance",
    title: "Behance",
    description: "Case Studies",
    href: baseUrls.behance || "https://behance.net",
    icon: socialIcons.behance,
    imageUrl:
      "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=240&fit=crop",
    projectDetails:
      "In-depth case studies showcasing my design process from research to final implementation. Detailed breakdowns of user experience challenges and solutions.",
  },
  {
    id: "figma",
    title: "Figma",
    description: "Design Files",
    href: baseUrls.figma || "https://figma.com",
    icon: socialIcons.figma,
    imageUrl:
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=240&fit=crop",
    projectDetails:
      "Access to design systems, wireframes, and interactive prototypes. See how I organize design files and collaborate with development teams.",
  },
];

export const createDeveloperLinks = (
  baseUrls: Partial<Record<string, string>> = {},
): ProjectLink[] => [
  {
    id: "github",
    title: "GitHub",
    description: "Open Source Projects",
    href: baseUrls.github || "https://github.com",
    icon: socialIcons.github,
    imageUrl:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=240&fit=crop",
    projectDetails:
      "Explore my open source contributions, personal projects, and code samples. See how I approach problem-solving and software architecture.",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Live Projects",
    href: baseUrls.portfolio || "https://portfolio.example.com",
    icon: socialIcons.portfolio,
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
    projectDetails:
      "View live applications and websites I've built. From frontend interfaces to full-stack applications, see my development skills in action.",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Professional Network",
    href: baseUrls.linkedin || "https://linkedin.com",
    icon: socialIcons.linkedin,
    projectDetails:
      "Connect with me professionally to see my work experience, recommendations, and industry insights. Let's grow our professional network together.",
  },
];

export const createSocialLinks = (
  baseUrls: Partial<Record<string, string>> = {},
): ProjectLink[] => [
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Professional Network",
    href: baseUrls.linkedin || "https://linkedin.com",
    icon: socialIcons.linkedin,
    projectDetails:
      "Connect with me professionally to see my work experience, recommendations, and industry insights. Let's grow our professional network together.",
  },
  {
    id: "twitter",
    title: "Twitter",
    description: "Thoughts & Updates",
    href: baseUrls.twitter || "https://twitter.com",
    icon: socialIcons.twitter,
    projectDetails:
      "Follow me for industry insights, project updates, and thoughts on design and technology. Join the conversation!",
  },
  {
    id: "instagram",
    title: "Instagram",
    description: "Behind the Scenes",
    href: baseUrls.instagram || "https://instagram.com",
    icon: socialIcons.instagram,
    projectDetails:
      "Get a glimpse behind the scenes of my creative process, workspace, and day-to-day inspiration.",
  },
  {
    id: "email",
    title: "Email",
    description: "Direct Contact",
    href: baseUrls.email || "mailto:contact@example.com",
    icon: socialIcons.email,
    projectDetails:
      "Get in touch directly for project inquiries, collaborations, or just to say hello. I typically respond within 24 hours.",
  },
];

// Complete preset configurations
export const presetConfigurations = {
  designer: {
    profile: createDesignerProfile(),
    links: createDesignerLinks(),
  },
  developer: {
    profile: createDeveloperProfile(),
    links: createDeveloperLinks(),
  },
  freelancer: {
    profile: createFreelancerProfile(),
    links: createSocialLinks(),
  },
};

// Helper function to create custom configuration
export const createCardConfig = (
  profile: Partial<PersonProfile>,
  links: ProjectLink[],
  baseProfile: "designer" | "developer" | "freelancer" = "designer",
) => {
  const baseProfiles = {
    designer: createDesignerProfile(),
    developer: createDeveloperProfile(),
    freelancer: createFreelancerProfile(),
  };

  return {
    profile: { ...baseProfiles[baseProfile], ...profile },
    links,
  };
};
