import { useState, useRef, useEffect } from "react";
import {
  User,
  Settings,
  LogOut,
  Mail,
  CreditCard,
  HelpCircle,
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

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function AuthButton() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Mock sign-in function
  const handleSignIn = () => {
    // Simulate authentication
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg",
    };

    setUser(mockUser);
    setIsSignedIn(true);
  };

  // Sign out function
  const handleSignOut = () => {
    setUser(null);
    setIsSignedIn(false);
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

  if (!isSignedIn) {
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
          className="relative h-10 w-10 rounded-full p-0 hover:bg-gray-100"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-sm font-medium">
              {user ? getUserInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        {/* User Info Header */}
        <div className="flex items-center space-x-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
              {user ? getUserInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Profile Options */}
        <DropdownMenuItem
          onClick={handleProfileClick}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleSettingsClick}
          className="cursor-pointer"
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleBillingClick}
          className="cursor-pointer"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleSupportClick}
          className="cursor-pointer"
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
