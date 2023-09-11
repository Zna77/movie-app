import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchMovies } from "@utils/requests";

// Install Swiper modules
import { Autoplay, Pagination, Navigation, Keyboard } from "swiper/modules";

const Slideshow = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    // Fetch popular movies data from TMDB API here
    fetchMovies("popular")
      .then((data) => setPopularMovies(data.results))
      .catch((error) => console.error("Error fetching popular movies:", error));
  }, []);

  return (
    <div className="relative mb-10 overflow-hidden">
      <Swiper
        direction={"horizontal"}
        slidesPerView={3}
        loop={true}
        spaceBetween={30}
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
        modules={[Autoplay, Pagination, Navigation, Keyboard]}
      >
        {popularMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className={`relative h-fit hover:cursor-pointer hover:scale-105 transition ease-in duration-200`}
            >
              <div className="absolute flex flex-row justify-end items-baseline top-3 left-3 text-white font-semibold text-xs text-center px-2 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 z-50">
                <FontAwesomeIcon icon={faStar} className="pr-1" />
                {movie.vote_average.toFixed(1)}
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-contain opacity-70 rounded-2xl"
              />
              <div className="absolute inset-0 flex flex-col justify-end items-start p-4">
                <h2 className="font-roboto text-2xl font-semibold text-white">
                  {movie.title}
                </h2>
                <p className="text-gray-300">{movie.release_date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Navigation Buttons */}
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default Slideshow;
