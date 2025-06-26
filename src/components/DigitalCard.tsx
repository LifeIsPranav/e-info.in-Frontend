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
  jobTitle = "Senior Product Designer",
  bio = "Passionate about creating beautiful, user-centered digital experiences that make a difference.",
  email = "alex@example.com",
  phone = "+1 (555) 123-4567",
  location = "San Francisco, CA",
  website = "alexjohnson.design",
  profileImage = "/placeholder.svg",
}: DigitalCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageText, setMessageText] = useState("");

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSendMessage = () => {
    // In a real app, this would send the message
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
    <div className="perspective-1000 w-full max-w-md mx-auto">
      <div
        className={`relative w-full h-80 transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={!isFlipped ? handleCardClick : undefined}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl shadow-2xl border border-slate-700/50">
          <div className="relative h-full p-8 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 flex h-full">
              {/* Left Side - Profile */}
              <div className="flex flex-col items-center justify-center w-1/2 pr-4">
                {/* Profile Image */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 p-0.5">
                    <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center overflow-hidden">
                      <img
                        src={profileImage}
                        alt={name}
                        className="w-full h-full object-cover rounded-2xl"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          target.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                      <div className="hidden w-full h-full bg-gradient-to-br from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 opacity-30 blur"></div>
                </div>

                {/* Click hint */}
                <div className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
                  Click to message
                </div>
              </div>

              {/* Right Side - Info */}
              <div className="flex flex-col justify-center w-1/2 pl-4 space-y-3">
                {/* Name and Title */}
                <div className="mb-3">
                  <h1 className="text-xl font-bold text-white mb-1 leading-tight">
                    {name}
                  </h1>
                  <p className="text-pink-400 font-medium text-sm">
                    {jobTitle}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
                  {bio}
                </p>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-slate-400 text-xs">
                    <Mail className="w-3 h-3 mr-2 text-pink-400" />
                    <span className="truncate">{email}</span>
                  </div>
                  <div className="flex items-center text-slate-400 text-xs">
                    <Phone className="w-3 h-3 mr-2 text-pink-400" />
                    <span className="truncate">{phone}</span>
                  </div>
                  <div className="flex items-center text-slate-400 text-xs">
                    <MapPin className="w-3 h-3 mr-2 text-pink-400" />
                    <span className="truncate">{location}</span>
                  </div>
                  <div className="flex items-center text-slate-400 text-xs">
                    <Globe className="w-3 h-3 mr-2 text-pink-400" />
                    <span className="truncate">{website}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl shadow-2xl border border-slate-700/50"
          onClick={handleCardClick}
        >
          <div className="relative h-full p-6 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500 to-violet-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Send Message</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(false);
                  }}
                  className="text-slate-400 hover:text-white p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Message Form */}
              <div className="flex-1 space-y-3">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Title
                  </label>
                  <Input
                    id="title"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                    placeholder="Message title..."
                    className="bg-slate-800/80 border-slate-700/50 text-white placeholder-slate-500 focus:border-pink-500 h-9 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-slate-300 mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Your message..."
                    className="bg-slate-800/80 border-slate-700/50 text-white placeholder-slate-500 focus:border-pink-500 min-h-24 resize-none text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Send Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendMessage();
                }}
                disabled={!messageTitle.trim() || !messageText.trim()}
                className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border-0 mt-3 h-9"
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
