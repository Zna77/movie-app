import React from "react";
import RootLayout from "./layout";
import MovieList from "./components/MovieList";
import Navbar from "./components/NavBar";

const metadata = {
  title: "Movies App",
  description: "Discover and share your favorite movies.",
};

const Home = () => {
  return (
    <RootLayout>
      <Navbar />
      <div>
        <h1 className="text-sm text-white font-bold uppercase mt-2 mb-2 ml-3 sm:text-lg">
          Trending Movies
        </h1>
        <MovieList />
      </div>
    </RootLayout>
  );
};

export default Home;
