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

  const arrowStyles = {
    color: "darkGray", // Customize the color here
    transform: "scale(0.7)",
    marginLeft: -6, // Customize the font size here
  };

  useEffect(() => {
    // Fetch popular movies data from TMDB API here
    fetchMovies("popular")
      .then((data) => setPopularMovies(data.results))
      .catch((error) => console.error("Error fetching popular movies:", error));
  }, []);

  return (
    <div className="relative font-normal">
      <Swiper
        direction={"horizontal"}
        slidesPerView={2}
        loop={true}
        spaceBetween={5}
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
            <div className={`relative h-fit hover:cursor-pointer`}>
              <div className="absolute flex flex-row justify-end items-baseline top-1 left-1 text-yellow-300 font-medium text-xs px-1 text-center rounded-full z-50">
                <FontAwesomeIcon icon={faStar} className="pr-1" />
                {movie.vote_average.toFixed(1)}
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute flex flex-col justify-end items-start inset-0 p-2 z-10">
                <h2 className="font-roboto text-xs font-medium text-left text-white truncate">
                  {movie.title}
                </h2>
                <p className="text-gray-300 text-xs">{movie.release_date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Swiper Navigation Buttons */}
      <div className="swiper-button-next" style={arrowStyles}></div>
      <div className="swiper-button-prev" style={arrowStyles}></div>
    </div>
  );
};

export default Slideshow;
