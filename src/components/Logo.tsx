import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { APP_CONFIG, ROUTES } from "@/constants";
import type { WithClassName } from "@/types";

interface LogoProps extends WithClassName {
  /**
   * Size variant for the logo
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether to show the tagline
   */
  showTagline?: boolean;
  /**
   * Whether the logo should be clickable
   */
  clickable?: boolean;
  /**
   * Custom onClick handler (overrides navigation)
   */
  onClick?: () => void;
}

const sizeClasses = {
  sm: {
    brand: "text-sm",
    tagline: "text-xs",
  },
  md: {
    brand: "text-base",
    tagline: "text-xs",
  },
  lg: {
    brand: "text-lg",
    tagline: "text-sm",
  },
};

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showTagline = true,
  clickable = true,
  onClick,
  className,
}) => {
  const content = (
    <div className="flex flex-col" aria-label={`${APP_CONFIG.name} logo`}>
      <span
        className={cn(
          "text-gray-900 font-medium leading-none tracking-normal group-hover:text-gray-700 transition-colors duration-200",
          sizeClasses[size].brand,
        )}
      >
        {APP_CONFIG.name.split(".")[0]}
        <span className="text-gray-700 font-normal">
          .{APP_CONFIG.name.split(".")[1]}
        </span>
      </span>
      {showTagline && (
        <span
          className={cn(
            "text-gray-500 font-normal leading-none mt-1",
            sizeClasses[size].tagline,
          )}
        >
          {APP_CONFIG.tagline}
        </span>
      )}
    </div>
  );

  if (!clickable) {
    return <div className={cn("flex items-center", className)}>{content}</div>;
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-md p-1 -m-1",
          className,
        )}
        aria-label={`${APP_CONFIG.name} home`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      to={ROUTES.HOME}
      className={cn(
        "flex items-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-md p-1 -m-1",
        className,
      )}
      aria-label={`${APP_CONFIG.name} home`}
    >
      {content}
    </Link>
  );
};

export default Logo;
