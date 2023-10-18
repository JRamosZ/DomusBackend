const Accommodation = require("../models/accommodation.model");
const User = require("../models/user.model");
const jwt = require("../lib/jwt.lib");

const createError = require("http-errors");

const listAccommodation = async (query) => {
  let accommodation;

  if (query.pettype === "Gato") {
    accommodation = await Accommodation.find({
      "address.state": query.state,
      "address.city": query.city,
      "hosting.cat.isHosted": true,
    }).populate("owner");
  } else if (query.pettype === "Perro" && query.petsize === "Pequeño") {
    accommodation = await Accommodation.find({
      "address.state": query.state,
      "address.city": query.city,
      "hosting.dog.small.isHosted": true,
    }).populate("owner");
  } else if (query.pettype === "Perro" && query.petsize === "Mediano") {
    accommodation = await Accommodation.find({
      "address.state": query.state,
      "address.city": query.city,
      "hosting.dog.medium.isHosted": true,
    }).populate("owner");
  } else if (query.pettype === "Perro" && query.petsize === "Grande") {
    accommodation = await Accommodation.find({
      "address.state": query.state,
      "address.city": query.city,
      "hosting.dog.big.isHosted": true,
    }).populate("owner");
  }

  return accommodation;
};

const getById = (id) => {
  const accommodation = Accommodation.findById(id);
  return accommodation;
};

const createAccommodation = (data) => {
  const accommodation = Accommodation.create(data);
  return accommodation;
};

const updateAccommodation = async (id, data, authorization) => {
  const accommodation = await Accommodation.findById(id);
  if (!accommodation) throw createError(404, "Accommodation not found");
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != accommodation.owner)
    throw createError(403, "You are not allowed to edit this accommodation");
  const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!updatedAccommodation) throw createError(404, "Accommodation not edited");

  return updatedAccommodation;
};

const deleteAccommodation = (id) => {
  const accommodation = Accommodation.findByIdAndDelete(id);
  return accommodation;
};

module.exports = {
  createAccommodation,
  getById,
  listAccommodation,
  updateAccommodation,
  deleteAccommodation,
};
