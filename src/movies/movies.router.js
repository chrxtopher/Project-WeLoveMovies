const router = require("express").Router();
const controller = require("./movies.controller");

router.route("/").get(controller.list);
router.route("/:movieId/theaters").get(controller.readTheatersByMovie);
router.route("/:movieId/reviews").get(controller.readReviewsForMovie);
router.route("/:movieId").get(controller.read);

module.exports = router;
