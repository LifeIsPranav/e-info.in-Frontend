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
        className={`relative w-full h-96 transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={!isFlipped ? handleCardClick : undefined}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white shadow-lg border border-gray-100/80 overflow-hidden">
          <div className="h-full flex flex-col relative">
            {/* Resume Button - Top Right */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                window.open(resumeUrl, "_blank", "noopener,noreferrer");
              }}
              variant="ghost"
              size="sm"
              className="absolute top-5 right-5 z-10 h-10 w-10 p-2 rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm backdrop-blur-sm transition-all duration-200"
            >
              <FileText className="w-4 h-4 text-gray-600" />
            </Button>

            {/* Profile Section */}
            <div className="flex-1 p-6">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
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
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2 leading-tight">
                    {name}
                  </h1>
                  <p className="text-gray-600 text-base font-medium mb-3">
                    {jobTitle}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
                </div>
              </div>

              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 gap-3 text-sm">
                {/* Email - Clickable */}
                <button
                  onClick={handleEmailClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-4 rounded-xl transition-all duration-200 text-left group border border-transparent hover:border-gray-200 hover:shadow-sm"
                >
                  <Mail className="w-4 h-4 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate flex-1">{email}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
                </button>

                {/* Website - Clickable */}
                <button
                  onClick={handleWebsiteClick}
                  className="flex items-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-4 rounded-xl transition-all duration-200 text-left group border border-transparent hover:border-gray-200 hover:shadow-sm"
                >
                  <Globe className="w-4 h-4 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate flex-1">{website}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
                </button>

                {/* Phone - Non-clickable, but prevent flip */}
                <div
                  className="flex items-center text-gray-600 p-4 rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Phone className="w-4 h-4 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{phone}</span>
                </div>

                {/* Location - Non-clickable, but prevent flip */}
                <div
                  className="flex items-center text-gray-600 p-4 rounded-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MapPin className="w-4 h-4 mr-4 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
            </div>

            {/* CTA - Fixed at bottom */}
            <div className="p-5 border-t border-gray-100 bg-gray-50/50">
              <div className="text-center py-3">
                <span className="text-gray-500 text-sm font-medium">
                  Tap card to send message
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white shadow-lg border border-gray-100/80 overflow-hidden"
          onClick={handleCardClick}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Send Message
                </h2>
                <p className="text-gray-500 text-sm mt-1">Let's connect</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-2 h-10 w-10 rounded-full hover:bg-gray-50"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form Content */}
            <div className="flex-1 p-6 min-h-0 flex flex-col">
              <div className="space-y-4 flex-1">
                <Input
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="Subject"
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 h-12 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />

                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Your message..."
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 resize-none text-sm flex-1 min-h-24"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Send Button - Fixed at bottom */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
              <Button
                onClick={handleSendMessage}
                disabled={!messageTitle.trim() || !messageText.trim()}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 disabled:bg-gray-200 disabled:text-gray-400 text-sm font-medium transition-colors"
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
