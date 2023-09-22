const Pet = require("../models/pet.models");
const createError = require("http-errors");
const jwt = require("../lib/jwt.lib");

const list = () => {
  const petList = Pet.find();
  return petList;
};

const getById = async (id) => {
  const pet = await Pet.findById(id).populate("owner");
  console.log("pet", pet);
  console.log("nickname", pet.owner.nickname);

  if (!pet) throw createError(404, "Pet not found");
  return pet;
};

const create = (data) => {
  const pet = Pet.create(data);
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
