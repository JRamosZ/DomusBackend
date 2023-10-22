const Pet = require("../models/pet.model");
const User = require("../models/user.model");
const createError = require("http-errors");
const jwt = require("../lib/jwt.lib");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../lib/s3Client");

const list = (filter) => {
  const petList = Pet.find(filter);
  return petList;
};

const getById = async (id) => {
  const pet = await Pet.findById(id).populate("owner").exec();
  if (!pet) throw createError(404, "Pet not found");
  return pet;
};

const create = async (petData, petPicture) => {
  const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

  // Creating pet and saving ID to owner
  const pet = await Pet.create(petData);
  const user = await User.findById(pet.owner);
  let petsList = user.pets;
  petsList.push(pet._id);
  await User.findByIdAndUpdate(pet.owner, { pets: petsList });

  // Uploading picture
  const fileName = `pets/${pet._id}/${new Date().getTime()}-${
    petPicture.originalname
  }`.replaceAll(" ", "");
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileName,
    Body: petPicture.buffer,
  };
  const result = await s3Client.send(new PutObjectCommand(params));
  if (!result) throw createError(404, "File not uploaded");
  const url = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

  // Adding URL to pet.picture
  const updatedPet = Pet.findByIdAndUpdate(
    pet._id,
    { picture: url },
    { returnDocument: "after" }
  );
  return updatedPet;
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
