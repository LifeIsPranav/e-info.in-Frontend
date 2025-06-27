# Quick Start Guide - CardWithLinks

Get up and running with the reusable CardWithLinks component in under 5 minutes!

## 🚀 1-Minute Setup

### Option 1: Use a Preset (Fastest)

```tsx
import CardWithLinks from "@/components/CardWithLinks";
import { presetConfigurations } from "@/lib/cardData";

// Choose your profession: 'designer', 'developer', or 'freelancer'
const { profile, links } = presetConfigurations.designer;

export default function MyPage() {
  return <CardWithLinks profile={profile} links={links} />;
}
```

### Option 2: Quick Customization

```tsx
import CardWithLinks from "@/components/CardWithLinks";
import { createDesignerProfile, createDesignerLinks } from "@/lib/cardData";

const profile = createDesignerProfile({
  name: "Your Name Here",
  email: "your@email.com",
  website: "yoursite.com",
  location: "Your City",
});

const links = createDesignerLinks({
  dribbble: "https://dribbble.com/yourprofile",
  behance: "https://behance.net/yourprofile",
});

export default function MyPage() {
  return <CardWithLinks profile={profile} links={links} />;
}
```

## 📋 5-Minute Full Customization

```tsx
import CardWithLinks from "@/components/CardWithLinks";
import { socialIcons } from "@/lib/cardData";

const myProfile = {
  name: "Your Full Name",
  jobTitle: "Your Job Title",
  bio: "Your bio description here...",
  email: "your@email.com",
  website: "yourwebsite.com",
  location: "Your Location",
  profileImage: "/your-image.jpg", // Add your image to public folder
  resumeUrl: "https://your-resume-link", // Optional
};

const myLinks = [
  {
    id: "portfolio",
    title: "Portfolio",
    description: "My Work",
    href: "https://yourportfolio.com",
    icon: socialIcons.website,
    projectDetails: "Check out my latest projects and case studies.",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Connect",
    href: "https://linkedin.com/in/yourprofile",
    icon: socialIcons.linkedin,
    projectDetails: "Let's connect professionally on LinkedIn.",
  },
  // Add more links as needed
];

export default function MyPage() {
  return <CardWithLinks profile={myProfile} links={myLinks} />;
}
```

## 🎨 Available Preset Types

| Type         | Includes                                  |
| ------------ | ----------------------------------------- |
| `designer`   | Dribbble, Behance, Figma links            |
| `developer`  | GitHub, Portfolio, LinkedIn links         |
| `freelancer` | LinkedIn, Twitter, Instagram, Email links |

## 🔧 Available Profile Creators

- `createDesignerProfile(overrides)` - UI/UX Designer template
- `createDeveloperProfile(overrides)` - Developer template
- `createFreelancerProfile(overrides)` - Freelancer template

## 🔗 Available Link Creators

- `createDesignerLinks(urls)` - Design platform links
- `createDeveloperLinks(urls)` - Development platform links
- `createSocialLinks(urls)` - Social media links

## 🎯 Common Use Cases

### Replace Homepage

```tsx
// Replace your entire homepage
export default function HomePage() {
  const { profile, links } = presetConfigurations.developer;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <CardWithLinks profile={profile} links={links} />
    </div>
  );
}
```

### Add to Existing Page

```tsx
// Add to existing layout
export default function AboutPage() {
  return (
    <div>
      <header>Your existing header</header>
      <main>
        <section className="py-20">
          <CardWithLinks {...presetConfigurations.designer} />
        </section>
      </main>
    </div>
  );
}
```

### Multiple Cards

```tsx
// Show multiple team members
export default function TeamPage() {
  return (
    <div className="grid md:grid-cols-2 gap-20 p-20">
      <CardWithLinks {...presetConfigurations.designer} />
      <CardWithLinks {...presetConfigurations.developer} />
    </div>
  );
}
```

## 📱 Ready-to-Use Icons

Use any of these predefined icons:

```tsx
import { socialIcons } from "@/lib/cardData";

// Available icons:
socialIcons.dribbble;
socialIcons.behance;
socialIcons.linkedin;
socialIcons.figma;
socialIcons.github;
socialIcons.twitter;
socialIcons.instagram;
socialIcons.youtube;
socialIcons.email;
socialIcons.portfolio;
socialIcons.website;
```

## 🎨 Easy Styling

```tsx
// Add custom styling
<CardWithLinks
  profile={profile}
  links={links}
  className="shadow-2xl border-2 border-blue-200"
/>
```

## 🔄 Next Steps

1. **Start with a preset** - Get something working immediately
2. **Customize the profile** - Add your personal information
3. **Update the links** - Point to your actual profiles
4. **Add your image** - Replace the placeholder with your photo
5. **Customize styling** - Make it match your brand

## 💡 Pro Tips

- Images should be square (1:1 ratio) for best results
- Keep bio under 150 characters for optimal display
- Use high-contrast images for better readability
- Test on mobile devices for responsive behavior

## 🆘 Need Help?

- Check `src/examples/CardWithLinksExamples.tsx` for more examples
- Read the full documentation in `CardWithLinks.md`
- All components are fully typed - use TypeScript IntelliSense for guidance

## 🚀 Deploy Your Profile

Once you're happy with your setup:

1. Replace placeholder data with your real information
2. Add your actual profile image to the `public` folder
3. Update all URLs to point to your real profiles
4. Deploy and share your professional profile page!

---

**That's it! You now have a professional, reusable profile card system.** 🎉
