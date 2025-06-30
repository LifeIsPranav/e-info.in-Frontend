import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import AuthButton from "@/components/AuthButton";
import { Link } from "react-router-dom";
import { User, Save, ArrowLeft } from "lucide-react";

interface UserAccountData {
  name: string;
  username: string;
  instantMessage: string;
}

const MyAccount = () => {
  const { user, signIn } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [accountData, setAccountData] = useState<UserAccountData>({
    name: user?.name || "",
    username: user?.email?.split("@")[0] || "",
    instantMessage: "Hey there! I'm using myoneSocial to connect and share.",
  });

  // Initialize with user data if available
  useEffect(() => {
    if (user) {
      setAccountData((prev) => ({
        ...prev,
        name: user.name,
        username: user.email?.split("@")[0] || prev.username,
      }));
    }
  }, [user]);

  const handleFieldChange = (field: keyof UserAccountData, value: string) => {
    setAccountData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Validate username as required field
    if (!accountData.username.trim()) {
      toast({
        title: "Username Required",
        description: "Please enter a username to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user context with new name if changed
      if (user && accountData.name !== user.name) {
        signIn({
          ...user,
          name: accountData.name,
        });
      }

      toast({
        title: "Account Updated",
        description: "Your account information has been saved successfully.",
      });

      console.log("Account data updated:", accountData);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update account information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
          to="/profile"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Profile
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
      <div className="w-full max-w-md mx-auto pt-16 pb-24 space-y-8">
        {/* Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/profile"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-lg font-medium">
                  {user ? (
                    getUserInitials(user.name)
                  ) : (
                    <User className="w-8 h-8" />
                  )}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              My Account
            </h2>
            <p className="text-gray-600 text-sm">
              Manage your account information and preferences
            </p>
          </div>
        </div>

        {/* Account Form */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Full Name
              </label>
              <Input
                value={accountData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 font-medium"
              />
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Username <span className="text-red-500">*</span>
              </label>
              <Input
                value={accountData.username}
                onChange={(e) => handleFieldChange("username", e.target.value)}
                placeholder="Enter your username"
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 font-medium"
                required
              />
              <p className="text-xs text-gray-500">
                Username is required and will be used for your profile URL
              </p>
            </div>

            {/* Instant Message Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Instant Message
              </label>
              <Textarea
                value={accountData.instantMessage}
                onChange={(e) =>
                  handleFieldChange("instantMessage", e.target.value)
                }
                placeholder="Set your instant message for quick communication..."
                className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 font-medium min-h-20 resize-none"
              />
              <p className="text-xs text-gray-500">
                Set instant message for quick communication. This will be
                displayed when people want to message you quickly.
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-100">
              <Button
                onClick={handleSave}
                disabled={isLoading || !accountData.username.trim()}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <User className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">
                Account Information
              </h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                Your account information is used across the platform. Changes to
                your name and username will be reflected in your profile and
                public displays.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
