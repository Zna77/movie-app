import React from "react";
import { useState, useEffect } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchMovies } from "@utils/requests";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const Slideshow = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    // Fetch popular movies data from TMDB API here
    fetchMovies("popular")
      .then((data) => setPopularMovies(data.results))
      .catch((error) => console.error("Error fetching popular movies:", error));
  }, []);

  const handleNext = () => {
    if (swiper) {
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiper) {
      swiper.slidePrev();
    }
  };

  return (
    <div className="relative mt-5">
      <Swiper
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={1}
        loop={true}
        spaceBetween={30}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => setSwiper(swiper)} // Set the swiper instance
      >
        {popularMovies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="h-96 bg-cover bg-center relative">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col justify-end items-start p-4">
                <h2 className="text-2xl font-semibold text-white">
                  {movie.title}
                </h2>
                <p className="text-gray-300">{movie.release_date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Navigation Buttons */}
      <div className="swiper-button-next" onClick={handleNext}></div>
      <div className="swiper-button-prev" onClick={handlePrev}></div>
    </div>
  );
};

export default Slideshow;
