const reviewService = require("./reviews.service");

function read(req, res, next) {
  const review = res.locals.review;
  res.json({ data: review });
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
  delete: [reviewExists, destroy],
};
