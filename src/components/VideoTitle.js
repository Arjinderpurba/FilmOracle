import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[16%] px-6 md:px-20 absolute text-gray-50 bg-gradient-to-r from-black ">
      <div className="">
        <h1 className="text-2xl  md:text-5xl font-bold">{title}</h1>
        <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>

        <div className="my-4 md:m-0 ">
          <button className="bg-white text-black py-1 md:py-3 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80">
            ▶︎ Play
          </button>
          <button className="hidden md:inline-block mx-2  bg-gray-700 text-white p-3 px-8 text-xl bg-opacity-50 rounded-lg hover:bg-opacity-80">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
