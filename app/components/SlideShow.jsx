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
    <div className="hidden 2xl:relative 2xl:w-100 2xl:h-fit 2xl:flex 2xl:items-center 2xl:overflow-hidden 2xl:mx-auto 2xl:rounded-3xl">
      <Swiper
        direction={"horizontal"}
        slidesPerView={1}
        loop={true}
        spaceBetween={1}
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
            <div className="absolute text-7xl text-white font-roboto font-bold uppercase p-20 z-50">
              <h1>{movie.title}</h1>
            </div>
            <div className="">
              <Image
                src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.backdrop_path}`}
                alt={movie.title}
                width={700}
                height={300}
                quality={100}
                layout="responsive"
                className="opacity-60"
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev" style={{ left: "10px" }}></div>
        <div className="swiper-button-next" style={{ right: "10px" }}></div>
      </Swiper>
    </div>
  );
};

export default Slideshow;
