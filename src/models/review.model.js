const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    sender:{
        type: String,
        required: true,
    },
    receiver:{
        type: String,
        required: true,
    },
    comment:{
        type: String,
        maxLength: 500,
        required: true
    },
    rate:{
        type: Number,
        enum: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})

module.exports = mongoose.model("Reviews", reviewSchema, "Reviews");