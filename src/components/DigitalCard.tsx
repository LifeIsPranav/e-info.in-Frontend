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

  return (
    <div className="perspective-1000 w-full">
      <div
        className={`relative w-full h-80 transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={!isFlipped ? handleCardClick : undefined}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-white shadow-sm border border-gray-100">
          <div className="p-8 h-full flex flex-col">
            {/* Profile Section */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
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
                <h1 className="text-xl font-medium text-gray-900 mb-1 leading-tight">
                  {name}
                </h1>
                <p className="text-gray-600 text-sm mb-3 font-medium">
                  {jobTitle}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mt-auto">
              <div className="flex items-center text-gray-600 text-sm">
                <div className="w-8 flex justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-gray-900">{email}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <div className="w-8 flex justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-gray-900">{website}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <div className="w-8 flex justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-gray-900">{location}</span>
              </div>
            </div>

            {/* Resume Button */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(resumeUrl, "_blank", "noopener,noreferrer");
                }}
                variant="outline"
                className="w-full h-10 bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-900 mb-3"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Resume
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>

              {/* CTA */}
              <div className="text-center">
                <span className="text-gray-500 text-xs">
                  Tap to send message
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl bg-white shadow-sm border border-gray-100"
          onClick={handleCardClick}
        >
          <div className="p-6 h-full flex flex-col min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
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

            {/* Form */}
            <div className="flex-1 flex flex-col space-y-3 min-h-0">
              <div className="flex-shrink-0">
                <Input
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="Subject"
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-0 h-10"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex-1 min-h-0">
                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Your message..."
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-0 h-full resize-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Send Button */}
            <div className="flex-shrink-0 mt-4">
              <Button
                onClick={handleSendMessage}
                disabled={!messageTitle.trim() || !messageText.trim()}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 h-10 disabled:bg-gray-200 disabled:text-gray-400"
              >
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
