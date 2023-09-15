const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["client, user"],
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  lastname: {
    type: String,
    minlength: 2,
    maxlength: 20,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    //Confirm type, is lenght applicable to numbers???
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
  },
  sex: {
    type: String,
    enum: ["H", "M", "O"],
  },
  aboutMe: {
    type: String,
    minlength: 30,
    maxlength: 200,
    required: true,
  },
  emergencyContact: {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    lastname: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: true,
    },
    phone: {
      //Confirm type, is lenght applicable to numbers???
      type: Number,
      minlength: 10,
      maxlength: 10,
      required: true,
    },
    relationshio: {
      type: String,
    },
  },
  rate: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  joined: {
    type: Date,
    required: true,
  },
});

//Exportar modelo
module.exports = mongoose.model("users", userSchema, "Users");
