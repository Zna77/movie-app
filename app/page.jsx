import React from "react";
import RootLayout from "./layout";
import MovieList from "./components/MovieList";
import Navbar from "./components/navbar/NavBar";
import Slideshow from "./components/SlideShow";
import SideMenu from "./components/SideMenu";

const Home = () => {
  return (
    <RootLayout>
      <div>
        <SideMenu />
        <Navbar />
        <Slideshow />
        <MovieList />
      </div>
    </RootLayout>
  );
};

export default Home;
