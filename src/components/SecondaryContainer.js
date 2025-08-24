import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className="pl-4 md:pl-6 mt-0 md:-mt-56 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated"} movies={movies.TopRatedMovies} />
        <MovieList title={"Popular"} movies={movies.PopularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.UpcomingMovies} />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
