"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import StarRating from "@app/components/StarRating";
import Link from "next/link";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    // Extract the movie ID from the URL using window.location.pathname
    const pathParts = window.location.pathname.split("/");
    const movieId = pathParts[pathParts.length - 1];

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error("Error fetching movie details:", error));

    // Fetch movie trailers
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Find the first trailer video
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((error) => console.error("Error fetching movie trailers:", error));
  }, []);

  if (!movieDetails) {
    return (
      <div className="bg-black flex justify-center items-center h-screen">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16 relative">
        <Link
          href="/"
          className="sm:hidden absolute right-9 bottom-16 text-5xl font-bold z-50"
        >
          &larr;
        </Link>
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.poster_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px)",
            opacity: 0.3,
          }}
          className="absolute inset-0"
        ></div>
        <div className="md:flex relative">
          <div className="md:w-1/3 relative">
            <div
              className="relative w-full h-0"
              style={{ paddingBottom: "150%" }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
                alt={movieDetails.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="md:w-2/3 pl-8 text-lg font-medium">
            <h1 className="text-4xl font-roboto font-semibold mt-4 md:mt-0 uppercase">
              {movieDetails.title}
            </h1>
            <p className="text-gray-300 mt-2">
              Released: {movieDetails.release_date}
            </p>
            <p className="text-gray-300 mt-2">
              Runtime: {formatRuntime(movieDetails.runtime)}
            </p>
            <div className=" flex flex-row items-center sm:text-lg lg:text-xl font-semibold mt-1 text-center">
              <StarRating rating={movieDetails.vote_average.toFixed(1)} />
              <span className="text-[22px] ml-2">
                {movieDetails.vote_average.toFixed(1)}
              </span>
            </div>
            <h2 className="text-2xl mt-6 font-roboto">Genres:</h2>
            <ul className="text-gray-300 mt-2">
              {movieDetails.genres.map((genre) => (
                <li key={genre.id}>
                  {genre.name}
                  {","}
                </li>
              ))}
            </ul>
            <h2 className="text-2xl mt-6 font-roboto">Overview:</h2>
            <p className="text-gray-200 mt-2 font-roboto font-normal">
              {movieDetails.overview}
            </p>
            {trailerKey && (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red font-roboto font-extrabold uppercase mt-6 inline-block bg-red-600 text-base lg:text-lg text-white py-2 md:py-3 px-4 md:px-5 rounded-full hover:bg-red/70 transition duration-300"
              >
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
