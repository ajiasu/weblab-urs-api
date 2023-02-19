const mongoose = require("mongoose");

const ursModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have name"],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"]
    },
    startDates: [Date]
});

const urs = mongoose.model("urs", ursModel);
module.exports = urs;
