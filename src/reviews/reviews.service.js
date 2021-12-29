const knex = require("../db/connection");

function read(review_id) {
  // this function is here for testing purposes.
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": review_id })
    .first();
}

function destroy(review_id) {
  return knex("reviews as r").where("r.review_id", review_id).del();
}

module.exports = {
  read,
  delete: destroy,
};
