"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Autoplay, Pagination, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import StarRating from "./StarRating";
import { fetchMovies } from "@utils/requests";
import { RiPlayFill } from "react-icons/ri"; // Import the Play Icon from react-icons
import { IoMdHeart } from "react-icons/io";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "original";

const Slideshow = () => {
  const { data: movies, error } = useSWR("movies", fetchMovies);

  const [genres, setGenres] = useState({});

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );
      const data = await response.json();
      const genresData = {};
      data.genres.forEach((genre) => {
        genresData[genre.id] = genre.name;
      });
      setGenres(genresData);
    } catch (error) {
      console.error("Error fetching genres: ", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  if (error) {
    return <div></div>;
  }

  if (!movies || !genres) {
    return <div></div>;
  }

  const handleWatchTrailer = (trailerUrl) => {
    if (trailerUrl) {
      window.open(trailerUrl, "_blank");
    } else {
      alert("No trailer available for this movie.");
    }
  };

  return (
    <div className="relative w-full h-fit bg-black cursor-pointer">
      <Swiper
        direction={"horizontal"}
        slidesPerView={1}
        loop={true}
        spaceBetween={0}
        keyboard={{
          enabled: true,
        }}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Keyboard, Navigation]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-fit 2xl:h-105">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.backdrop_path}`}
                alt={movie.title}
                width={1000}
                height={300}
                layout="responsive"
                quality={100}
              />
              <div className="absolute inset-0 flex flex-col justify-center 2xl:justify-start items-center 2xl:items-start bg-gradient-to-t 2xl:bg-gradient-to-r from-black 2xl:via-black/70 to-transparent text-white p-4 lg:pl-12 lg:pt-28 xl:pl-28 xl:pt-32 2xl:pl-36 2xl:pt-48 2xl:space-y-2">
                <h1 className="text-xl md:text-5xl lg:text-6xl uppercase font-roboto font-bold text-center leading-tight">
                  {movie.title}
                </h1>
                <p className="text-sm text-gray-400 sm:text-base lg:text-xl font-medium text-center mt-2">
                  {movie.genre_ids.map((genreId, index) => (
                    <span className="" key={genreId}>
                      {genres[genreId]}
                      {index < movie.genre_ids.length - 1 ? " | " : ""}
                    </span>
                  ))}
                </p>
                <div className="flex items-start sm:text-lg lg:text-xl font-semibold mb-2">
                  <StarRating rating={movie.vote_average.toFixed(1)} />
                  <span className="text-base md:text-[21px] ml-2">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
                <p className="text-sm font-roboto font-medium text-gray-400 sm:text-base lg:text-xl text-center">
                  {movie.release_date}
                </p>
                <p className="hidden sm:block sm:w-2/3 md:w-fit 2xl:w-98 text-base sm:text-sm sm:text-gray-200 sm:mt-1 lg:text-xl font-light lg:font-normal mb-3 text-center 2xl:text-left lg:mb-16">
                  {movie.overview}
                </p>

                <div className="text-lg font-roboto font-semibold lg:font-bold flex flex-row justify-between items-baseline space-x-8">
                  <button
                    className="bg-red hover:bg-red/70 flex flex-row justify-center items-center truncate text-white text-xs md:text-lg py-2 px-4 lg:py-3 lg:px-5 rounded-full mt-4 focus:outline-none focus:ring-2 focus:ring-red-400 uppercase"
                    onClick={() => handleWatchTrailer(movie.trailerUrl)}
                  >
                    <RiPlayFill className="w-4 md:w-6 h-4 md:h-6 mr-1 md:mr-2 inline-block" />
                    Watch Trailer
                  </button>
                  <button
                    className="bg-yellow-500 flex flex-row justify-center items-center truncate hover:bg-yellow-600 text-xs md:text-lg text-white py-2 px-4 lg:px-5 lg:py-3 rounded-full mt-2 focus:outline-none focus:ring-2 focus:ring-yellow-40 uppercase"
                    onClick={() => handleAddToFavorites(movie.id)}
                  >
                    <IoMdHeart className="w-4 md:w-6 h-4 md:h-6 mr-1 md:mr-2 inline-block" />
                    Add to Favorite
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev absolute left-2/4 bottom-4 scale-50 md:scale-90" />
        <div className="swiper-button-next absolute left-2/4 transform bottom-4 scale-50 md:scale-90" />
      </Swiper>
    </div>
  );
};

export default Slideshow;
