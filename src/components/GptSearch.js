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
    <>
      {/* Fixed Background */}
      <div className="fixed inset-0 -z-10">
        <img 
          className="w-full h-full object-cover" 
          src={BGIMG} 
          alt="Background" 
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        <div className="pt-20 pb-8">
          <GptSearchbar />
        </div>
        <GptMovieSuggestions />
        <footer className="bg-black/80 backdrop-blur-md py-6 border-t border-gray-800/50 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3">
              <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide">
                "Let AI guide you to your next favorite film"
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
                <span>FilmOracle</span>
                <span>•</span>
                <span>Powered by GPT & TMDB</span>
                <span>•</span>
                <span>AI-Powered Recommendations</span>
                <span>•</span>
                <span>© 2024</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GptSearch;