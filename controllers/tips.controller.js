const { models } = require("mongoose");
const Tip = require("../models/tips.model");


const tipsGet = async (req, res, next) => {
    try {
        const tips = await Tip.find();
        return res.status(200).json(tips);
    } catch (error) {
        return next(error);
    }
};

const tipsPost = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const newTip = new Tip({ title, description });
        await newTip.save();
        return res.status(201).json(newTip);
    } catch (error) {
        return next(error);
    }
};

const tipsDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleted = await Tips.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json(deleted)
        } else {
            const error = new Error("No puedes eliminar este tip");
            error.status = 400;
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
};

const tipsPut = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newTip = new Tip(req.body);
        newTip._id = id;
        const edited = await Tip.findByIdAndUpdate(id, newTip);
        return res.status(200).json(edited);
    } catch (error) {
        return next(error);
    }
}

/* const editGet = async (req, res, next) => {
    const { id } = req.params;

    try {
        const tip = await Tip.findById(id);
        return res.status(200).json(tip);
    } catch (error) {
        return next(error);
    }
};

const editPost = async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const uploadFields = { title, description };


} */

module.exports = {
    tipsGet,
    tipsPost,
    tipsDelete,
    tipsPut
}