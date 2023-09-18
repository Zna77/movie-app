import React from "react";
import RootLayout from "./layout";
import MovieList from "./components/MovieList";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Slideshow from "./components/SlideShow";

const metadata = {
  title: "Movies App",
  description: "Discover and share your favorite movies.",
};

const Home = () => {
  return (
    <RootLayout>
      <div>
        <Navbar />
        <Slideshow />
        <MovieList />
      </div>
    </RootLayout>
  );
};

export default Home;
