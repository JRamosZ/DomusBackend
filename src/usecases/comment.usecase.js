const Comment = require("../models/comment.model");
const Reservation = require("../models/reservation.model");

const listComments = () => {
  const comment = Comment.find();
  return comment;
};
const getById = (id) => {
  const comment = Comment.findById(id);
  return comment;
};

const createComments = async (data) => {
  const reservation = await Reservation.findById(data.reservation);
  if (!reservation) {
    const error = new Error("Reservation not found");
    error.status = 404;
    throw error;
  }
  const comment = await Comment.create(data);
  const updatedReservation = await Reservation.findByIdAndUpdate(
    comment.reservation,
    { $push: { comments: comment.id } },
    { returnDocument: "after" }
  );
  return comment;
};

module.exports = { createComments, getById, listComments };
