const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  owner: {
    type: String,
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
    required: true,
  },
});

module.exports = mongoose.model("pets", petSchema, "Pets");
