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
      className="w-full h-auto p-5 justify-start bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/50 rounded-2xl transition-all duration-300 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10 group backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 w-full">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          {icon || <ExternalLink className="w-5 h-5 text-white" />}
        </div>

        {/* Content */}
        <div className="flex-1 text-left min-w-0">
          <div className="text-white font-semibold text-base group-hover:text-pink-100 transition-colors duration-200">
            {title}
          </div>
          {description && (
            <div className="text-slate-400 text-sm mt-1 group-hover:text-slate-300 transition-colors duration-200 truncate">
              {description}
            </div>
          )}
        </div>

        {/* Arrow */}
        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-pink-400 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
      </div>
    </Button>
  );
}
