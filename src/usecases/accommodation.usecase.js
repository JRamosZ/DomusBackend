const Accommodation = require("../models/accommodation.model");
const User = require("../models/user.model");
const jwt = require("../lib/jwt.lib");

const createError = require("http-errors");

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

const updateAccommodation = async (id, data, authorization) => {
  const accommodation = await Accommodation.findById(id);
  if (!accommodation) throw createError(404, "Accommodation not found");
  // Validating when data comes from profile (does not include data.rate)
  if (data.rate === undefined) {
    const token = authorization.replace("Bearer ", "");
    const isVerified = jwt.verify(token);
    if (isVerified.id != accommodation.owner)
      throw createError(403, "You are not allowed to edit this accommodation");
  } else {
    // Handling data when it comes from review (includes data.rate)
    let ratesArray = accommodation.ratesList;
    ratesArray.push(data.rate);
    let sum = ratesArray.reduce((previous, current) => (current += previous));
    let avg = sum / ratesArray.length;
    data = {
      ratesList: ratesArray,
      rate: avg,
    };
  }
  // Updating Accommodation with data from profile or review
  const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!updatedAccommodation) throw createError(404, "Accommodation not edited");
  // Updating User rate with new Accommodation rate
  const updatedUser = await User.findByIdAndUpdate(accommodation.owner, {
    rate: data.rate,
  });
  if (!updatedUser) throw createError(404, "User not updated");

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
