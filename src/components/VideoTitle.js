import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <div className="flex flex-col justify-center h-full pl-6 md:pl-24 pt-20 md:pt-0">
        <h1 className="text-2xl md:text-6xl font-bold text-white mb-2 md:mb-4">
          {title}
        </h1>
        <p className="hidden md:inline-block text-white text-sm md:text-lg w-full md:w-1/3 lg:w-1/4 mb-4 md:mb-6 line-clamp-3">
          {overview}
        </p>
        
        <div className="flex gap-3">
          <button className="bg-white text-black py-2 md:py-3 px-4 md:px-8 text-sm md:text-xl rounded-lg hover:bg-opacity-80 transition-all flex items-center gap-2">
            <span>▶︎</span>
            <span>Play</span>
          </button>
          <button className="bg-gray-500 text-white py-2 md:py-3 px-4 md:px-8 text-sm md:text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80 transition-all flex items-center gap-2">
            <span>ⓘ</span>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;