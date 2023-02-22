const Weighings = require("../models/weighingsModel");

exports.getAllWeighings = async (req, res) => {
    try {
        const weighings = await Weighings.find();
        res.status(200).json({
            status: "success",
            data: {
                weighings
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.addWeighings = async (req, res) => {
    try {
        const newWeighings = await Weighings.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                weighings: newWeighings
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.addPetCap = async (req, res) => {
    res.status(200).json({
        status: "success"
    });
};

exports.addCrownCork = async (req, res) => {
    res.status(200).json({
        status: "success"
    });
};

exports.addCigaret = async (req, res) => {
    res.status(200).json({
        status: "success"
    });
};

exports.addValuable = async (req, res) => {
    res.status(200).json({
        status: "success"
    });
};
