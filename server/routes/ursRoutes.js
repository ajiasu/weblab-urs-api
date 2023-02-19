const express = require("express");
const ursController = require("../controllers/ursController");

const router = express.Router();

//router.param('id', ursController.checkId);

router.route("/").get(ursController.getAllTours).post(ursController.createTour);

router
    .route("/:id")
    .get(ursController.getTour)
    .patch(ursController.updateTour)
    .delete(ursController.deleteTour);

module.exports = router;
