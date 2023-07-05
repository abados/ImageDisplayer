const express = require("express");
const fetch = require("cross-fetch");

const app = express();
const API_KEY = "28925108-9358d987526d525ae413b44c1";
const PORT = 3000;

// Cache object to store the query and corresponding results
const cache = {};
const cacheKeys = [];

// Serve the static files from the client directory
app.use(express.static("../client"));

// Route for handling the search API call
app.get("/api/search", (req, res) => {
  const { query, tagFilter } = req.query;
  const cacheKey = `${query}`;

  // Check if the query is present in the cache
  if (cache[cacheKey]) {
    // If the query is cached, return the cached result
    res.json(cache[cacheKey]);
    console.log(cache[cacheKey]);
  } else {
    // If the query is not cached, make an API call
    const apiUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&category=${tagFilter}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        res.json(data);

        // Add the query and result to the cache
        cache[cacheKey] = data;
        cacheKeys.push(cacheKey);

        // Check if the cache size exceeds 5
        if (cacheKeys.length > 5) {
          const oldestCacheKey = cacheKeys.shift();
          delete cache[oldestCacheKey];
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
      });
  }
});

// Route for handling the random images API call
app.get("/api/random", (req, res) => {
  const apiUrl = `https://pixabay.com/api/?key=${API_KEY}&per_page=10`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

// Route for handling the more images API call
app.get("/api/moreImages", (req, res) => {
  const { query, page, tagFilter } = req.query;
  const apiUrl = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&category=${tagFilter}&page=${page}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});