const express = require("express");
const weighingsController = require("../controllers/weighingsController");

const router = express.Router();

//router.param('id', weighingsController.checkId);

router.route("/").get(weighingsController.getAllWeighings);
router
    .route("/petCap")
    .post(weighingsController.addPetCap)
    .get(weighingsController.getCurrentPetCaps);
router.route("/crownCork").post(weighingsController.addCrownCork);
router.route("/cigaret").post(weighingsController.addCigaret);
router.route("/valuable").post(weighingsController.addValuable);

module.exports = router;
