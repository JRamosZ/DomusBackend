const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reservation: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("comment", commentSchema, "Comment");
