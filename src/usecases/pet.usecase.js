const Pet = require("../models/pet.model");
const User = require("../models/user.model");
const createError = require("http-errors");
const jwt = require("../lib/jwt.lib");

const list = (filter) => {
  const petList = Pet.find(filter);
  return petList;
};

const getById = async (id) => {
  const pet = await Pet.findById(id).populate("owner").exec();
  if (!pet) throw createError(404, "Pet not found");
  return pet;
};

const create = async (data) => {
  const pet = await Pet.create(data);
  const user = await User.findById(pet.owner);
  let petsList = user.pets;
  petsList.push(pet._id);
  await User.findByIdAndUpdate(pet.owner, { pets: petsList });
  return pet;
};

const update = async (id, data, authorization) => {
  const pet = await Pet.findById(id);
  if (!pet) throw createError(404, "Pet not found");
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != pet.owner)
    throw createError(403, "You are not allowed to edit this pet");
  const updatedPet = await Pet.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!updatedPet) throw createError(404, "Pet not edited");

  return updatedPet;
};

const deleteById = async (id, authorization) => {
  const pet = await Pet.findById(id);
  if (!pet) throw createError(404, "Pet not found");
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id !== pet.owner.toString()) {
    throw createError(404, "You are not allowed to delete this pet");
  }
  const deletedPet = await Pet.findByIdAndDelete(id);
  if (!deletedPet) throw createError(404, "Pet not deleted");
  return deletedPet;
};

module.exports = { list, getById, create, update, deleteById };
