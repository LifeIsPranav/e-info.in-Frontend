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
    <div className="perspective-1000 w-full max-w-sm mx-auto">
      <div
        className={`relative w-full h-96 transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={!isFlipped ? handleCardClick : undefined}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 shadow-2xl border border-slate-800">
          <div className="flex flex-col items-center text-center h-full">
            {/* Profile Image */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 p-0.5">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-pink-500 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 opacity-30 blur"></div>
            </div>

            {/* Name and Title */}
            <h1 className="text-2xl font-bold text-white mb-1">{name}</h1>
            <p className="text-pink-400 font-medium mb-3">{jobTitle}</p>

            {/* Bio */}
            <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">
              {bio}
            </p>

            {/* Contact Info */}
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-center text-slate-400 text-xs">
                <Mail className="w-3 h-3 mr-2" />
                {email}
              </div>
              <div className="flex items-center justify-center text-slate-400 text-xs">
                <Phone className="w-3 h-3 mr-2" />
                {phone}
              </div>
              <div className="flex items-center justify-center text-slate-400 text-xs">
                <MapPin className="w-3 h-3 mr-2" />
                {location}
              </div>
              <div className="flex items-center justify-center text-slate-400 text-xs">
                <Globe className="w-3 h-3 mr-2" />
                {website}
              </div>
            </div>

            {/* Click hint */}
            <div className="mt-4 text-xs text-slate-500">
              Click to send a message
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 shadow-2xl border border-slate-800">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Send Message</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Message Form */}
            <div className="flex-1 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Title
                </label>
                <Input
                  id="title"
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="Message title..."
                  className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-pink-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Your message..."
                  className="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-pink-500 min-h-32 resize-none"
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
              className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white border-0 mt-4"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
