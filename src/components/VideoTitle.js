import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-20">
      <div className="flex flex-col justify-end md:justify-center h-full pb-28 md:pb-0 pl-4 sm:pl-6 md:pl-12 lg:pl-24 pt-20 md:pt-0">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4 max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] leading-tight drop-shadow-lg">
          {title}
        </h1>
        
        {/* Overview - Hidden on mobile */}
        <p className="hidden sm:block text-white text-xs sm:text-sm md:text-base lg:text-lg w-full sm:w-4/5 md:w-3/4 lg:w-2/5 mb-3 sm:mb-4 md:mb-6 line-clamp-2 sm:line-clamp-3 md:line-clamp-4 leading-relaxed drop-shadow-md">
          {overview}
        </p>
        
        {/* Buttons */}
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          <button className="bg-white text-black py-2 sm:py-2.5 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-opacity-80 transition-all flex items-center gap-2 font-medium shadow-lg">
            <span className="text-base sm:text-lg">▶</span>
            <span>Play</span>
          </button>
          <button className="bg-gray-500/70 backdrop-blur-sm text-white py-2 sm:py-2.5 px-4 sm:px-6 text-sm sm:text-base rounded-lg hover:bg-gray-500/90 transition-all flex items-center gap-2 font-medium shadow-lg">
            <span className="text-base sm:text-lg">ⓘ</span>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;