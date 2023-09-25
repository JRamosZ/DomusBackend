const Review = require("../models/review.model")
const Reservation = require("../models/reservation.model")

// Create a review and update the review ID array in the referenced reservation
const create = async (data) => {
    const reservation = await Reservation.findById(data.reservationId)
    if (!reservation) {
        const error = new Error("Review not found");
        error.status = 404;
        throw error;
    }
    // Create review only if the reservation reference is found
    const review = await Review.create(data)
    let newArray = reservation.reviews
    newArray.push(review.id)
    const updatedReservation = await Reservation.findByIdAndUpdate(review.reservationId, {reviews: newArray}, {returnDocument: "after"})
    return review;
};

const topList = async () => {
    const reviews = await Review.find();
    topReviews = reviews.filter(review => review.rate === 4.5 || review.rate === 5)
    return topReviews;
};

const getById = async (id) => {
    const review = await Review.findById(id).populate("sender", "-password").populate("receiver", "-password").exec();
    if (!review) {
        const error = new Error("Review not found");
        error.status = 404;
        throw error;
    }
    return review;
};

const update = async (id, data) => {
    const review = await Review.findById(id);
    if(!review) {
        const error = new Error("Review not found");
        error.status = 404;
        throw error;
    }
    if(review.edited){
        const error = new Error("Review can only be updated once");
        error.status = 400;
        throw error;
    }
    const updatedReview = await Review.findByIdAndUpdate(id, {edited: true, comment: data.comment, rate: data.rate, date: data.date}, {returnDocument: "after"})
    return updatedReview
}

module.exports = { create, topList, getById, update }