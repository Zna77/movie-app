// "use client";
// import React from "react";
// import useSWR from "swr"; // Import useSWR
// import { fetchMovies } from "@utils/requests";
// import Image from "next/image";

// const Hero = () => {
//   const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
//   const POSTER_SIZE = "original";

//   const { data: movies, error } = useSWR("movies", fetchMovies); // Use useSWR for data fetching

//   if (error) {
//     return <div></div>;
//   }

//   if (!movies) {
//     return <div></div>;
//   }
//   return (
//     <div className="w-3/4 h-99 container bg-white mx-auto rounded-3xl">
//       {movies.map((movie) => (
//         <div key={movie.id}>
//           <Image
//             src={`${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
//             alt={movie.title}
//             width={300}
//             height={300}
//             layout="responsive"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Hero;
