import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut, UserCog, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { createInitials } from "@/utils";
import { ROUTES } from "@/constants";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ActionButton from "@/components/common/ActionButton";

interface AuthButtonProps {
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg";
  /**
   * Show user name in button (when authenticated)
   */
  showName?: boolean;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  size = "md",
  showName = false,
}) => {
  const { user, isAuthenticated, isLoading, signOut, error } = useAuth();
  const navigate = useNavigate();

  // Handle sign in - navigate to auth page
  const handleSignIn = () => {
    navigate(ROUTES.AUTH);
  };

  // Sign out function with error handling
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Menu item click handlers
  const handleDashboardClick = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleMyAccountClick = () => {
    navigate(ROUTES.ACCOUNT);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.EDIT_PROFILE);
  };

  const handleSettingsClick = () => {
    console.log("Opening settings...");
    // You can implement a modal or navigate to settings page
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-10 w-10 flex items-center justify-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  // Show sign in button for unauthenticated users
  if (!isAuthenticated) {
    return (
      <ActionButton
        onClick={handleSignIn}
        size={size}
        className="bg-gray-900 hover:bg-gray-800 text-white font-medium transition-colors duration-200"
        aria-label="Sign in to your account"
      >
        Sign In
      </ActionButton>
    );
  }

  // Get avatar size based on size prop
  const avatarSize =
    size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const buttonClass = showName ? "h-auto px-3 py-2 gap-3" : `${avatarSize} p-0`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative ${buttonClass} rounded-full hover:bg-gray-100/80 transition-all duration-200 hover:shadow-md hover:shadow-gray-900/5 focus:ring-2 focus:ring-gray-300/50 focus:ring-offset-2`}
          aria-label={`${user?.name || "User"} account menu`}
          aria-haspopup="menu"
        >
          {showName ? (
            <div className="flex items-center gap-3">
              <Avatar className={`${avatarSize} ring-2 ring-white shadow-sm`}>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-sm font-medium">
                  {user ? createInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-900 truncate max-w-24">
                {user?.name}
              </span>
            </div>
          ) : (
            <Avatar className={`${avatarSize} ring-2 ring-white shadow-sm`}>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-sm font-medium">
                {user ? createInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-0 bg-white/95 backdrop-blur-md border-gray-200/20 shadow-xl shadow-gray-900/5"
        align="end"
        forceMount
        sideOffset={8}
        role="menu"
        aria-label="User account menu"
      >
        {/* User Info Header */}
        <div className="p-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100/80">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-gray-100 ring-offset-2">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-sm font-medium">
                {user ? createInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          {error && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              {error}
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div
          className="p-2 space-y-1"
          role="group"
          aria-label="Account actions"
        >
          <DropdownMenuItem
            onClick={handleDashboardClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
            role="menuitem"
          >
            <LayoutDashboard
              className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
              aria-hidden="true"
            />
            <span>Dashboard</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleMyAccountClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
            role="menuitem"
          >
            <UserCog
              className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
              aria-hidden="true"
            />
            <span>My Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleProfileClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
            role="menuitem"
          >
            <User
              className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
              aria-hidden="true"
            />
            <span>Edit Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSettingsClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
            role="menuitem"
          >
            <Settings
              className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors"
              aria-hidden="true"
            />
            <span>Settings</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Sign Out Section */}
        <div className="p-2">
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
            role="menuitem"
          >
            <LogOut
              className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors"
              aria-hidden="true"
            />
            <span>Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthButton;
