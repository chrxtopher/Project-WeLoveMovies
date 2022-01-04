const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const attachCriticInfo = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(review_id) {
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": review_id })
    .first();
}

function readAttachCritic(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "r.review_id": review_id })
    .first()
    .then(attachCriticInfo);
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
  readAttachCritic,
  update,
  delete: destroy,
};
