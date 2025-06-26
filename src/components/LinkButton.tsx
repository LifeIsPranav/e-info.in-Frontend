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
      className="w-full h-auto p-4 justify-start bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/30 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5 group backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 w-full">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg">
          {icon || <ExternalLink className="w-5 h-5 text-white" />}
        </div>

        {/* Content */}
        <div className="flex-1 text-left min-w-0">
          <div className="text-white font-semibold text-base group-hover:text-emerald-100 transition-colors duration-200">
            {title}
          </div>
          {description && (
            <div className="text-slate-400 text-sm mt-0.5 group-hover:text-slate-300 transition-colors duration-200 truncate">
              {description}
            </div>
          )}
        </div>

        {/* Arrow */}
        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
      </div>
    </Button>
  );
}
