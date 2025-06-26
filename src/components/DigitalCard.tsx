import { useState } from "react";
import { Mail, MapPin, Phone, Globe, X, Send } from "lucide-react";
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
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100">
          <div className="p-8 h-full flex flex-col">
            {/* Profile Section */}
            <div className="flex items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-full bg-gray-900 overflow-hidden flex-shrink-0">
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
                <div className="hidden w-full h-full bg-gray-900 flex items-center justify-center text-white font-bold text-xl">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                  {name}
                </h1>
                <p className="text-gray-600 font-medium mb-3">{jobTitle}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{bio}</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mt-auto">
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="w-4 h-4 mr-3" />
                <span>{email}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Globe className="w-4 h-4 mr-3" />
                <span>{website}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-3" />
                <span>{location}</span>
              </div>
            </div>

            {/* Click hint */}
            <div className="mt-6 text-center">
              <div className="inline-block px-3 py-1 bg-gray-50 rounded-full">
                <span className="text-gray-500 text-xs">Tap to message</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100"
          onClick={handleCardClick}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Send Message
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-gray-400 hover:text-gray-600 p-2 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Form */}
            <div className="flex-1 space-y-4">
              <div>
                <Input
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="Subject"
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400 focus:ring-0"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex-1">
                <Textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Message"
                  className="bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400 focus:ring-0 min-h-24 resize-none"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={!messageTitle.trim() || !messageText.trim()}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 mt-4 h-11 disabled:bg-gray-300 disabled:text-gray-500"
            >
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
