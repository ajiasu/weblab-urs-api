const mongoose = require("mongoose");

const motordataModel = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: [true, "There must be a timestamp"]
    },
    x: {
        type: Number,
        required: [true, "There must be x-Coordinates"]
    },
    y: {
        type: Number,
        required: [true, "There must be y-Coordinates"]
    }
});

const motordata = mongoose.model("motordata", motordataModel);
module.exports = motordata;
