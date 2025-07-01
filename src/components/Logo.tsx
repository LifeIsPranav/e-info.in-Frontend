export default function Logo() {
  return (
    <div className="flex items-center group cursor-pointer">
      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="text-gray-900 font-medium text-base leading-none tracking-normal group-hover:text-gray-700 transition-colors duration-200">
          info<span className="text-gray-700 font-normal">.in</span>
        </span>
        <span className="text-gray-500 text-xs font-normal leading-none mt-1">
          Connect & Share
        </span>
      </div>
    </div>
  );
}
