// components/MovieList.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import { fetchMovies } from "@utils/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "original";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastMovieRef = useCallback(
    (node) => {
      if (loading) return; // Do not fetch if already loading

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          // Load more movies when user scrolls to the last movie element
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    const fetchMoreMovies = async () => {
      try {
        const data = await fetchMovies(page);
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setLoading(false);
      }
    };

    fetchMoreMovies();
  }, [page]);

  return (
    <div className="flex flex-wrap justify-center items-center">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          ref={index === movies.length - 1 ? lastMovieRef : null}
          className="relative sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 transition-all ease-out hover:scale-105"
        >
          <div className="absolute top-6 left-6 font-semibold text-white text-xs px-2 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-row justify-end items-baseline z-50">
            <FontAwesomeIcon icon={faStar} className="pr-1" />
            {movie.vote_average.toFixed(1)}
          </div>
          <div className="w-60 h-full border-3 bg-gradient-to-b from-gray-900 to-slate-950 rounded-md overflow-hidden">
            <img
              src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
              alt={movie.title}
              className="cursor-pointer w-full h-full object-contain "
            />
            <div className="p-4">
              <h2
                className={`text-white text-xl font-semibold mb-2 truncate font-roboto`}
              >
                {movie.title}
              </h2>
            </div>
          </div>
        </div>
      ))}
      {loading && (
        <div className="w-96 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 text-white text-center">
          Loading...
        </div>
      )}
    </div>
  );
};
export default MovieList;
