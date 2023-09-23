"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaHome,
  FaCompass,
  FaBookmark,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State to store search results
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
      <nav className="w-full flex flex-row justify-between items-center text-white p-4 z-50">
        <Link href="/" className="text-2xl font-semibold">
          <span className="text-violet-600 text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tighter text-red-600">
            Movix
          </span>
        </Link>
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search for movies and shows"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="bg-gray-800 text-white py-3 px-16 outline-none rounded-full focus:border-red-600"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 mt-3 mr-4 text-white"
          >
            <FaSearch />
          </button>
        </form>

        <button className="sm:hidden sm:text-xl">
          <FaSearch />
        </button>
        <div className="hidden sm:inline-block text-2xl mr-2">
          <FaBars />
        </div>
      </nav>
      <div className="sm:hidden z-50 flex flex-row justify-center items-center space-x-16 fixed bottom-0 bg-black/80 text-white/60 backdrop-blur-md w-full h-16 font-semibold">
        <Link href="/">
          <div>
            <FaHome size={24} />
          </div>
        </Link>

        <Link href="/">
          <div>
            <FaCompass size={24} />
          </div>
        </Link>

        <Link href="/">
          <div>
            <FaBookmark size={24} />
          </div>
        </Link>

        <Link href="/">
          <div>
            <FaUserCircle size={24} />
          </div>
        </Link>
      </div>
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
