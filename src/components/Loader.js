import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Netflix red spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 font-bold text-lg">
            N
          </div>
        </div>
        
        <p className="text-gray-300 mt-4 font-semibold animate-pulse">
          Just a moment...
        </p>
      </div>
    </div>
  );
};

export default Loader;