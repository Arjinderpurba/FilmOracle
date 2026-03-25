import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="px-3 sm:px-4 md:px-6 mb-6 sm:mb-8">
      {/* Section Header with Red Bar */}
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-1 h-6 sm:h-8 bg-red-600 rounded-full"></div>
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
          {title}
        </h1>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-scroll no-scrollbar pb-2 sm:pb-4">
        <div className="flex gap-2 sm:gap-3 md:gap-4">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              posterPath={movie.poster_path}
              movieId={movie.id}
              title={movie.title || movie.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;