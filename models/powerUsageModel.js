const mongoose = require("mongoose");

const powerUsageModel = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: [true, "There must be a timestamp"]
    },
    powerUsage: {
        type: Number,
        required: [true, "There must be powerUsage"]
    }
});

const powerUsage = mongoose.model("powerUsage", powerUsageModel);
module.exports = powerUsage;
