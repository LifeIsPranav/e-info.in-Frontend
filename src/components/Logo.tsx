import { Users, Link } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          <div className="relative">
            {/* Main icon - interconnected users */}
            <Users className="w-4 h-4 text-white" />
            {/* Small link icon overlay */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <Link className="w-1 h-1 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg opacity-20 blur-sm group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="text-gray-900 font-bold text-lg leading-none tracking-tight group-hover:text-blue-700 transition-colors duration-200">
          myone<span className="text-blue-600">Social</span>
        </span>
        <span className="text-gray-500 text-xs font-medium leading-none mt-0.5 opacity-75">
          Connect & Share
        </span>
      </div>
    </div>
  );
}
