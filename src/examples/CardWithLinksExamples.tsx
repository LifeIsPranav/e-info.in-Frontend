import CardWithLinks from "@/components/CardWithLinks";
import {
  presetConfigurations,
  createDesignerProfile,
  createDeveloperProfile,
  createDesignerLinks,
  createDeveloperLinks,
  createSocialLinks,
  createCardConfig,
  socialIcons,
} from "@/lib/cardData";

// Example 1: Using Preset Configurations
export function PresetDesignerExample() {
  const { profile, links } = presetConfigurations.designer;

  return <CardWithLinks profile={profile} links={links} />;
}

export function PresetDeveloperExample() {
  const { profile, links } = presetConfigurations.developer;

  return <CardWithLinks profile={profile} links={links} />;
}

export function PresetFreelancerExample() {
  const { profile, links } = presetConfigurations.freelancer;

  return <CardWithLinks profile={profile} links={links} />;
}

// Example 2: Custom Profile with Preset Links
export function CustomProfileExample() {
  const customProfile = createDesignerProfile({
    name: "Jane Smith",
    jobTitle: "Senior Product Designer",
    bio: "Designing user-centered digital experiences for startups and Fortune 500 companies.",
    email: "jane@janesmith.design",
    website: "janesmith.design",
    location: "New York, NY",
    profileImage: "/custom-profile.jpg",
    resumeUrl: "https://drive.google.com/file/d/custom-resume/view",
  });

  const customLinks = createDesignerLinks({
    dribbble: "https://dribbble.com/janesmith",
    behance: "https://behance.net/janesmith",
    figma: "https://figma.com/@janesmith",
  });

  return <CardWithLinks profile={customProfile} links={customLinks} />;
}

// Example 3: Developer Profile with Custom Links
export function DeveloperWithCustomLinksExample() {
  const developerProfile = createDeveloperProfile({
    name: "Alex Rodriguez",
    jobTitle: "Full Stack Engineer",
    bio: "Building scalable applications with React, Node.js, and cloud technologies.",
    email: "alex@alexdev.com",
    website: "alexdev.com",
    location: "Remote",
    profileImage: "/alex-profile.jpg",
  });

  const developerLinks = createDeveloperLinks({
    github: "https://github.com/alexrodriguez",
    portfolio: "https://alexdev.com/portfolio",
    linkedin: "https://linkedin.com/in/alexrodriguez",
  });

  return <CardWithLinks profile={developerProfile} links={developerLinks} />;
}

// Example 4: Completely Custom Configuration
export function CompletelyCustomExample() {
  const customProfile = {
    name: "Maria Garcia",
    jobTitle: "Brand Strategist",
    bio: "Helping businesses build memorable brands that connect with their audience.",
    email: "maria@brandstrategy.co",
    website: "brandstrategy.co",
    location: "Los Angeles",
    profileImage: "/maria-profile.jpg",
    resumeUrl: "https://drive.google.com/file/d/brand-portfolio/view",
  };

  const customLinks = [
    {
      id: "portfolio",
      title: "Portfolio",
      description: "Brand Case Studies",
      href: "https://brandstrategy.co/portfolio",
      icon: socialIcons.portfolio,
      imageUrl:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
      projectDetails:
        "Explore comprehensive brand strategies and visual identity systems for diverse clients.",
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      description: "Professional Network",
      href: "https://linkedin.com/in/mariagarcia",
      icon: socialIcons.linkedin,
      projectDetails:
        "Connect with me for brand strategy insights and industry discussions.",
    },
    {
      id: "instagram",
      title: "Instagram",
      description: "Brand Inspiration",
      href: "https://instagram.com/mariabrands",
      icon: socialIcons.instagram,
      projectDetails:
        "Daily brand inspiration, design trends, and behind-the-scenes content.",
    },
    {
      id: "email",
      title: "Email",
      description: "Let's Collaborate",
      href: "mailto:maria@brandstrategy.co",
      icon: socialIcons.email,
      projectDetails:
        "Reach out for brand consulting, speaking engagements, or collaborations.",
    },
  ];

  return <CardWithLinks profile={customProfile} links={customLinks} />;
}

// Example 5: Using the Helper Function
export function HelperFunctionExample() {
  const config = createCardConfig(
    {
      name: "Taylor Johnson",
      jobTitle: "UI Developer",
      email: "taylor@uidev.studio",
      website: "uidev.studio",
      location: "Austin, TX",
    },
    createSocialLinks({
      linkedin: "https://linkedin.com/in/taylorjohnson",
      twitter: "https://twitter.com/tayloruidev",
      github: "https://github.com/taylorjohnson",
      email: "mailto:taylor@uidev.studio",
    }),
    "developer", // Base profile type
  );

  return <CardWithLinks profile={config.profile} links={config.links} />;
}

// Example 6: With Custom Event Handlers
export function WithCustomHandlersExample() {
  const { profile, links } = presetConfigurations.designer;

  const handleLinkClick = (linkId: string, href: string) => {
    // Custom analytics or tracking
    console.log(`Link expanded: ${linkId} - ${href}`);

    // You could integrate with analytics services here
    // analytics.track('card_link_expanded', { linkId, href });
  };

  const handleDirectLink = (href: string) => {
    // Custom direct link handling
    console.log(`Direct link clicked: ${href}`);

    // Custom logic before opening link
    if (href.includes("mailto:")) {
      // Custom email handling
      console.log("Opening email client");
    }

    // Default behavior
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleCardConfigure = () => {
    // Custom configuration logic
    console.log("Card configuration requested");
    // Could open a settings modal, etc.
  };

  return (
    <CardWithLinks
      profile={profile}
      links={links}
      onLinkClick={handleLinkClick}
      onDirectLink={handleDirectLink}
      onCardConfigure={handleCardConfigure}
    />
  );
}

// Example 7: Multiple Configurations on One Page
export function MultipleConfigurationsExample() {
  const designerConfig = presetConfigurations.designer;
  const developerConfig = presetConfigurations.developer;

  return (
    <div className="space-y-20">
      <section>
        <h2 className="text-2xl font-bold text-center mb-8">
          Designer Profile
        </h2>
        <CardWithLinks
          profile={designerConfig.profile}
          links={designerConfig.links}
          className="max-w-md"
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-center mb-8">
          Developer Profile
        </h2>
        <CardWithLinks
          profile={developerConfig.profile}
          links={developerConfig.links}
          className="max-w-md"
        />
      </section>
    </div>
  );
}

// Example 8: Minimal Configuration
export function MinimalExample() {
  const minimalProfile = {
    name: "Sam Wilson",
    jobTitle: "Consultant",
    bio: "Helping businesses grow through strategic planning.",
    email: "sam@consulting.co",
    website: "samwilson.co",
    location: "Chicago",
    profileImage: "/placeholder.svg",
  };

  const minimalLinks = [
    {
      id: "website",
      title: "Website",
      description: "Learn More",
      href: "https://samwilson.co",
      icon: socialIcons.website,
      projectDetails:
        "Discover my consulting approach and client success stories.",
    },
    {
      id: "email",
      title: "Contact",
      description: "Get in Touch",
      href: "mailto:sam@consulting.co",
      icon: socialIcons.email,
      projectDetails: "Ready to discuss your business goals? Let's connect.",
    },
  ];

  return <CardWithLinks profile={minimalProfile} links={minimalLinks} />;
}

// Example 9: Advanced Custom Icon
export function CustomIconExample() {
  const profile = createDesignerProfile({
    name: "Creative Designer",
    email: "creative@design.studio",
  });

  // Custom Discord icon
  const discordIcon = (
    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z" />
    </svg>
  );

  const customLinks = [
    {
      id: "discord",
      title: "Discord",
      description: "Design Community",
      href: "https://discord.gg/design-community",
      icon: discordIcon,
      projectDetails:
        "Join our design community for daily inspiration and collaboration.",
    },
    ...createDesignerLinks(),
  ];

  return <CardWithLinks profile={profile} links={customLinks} />;
}

// Export all examples for easy importing
export const examples = {
  PresetDesignerExample,
  PresetDeveloperExample,
  PresetFreelancerExample,
  CustomProfileExample,
  DeveloperWithCustomLinksExample,
  CompletelyCustomExample,
  HelperFunctionExample,
  WithCustomHandlersExample,
  MultipleConfigurationsExample,
  MinimalExample,
  CustomIconExample,
};

export default examples;
