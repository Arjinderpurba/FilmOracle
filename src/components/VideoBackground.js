import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovietrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        // For a clean, minimal player
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      >
        -webkit-transform: scale(1.00);
        transform: scale(1.00);
        -webkit-mask-image: -webkit-radial-gradient(white, black);
      </iframe>
    </div>
  );
};

export default VideoBackground;
