const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  //   Service is the pet/accommodation _id
  service: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  comment: {
    type: String,
    maxLength: 500,
    required: true,
  },
  rate: {
    type: Number,
    enum: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  edited: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Reviews", reviewSchema, "Reviews");
