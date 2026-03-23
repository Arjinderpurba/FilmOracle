import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const GptMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <div key={movieName} className="p-2 m-2">
            <h2>{movieName}</h2>
            <div className="flex overflow-x-scroll">
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
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;