const mongoose = require("mongoose");

const weighingsModel = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: [true, "There must be a timestamp"]
    },
    material: {
        type: String,
        required: [true, "There must be a material"],
        enum: ["cigarettes", "crownCorks", "valuables", "petCaps"]
    },
    count: {
        type: Number,
        required: [true, "There must be a count"]
    }
});

const weighings = mongoose.model("weighings", weighingsModel);
module.exports = weighings;
