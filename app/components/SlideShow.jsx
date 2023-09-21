"use client";
import React from "react";
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

  if (error) {
    return <div></div>;
  }

  if (!movies) {
    return <div></div>;
  }

  return (
    <div className="relative w-full">
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
            <div className="relative h-100 overflow-hidden">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.backdrop_path}`}
                alt={movie.title}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black to-transparent text-white p-4">
                <h1 className="text-6xl uppercase font-roboto font-bold mb-2">
                  {movie.title}
                </h1>
                <div className="text-lg font-semibold">
                  <span className="mr-2">{movie.vote_average.toFixed(1)}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-6 h-6 inline-block text-yellow-400"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 0a1 1 0 0 1 1 1v11.29l2.854-2.853a1 1 0 1 1 1.415 1.414l-4 4a1 1 0 0 1-1.415 0l-4-4a1 1 0 1 1 1.415-1.414L7 12.29V1a1 1 0 0 1 1-1z"
                    />
                  </svg>
                </div>
                <div className="text-lg font-semibold mt-2">
                  <p className="text-gray-400 mt-2">
                    Released: {movie.release_date}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev absolute left-2/4 transform -translate-x-1/2 bottom-4" />
        <div className="swiper-button-next absolute left-2/4 transform translate-x-1/2 bottom-4" />
      </Swiper>
    </div>
  );
};

export default Slideshow;
