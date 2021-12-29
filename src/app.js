if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);

// NOT FOUND HANDLER //
app.use((req, res, next) => {
  next({
    status: 404,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ERROR HANDLER //
app.use((error, req, res, next) => {
  const { status = 500, message = "Something isn't right here!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
