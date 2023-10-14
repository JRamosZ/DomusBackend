const createError = require("http-errors");

const Review = require("../models/review.model");
const User = require("../models/user.model");
const Pet = require("../models/pet.model");
const Accommodation = require("../models/accommodation.model");

const create = async (data) => {
  const review = await Review.create(data);

  //   Assigning new rate item to pet/accommodation ratesList and updating pet/accommodation rate
  const service =
    (await Pet.findById(data.service)) ||
    (await Accommodation.findById(data.service));
  if (service === null) throw createError(404, "Rate receiver not found");
  const ratesList = service.ratesList;
  ratesList.push(data.rate);
  const rate = ratesList.reduce((a, b) => a + b, 0) / ratesList.length;
  (await Pet.findByIdAndUpdate(data.service, { ratesList, rate })) ||
    (await Accommodation.findByIdAndUpdate(data.service, { ratesList, rate }));

  //   Assigning the review _Id to the receiver user and updating his rate
  const user = await User.findById(data.receiver);
  const reviews = user.reviews;
  reviews.push(review._id);
  let servicesList = await Pet.find({ owner: data.receiver });
  if (servicesList.length === 0)
    servicesList = await Accommodation.find({ owner: data.receiver });
  const userRate =
    servicesList.reduce((sum, service) => sum + service.rate, 0) /
    servicesList.length;
  await User.findByIdAndUpdate(data.receiver, { reviews, rate: userRate });
  return review;
};

const getById = async (id) => {
  const review = await Review.findById(id);
  if (!review) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }
  return review;
};

const update = async (id, data) => {
  const review = await Review.findById(id);
  if (!review) {
    const error = new Error("Review not found");
    error.status = 404;
    throw error;
  }
  if (review.edited) {
    const error = new Error("Review can only be updated once");
    error.status = 400;
    throw error;
  }
  const updatedReview = await Review.findByIdAndUpdate(
    id,
    { edited: true, comment: data.comment, rate: data.rate, date: data.date },
    { returnDocument: "after" }
  );
  return updatedReview;
};

module.exports = { create, getById, update };
