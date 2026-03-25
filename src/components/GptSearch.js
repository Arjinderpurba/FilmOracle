import React, { useEffect } from "react";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchbar from "./GptSearchbar";
import { BGIMG } from "../utils/constants";

const GptSearch = () => {
  useEffect(() => {
    document.body.classList.add('gpt-active');
    return () => {
      document.body.classList.remove('gpt-active');
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* Background Image with Dark Overlay */}
      <div className="fixed inset-0 -z-10">
        <img 
          className="w-full h-full object-cover" 
          src={BGIMG} 
          alt="Background" 
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Search Section */}
        <div className="flex-1">
          <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 px-3 sm:px-4">
            <GptSearchbar />
          </div>
          <GptMovieSuggestions />
        </div>

        {/* Footer - Sticks to Bottom */}
        <footer className="bg-black/80 backdrop-blur-md py-4 sm:py-6 border-t border-gray-800/50 mt-6 sm:mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 sm:space-y-3">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-wide px-2">
                "Let AI guide you to your next favorite film"
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
                <span>FilmOracle</span>
                <span>•</span>
                <span>Powered by GPT & TMDB</span>
                <span>•</span>
                <span className="hidden xs:inline">AI-Powered Recommendations</span>
                <span className="xs:hidden">AI Recommendations</span>
                <span>•</span>
                <span>© 2024</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GptSearch;