# CardWithLinks - Reusable Card and Links Component

A reusable, fully-configurable card and links component system that makes it easy to create professional profile pages across different projects.

## Features

- **Digital Card**: Interactive personal/professional card with flip animation
- **Project Links**: Expandable link buttons with custom icons and descriptions
- **Full Customization**: All data configurable through props
- **TypeScript Support**: Full type safety and IntelliSense
- **Preset Configurations**: Ready-to-use presets for designers, developers, and freelancers
- **Custom Icons**: Easy integration of custom icons for different platforms
- **Responsive Design**: Works across all device sizes
- **Accessibility**: Built with semantic HTML and proper ARIA attributes

## Quick Start

### Basic Usage

```tsx
import CardWithLinks from "@/components/CardWithLinks";
import { presetConfigurations } from "@/lib/cardData";

function MyProfilePage() {
  const { profile, links } = presetConfigurations.designer;

  return <CardWithLinks profile={profile} links={links} />;
}
```

### Custom Profile

```tsx
import CardWithLinks from "@/components/CardWithLinks";
import { createDesignerProfile, createDesignerLinks } from "@/lib/cardData";

function MyProfilePage() {
  const profile = createDesignerProfile({
    name: "Your Name",
    jobTitle: "Your Job Title",
    email: "your@email.com",
    website: "yourwebsite.com",
    location: "Your Location",
    profileImage: "/your-image.jpg",
  });

  const links = createDesignerLinks({
    dribbble: "https://dribbble.com/yourprofile",
    behance: "https://behance.net/yourprofile",
    figma: "https://figma.com/@yourprofile",
  });

  return <CardWithLinks profile={profile} links={links} />;
}
```

## API Reference

### CardWithLinks Props

| Prop              | Type                                     | Default           | Description                           |
| ----------------- | ---------------------------------------- | ----------------- | ------------------------------------- |
| `profile`         | `PersonProfile`                          | `DEFAULT_PROFILE` | Personal/professional information     |
| `links`           | `ProjectLink[]`                          | `[]`              | Array of project/social links         |
| `className`       | `string`                                 | `""`              | Additional CSS classes                |
| `onLinkClick`     | `(linkId: string, href: string) => void` | `undefined`       | Custom handler for link expansion     |
| `onDirectLink`    | `(href: string) => void`                 | `undefined`       | Custom handler for direct link clicks |
| `onCardConfigure` | `() => void`                             | `undefined`       | Handler for card configuration        |

### PersonProfile Interface

```tsx
interface PersonProfile {
  name: string;
  jobTitle: string;
  bio: string;
  email: string;
  website: string;
  location: string;
  profileImage: string;
  resumeUrl?: string;
}
```

### ProjectLink Interface

```tsx
interface ProjectLink {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  imageUrl?: string;
  projectDetails: string;
}
```

## Preset Configurations

### Available Presets

- `presetConfigurations.designer` - UI/UX Designer with Dribbble, Behance, Figma
- `presetConfigurations.developer` - Full Stack Developer with GitHub, Portfolio, LinkedIn
- `presetConfigurations.freelancer` - Creative Freelancer with social media links

### Profile Creators

- `createDesignerProfile(overrides)` - Designer profile template
- `createDeveloperProfile(overrides)` - Developer profile template
- `createFreelancerProfile(overrides)` - Freelancer profile template

### Link Creators

- `createDesignerLinks(baseUrls)` - Common design platform links
- `createDeveloperLinks(baseUrls)` - Common development platform links
- `createSocialLinks(baseUrls)` - Common social media links

## Custom Icons

### Using Predefined Icons

```tsx
import { socialIcons } from "@/lib/cardData";

const customLinks = [
  {
    id: "github",
    title: "GitHub",
    description: "My Code",
    href: "https://github.com/yourusername",
    icon: socialIcons.github,
    projectDetails: "Check out my open source projects...",
  },
];
```

### Using Custom Icons

```tsx
const customIcon = (
  <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
    <path d="your-custom-path" />
  </svg>
);

const customLinks = [
  {
    id: "custom",
    title: "Custom Platform",
    description: "My Custom Link",
    href: "https://custom.com",
    icon: customIcon,
    projectDetails: "Custom platform details...",
  },
];
```

## Advanced Usage

### Custom Hook for State Management

If you need more control over the component state, you can use the exposed hook:

```tsx
import {
  useCardWithLinks,
  PersonProfile,
  ProjectLink,
} from "@/components/CardWithLinks";

function AdvancedProfilePage() {
  const {
    expandedCard,
    containerRef,
    digitalCardRef,
    handleLinkClick,
    handleDirectLink,
    closeAllCards,
  } = useCardWithLinks();

  // Your custom logic here
  const customLinkHandler = (linkId: string, href: string) => {
    console.log(`Expanding ${linkId}`);
    handleLinkClick(linkId, href);
  };

  return (
    <div ref={containerRef} className="custom-container">
      {/* Your custom implementation */}
    </div>
  );
}
```

### Custom Configuration Helper

```tsx
import { createCardConfig } from "@/lib/cardData";

const myConfig = createCardConfig(
  {
    name: "Custom Name",
    email: "custom@email.com",
  },
  [
    // Your custom links array
  ],
  "developer", // Base profile type
);
```

## Styling

The component uses Tailwind CSS and follows the project's design system. You can customize appearance by:

1. **Adding custom classes**: Use the `className` prop
2. **Modifying the design system**: Update `tailwind.config.ts`
3. **Creating variants**: Extend the component with additional props

```tsx
<CardWithLinks
  className="bg-blue-50 border-2 border-blue-200"
  profile={profile}
  links={links}
/>
```

## Real-World Examples

### Portfolio Website

```tsx
import CardWithLinks from "@/components/CardWithLinks";
import { createDesignerProfile, createDesignerLinks } from "@/lib/cardData";

export default function Portfolio() {
  const profile = createDesignerProfile({
    name: "Jane Smith",
    jobTitle: "Senior Product Designer",
    bio: "Designing user-centered digital experiences for startups and Fortune 500 companies.",
    email: "jane@janesmith.design",
    website: "janesmith.design",
    location: "New York, NY",
    profileImage: "/jane-profile.jpg",
    resumeUrl: "https://drive.google.com/file/d/1234567890/view",
  });

  const links = createDesignerLinks({
    dribbble: "https://dribbble.com/janesmith",
    behance: "https://behance.net/janesmith",
    figma: "https://figma.com/@janesmith",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <CardWithLinks profile={profile} links={links} />
    </div>
  );
}
```

### Landing Page Integration

```tsx
import CardWithLinks from "@/components/CardWithLinks";
import { presetConfigurations } from "@/lib/cardData";

export default function LandingPage() {
  const { profile, links } = presetConfigurations.freelancer;

  const handleLinkAnalytics = (linkId: string, href: string) => {
    // Track link clicks
    analytics.track("link_clicked", { linkId, href });
  };

  return (
    <main className="container mx-auto py-20">
      <section className="text-center mb-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Profile</h1>
        <p className="text-xl text-gray-600">
          Connect with me across platforms
        </p>
      </section>

      <CardWithLinks
        profile={profile}
        links={links}
        onLinkClick={handleLinkAnalytics}
        className="mx-auto"
      />
    </main>
  );
}
```

## Migration from Hardcoded Implementation

If you're migrating from a hardcoded implementation, follow these steps:

1. **Extract your data** into the new format
2. **Replace the component** usage
3. **Update your state management** (if using custom handlers)
4. **Test the functionality** to ensure everything works

```tsx
// Before (hardcoded)
const projects = {
  dribbble: {
    title: "Dribbble",
    description: "Design Portfolio",
    // ... hardcoded data
  },
};

// After (reusable)
import { createDesignerLinks } from "@/lib/cardData";

const links = createDesignerLinks({
  dribbble: "https://dribbble.com/yourprofile",
});
```

## Contributing

When extending this component system:

1. **Add new icons** to `socialIcons` in `cardData.tsx`
2. **Create new preset configurations** for different professions
3. **Add utility functions** for common use cases
4. **Update TypeScript interfaces** for new props
5. **Follow the existing patterns** for consistency

## Troubleshooting

### Common Issues

1. **Missing icons**: Ensure you're importing from `@/lib/cardData`
2. **TypeScript errors**: Check that your data matches the required interfaces
3. **Styling issues**: Verify Tailwind classes are available in your build
4. **State management**: Use the provided hook for complex state requirements

### Performance Tips

1. **Memoize large datasets** when passing many links
2. **Optimize images** used in profile and project cards
3. **Use lazy loading** for expandable card content if needed
4. **Consider virtualization** for very long lists of links

## License

This component is part of the project and follows the same license terms.
