const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 10,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["perro", "gato"],
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: ["macho", "hembra"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  aboutMe: {
    type: String,
    minLength: 30,
    maxLength: 200,
    required: true,
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
});

module.exports = mongoose.model("pets", petSchema, "Pets");
