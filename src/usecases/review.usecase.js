const Review = require("../models/review.model")

const create = (data) => {
    const review = Review.create(data)
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

module.exports = { create, getById, update }