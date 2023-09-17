// components/MovieList.js
"useClient";
import React from "react";
import { fetchMovies } from "@utils/requests";
import Image from "next/image";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "original";

export default async function MovieList() {
  const movies = await fetchMovies();

  return (
    <div className="w-full h-screen mt-16">
      <div className="space-y-9">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="w-fit text-white relative mx-auto"
            style={{ maxWidth: "300px" }}
          >
            <Image
              src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={300}
              style={{
                objectFit: "contain",
              }}
              layout="responsive"
              className="rounded-tl-3xl rounded-3xl"
            />

            <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-md rounded-bl-3xl rounded-br-3xl bg-opacity-50 p-3">
              <h1 className="text-white text-center font-semibold text-xl truncate">
                {movie.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// return (
//   <div className="w-full px-4 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
//     {movies.map((movie) => (
//       <div key={movie.id} className="relative w-full md:w-24">
//         <div className="absolute top-2 left-2 font-semibold text-white text-xs px-2 py-1 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-row justify-end items-baseline z-50">
//           <FontAwesomeIcon icon={faStar} className="pr-1" />
//           {movie.vote_average.toFixed(1)}
//         </div>
//         <div className="w-full md:w-56 h-fit border-3 bg-gray-950  rounded-md overflow-hidden">
//           <img
//             src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
//             alt={movie.title}
//             className="cursor-pointer w-full h-full object-contain"
//           />
//           <div className="p-4 text-center">
//             <h2
//               className={`text-white text-base sm:text-lg font-semibold mb-2 truncate font-roboto`}
//             >
//               {movie.title}
//             </h2>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );
