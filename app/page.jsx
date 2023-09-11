"use client";
import React, { useState, useEffect } from "react";
import Loading from "../app/Loading";
import RootLayout from "./layout";
import MovieList from "./components/MovieList";
import Hero from "./components/Hero";
import Slideshow from "./components/SlideShow";
import { Helmet } from "react-helmet";

const metadata = {
  title: "Movies App",
  description: "Discover and share your favorite movies.",
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data for demonstration purposes
    setTimeout(() => {
      setIsLoading(false); // Set to false when data is loaded
    }, 3000); // Adjust the duration as needed
  }, []);

  return (
    <>
      <RootLayout>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <Helmet>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
              </Helmet>
              <Hero />
              <div></div>
              <h1 className="text-2xl text-white font-bold uppercase mt-10 mb-5 ml-5">
                Trending
              </h1>
              <Slideshow />
              <h1 className="text-2xl text-white font-bold uppercase my-4 mt-10 ml-5">
                Popular Movies
              </h1>
              <MovieList />
            </div>
          )}
          ;
        </div>
      </RootLayout>
    </>
  );
};

export default Home;
