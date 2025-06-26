import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  X,
  Send,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface DigitalCardProps {
  name?: string;
  jobTitle?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  website?: string;
  profileImage?: string;
  resumeUrl?: string;
}

export default function DigitalCard({
  name = "Alex Johnson",
  jobTitle = "UI/UX Designer",
  bio = "Creating digital experiences that matter. Clean, functional, human-centered design.",
  email = "alex@example.com",
  phone = "+1 (555) 123-4567",
  location = "San Francisco",
  website = "alexjohnson.design",
  profileImage = "/placeholder.svg",
  resumeUrl = "https://drive.google.com/file/d/example/view",
}: DigitalCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSendMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!messageTitle.trim() || !messageText.trim()) return;

    console.log("Sending message:", {
      title: messageTitle,
      message: messageText,
    });
    alert("Message sent!");
    setMessageTitle("");
    setMessageText("");
    setIsFlipped(false);
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`mailto:${email}`, "_self");
  };

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://${website}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="perspective-1000 w-full">
      <div
        className={`relative w-full h-80 md:h-96 transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={!isFlipped ? handleCardClick : undefined}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-full flex flex-col relative">
            {/* Resume Button - Top Right */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                window.open(resumeUrl, "_blank", "noopener,noreferrer");
              }}
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 h-8 w-8 p-1 rounded-full bg-gray-100 hover:bg-gray-200 border border-gray-200"
            >
              <FileText className="w-4 h-4 text-gray-600" />
            </Button>

            {/* Profile Section */}
            <div className="flex-1 p-4 md:p-6">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden w-full h-full bg-gray-800 flex items-center justify-center text-white font-medium text-lg">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h1 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 leading-tight">
                    {name}
                  </h1>
                  <p className="text-gray-600 text-sm font-medium mb-2 md:mb-3">
                    {jobTitle}
                  </p>
                  <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                    {bio}
                  </p>
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs">
                {/* Email - Clickable */}
                <button
                  onClick={handleEmailClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 text-left"
                >
                  <Mail className="w-3 h-3 mr-2 text-gray-400" />
                  <span className="truncate">{email}</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Website - Clickable */}
                <button
                  onClick={handleWebsiteClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 text-left"
                >
                  <Globe className="w-3 h-3 mr-2 text-gray-400" />
                  <span className="truncate">{website}</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Phone - Non-clickable */}
                <div className="flex items-center text-gray-600 p-2">
                  <Phone className="w-3 h-3 mr-2 text-gray-400" />
                  <span className="truncate">{phone}</span>
                </div>

                {/* Location - Non-clickable */}
                <div className="flex items-center text-gray-600 p-2">
                  <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
            </div>

            {/* CTA - Fixed at bottom */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="text-center py-2">
                <span className="text-gray-500 text-xs">
                  Tap card to send message
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden"
          onClick={handleCardClick}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Send Message
                </h2>
                <p className="text-gray-500 text-xs mt-1">Let's connect</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-1 h-8 w-8 rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-4 min-h-0 flex flex-col">
              <div className="space-y-3 flex-1">
                <Input
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="Subject"
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-0 h-9 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />

                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Your message..."
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-0 resize-none text-sm flex-1 min-h-20"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Send Button - Fixed at bottom */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
              <Button
                onClick={handleSendMessage}
                disabled={!messageTitle.trim() || !messageText.trim()}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white h-9 disabled:bg-gray-200 disabled:text-gray-400 text-sm"
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
}
