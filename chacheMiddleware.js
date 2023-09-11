// cacheMiddleware.js
const express = require("express");
const axios = require("axios");
const LRUCache = require("lru-cache");

const cache = new LRUCache({ max: 100, maxAge: 1000 * 60 * 10 }); // Example cache configuration

const router = express.Router();

router.get("/api/movies", async (req, res) => {
  const cacheKey = "moviesData"; // Unique key for this API endpoint

  if (cache.has(cacheKey)) {
    // If the data is in cache, serve it from cache
    return res.json(cache.get(cacheKey));
  }

  try {
    // Fetch data from TMDB API or your API
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );

    // Store data in cache for future requests
    cache.set(cacheKey, response.data);

    return res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
