import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  X,
  Send,
  Figma,
  Palette,
  Monitor,
  Users,
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
}

export default function DigitalCard({
  name = "Alex Johnson",
  jobTitle = "Senior UI/UX Designer",
  bio = "Passionate about creating intuitive, accessible, and beautiful digital experiences. 5+ years crafting user-centered designs.",
  email = "alex@designstudio.com",
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
    <div className="perspective-1000 w-full max-w-lg mx-auto">
      <div
        className={`relative w-full h-80 transition-transform duration-700 preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={!isFlipped ? handleCardClick : undefined}
      >
        {/* Front of card */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-24 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-4 left-6 flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl bg-white p-0.5 shadow-lg">
                <div className="w-full h-full rounded-xl bg-slate-100 overflow-hidden">
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
                  <div className="hidden w-full h-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl drop-shadow-sm">
                  {name}
                </h1>
                <p className="text-white/90 font-medium text-sm">{jobTitle}</p>
              </div>
            </div>

            {/* Design Tools Icons */}
            <div className="absolute top-4 right-6 flex gap-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Figma className="w-4 h-4 text-white" />
              </div>
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 pt-8">
            {/* Bio */}
            <p className="text-slate-700 text-sm leading-relaxed mb-6">{bio}</p>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-slate-900 font-semibold text-xs uppercase tracking-wider mb-3">
                Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                  UI Design
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  UX Research
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  Prototyping
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                  Design Systems
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <div className="flex items-center text-slate-600 text-xs">
                <Mail className="w-3 h-3 mr-2 text-emerald-500" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center text-slate-600 text-xs">
                <Globe className="w-3 h-3 mr-2 text-emerald-500" />
                <span className="truncate">{website}</span>
              </div>
              <div className="flex items-center text-slate-600 text-xs">
                <MapPin className="w-3 h-3 mr-2 text-emerald-500" />
                <span className="truncate">{location}</span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 text-xs font-medium">
                  Tap to send message
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
          onClick={handleCardClick}
        >
          <div className="h-full p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-slate-900 font-bold text-lg">
                    Let's Collaborate
                  </h2>
                  <p className="text-slate-600 text-xs">Send me a message</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-2 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Form */}
            <div className="flex-1 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Project Title
                </label>
                <Input
                  id="title"
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="e.g., Mobile App Redesign"
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Tell me about your project and how I can help..."
                  className="bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-emerald-500 focus:ring-emerald-500 min-h-20 resize-none"
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
              className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0 mt-4 h-12 font-medium"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>

            {/* Response Time */}
            <p className="text-center text-xs text-slate-500 mt-3">
              ✨ Typically responds within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
