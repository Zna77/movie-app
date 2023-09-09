"use client";
import React, { useEffect, useState } from "react";
import RootLayout from "./layout";
import MovieList from "./components/MovieList";
import { fetchMovies } from "@utils/requests";
import Hero from "./components/Hero";
import Slideshow from "./components/SlideShow";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies()
      .then((data) => setMovies(data.results))
      .catch((error) => console.error("Error fetching movie data:", error));
  }, []);

  return (
    <RootLayout>
      <Hero />
      <Slideshow />
      <h1 className="text-3xl text-white font-bold uppercase mt-8 mb-4">
        Popular Movies
      </h1>
      <MovieList movies={movies} />
    </RootLayout>
  );
};

export default Home;
