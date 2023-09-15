const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchMovies = async () => {
  const res = await fetch(
    `${BASE_URL}/movie/popular?language=en-US&api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.results;
};

// const instance = axios.create({
//   baseURL: TMDB_BASE_URL,
//   params: {
//     api_key: API_KEY,
//   },
// });

// export const fetchGenres = async (genreIds) => {
//   try {
//     const response = await instance.get(`/genre/movie/list`);

//     const genreData = genreIds.map((genreId) => {
//       const genre = response.data.genres.find((item) => item.id === genreId);
//       return genre ? genre.name : "Unknown";
//     });
//     return genreData.join(" | ");
//   } catch (error) {
//     console.error("Error fetching genre data:", error);
//     return "Unknown";
//   }
// };
