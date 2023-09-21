const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchMovies = async () => {
  try {
    const trendingMoviesRes = await fetch(
      `${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`
    );

    if (!trendingMoviesRes.ok) {
      throw new Error(
        `Failed to fetch trending movies from TMDB API: ${trendingMoviesRes.status}`
      );
    }

    const trendingMoviesData = await trendingMoviesRes.json();
    const trendingMovies = trendingMoviesData.results;

    // Fetch trailer information for each movie
    const moviesWithTrailers = await Promise.all(
      trendingMovies.map(async (movie) => {
        const movieId = movie.id;
        const videosRes = await fetch(
          `${BASE_URL}/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`
        );

        if (!videosRes.ok) {
          console.error(
            `Failed to fetch trailer for movie ${movieId}: ${videosRes.status}`
          );
          return movie; // Return the movie without trailer information
        }

        const videosData = await videosRes.json();
        const trailers = videosData.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        // Append trailer information to the movie
        return {
          ...movie,
          trailerUrl:
            trailers.length > 0
              ? `https://www.youtube.com/watch?v=${trailers[0].key}`
              : null,
        };
      })
    );

    return moviesWithTrailers;
  } catch (error) {
    console.error("An error occurred while fetching movies:", error);
    throw error;
  }
};
