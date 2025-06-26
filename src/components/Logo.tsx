export default function Logo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          {/* Minimal interconnected circles representing people/connections */}
          <div className="relative">
            {/* Three circles forming a connection pattern */}
            <div className="w-4 h-4 relative">
              {/* Main circle */}
              <div className="absolute top-0.5 left-1 w-1.5 h-1.5 bg-white rounded-full"></div>
              {/* Connected circles */}
              <div className="absolute top-1.5 left-0 w-1 h-1 bg-white/80 rounded-full"></div>
              <div className="absolute top-1.5 right-0 w-1 h-1 bg-white/80 rounded-full"></div>

              {/* Connection lines */}
              <div className="absolute top-1.5 left-1 w-0.5 h-0.5 bg-white/60 transform rotate-45"></div>
              <div className="absolute top-1.5 right-1 w-0.5 h-0.5 bg-white/60 transform -rotate-45"></div>
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
