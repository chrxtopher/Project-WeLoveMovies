const theatersService = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

const moviesConfig = {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
  rating: ["movies", null, "rating"],
  description: ["movies", null, "description"],
  image_url: ["movies", null, "image_url"],
  is_showing: ["movies", null, "is_showing"],
};

const reduceMovies = reduceProperties("theater_id", moviesConfig);

async function list(req, res, next) {
  const theaters = await theatersService.list();
  res.json({ data: reduceMovies(theaters) });
}

module.exports = {
  list,
};
