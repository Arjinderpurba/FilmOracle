import React, { useState } from 'react';
import { IMG_CDN_URL } from '../utils/constants';
import MovieDetailModal from './MovieDetailModal';

const MovieCard = ({ posterPath, movieId, title }) => {
  const [showModal, setShowModal] = useState(false);

  if (!posterPath) return null;

  return (
    <>
      <div 
        className="w-28 sm:w-32 md:w-36 lg:w-44 xl:w-48 pr-2 sm:pr-3 md:pr-4 cursor-pointer group flex-shrink-0"
        onClick={() => setShowModal(true)}
      >
        <div className="relative overflow-hidden rounded-lg">
          <img 
            className="rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-auto" 
            alt={title} 
            src={IMG_CDN_URL + posterPath}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-white text-center p-1 sm:p-2">
              <div className="text-base sm:text-xl mb-1">▶️</div>
              <p className="text-[10px] sm:text-xs md:text-sm font-semibold">View Details</p>
            </div>
          </div>
        </div>
        <p className="text-white text-xs sm:text-sm mt-1 sm:mt-2 truncate transition-colors duration-300 group-hover:text-red-500 text-center">
          {title}
        </p>
      </div>

      {showModal && (
        <MovieDetailModal 
          movieId={movieId} 
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default MovieCard;