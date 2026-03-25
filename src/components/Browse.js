import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  if (showGptSearch) {
    return (
      <>
        <Header />
        <GptSearch />
      </>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <MainContainer />
        <SecondaryContainer />
      </div>
      
      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
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
              <span>© 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Browse;