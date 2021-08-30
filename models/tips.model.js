const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
},
    {
        timestamps: true,
    }
);

const Tip = mongoose.model("Tips", tipSchema);

module.exports = Tip;