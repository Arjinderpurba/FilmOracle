import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  
  console.log("🎥 MainContainer - nowPlayingMovies:", movies?.length);
  
  if (!movies || movies.length === 0) {
    console.log("⚠️ MainContainer: No movies found!");
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading main movie...</p>
      </div>
    );
  }

  const mainMovie = movies[0];
  console.log("🎬 Main movie:", mainMovie?.title);

  return (
    <div className="relative">
      <VideoBackground movieId={mainMovie?.id} />
      <VideoTitle 
        title={mainMovie?.title} 
        overview={mainMovie?.overview} 
      />
    </div>
  );
};

export default MainContainer;