import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovietrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen relative overflow-hidden">
      <iframe
        className="w-screen aspect-video pointer-events-none"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${trailerVideo?.key}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&cc_load_policy=0&hl=en&widget_referrer=filmoracle&enablejsapi=1&origin=https://filmoracle.com&vq=hd1080&autohide=1&color=white&disable_polymer=1&playsinline=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      ></iframe>
      
      {/* Full overlay to block all interactions with the iframe */}
      <div className="absolute inset-0 cursor-default"></div>
      
      {/* Gradient overlays for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};

export default VideoBackground;
