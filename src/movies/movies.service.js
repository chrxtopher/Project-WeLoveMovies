const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listCritics() {
  return knex("critics").select("*");
}

function listCurrentlyShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .distinct("m.*")
    .where({ "mt.is_showing": true });
}

function read(movieId) {
  return knex("movies as m")
    .select("m.*")
    .where({ "m.movie_id": movieId })
    .first();
}

function readTheatersByMovie(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({ "mt.movie_id": movieId });
}

function readReviewsForMovie(movieId) {
  return knex("reviews as r")
    .join("movies as m", "r.movie_id", "m.movie_id")
    .select("r.*")
    .where({ "r.movie_id": movieId });
}

module.exports = {
  list,
  listCritics,
  listCurrentlyShowing,
  read,
  readTheatersByMovie,
  readReviewsForMovie,
};
