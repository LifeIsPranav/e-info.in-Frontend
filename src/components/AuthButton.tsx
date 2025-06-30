import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  Mail,
  CreditCard,
  HelpCircle,
  UserCog,
} from "lucide-react";
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

export default function AuthButton() {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  // Handle sign in - navigate to auth page
  const handleSignIn = () => {
    navigate("/auth");
  };

  // Sign out function
  const handleSignOut = () => {
    signOut();
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Menu item click handlers
  const handleMyAccountClick = () => {
    navigate("/account");
  };

  const handleProfileClick = () => {
    console.log("Opening profile settings...");
    // You can implement a modal or navigate to profile page
  };

  const handleSettingsClick = () => {
    console.log("Opening settings...");
    // You can implement a modal or navigate to settings page
  };

  const handleBillingClick = () => {
    console.log("Opening billing...");
    // You can implement a modal or navigate to billing page
  };

  const handleSupportClick = () => {
    console.log("Opening support...");
    // You can implement a modal or navigate to support page
  };

  if (!isAuthenticated) {
    return (
      <Button
        onClick={handleSignIn}
        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 text-sm font-medium transition-colors duration-200"
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100/80 transition-all duration-200 hover:shadow-md hover:shadow-gray-900/5 focus:ring-2 focus:ring-gray-300/50 focus:ring-offset-2"
        >
          <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-sm font-medium">
              {user ? getUserInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-0 bg-white/95 backdrop-blur-md border-gray-200/20 shadow-xl shadow-gray-900/5"
        align="end"
        forceMount
        sideOffset={8}
      >
        {/* User Info Header with Gradient Background */}
        <div className="p-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100/80">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-gray-100 ring-offset-2">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 text-sm font-medium">
                {user ? getUserInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1">
          <DropdownMenuItem
            onClick={handleMyAccountClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <UserCog className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>My Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleProfileClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <User className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSettingsClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <Settings className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleBillingClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <CreditCard className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>Billing</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSupportClick}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
          >
            <HelpCircle className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            <span>Support</span>
          </DropdownMenuItem>
        </div>

        {/* Sign Out Section */}
        <div className="p-2 border-t border-gray-100/80">
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
          >
            <LogOut className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
