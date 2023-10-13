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
    enum: ["Perro", "Gato"],
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["Pequeño", "Mediano", "Grande"],
    required: true,
  },
  sex: {
    type: String,
    enum: ["Macho", "Hembra"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 20,
  },
  aboutMe: {
    type: String,
    minLength: 30,
    maxLength: 150,
    required: true,
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    default: 5,
  },
  ratesList: {
    type: [Number],
    validate: {
      validator: function (v) {
        for (num of v) {
          if (num <= 5 && num >= 0) {
            continue;
          } else {
            return false;
          }
        }
      },
      message: "Rate most be between 0 and 5",
    },
  },
});

module.exports = mongoose.model("pets", petSchema, "Pets");
