import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMovies = async () => {
  try {
    const response = await instance.get("/movie/popular");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGenres = async (genreIds) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const genreData = genreIds.map((genreId) => {
      const genre = data.genres.find((item) => item.id === genreId);
      return genre ? genre.name : "Unknown";
    });
    return genreData.join(" / ");
  } catch (error) {
    console.error("Error fetching genre data:", error);
    return "Unknown";
  }
};
