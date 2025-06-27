import ProfileSection from "@/components/ProfileSection";
import AuthButton from "@/components/AuthButton";
import Logo from "@/components/Logo";

const Index = () => {
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

      {/* Reusable Profile Section */}
      <ProfileSection />
    </div>
  );
};

export default Index;
