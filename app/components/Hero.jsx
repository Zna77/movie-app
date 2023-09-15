import React, { useEffect, useState } from "react";
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
      "https://api.themoviedb.org/3/trending/movie/day?api_key=df9eb00ba156b0ebcf9ed6f6dc5dbcd7"
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
    <div className="relative w-fit sm:w-[600px] md:w-full sm:mx-auto md:px-9 sm:py-10 h-full flex flex-col justify-center items-center md:h-auto text-white">
      {trendingMovie && (
        <>
          <div className="relative">
            <img
              src={`https://image.tmdb.org/t/p/original${trendingMovie.poster_path}`}
              alt={trendingMovie.title}
              className="w-full md:w-99 h-full sm:h-fit md:h-auto object-contain md:object-cover opacity-60 sm:rounded-2xl md:opacity-70"
            />
            <div className="absolute top-3 text-white sm:top-14 md:top-5 md:right-5 sm:right-4 right-3 font-semibold text-xs px-2 py-1 sm:px-2 bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-row justify-end items-baseline rounded-full">
              <FontAwesomeIcon icon={faStar} className="pr-1" />
              {trendingMovie.vote_average.toFixed(1)}
            </div>
          </div>

          <div className="inset-0 sm:top-52 px-4 pt-48 space-y-1 max-w-full absolute text-center text-sm ">
            <h1
              className={`font-roboto text-2xl sm:text-4xl text-center text-white font-semibold sm:font-bold break-normal uppercase`}
            >
              {trendingMovie.title}
            </h1>
            <p className="text-gray-300">{genreData}</p>
            <p className="text-gray-300">
              Release Date: {trendingMovie.release_date}
            </p>
            <div className="flex flex-row justify-center items-baseline space-x-2 font-medium text-lg">
              <p className="hidden text-gray-300/90 text-sm ml-2 font-medium">
                ({trendingMovie.vote_count} votes)
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mt-1 space-y-6 sm:pt-5 ">
              <p
                className={`text-gray-100 hidden sm:text-left sm:text-base break-all font-roboto `}
              >
                {trendingMovie.overview}
              </p>
              <Link href={`/movie/${trendingMovie.id}`}>
                <button className="bg-indigo-600 text-white text-base font-semibold px-6 py-2 rounded-full hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-red-400">
                  Watch Trailer
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
