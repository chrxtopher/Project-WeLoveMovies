const knex = require("../db/connection");

function read(review_id) {
  // this function is here for testing purposes.
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": review_id })
    .first();
}

function update(updatedReview) {
  return knex("reviews as r")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

function destroy(review_id) {
  return knex("reviews as r").where("r.review_id", review_id).del();
}

module.exports = {
  read,
  update,
  delete: destroy,
};
