import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 mb-8">
      {/* Section Header with Red Bar - Professional Style */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-8 bg-red-600 rounded-full"></div>
        <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight">
          {title}
        </h1>
        <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></div>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {movies?.map((movie) => (
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