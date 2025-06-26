import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkButtonProps {
  href: string;
  title: string;
  icon?: React.ReactNode;
  description?: string;
}

export default function LinkButton({
  href,
  title,
  icon,
  description,
}: LinkButtonProps) {
  const handleClick = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="w-full h-auto p-4 justify-start bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all duration-200 group"
    >
      <div className="flex items-center gap-4 w-full">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors duration-200">
          {icon || <ExternalLink className="w-4 h-4 text-gray-600" />}
        </div>

        {/* Content */}
        <div className="flex-1 text-left min-w-0">
          <div className="text-gray-900 font-medium text-sm">{title}</div>
          {description && (
            <div className="text-gray-500 text-xs mt-0.5 truncate">
              {description}
            </div>
          )}
        </div>

        {/* Arrow */}
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200 flex-shrink-0" />
      </div>
    </Button>
  );
}
