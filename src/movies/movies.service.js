const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies as m")
    .select("m.*")
    .where({ "m.movie_id": movieId })
    .first();
}

module.exports = {
  list,
  read,
};
