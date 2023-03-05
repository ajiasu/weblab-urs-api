const socketio = require("socket.io-client");
const socket = socketio("http://localhost:8000");

const PowerUsage = require("../models/powerUsageModel");

exports.getCurrentPowerUsage = async (req, res) => {
    try {
        const powerUsage = await PowerUsage.find()
            .sort({ timestamp: -1 })
            .limit(1);
        res.status(201).json({
            status: "success",
            data: {
                powerUsage
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.addPowerUsage = async (req, res) => {
    try {
        const newPowerUsage = await PowerUsage.create(req.body);
        socket.emit("updatePowerUsage", newPowerUsage);
        res.status(201).json({
            status: "success",
            data: {
                weighing: newPowerUsage
            }
        });
    } catch (err) {
        res.status(412).json({
            status: "fail",
            message: err
        });
    }
};
