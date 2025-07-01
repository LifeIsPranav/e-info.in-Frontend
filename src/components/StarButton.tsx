import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STARS_STORAGE_KEY = "profile_stars";
const USER_STARRED_KEY = "user_starred_profiles";

interface StarButtonProps {
  profileId?: string;
  className?: string;
}

const StarButton: React.FC<StarButtonProps> = ({
  profileId = "demo-profile",
  className,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [starCount, setStarCount] = useState(0);
  const [isStarred, setIsStarred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load star data from localStorage
  useEffect(() => {
    try {
      // Get total star count for this profile
      const allStars = JSON.parse(
        localStorage.getItem(STARS_STORAGE_KEY) || "{}",
      );
      setStarCount(allStars[profileId] || 0);

      // Check if current user has starred this profile
      if (isAuthenticated && user) {
        const userStarred = JSON.parse(
          localStorage.getItem(USER_STARRED_KEY) || "{}",
        );
        setIsStarred(userStarred[user.id]?.includes(profileId) || false);
      }
    } catch (error) {
      console.error("Failed to load star data:", error);
    }
  }, [profileId, isAuthenticated, user]);

  const handleStarClick = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to give stars");
      return;
    }

    if (!user) return;

    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get current data from localStorage
      const allStars = JSON.parse(
        localStorage.getItem(STARS_STORAGE_KEY) || "{}",
      );
      const userStarred = JSON.parse(
        localStorage.getItem(USER_STARRED_KEY) || "{}",
      );

      if (!userStarred[user.id]) {
        userStarred[user.id] = [];
      }

      const currentStarCount = allStars[profileId] || 0;
      const hasStarred = userStarred[user.id].includes(profileId);

      if (hasStarred) {
        // Remove star
        allStars[profileId] = Math.max(0, currentStarCount - 1);
        userStarred[user.id] = userStarred[user.id].filter(
          (id: string) => id !== profileId,
        );
        setIsStarred(false);
        setStarCount(allStars[profileId]);
        toast.success("Star removed");
      } else {
        // Add star
        allStars[profileId] = currentStarCount + 1;
        userStarred[user.id].push(profileId);
        setIsStarred(true);
        setStarCount(allStars[profileId]);
        toast.success("Star added! ⭐");
      }

      // Save to localStorage
      localStorage.setItem(STARS_STORAGE_KEY, JSON.stringify(allStars));
      localStorage.setItem(USER_STARRED_KEY, JSON.stringify(userStarred));
    } catch (error) {
      console.error("Failed to update star:", error);
      toast.error("Failed to update star");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={handleStarClick}
        variant="outline"
        size="sm"
        disabled={isLoading}
        className={cn(
          "flex items-center gap-2 transition-all duration-200",
          isStarred
            ? "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50",
          !isAuthenticated && "opacity-60",
        )}
        aria-label={
          isAuthenticated
            ? isStarred
              ? "Remove star"
              : "Give star"
            : "Sign in to give stars"
        }
      >
        <Star
          className={cn(
            "w-4 h-4 transition-all duration-200",
            isStarred ? "fill-current text-yellow-500" : "text-gray-400",
          )}
        />
        <span className="text-sm font-medium">{starCount}</span>
      </Button>

      {!isAuthenticated && (
        <span className="text-xs text-gray-500">Sign in to star</span>
      )}
    </div>
  );
};

export default StarButton;
