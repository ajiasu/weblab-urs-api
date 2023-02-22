const mongoose = require("mongoose");

const weighingsModel = new mongoose.Schema({
    petCap: {
        type: Number,
        required: [true, "There must be petcaps"]
    },
    crownCork: {
        type: Number,
        required: [true, "There must be crownCorks"]
    },
    cigaret: {
        type: Number,
        required: [true, "There must be cigarettes"]
    },
    valuable: {
        type: Number,
        required: [true, "There must be valuables"]
    }
});

const weighings = mongoose.model("weighings", weighingsModel);
module.exports = weighings;
