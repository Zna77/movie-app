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
      <div>
        <Navbar />
        <MovieList />
      </div>
    </RootLayout>
  );
};

export default Home;
