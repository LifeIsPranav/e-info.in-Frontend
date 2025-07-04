import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import {
  Mail,
  MapPin,
  Globe,
  X,
  Send,
  FileText,
  Settings,
  ArrowRight,
  ArrowLeft,
  Edit3,
  Save,
  Upload,
  Plus,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PersonProfile } from "@/lib/profileData";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface UnifiedDigitalCardProps {
  profile: PersonProfile;
  isEditing?: boolean;
  canEdit?: boolean; // Controls whether edit button shows
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onProfileChange?: (profile: PersonProfile) => void;
}

interface UnifiedDigitalCardRef {
  handleOutsideClick: () => void;
}

// Utility Functions
const createInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const handleExternalLink = (url: string, useMailto = false): void => {
  const finalUrl = useMailto ? `mailto:${url}` : `https://${url}`;
  const target = useMailto ? "_self" : "_blank";
  window.open(finalUrl, target, useMailto ? "" : "noopener,noreferrer");
};

// Sub-components
const EditableProfileImage = ({
  src,
  alt,
  initials,
  isEditing,
  onImageChange,
}: {
  src: string;
  alt: string;
  initials: string;
  isEditing: boolean;
  onImageChange?: (imageUrl: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 ring-2 ring-gray-100 mx-auto md:mx-0 cursor-pointer hover:ring-blue-200 transition-all duration-200">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.nextElementSibling?.classList.remove("hidden");
          }}
        />
        <div className="hidden w-full h-full bg-gray-800 flex items-center justify-center text-white font-medium text-sm">
          {initials}
        </div>
      </div>

      {isEditing && onImageChange && (
        <>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow-lg transition-colors"
          >
            <Upload className="w-3 h-3" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </>
      )}
    </div>
  );
};

const EditableField = ({
  value,
  isEditing,
  onChange,
  placeholder,
  className = "",
  multiline = false,
}: {
  value: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  multiline?: boolean;
}) => {
  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }

  if (multiline) {
    return (
      <Textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`${className} min-h-[60px] resize-none bg-blue-50/50 border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400`}
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <Input
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className={`${className} bg-blue-50/50 border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400`}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

const EditableContactInfo = ({
  icon: Icon,
  value,
  isEditing,
  onChange,
  placeholder,
  isClickable = false,
  onClick,
}: {
  icon: any;
  value: string;
  isEditing: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  isClickable?: boolean;
  onClick?: () => void;
}) => (
  <div className="flex items-center text-gray-600 justify-center md:justify-start">
    <Icon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
    {isEditing ? (
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="text-xs bg-blue-50/50 border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 h-7"
        onClick={(e) => e.stopPropagation()}
      />
    ) : (
      <span
        className={`truncate text-xs ${
          isClickable
            ? "cursor-pointer hover:text-gray-800 transition-colors"
            : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {value}
      </span>
    )}
  </div>
);

const EditableSkills = ({
  skills = [],
  isEditing,
  onChange,
}: {
  skills: string[];
  isEditing: boolean;
  onChange?: (skills: string[]) => void;
}) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim()) && onChange) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    if (onChange) {
      onChange(skills.filter((_, i) => i !== index));
    }
  };

  if (!isEditing && (!skills || skills.length === 0)) return null;

  return (
    <div className="mt-4" onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium ${
              isEditing ? "pr-1" : ""
            }`}
          >
            {skill}
            {isEditing && onChange && (
              <button
                onClick={() => removeSkill(index)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </span>
        ))}

        {isEditing && onChange && (
          <div className="inline-flex items-center gap-1">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add skill"
              className="h-7 px-2 text-xs bg-blue-50/50 border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 w-20"
            />
            <button
              onClick={addSkill}
              className="text-blue-500 hover:text-blue-600"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const UnifiedDigitalCard = forwardRef<
  UnifiedDigitalCardRef,
  UnifiedDigitalCardProps
>(
  (
    {
      profile,
      isEditing = false,
      canEdit = true,
      onEdit,
      onSave,
      onCancel,
      onProfileChange,
    },
    ref,
  ) => {
    const { isAuthenticated } = useAuth();
    const [isFlipped, setIsFlipped] = useState(false);
    const [messageTitle, setMessageTitle] = useState("");
    const [messageText, setMessageText] = useState("");
    const [cardHeight, setCardHeight] = useState(320); // minimum height
    const frontCardRef = useRef<HTMLDivElement>(null);
    const backCardRef = useRef<HTMLDivElement>(null);

    // Expose outside click handler through ref
    useImperativeHandle(ref, () => ({
      handleOutsideClick: () => {
        if (isFlipped) {
          setIsFlipped(false);
        }
      },
    }));

    // Measure card height when content changes
    useEffect(() => {
      const measureHeight = () => {
        const frontHeight = frontCardRef.current?.scrollHeight || 0;
        const backHeight = backCardRef.current?.scrollHeight || 0;
        const maxHeight = Math.max(frontHeight, backHeight, 320); // minimum 320px
        setCardHeight(maxHeight);
      };

      measureHeight();
      // Re-measure when editing state changes or profile changes
      const timer = setTimeout(measureHeight, 100);
      return () => clearTimeout(timer);
    }, [isEditing, profile, isFlipped]);

    const handleProfileFieldChange = (
      field: keyof PersonProfile,
      value: any,
    ) => {
      if (onProfileChange) {
        onProfileChange({ ...profile, [field]: value });
      }
    };

    const handleCardClick = () => {
      if (!isEditing) {
        setIsFlipped(!isFlipped);
      }
    };

    const handleCloseCard = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFlipped(false);
    };

    const handleResumeClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (profile.resumeUrl) {
        handleExternalLink(profile.resumeUrl);
      }
    };

    const handleInstantMessage = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Pre-filled message content
      const instantSubject = "Let's Connect!";
      const instantMessage = `Hi ${profile.name || "there"}!

I came across your profile and I'm really impressed by your work. I'd love to connect and discuss potential collaboration opportunities.

Looking forward to hearing from you!

Best regards`;

      setMessageTitle(instantSubject);
      setMessageText(instantMessage);
      toast.success("Quick message template loaded!");
    };

    const handleSendMessage = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!isAuthenticated) {
        toast.error("Please log in to send a message");
        return;
      }

      if (!messageTitle.trim() || !messageText.trim()) {
        toast.error("Please fill in both subject and message");
        return;
      }

      console.log("Sending message:", {
        title: messageTitle,
        message: messageText,
        timestamp: new Date().toISOString(),
      });

      toast.success("Message sent successfully!");
      setMessageTitle("");
      setMessageText("");
      setIsFlipped(false);
    };

    return (
      <div className="perspective-1000 w-full">
        <div
          className={`relative w-full transition-transform duration-700 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            height: `${cardHeight}px`,
          }}
        >
          {/* Card Front */}
          <div
            ref={frontCardRef}
            className="absolute top-0 left-0 w-full backface-hidden rounded-2xl bg-white shadow-lg border border-gray-100/80 overflow-hidden"
            onClick={handleCardClick}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex flex-col relative min-h-80">
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                {isEditing && canEdit ? (
                  <>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCancel?.();
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm backdrop-blur-sm transition-all duration-200"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSave?.();
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm transition-all duration-200"
                    >
                      <Save className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    {profile.resumeUrl && (
                      <Button
                        onClick={handleResumeClick}
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm backdrop-blur-sm transition-all duration-200"
                      >
                        <FileText className="w-4 h-4 text-gray-600" />
                      </Button>
                    )}
                    {canEdit && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.();
                        }}
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 p-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm backdrop-blur-sm transition-all duration-200"
                      >
                        <Edit3 className="w-4 h-4 text-gray-600" />
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* Profile Section */}
              <div className="flex-1 p-4">
                {/* Header with Image and Basic Info */}
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                  <EditableProfileImage
                    src={profile.profileImage || "/placeholder.svg"}
                    alt={profile.name || "Profile"}
                    initials={createInitials(profile.name || "U")}
                    isEditing={isEditing}
                    onImageChange={
                      isEditing
                        ? (url) => handleProfileFieldChange("profileImage", url)
                        : undefined
                    }
                  />

                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <div
                      className="inline-block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EditableField
                        value={profile.name || ""}
                        isEditing={isEditing}
                        onChange={
                          isEditing
                            ? (value) => handleProfileFieldChange("name", value)
                            : undefined
                        }
                        placeholder="Your name"
                        className="text-xl md:text-2xl font-semibold text-gray-900 mb-1 leading-tight block w-full"
                      />
                      <EditableField
                        value={profile.jobTitle || ""}
                        isEditing={isEditing}
                        onChange={
                          isEditing
                            ? (value) =>
                                handleProfileFieldChange("jobTitle", value)
                            : undefined
                        }
                        placeholder="Your job title"
                        className="text-gray-600 text-sm md:text-base font-medium mb-3 block w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                  <EditableField
                    value={profile.bio || ""}
                    isEditing={isEditing}
                    onChange={
                      isEditing
                        ? (value) => handleProfileFieldChange("bio", value)
                        : undefined
                    }
                    placeholder="Write your bio..."
                    className="text-gray-700 text-sm leading-relaxed text-center md:text-left w-full"
                    multiline
                  />
                </div>

                {/* Resume Upload Section */}
                {isEditing && (
                  <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                    <label className="text-xs font-semibold text-gray-800 mb-2 block">
                      Resume/CV Link
                    </label>
                    <Input
                      value={profile.resumeUrl || ""}
                      onChange={(e) =>
                        handleProfileFieldChange("resumeUrl", e.target.value)
                      }
                      placeholder="https://your-resume-link.com"
                      className="text-sm bg-blue-50/50 border-blue-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Add a link to your resume, portfolio, or CV
                    </p>
                  </div>
                )}

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <EditableContactInfo
                    icon={Mail}
                    value={profile.email || ""}
                    isEditing={isEditing}
                    onChange={
                      isEditing
                        ? (value) => handleProfileFieldChange("email", value)
                        : undefined
                    }
                    placeholder="email@example.com"
                    isClickable={!isEditing}
                    onClick={() =>
                      !isEditing &&
                      profile.email &&
                      handleExternalLink(profile.email, true)
                    }
                  />
                  <EditableContactInfo
                    icon={Globe}
                    value={profile.website || ""}
                    isEditing={isEditing}
                    onChange={
                      isEditing
                        ? (value) => handleProfileFieldChange("website", value)
                        : undefined
                    }
                    placeholder="yourwebsite.com"
                    isClickable={!isEditing}
                    onClick={() =>
                      !isEditing &&
                      profile.website &&
                      handleExternalLink(profile.website)
                    }
                  />
                  <EditableContactInfo
                    icon={MapPin}
                    value={profile.location || ""}
                    isEditing={isEditing}
                    onChange={
                      isEditing
                        ? (value) => handleProfileFieldChange("location", value)
                        : undefined
                    }
                    placeholder="Your location"
                  />
                </div>

                {/* Skills */}
                <EditableSkills
                  skills={profile.skills || []}
                  isEditing={isEditing}
                  onChange={
                    isEditing
                      ? (skills) => handleProfileFieldChange("skills", skills)
                      : undefined
                  }
                />
              </div>

              {/* Call to Action */}
              {!isEditing && (
                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="text-center py-2">
                    <span className="text-gray-500 text-sm font-medium">
                      Tap card to send message
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card Back - Message Form */}
          <div
            ref={backCardRef}
            className="absolute top-0 left-0 w-full backface-hidden rounded-2xl bg-white shadow-lg border border-gray-100/80 overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="min-h-80 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={handleCloseCard}
                >
                  <h2 className="text-xl font-semibold text-gray-900">
                    Send Message
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">Let's connect</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Instant Message Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleInstantMessage}
                    className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 p-2 h-9 w-9 rounded-full transition-colors"
                    title="Quick message template"
                  >
                    <Zap className="w-4 h-4" />
                  </Button>

                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCloseCard}
                    className="text-gray-400 hover:text-gray-600 p-2 h-9 w-9 rounded-full hover:bg-gray-50"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <ArrowRight className="w-3 h-3 -mb-0.5" />
                      <ArrowLeft className="w-3 h-3" />
                    </div>
                  </Button>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-4 min-h-0 flex flex-col">
                <div className="space-y-4 flex-1">
                  <Input
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    placeholder="Subject"
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 h-11 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />

                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Your message..."
                    className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none text-sm w-full h-full min-h-20"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Send Button */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageTitle.trim() || !messageText.trim()}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11 disabled:bg-gray-200 disabled:text-gray-400 text-sm font-medium transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

UnifiedDigitalCard.displayName = "UnifiedDigitalCard";

export default UnifiedDigitalCard;
