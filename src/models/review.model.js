const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reservationId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
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
    },
    edited:{
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Reviews", reviewSchema, "Reviews");