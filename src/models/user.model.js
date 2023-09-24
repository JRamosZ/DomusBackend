const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["client", "user"],
    required: true,
  },
  nickname: {
    type: String,
    minLength: 2,
    maxLength: 10,
    required: true,
  },
  name: {
    type: String,
    minLength: 2,
    maxLength: 20,
  },
  lastname: {
    type: String,
    minLength: 2,
    maxLength: 20,
  },
  email: {
    type: String,
    match: /^.+@.*\..*$/,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isMailValidated: {
    type: Boolean,
    default: false,
  },
  isInfoCompleted: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    minLength: 10,
    maxLength: 10,
    match: /^\d+$/,
  },
  picture: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    validate: {
      validator: function (v) {
        return (
          v &&
          v.getTime() < Date.now() - 18 * 365 * 24 * 60 * 60 * 1000 &&
          v.getTime() > Date.now() - 100 * 365 * 24 * 60 * 60 * 1000
        );
      },
      message: "La edad debe estar entre 18 y 100 años",
    },
  },
  sex: {
    type: String,
    enum: ["H", "M", "O"],
  },
  aboutMe: {
    type: String,
    minLength: 30,
    maxLength: 200,
  },
  emergencyContact: {
    name: {
      type: String,
      minLength: 2,
      maxLength: 20,
    },
    lastname: {
      type: String,
      minLength: 2,
      maxLength: 20,
    },
    phone: {
      type: String,
      minLength: 10,
      maxLength: 10,
      match: /^\d+$/,
    },
    relationship: {
      type: String,
    },
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  joined: {
    type: Date,
    default: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pets",
    },
  ],
});

module.exports = mongoose.model("users", userSchema, "Users");
