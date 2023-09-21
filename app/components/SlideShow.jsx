"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";
import { Autoplay, Pagination, Keyboard, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchMovies } from "@utils/requests";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w1280";

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

  return (
    <div className="relative w-full 2xl:mb-32">
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
              <div className="absolute inset-0 flex flex-col justify-center 2xl:justify-start items-center 2xl:items-start bg-gradient-to-t 2xl:bg-gradient-to-r from-black 2xl:via-black/70 to-transparent text-white p-4 lg:pl-12 lg:pt-28 xl:pl-28 xl:pt-32 2xl:pl-36 2xl:pt-42 2xl:space-y-2">
                <h1 className="text-xl sm:text-3xl lg:text-6xl uppercase font-roboto font-bold text-center leading-tight">
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
                <div className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-center">
                  ⭐⭐⭐⭐⭐ {movie.vote_average.toFixed(1)}
                </div>
                <p className="text-sm font-roboto font-medium text-gray-400 sm:text-base lg:text-xl text-center">
                  {movie.release_date}
                </p>
                <p className="hidden sm:block sm:w-2/3 md:w-fit 2xl:w-98 text-base sm:text-sm sm:text-gray-200 sm:mt-1 lg:text-xl font-light lg:font-normal mb-3 text-center 2xl:text-left lg:mb-16">
                  {movie.overview}
                </p>
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
