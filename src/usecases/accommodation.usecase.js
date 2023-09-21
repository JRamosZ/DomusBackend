const Accommodation = require("../models/accommodation.model");

const listAccommodation = () => {
  const accommodation = Accommodation.find();
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

const updateAccommodation = (id, data) => {
  const accommodation = Accommodation.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  return accommodation;
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
