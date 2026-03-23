import React from 'react';

const Loader = () => {
  return (
    // fixed inset-0 ensures it covers the entire viewport regardless of parent positioning
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="text-center">
        <div className="relative mb-4">
          {/* Netflix-style spinner */}
          <div className="w-16 h-16 border-4 border-gray-800 border-t-red-600 rounded-full animate-spin mx-auto"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 font-black text-xl">
            N
          </div>
        </div>
        
        <p className="text-gray-400 font-medium tracking-widest animate-pulse uppercase text-xs">
          Wait a moment...
        </p>
      </div>
    </div>
  );
};

export default Loader;