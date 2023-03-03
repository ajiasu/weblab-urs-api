const express = require("express");
const motordataController = require("../controllers/motordataController");

const router = express.Router();

router
    .route("/")
    .get(motordataController.getCurrentMotordata)
    .post(motordataController.addMotordata);

module.exports = router;
