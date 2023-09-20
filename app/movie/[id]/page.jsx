"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // Extract the movie ID from the URL using window.location.pathname
    const pathParts = window.location.pathname.split("/");
    const movieId = pathParts[pathParts.length - 1];

    // Replace 'YOUR_TMDB_API_KEY' with your actual TMDB API key
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setMovieDetails(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, []);

  if (!movieDetails) {
    return (
      <div className="bg-black flex justify-center items-center h-screen">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="md:flex">
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
          <div className="md:w-2/3 pl-8">
            <h1 className="text-4xl font-semibold mt-4 md:mt-0">
              {movieDetails.title}
            </h1>
            <p className="text-gray-400 mt-2">
              Released: {movieDetails.release_date}
            </p>
            <p className="text-gray-400 mt-2">
              Runtime: {movieDetails.runtime} minutes
            </p>
            <p className="text-gray-400 mt-2">
              Rating: {movieDetails.vote_average.toFixed(1)}/10
            </p>
            <h2 className="text-2xl mt-6">Overview</h2>
            <p className="text-gray-300 mt-2">{movieDetails.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
