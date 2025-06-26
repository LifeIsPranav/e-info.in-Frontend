import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExpandableCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  projectDetails?: string;
  isOpen: boolean;
  onClose: () => void;
  href: string;
}

export default function ExpandableCard({
  title,
  description,
  imageUrl,
  projectDetails,
  isOpen,
  onClose,
  href,
}: ExpandableCardProps) {
  if (!isOpen) return null;

  const handleVisitLink = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mb-3 overflow-hidden transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 h-8 w-8 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Image */}
        {imageUrl && (
          <div className="mb-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-40 object-cover rounded-lg bg-gray-100"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Project Details */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {projectDetails ||
              `Featured work and projects related to ${title}. Click the button below to explore more of my work on this platform.`}
          </p>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleVisitLink}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white h-10"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Visit {title}
        </Button>
      </div>
    </div>
  );
}
