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
    <div className="relative w-full h-fit bg-cover text-white">
      {trendingMovie && (
        <>
          <div className="absolute flex flex-col justify-start items-start p-9 mt-10 space-y-2 z-10">
            <h1 className="text-5xl font-extrabold uppercase mb-2">
              {trendingMovie.title}
            </h1>
            <p className="text-gray-300 mb-1">{genreData}</p>
            <div className="flex flex-row justify-center items-baseline space-x-2">
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400 text-xl"
              />
              <p className="text-yellow-400 text-xl">
                {trendingMovie.vote_average}
              </p>
              <p className="text-gray-300 text-lg ml-2">
                ({trendingMovie.vote_count} votes)
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
          <img
            src={`https://image.tmdb.org/t/p/original${trendingMovie.poster_path}`}
            alt={trendingMovie.title}
            className="w-full h-100 object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-start p-9">
            <div className="flex flex-col space-y-4">
              <p className="w-[700px] text-base text-gray-100 break-all">
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
