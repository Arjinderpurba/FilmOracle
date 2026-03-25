import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const MovieDetailModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const fetchMovieDetails = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();
    setMovieDetails(data);
  };

  const fetchMovieTrailer = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const data = await response.json();
    
    const officialTrailer = data.results?.find(
      video => video.type === "Trailer" && video.official === true
    );
    
    const anyTrailer = data.results?.find(
      video => video.type === "Trailer"
    );
    
    setTrailerKey(officialTrailer?.key || anyTrailer?.key || null);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchMovieDetails(), fetchMovieTrailer()]);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false);
      }
    };

    if (movieId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          <p className="text-white text-lg font-medium">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-y-auto scroll-smooth"
      onClick={handleBackgroundClick}
    >
      <div className="min-h-screen flex items-start justify-center p-2 sm:p-3">
        <div 
          className="bg-gradient-to-b from-gray-900 to-black rounded-xl w-full max-w-6xl my-4 md:my-8 max-h-[95vh] flex flex-col overflow-hidden border border-gray-800 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="sticky top-0 z-30 flex justify-end p-3 sm:p-4 bg-gradient-to-b from-gray-900 via-gray-900/95 to-transparent">
            <button 
              onClick={onClose}
              className="text-white bg-gray-800/90 hover:bg-red-600 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 backdrop-blur-sm"
              aria-label="Close modal"
            >
              <span className="text-lg sm:text-xl">✕</span>
            </button>
          </div>

          {/* Main Content - Stacked Layout */}
          <div className="flex flex-col flex-1 overflow-y-auto">
            
            {/* YouTube Trailer - MUCH Larger */}
            <div className="w-full px-0">
              <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
                {trailerKey ? (
                  <>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${trailerKey}?controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&fs=0&disablekb=1&playsinline=1`}
                      title={`${movieDetails?.title} trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  </>
                ) : movieDetails?.backdrop_path ? (
                  <>
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                      alt={movieDetails.title}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="text-center text-gray-400">
                      <div className="text-4xl mb-3">📽️</div>
                      <p className="text-sm sm:text-base">No media available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Header Info */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                {/* Poster */}
                {movieDetails?.poster_path && (
                  <div className="flex-shrink-0">
                    <img
                      className="w-32 h-48 sm:w-40 sm:h-60 lg:w-48 lg:h-72 object-cover rounded-lg shadow-lg mx-auto sm:mx-0 border border-gray-700"
                      src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                      alt={movieDetails.title}
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Title & Basic Info */}
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight">
                    {movieDetails?.title}
                  </h1>
                  <p className="text-gray-400 text-base sm:text-lg lg:text-xl mt-1">
                    {movieDetails?.release_date ? new Date(movieDetails.release_date).getFullYear() : 'N/A'}
                  </p>

                  {/* Rating & Runtime - Horizontal on small screens */}
                  <div className="flex items-center gap-4 mt-4 lg:mt-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-800 rounded-lg">
                        <span className="text-yellow-400 text-lg sm:text-xl lg:text-2xl">⭐</span>
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
                            {movieDetails?.vote_average?.toFixed(1)}
                          </span>
                          <span className="text-gray-400 text-sm sm:text-base lg:text-lg">/10</span>
                        </div>
                        <p className="text-gray-400 text-xs lg:text-sm">Rating</p>
                      </div>
                    </div>

                    <div className="h-6 lg:h-8 w-px bg-gray-700"></div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-800 rounded-lg">
                        <span className="text-gray-300 text-lg sm:text-xl lg:text-2xl">⏱️</span>
                      </div>
                      <div>
                        <p className="text-white font-medium text-base sm:text-lg lg:text-xl">
                          {movieDetails?.runtime || 'N/A'} min
                        </p>
                        <p className="text-gray-400 text-xs lg:text-sm">Duration</p>
                      </div>
                    </div>
                  </div>

                  {/* Genres */}
                  {movieDetails?.genres?.length > 0 && (
                    <div className="mt-4 lg:mt-6">
                      <div className="flex flex-wrap gap-2">
                        {movieDetails.genres.slice(0, 4).map(genre => (
                          <span 
                            key={genre.id}
                            className="px-3 py-1.5 bg-gray-800 text-gray-200 rounded-full text-xs sm:text-sm lg:text-base font-medium border border-gray-700"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4 flex items-center gap-2">
                <span className="text-red-500">▸</span>
                Overview
              </h3>
              <div className="bg-gray-800/50 rounded-lg lg:rounded-xl p-4 lg:p-6 border border-gray-700">
                <p className="text-gray-200 leading-relaxed text-sm sm:text-base lg:text-lg">
                  {movieDetails?.overview || 'No overview available.'}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {/* Release Date */}
                {movieDetails?.release_date && (
                  <div className="flex items-start gap-3 p-3 sm:p-4 lg:p-5 bg-gray-800/50 rounded-lg lg:rounded-xl border border-gray-700">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-800 rounded-lg lg:rounded-xl flex items-center justify-center">
                        <span className="text-gray-300 text-sm sm:text-base lg:text-lg">📅</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-400 mb-1">Release Date</h4>
                      <p className="text-white font-medium text-sm sm:text-base lg:text-lg">
                        {new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Status */}
                {movieDetails?.status && (
                  <div className="flex items-start gap-3 p-3 sm:p-4 lg:p-5 bg-gray-800/50 rounded-lg lg:rounded-xl border border-gray-700">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-800 rounded-lg lg:rounded-xl flex items-center justify-center">
                        <span className="text-gray-300 text-sm sm:text-base lg:text-lg">📊</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-400 mb-1">Status</h4>
                      <p className="text-white font-medium text-sm sm:text-base lg:text-lg">{movieDetails.status}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Production Companies - LOGO ONLY (No text when logo exists) */}
              {movieDetails?.production_companies?.length > 0 && (
                <div className="mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8 border-t border-gray-800">
                  <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-3 lg:mb-4">Production Companies</h4>
                  <div className="flex flex-wrap gap-3 lg:gap-4">
                    {movieDetails.production_companies.slice(0, 3).map(company => (
                      company.logo_path ? (
                        <div 
                          key={company.id}
                          className="p-2 sm:p-3 bg-gray-800 rounded-lg lg:rounded-xl border border-gray-700 flex items-center justify-center hover:bg-gray-700 transition-colors"
                          title={company.name}
                        >
                          <img
                            className="h-8 sm:h-10 lg:h-12 w-auto max-w-[120px] sm:max-w-[150px] lg:max-w-[180px]"
                            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                            alt={company.name}
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div 
                          key={company.id}
                          className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 rounded-lg lg:rounded-xl border border-gray-700 flex items-center justify-center"
                        >
                          <p className="text-white text-xs sm:text-sm lg:text-base text-center">
                            {company.name}
                          </p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent p-4 sm:p-6 lg:p-8 pt-6 lg:pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                {trailerKey && (
                  <button
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${trailerKey}`, '_blank')}
                    className="py-3 sm:py-3.5 lg:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg lg:rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span className="text-lg sm:text-xl lg:text-2xl">▶</span>
                    <span className="text-sm sm:text-base lg:text-lg">Watch Full Trailer</span>
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="py-3 sm:py-3.5 lg:py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg lg:rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="text-sm sm:text-base lg:text-lg">Close Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;