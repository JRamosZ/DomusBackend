const Comment = require("../models/comment.model");

const listComments = () => {
  const comment = Comment.find();
  return comment;
};
const getById = (id) => {
  const comment = Comment.findById(id);
  return comment;
};

const createComments = (data) => {
  const comment = Comment.create(data);
  return comment;
};

module.exports = { createComments, getById, listComments };
