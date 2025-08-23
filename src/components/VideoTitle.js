import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[16%] px-20 absolute text-gray-50 bg-gradient-to-r from-black ">
      <div className="">
        <h1 className="text-5xl font-bold">{title}</h1>
        <p className="py-6 text-lg w-1/4">{overview}</p>

        <div className="flex space-x-3">
          <button className="bg-white text-black p-3 px-12 text-xl rounded-lg hover:bg-opacity-80">
            ▶︎ Play
          </button>
          <button className="mx-2 bg-gray-700 text-white p-3 px-8 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
