import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovietrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen relative overflow-hidden">
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${trailerVideo?.key}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&hl=en&widget_referrer=filmoracle&enablejsapi=1&origin=https://filmoracle.com&vq=hd1080&autohide=1&color=white&disable_polymer=1&playsinline=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        frameBorder="0"
      ></iframe>
      
      {/* Gradient overlays for text readability - no black background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black via-black/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default VideoBackground;