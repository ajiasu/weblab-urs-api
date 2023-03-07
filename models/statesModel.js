const mongoose = require("mongoose");

const statesModel = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: [true, "There must be a timestamp"]
    },
    state: {
        type: String,
        required: [true, "There must be a state"]
    }
});

const states = mongoose.model("states", statesModel);
module.exports = states;
