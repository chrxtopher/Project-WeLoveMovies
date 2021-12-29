const router = require("express").Router();
const controller = require("./reviews.controller");

router.route("/:reviewId").get(controller.read).delete(controller.delete);

module.exports = router;
