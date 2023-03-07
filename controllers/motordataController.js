const socketio = require("socket.io-client");
const socket = socketio("http://localhost:8000");

const Motordata = require("../models/motordataModel");

exports.getCurrentMotordata = async (req, res) => {
    try {
        const motordata = await Motordata.find()
            .sort({ timestamp: -1 })
            .limit(1);
        res.status(200).json({
            status: "success",
            data: {
                motordata
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.addMotordata = async (req, res) => {
    try {
        const newMotordata = await Motordata.create(req.body);
        socket.emit("updateMotordata", newMotordata);
        res.status(200).json({
            status: "success",
            data: {
               motordata: newMotordata
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};
