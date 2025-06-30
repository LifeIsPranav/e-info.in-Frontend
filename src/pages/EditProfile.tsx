import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import EditableProfileSection from "@/components/EditableProfileSection";
import Logo from "@/components/Logo";
import AuthButton from "@/components/AuthButton";
import { Link } from "react-router-dom";
import { PersonProfile, defaultProfile } from "@/lib/profileData";

const EditProfile = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<PersonProfile>(defaultProfile);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  // Initialize profile with user data if available
  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        profileImage: user.avatar || prev.profileImage,
      }));
    }
  }, [user]);

  const handleProfileUpdate = (updatedProfile: PersonProfile) => {
    setProfile(updatedProfile);
    // Here you would typically save to a backend
    console.log("Profile updated:", updatedProfile);
  };

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Logo />
      </div>

      {/* Navigation - Top Right */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <Link
          to="/demo"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Demo
        </Link>
        <Link
          to="/"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Home
        </Link>
        <AuthButton />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-lg mx-auto pt-16 pb-8 space-y-8">
        {/* Editable Profile Section */}
        <EditableProfileSection
          profile={profile}
          onProfileUpdate={handleProfileUpdate}
        />

        {/* Info Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Edit Your Profile
          </h2>
          <p className="text-gray-600 text-sm">
            Customize your digital card by editing the fields above
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
