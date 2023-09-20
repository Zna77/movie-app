const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchMovies = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/popular?language=en-US&api_key=${API_KEY}`
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch data from TMDB API: ${res.status}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("An error occurred while fetching movies:", error);
    throw error;
  }
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
