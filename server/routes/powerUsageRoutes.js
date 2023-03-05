const express = require("express");
const powerUsageController = require("../controllers/powerUsageController");

const router = express.Router();

router
    .route("/")
    .get(powerUsageController.getCurrentPowerUsage)
    .post(powerUsageController.addPowerUsage);

module.exports = router;
