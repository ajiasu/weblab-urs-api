const express = require("express");
const stateController = require("../controllers/statesController");

const router = express.Router();

router
    .route("/")
    .get(stateController.getCurrentState)
    .post(stateController.addState);

module.exports = router;
