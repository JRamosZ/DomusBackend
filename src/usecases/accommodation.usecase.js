const Accommodation = require("../models/accommodation.model");
const User = require("../models/user.model");
const jwt = require("../lib/jwt.lib");
const { s3Client } = require("../lib/s3Client");
const { PutObjectCommand } = require("@aws-sdk/client-s3");

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

const createAccommodationId = async (ownerId, data, folder, files) => {
  const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

  // Creating accommodation and saving ID to owner
  const accommodation = await Accommodation.create(data);
  if (!accommodation) throw createError(404, "Accomodation not created");
  const updatedOwner = await User.findByIdAndUpdate(ownerId, {
    accommodation: accommodation._id,
  });
  if (!updatedOwner) throw createError(404, "Owner not updated");

  // Uploading pictures
  let uploadedURLs = [];
  for await (const file of files) {
    const fileName = `${folder}/${accommodation._id}/${new Date().getTime()}-${
      file.originalname
    }`.replaceAll(" ", "");
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
    };
    const result = await s3Client.send(new PutObjectCommand(params));
    if (!result) throw createError(404, "File not uploaded");
    const url = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
    uploadedURLs.push(url);
  }

  // Adding URL to accommodation.picture
  const updatedAccomodation = Accommodation.findByIdAndUpdate(
    accommodation._id,
    { picture: uploadedURLs },
    { returnDocument: "after" }
  );
  return updatedAccomodation;
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
  createAccommodationId,
  getById,
  listAccommodation,
  updateAccommodation,
  deleteAccommodation,
};
