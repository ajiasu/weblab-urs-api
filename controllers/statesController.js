const socketio = require("socket.io-client");
const socket = socketio("http://localhost:8000");

const State = require("../models/statesModel");

exports.getCurrentState = async (req, res) => {
    try {
        const state = await State.find().sort({ timestamp: -1 }).limit(1);
        res.status(200).json({
            status: "success",
            data: {
                state
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.addState = async (req, res) => {
    try {
        const newState = await State.create(req.body);
        socket.emit("updateStates", newState);
        res.status(200).json({
            status: "success",
            data: {
                weighing: newState
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};
