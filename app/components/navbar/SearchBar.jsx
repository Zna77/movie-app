"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSearchResults(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSearchSubmit}
        className="hidden md:relative md:flex md:flex-row md:justify-center md:items-center"
      >
        <input
          type="text"
          placeholder="Search for movies and TV shows"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="bg-gray-800 text-white py-3 px-16 outline-none rounded-full focus:border-red-600"
        />{" "}
        <button
          type="submit"
          className="absolute top-0 right-0 mt-3 mr-4 text-white"
        >
          <FaSearch />
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {searchResults.length > 0 && (
        <div className="mt-4 p-4 bg-gray-800 text-white">
          <h2 className="text-xl font-semibold">Search Results:</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {searchResults.map((movie) => (
              <div key={movie.id} className="w-1/2 md:w-1/4 lg:w-1/6">
                <Image
                  src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={500}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
