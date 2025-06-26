import { useState, forwardRef, useImperativeHandle } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Types
interface ContactInfo {
  email: string;
  website: string;
  location: string;
}

interface PersonalInfo {
  name: string;
  jobTitle: string;
  bio: string;
  profileImage: string;
}

interface DigitalCardProps extends PersonalInfo, ContactInfo {
  resumeUrl?: string;
  onConfigureClick?: () => void;
}

interface DigitalCardRef {
  handleOutsideClick: () => void;
}

// Constants
const DEFAULT_PROPS: DigitalCardProps = {
  name: "Alex Johnson",
  jobTitle: "UI/UX Designer",
  bio: "Creating digital experiences that matter. Clean, functional, human-centered design.",
  email: "alex@example.com",
  website: "alexjohnson.design",
  location: "San Francisco",
  profileImage: "/placeholder.svg",
  resumeUrl: "https://drive.google.com/file/d/example/view",
};

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
const ProfileImage = ({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) => (
  <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 ring-2 ring-gray-100 mx-auto md:mx-0">
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
);

const ContactInfoItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center text-gray-600 justify-center md:justify-start">
    <Icon className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
    <span className="truncate text-xs">{text}</span>
  </div>
);

const ResumeButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent) => void;
}) => (
  <Button
    onClick={onClick}
    variant="ghost"
    size="sm"
    className="absolute top-4 right-4 z-10 h-9 w-9 p-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm backdrop-blur-sm transition-all duration-200"
  >
    <FileText className="w-4 h-4 text-gray-600" />
  </Button>
);

const SwitchButton = ({
  onClick,
}: {
  onClick: (e: React.MouseEvent) => void;
}) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={onClick}
    className="text-gray-400 hover:text-gray-600 p-2 h-9 w-9 rounded-full hover:bg-gray-50"
  >
    <div className="flex flex-col items-center justify-center">
      <ArrowRight className="w-3 h-3 -mb-0.5" />
      <ArrowLeft className="w-3 h-3" />
    </div>
  </Button>
);

const ConfigureButton = ({
  onClick,
  isVisible,
}: {
  onClick: () => void;
  isVisible: boolean;
}) => (
  <Button
    onClick={onClick}
    variant="ghost"
    size="sm"
    className={`absolute top-2 right-2 z-10 h-6 w-6 p-1 rounded-md hover:bg-gray-100/50 transition-all duration-200 ${
      isVisible
        ? "opacity-60 hover:opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"
    }`}
  >
    <Settings className="w-4 h-4 text-gray-400" />
  </Button>
);

const CardFront = ({
  personalInfo,
  contactInfo,
  resumeUrl,
  onCardClick,
  onResumeClick,
}: {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  resumeUrl?: string;
  onCardClick: () => void;
  onResumeClick: (e: React.MouseEvent) => void;
}) => (
  <div
    className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white shadow-lg border border-gray-100/80 overflow-hidden cursor-pointer"
    onClick={onCardClick}
  >
    <div className="h-full flex flex-col relative">
      {/* Resume Button */}
      {resumeUrl && <ResumeButton onClick={onResumeClick} />}

      {/* Profile Section */}
      <div className="flex-1 p-4">
        {/* Header with Image and Basic Info */}
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
          <ProfileImage
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            initials={createInitials(personalInfo.name)}
          />

          <div className="flex-1 min-w-0 text-center md:text-left">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1 leading-tight">
              {personalInfo.name}
            </h1>
            <p className="text-gray-600 text-sm md:text-base font-medium mb-3">
              {personalInfo.jobTitle}
            </p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed text-center md:text-left">
            {personalInfo.bio}
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ContactInfoItem icon={Mail} text={contactInfo.email} />
          <ContactInfoItem icon={Globe} text={contactInfo.website} />
          <ContactInfoItem icon={MapPin} text={contactInfo.location} />
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="text-center py-2">
          <span className="text-gray-500 text-sm font-medium">
            Tap card to send message
          </span>
        </div>
      </div>
    </div>
  </div>
);

const CardBack = ({
  messageTitle,
  messageText,
  onMessageTitleChange,
  onMessageTextChange,
  onSendMessage,
  onCloseCard,
  onConfigureClick,
  isFormEmpty,
}: {
  messageTitle: string;
  messageText: string;
  onMessageTitleChange: (value: string) => void;
  onMessageTextChange: (value: string) => void;
  onSendMessage: (e: React.MouseEvent) => void;
  onCloseCard: (e: React.MouseEvent) => void;
  onConfigureClick?: () => void;
  isFormEmpty: boolean;
}) => (
  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white shadow-lg border border-gray-100/80 overflow-hidden">
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Send Message</h2>
          <p className="text-gray-500 text-sm mt-1">Let's connect</p>
        </div>

        {/* Switch Button (replacing X close button) */}
        <SwitchButton onClick={onCloseCard} />
      </div>

      {/* Form Content */}
      <div className="flex-1 p-4 min-h-0 flex flex-col">
        <div className="space-y-4 flex-1">
          <Input
            value={messageTitle}
            onChange={(e) => onMessageTitleChange(e.target.value)}
            placeholder="Subject"
            className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 h-11 text-sm"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="relative flex-1">
            <Textarea
              value={messageText}
              onChange={(e) => onMessageTextChange(e.target.value)}
              placeholder="Your message..."
              className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none text-sm w-full h-full min-h-20 pr-8"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Configure Button - positioned inside textarea */}
            {onConfigureClick && (
              <ConfigureButton
                onClick={onConfigureClick}
                isVisible={isFormEmpty}
              />
            )}
          </div>
        </div>
      </div>

      {/* Send Button */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
        <Button
          onClick={onSendMessage}
          disabled={!messageTitle.trim() || !messageText.trim()}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white h-11 disabled:bg-gray-200 disabled:text-gray-400 text-sm font-medium transition-colors"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>
    </div>
  </div>
);

// Main Component
const DigitalCard = forwardRef<DigitalCardRef, Partial<DigitalCardProps>>((props = {}, ref) => {
  // Merge props with defaults
  const {
    name,
    jobTitle,
    bio,
    email,
    website,
    location,
    profileImage,
    resumeUrl,
    onConfigureClick,
  } = { ...DEFAULT_PROPS, ...props };

  // State Management
  const [isFlipped, setIsFlipped] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  // Derived State
  const personalInfo: PersonalInfo = { name, jobTitle, bio, profileImage };
  const contactInfo: ContactInfo = { email, website, location };
  const isFormEmpty = !messageTitle.trim() && !messageText.trim();

  // Expose outside click handler through ref
  useImperativeHandle(ref, () => ({
    handleOutsideClick: () => {
      if (isFlipped) {
        setIsFlipped(false);
      }
    }
  }));

  // Event Handlers
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCloseCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (resumeUrl) {
      handleExternalLink(resumeUrl);
    }
  };

  const handleSendMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!messageTitle.trim() || !messageText.trim()) return;

    // Here you can integrate with your preferred messaging service
    console.log("Sending message:", {
      title: messageTitle,
      message: messageText,
      timestamp: new Date().toISOString(),
    });

    // Show success feedback
    alert("Message sent successfully!");

    // Reset form and close card
    setMessageTitle("");
    setMessageText("");
    setIsFlipped(false);
  };

  const handleConfigureClick = () => {
    // Auto-fill with predefined message
    const predefinedSubject = "Let's Connect!";
    const predefinedMessage =
      "Hi! I'd love to connect and discuss potential opportunities. Looking forward to hearing from you!";

    setMessageTitle(predefinedSubject);
    setMessageText(predefinedMessage);

    if (onConfigureClick) {
      onConfigureClick();
    }
  };

  // Render
  return (
    <div className="perspective-1000 w-full">
      <div
        className={`relative w-full h-80 transition-transform duration-700 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Front */}
        <CardFront
          personalInfo={personalInfo}
          contactInfo={contactInfo}
          resumeUrl={resumeUrl}
          onCardClick={!isFlipped ? handleCardClick : () => {}}
          onResumeClick={handleResumeClick}
        />

        {/* Card Back */}
        <CardBack
          messageTitle={messageTitle}
          messageText={messageText}
          onMessageTitleChange={setMessageTitle}
          onMessageTextChange={setMessageText}
          onSendMessage={handleSendMessage}
          onCloseCard={handleCloseCard}
          onConfigureClick={handleConfigureClick}
          isFormEmpty={isFormEmpty}
        />
      </div>
    </div>
  );
}