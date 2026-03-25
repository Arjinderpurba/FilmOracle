import React, { useRef, useState } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";
import Loader from "./Loader";

/* global puter */

const GptSearchbar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value.trim()) return;
    
    setIsLoading(true);

    try {
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${searchText.current.value}". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Carry On Jatta, Jatt and Juliet`;

      const response = await puter.ai.chat(gptQuery, {
        model: "gpt-4o",
      });

      const movieRecommendations = response?.message?.content
        .split(",")
        .map((movie) => movie.trim());

      const promiseArray = movieRecommendations.map(movie => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMoviesResult({ 
        movieNames: movieRecommendations, 
        movieResults: tmdbResults 
      }));

    } catch (error) {
      console.error("Error getting movie recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      {/* Loader Overlay */}
      {isLoading && <Loader />}

      {/* Simple Search Form */}
      <div className="w-full max-w-3xl">
        {/* Simple Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            AI Movie <span className="text-red-500">Recommender</span>
          </h1>
          <p className="text-gray-300 text-sm">
            Tell me what you want to watch
          </p>
        </div>

        {/* Direct Search Input */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
          <input
            ref={searchText}
            type="text"
            placeholder="e.g., Romantic comedy, Sci-fi movies like Inception, Action movies with car chases"
            className="flex-1 px-5 py-3 bg-black/60 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all text-base"
            disabled={isLoading}
            onKeyPress={(e) => e.key === 'Enter' && handleGptSearchClick()}
          />
          <button
            type="button"
            onClick={handleGptSearchClick}
            disabled={isLoading}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Search</span>
              </>
            )}
          </button>
        </form>

        {/* Example Queries - Minimal */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <span className="text-gray-500 text-xs">Try:</span>
          <button
            type="button"
            onClick={() => {
              searchText.current.value = "Action movies with car chases";
              handleGptSearchClick();
            }}
            className="text-gray-400 text-xs hover:text-red-400 transition-colors"
          >
            Action with car chases
          </button>
          <span className="text-gray-600 text-xs">•</span>
          <button
            type="button"
            onClick={() => {
              searchText.current.value = "Romantic comedies";
              handleGptSearchClick();
            }}
            className="text-gray-400 text-xs hover:text-red-400 transition-colors"
          >
            Romantic comedies
          </button>
          <span className="text-gray-600 text-xs">•</span>
          <button
            type="button"
            onClick={() => {
              searchText.current.value = "Sci-fi like Interstellar";
              handleGptSearchClick();
            }}
            className="text-gray-400 text-xs hover:text-red-400 transition-colors"
          >
            Sci-fi like Interstellar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GptSearchbar;