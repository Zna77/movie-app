"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadedMovieIds, setLoadedMovieIds] = useState(new Set());

  useEffect(() => {
    // Function to fetch movies for a given page
    const fetchMoviesForPage = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Filter out movies that have already been loaded
        const newMovies = data.results.filter(
          (movie) => !loadedMovieIds.has(movie.id)
        );

        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
        setPage(page + 1);

        // Update the set of loaded movie IDs
        newMovies.forEach((movie) => {
          loadedMovieIds.add(movie.id);
        });

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    // Attach a scroll event listener to trigger loading more movies when scrolled to the bottom
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        !loading
      ) {
        fetchMoviesForPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, loading, loadedMovieIds]);

  if (error) {
    return <div>Error fetching movies</div>;
  }

  if (movies.length === 0 && loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-full h-screen mt-12">
      <div
        className={`space-y-3 sm:grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 mt-3`}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-fit h-auto flex flex-col flex-wrap justify-center items-center text-white mx-auto"
          >
            <div className="w-64 cursor-pointer sm:w-48 2xl:min-w-[300px] 2xl:max-w-[500px] flex flex-col mb-12 relative overflow-hidden group">
              <Link href={`/movie/${movie.id}`}>
                <Image
                  src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={300}
                  className="rounded-3xl object-contain"
                />
              </Link>

              <div className="absolute left-0 right-0 bottom-0 h-16 bg-black/40 backdrop-blur-md rounded-bl-3xl rounded-br-3xl bg-opacity-50 p-3 transform translate-y-full transition-all duration-300 ease-out  group-hover:translate-y-0">
                <h1 className="text-white text-center font-semibold text-xl truncate">
                  {movie.title}
                </h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
