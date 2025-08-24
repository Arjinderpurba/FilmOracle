import React from "react";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchbar from "./GptSearchbar";
import { BGIMG } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
      <div className="absolute -z-10">
        <img className="h-screen object-cover sm:h-auto"src={BGIMG} alt="bgimg" />
      </div>
      <div className="">
        <GptSearchbar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};

export default GptSearch;
