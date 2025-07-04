import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Logo from "@/components/Logo";
import AuthButton from "@/components/AuthButton";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  User,
  Save,
  ArrowLeft,
  Home,
  CreditCard,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UserAccountData {
  name: string;
  username: string;
  instantMessageSubject: string;
  instantMessage: string;
}

const MyAccount = () => {
  const {
    user,
    signIn,
    signOut,
    isAuthenticated,
    isLoading: authLoading,
  } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [verificationData, setVerificationData] = useState({
    username: "",
  });
  const [accountData, setAccountData] = useState<UserAccountData>({
    name: user?.name || "",
    username: user?.email?.split("@")[0] || "",
    instantMessageSubject: "Let's Connect!",
    instantMessage: "Hey there! I'm using e-info.me to connect and share.",
  });

  // Redirect to auth if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, authLoading, navigate]);

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

  const handleDeleteAccount = async () => {
    // Validate username
    if (verificationData.username !== accountData.username) {
      toast({
        title: "Username Mismatch",
        description:
          "The username you entered does not match your account username.",
        variant: "destructive",
      });
      return;
    }

    setDeleteLoading(true);

    try {
      // Simulate account deletion process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear all local data
      localStorage.clear();

      // Sign out
      await signOut();

      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
      // Reset verification data
      setVerificationData({ username: "" });
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" label="Loading..." />
      </div>
    );
  }

  // Redirect will handle navigation for unauthenticated users
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-4 left-4 z-50">
        <Logo />
      </div>

      {/* Navigation - Top Right */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <Button
          onClick={() => (window.location.href = "/")}
          variant="outline"
          size="sm"
          className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 font-medium"
        >
          <Home className="w-4 h-4 mr-2" />
          Home
        </Button>
        <Button
          onClick={() => (window.location.href = "/mycard")}
          className="bg-gray-900 hover:bg-gray-800 text-white font-medium"
          size="sm"
        >
          <CreditCard className="w-4 h-4 mr-2" />
          My Card
        </Button>
        <AuthButton />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-md mx-auto pt-16 pb-16 space-y-8">
        {/* Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            to="/mycard"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to My Card
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center space-y-4">
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

            {/* Email Field (Read-only) */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <Input
                value={user?.email || ""}
                readOnly
                className="bg-gray-100 border-gray-200 text-gray-600 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500">
                Email address is managed through your Google account and cannot
                be changed here
              </p>
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

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-red-900 mb-1">
                Danger Zone
              </h4>
              <p className="text-xs text-red-700 leading-relaxed">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-lg bg-white border-gray-200">
              <AlertDialogHeader className="text-center">
                <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <AlertDialogTitle className="text-xl font-semibold text-gray-900">
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-700 text-base leading-relaxed">
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-6 py-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-red-800 mb-2">
                    What will be deleted:
                  </h4>
                  <ul className="text-xs text-red-700 space-y-1">
                    <li>• Your profile and all personal information</li>
                    <li>• All your portfolio items and work samples</li>
                    <li>• Your account settings and preferences</li>
                    <li>• All activity history and analytics</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900 block">
                    To confirm deletion, type your username:{" "}
                    <span className="font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      {accountData.username}
                    </span>
                  </label>
                  <Input
                    value={verificationData.username}
                    onChange={(e) =>
                      setVerificationData({ username: e.target.value })
                    }
                    placeholder={`Type "${accountData.username}" to confirm`}
                    className="bg-white border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-center font-mono"
                  />
                </div>
              </div>

              <AlertDialogFooter className="flex gap-3">
                <AlertDialogCancel
                  onClick={() => setVerificationData({ username: "" })}
                  className="flex-1"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={
                    deleteLoading ||
                    verificationData.username !== accountData.username
                  }
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </div>
                  ) : (
                    "Delete My Account"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
