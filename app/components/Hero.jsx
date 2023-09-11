import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { fetchGenres } from "@utils/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const [trendingMovie, setTrendingMovie] = useState(null);
  const [genreData, setGenreData] = useState("Unknown");

  useEffect(() => {
    // Fetch the trending movie data from TMDB API here
    // Example:
    fetch(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=df9eb00ba156b0ebcf9ed6f6dc5dbcd7"
    )
      .then((response) => response.json())
      .then((data) => setTrendingMovie(data.results[0]));
  }, []);

  useEffect(() => {
    if (trendingMovie) {
      // Fetch genre data based on genre_ids
      fetchGenres(trendingMovie.genre_ids)
        .then((data) => setGenreData(data))
        .catch((error) => console.error("Error fetching genre data:", error));
    }
  }, [trendingMovie]);

  return (
    <div className="mt-20 relative w-100 h-99 mx-auto text-white overflow-hidden ">
      {trendingMovie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/original${trendingMovie.poster_path}`}
            alt={trendingMovie.title}
            className="w-full h-full object-cover rounded-xl transition ease-in duration-200 hover:cursor-pointer hover:scale-105 opacity-50"
          />

          <div className="inset-0 max-w-3xl absolute flex flex-col justify-start items-start p-9 mt-10 space-y-1 z-10">
            <h1
              className={`font-roboto text-5xl text-white font-semibold uppercase`}
            >
              {trendingMovie.title}
            </h1>
            <p className="text-gray-400">{genreData}</p>
            <p className="text-gray-400">
              Release Date: {trendingMovie.release_date}
            </p>
            <div className="flex flex-row justify-center items-baseline space-x-2 font-medium text-lg">
              <div className="font-semibold text-sm px-2 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-row justify-center items-baseline">
                <FontAwesomeIcon icon={faStar} className="pr-1" />
                {trendingMovie.vote_average.toFixed(1)}
              </div>
              <p className="text-gray-300/90 text-base ml-2 font-medium">
                ({trendingMovie.vote_count} votes)
              </p>
            </div>
            <div className="flex flex-col space-y-4 pt-10 ">
              <p
                className={`w-[700px] text-base text-gray-200/90 break-none font-roboto`}
              >
                {trendingMovie.overview}
              </p>
              <Link href={`/movie/${trendingMovie.id}`}>
                <button className="bg-indigo-700 text-white px-8 py-2 rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-red-400">
                  Watch Now
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hero;
