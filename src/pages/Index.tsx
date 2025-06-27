import CardWithLinks from "@/components/CardWithLinks";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";
import { presetConfigurations } from "@/lib/cardData";

const Index = () => {
  // Use the preset designer configuration
  const { profile, links } = presetConfigurations.designer;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-6 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Logo />
      </div>

      {/* Auth Button - Top Right */}
      <div className="absolute top-4 right-4 z-50">
        <AuthButton />
      </div>

      {/* Reusable Card with Links */}
      <CardWithLinks profile={profile} links={links} />
    </div>
  );
};

export default Index;
