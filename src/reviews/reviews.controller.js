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

async function update(req, res, next) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await reviewService.update(updatedReview);
  const update = await reviewService.readAttachCritic(req.params.reviewId);

  res.json({ data: update });
}

async function destroy(req, res, next) {
  await reviewService.delete(res.locals.review.review_id);
  res.sendStatus(204);
}

////////////////
// VALIDATION //
////////////////

async function reviewExists(req, res, next) {
  const review = await reviewService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}

module.exports = {
  read: [reviewExists, read],
  readAttachCritic: [reviewExists, readAttachCritic],
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
