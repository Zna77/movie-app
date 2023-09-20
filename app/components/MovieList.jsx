"use client";
import React from "react";
import useSWR from "swr"; // Import useSWR
import { fetchMovies } from "@utils/requests";
import Image from "next/image";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "original";

export default function MovieList() {
  const { data: movies, error } = useSWR("movies", fetchMovies); // Use useSWR for data fetching

  if (error) {
    return <div></div>;
  }

  if (!movies) {
    return <div></div>;
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
            <div className="w-64 sm:w-48 2xl:min-w-[300px] 2xl:max-w-[500px] flex flex-col mb-12 relative overflow-hidden group">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                alt={movie.title}
                width={300}
                height={300}
                className="rounded-3xl object-contain"
              />

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
