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

exports.addPetCap = async (req, res) => {
    try {
        const newWeighing = await Weighings.create(
            Object.assign(req.body, { material: "petCaps" })
        );
        res.socketio.emit("updateWeighings", {
            material: newWeighing.material,
            count: newWeighing.count
        });
        res.status(200).json({
            status: "success",
            data: {
                weighing: newWeighing
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.addCrownCork = async (req, res) => {
    try {
        const newWeighing = await Weighings.create(
            Object.assign(req.body, { material: "crownCorks" })
        );
        res.socketio.emit("updateWeighings", {
            material: newWeighing.material,
            count: newWeighing.count
        });
        res.status(200).json({
            status: "success",
            data: {
                weighing: newWeighing
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.addCigaret = async (req, res) => {
    try {
        const newWeighing = await Weighings.create(
            Object.assign(req.body, { material: "cigarettes" })
        );
        res.socketio.emit("updateWeighings", {
            material: newWeighing.material,
            count: newWeighing.count
        });
        res.status(200).json({
            status: "success",
            data: {
                weighing: newWeighing
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.addValuable = async (req, res) => {
    try {
        const newWeighing = await Weighings.create(
            Object.assign(req.body, { material: "valuables" })
        );
        res.socketio.emit("updateWeighings", {
            material: newWeighing.material,
            count: newWeighing.count
        });
        res.status(200).json({
            status: "success",
            data: {
                weighing: newWeighing
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
};

exports.getCurrentPetCaps = async (req, res) => {
    try {
        const petCaps = await Weighings.find({ material: "petCaps" })
            .sort({ timestamp: -1 })
            .limit(1);
        res.status(200).json({
            status: "success",
            data: {
                petCaps
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.getCurrentCrownCorks = async (req, res) => {
    try {
        const crownCorks = await Weighings.find({ material: "crownCorks" })
            .sort({ timestamp: -1 })
            .limit(1);
        res.status(200).json({
            status: "success",
            data: {
                crownCorks
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.getCurrentCigarettes = async (req, res) => {
    try {
        const cigarettes = await Weighings.find({ material: "cigarettes" })
            .sort({ timestamp: -1 })
            .limit(1);
        res.status(200).json({
            status: "success",
            data: {
                cigarettes
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

exports.getCurrentValuables = async (req, res) => {
    try {
        const valuables = await Weighings.find({ material: "valuables" })
            .sort({ timestamp: -1 })
            .limit(1);
        res.status(200).json({
            status: "success",
            data: {
                valuables
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};
