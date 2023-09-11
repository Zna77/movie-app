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
    <div className="relative w-fit lg:w-100 h-full flex flex-col justify-center items-center space-y-4 lg:h-99 mx-auto text-white overflow-hidden">
      {trendingMovie && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/original${trendingMovie.poster_path}`}
            alt={trendingMovie.title}
            className="w-full h-full object-contain rounded-xl opacity-60"
          />

          <div className="inset-0 space-y-1 py-10 px-4 max-w-fit absolute text-center text-sm z-10">
            <h1
              className={`font-roboto text-2xl text-center text-white font-semibold break-all uppercase`}
            >
              {trendingMovie.title}
            </h1>
            <p className="text-gray-300">{genreData}</p>
            <p className="text-gray-300">
              Release Date: {trendingMovie.release_date}
            </p>
            <div className="flex flex-row justify-center items-baseline space-x-2 font-medium text-lg">
              <div className="font-medium text-sm px-1 py-1 rounded-full flex flex-row justify-center items-baseline">
                <FontAwesomeIcon icon={faStar} className="pr-1" />
                {trendingMovie.vote_average.toFixed(1)}
              </div>
              <p className="text-gray-300/90 text-sm ml-2 font-medium">
                ({trendingMovie.vote_count} votes)
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-10 space-y-6 ">
              <p className={`w-fit h-fit text-gray-100 font-roboto `}>
                {trendingMovie.overview}
              </p>
              <Link href={`/movie/${trendingMovie.id}`}>
                <button className="bg-indigo-700 text-white font-semibold px-8 py-2 rounded-full hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-red-400">
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
