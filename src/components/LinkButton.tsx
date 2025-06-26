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
      className="w-full h-auto p-4 justify-start bg-slate-900/50 hover:bg-slate-800/70 border border-slate-800 rounded-lg transition-all duration-200 hover:border-pink-500/30 group"
    >
      <div className="flex items-center gap-3 w-full">
        {/* Icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
          {icon || <ExternalLink className="w-4 h-4 text-white" />}
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <div className="text-white font-medium text-sm">{title}</div>
          {description && (
            <div className="text-slate-400 text-xs mt-0.5">{description}</div>
          )}
        </div>

        {/* Arrow */}
        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-pink-400 transition-colors duration-200" />
      </div>
    </Button>
  );
}
