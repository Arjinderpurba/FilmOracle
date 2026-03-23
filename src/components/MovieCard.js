import React, { useState } from 'react';
import { IMG_CDN_URL } from '../utils/constants';
import MovieDetailModal from './MovieDetailModal';

const MovieCard = ({ posterPath, movieId, title }) => {
  const [showModal, setShowModal] = useState(false);

  if (!posterPath) return null;

  return (
    <>
      <div 
        className="w-36 md:w-48 pr-4 cursor-pointer transform transition-transform duration-300 hover:scale-105"
        onClick={() => setShowModal(true)}
      >
        <div className="relative group">
          <img 
            className="rounded-lg" 
            alt={title} 
            src={IMG_CDN_URL + posterPath}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-white text-center p-2">
              <div className="text-xl mb-1">▶️</div>
              <p className="text-sm font-semibold">View Details</p>
            </div>
          </div>
        </div>
        <p className="text-white text-sm mt-2 truncate">{title}</p>
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