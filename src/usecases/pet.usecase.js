const Pet = require("../models/pet.models");
const createError = require("http-errors");

const getById = async (id) => {
  const pet = await Pet.findById(id);
  if (!pet) {
    throw createError(404, "Pet not found");
  } else {
    return pet;
  }
};

const create = (data) => {
  const pet = Pet.create(data);
  return pet;
};

const update = async (id, data, authorization) => {
  const pet = await Pet.findById(id);
  if (!pet) throw createError(404, "Pet not found");
  const token = authorization.replace("Bearer", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != pet.owner)
    throw createError(403, "No tienes permiso de editar a esta mascota");
  const updatedPet = await Pet.findOneAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!updatedPet) throw createError(404, "Pet not found");
  return updatedPet;
};

module.exports = { getById, create, update };
