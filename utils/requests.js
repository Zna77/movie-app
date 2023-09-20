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
