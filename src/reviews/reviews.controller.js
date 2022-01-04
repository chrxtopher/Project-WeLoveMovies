const reviewService = require("./reviews.service");

function read(req, res, next) {
  const review = res.locals.review;
  res.json({ data: review });
}

async function readAttachCritic(req, res, next) {
  const timeNow = new Date();
  const review = await reviewService.readAttachCritic(req.params.reviewId);
  review.critic.critic_id = review.critic_id;
  review.critic.created_at = timeNow;
  review.critic.updated_at = timeNow;
  res.json({ data: review });
}

function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  reviewService
    .update(updatedReview)
    .then((review) => res.json({ review }))
    .catch(next);
}

function destroy(req, res, next) {
  reviewService
    .delete(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

////////////////
// VALIDATION //
////////////////

function reviewExists(req, res, next) {
  reviewService
    .read(req.params.reviewId)
    .then((review) => {
      if (review) {
        res.locals.review = review;
        return next();
      }
      next({ status: 404, message: "Review cannot be found." });
    })
    .catch(next);
}

module.exports = {
  read: [reviewExists, read],
  readAttachCritic: [reviewExists, readAttachCritic],
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
