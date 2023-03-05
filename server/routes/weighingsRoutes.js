const express = require("express");
const weighingsController = require("../controllers/weighingsController");

const router = express.Router();

//router.param('id', weighingsController.checkId);

router.route("/").get(weighingsController.getAllWeighings);
router
    .route("/petCaps")
    .post(weighingsController.addPetCap)
    .get(weighingsController.getCurrentPetCaps);
router
    .route("/crownCorks")
    .post(weighingsController.addCrownCork)
    .get(weighingsController.getCurrentCrownCorks);
router
    .route("/cigarettes")
    .post(weighingsController.addCigaret)
    .get(weighingsController.getCurrentCigarettes);
router
    .route("/valuables")
    .post(weighingsController.addValuable)
    .get(weighingsController.getCurrentValuables);

module.exports = router;
