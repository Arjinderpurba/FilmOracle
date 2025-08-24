import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResult } from "../utils/gptSlice";

/* global puter */

const GptSearchbar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);

    // Puter.js API call for movie recommendations
    try {
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: "${searchText.current.value}". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Carry On Jatta, Jatt and Juliet`;

      const response = await puter.ai.chat(gptQuery, {
        model: "gpt-4o", // You can also try "gpt-5-nano", "gpt-4.1", etc.
      });

      // console.log(response?.message?.content);

      // Process the response to get movie names
      const movieRecommendations = response?.message?.content
        .split(",")
        .map((movie) => movie.trim());
      console.log(movieRecommendations);

      // Here you would typically dispatch these movies to your store
      // and use them to fetch movie details from TMDB
      
      const promiseArray = movieRecommendations.map(movie => searchMovieTMDB(movie));
      // this will give array of promises bcz of asyn func.
      // [Promise,Promise,Promise,Promise,Promise]

      const tmdbresults = await Promise.all(promiseArray);
      console.log(tmdbresults);

      dispatch(addGptMoviesResult({movieNames: movieRecommendations,movieResults: tmdbresults}));

    } catch (error) {
      console.error("Error getting movie recommendations:", error);
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="m-4 col-span-3 py-2 px-4 bg-red-700 text-white rounded-md"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchbar;
