import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames || movieNames.length === 0) return null;

  return (
    <div className="py-8">
      {movieNames.map((movieName, index) => (
        <div key={movieName} className="px-6 mb-8">
          {/* Section Header with Red Bar */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-red-600 rounded-full"></div>
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">
              {movieName}
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-scroll no-scrollbar">
            <div className="flex">
              {movieResults[index]?.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  posterPath={movie.poster_path}
                  movieId={movie.id}
                  title={movie.title}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GptMovieSuggestions;