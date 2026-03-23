import React from "react";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchbar from "./GptSearchbar";
import { BGIMG } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background with Overlay */}
      <div className="fixed inset-0 -z-10">
        <img 
          className="h-full w-full object-cover" 
          src={BGIMG} 
          alt="Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <GptSearchbar />
        <GptMovieSuggestions />
      </div>

      {/* Footer Note */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-gray-500 text-sm px-4">
          Powered by AI • Results may vary • Click any movie for details
        </p>
      </div>
    </div>
  );
};

export default GptSearch;