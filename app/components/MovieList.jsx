// components/MovieList.js
import React from "react";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "original";

const MovieList = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {movies.map((movie) => (
        <div key={movie.id} className="w-96 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4">
          <div className="h-100 bg-gradient-to-t from-gray-900 to-slate-950 rounded-md overflow-hidden transition-all ease-out hover:scale-105">
            <img
              src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
              alt={movie.title}
              className="cursor-pointer w-full object-cover "
            />
            <div className="p-4">
              <h2 className="text-white text-xl font-semibold mb-2">
                {movie.title}
              </h2>
              <p className="text-gray-400">
                Release Date: {movie.release_date}
              </p>
              <p className="text-gray-400">
                Vote Average: {movie.vote_average}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
