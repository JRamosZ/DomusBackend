const User = require("../models/user.model");

const list = () => {
  const user = User.find();
  return user;
};

const getById = (id) => {
  const user = User.findById(id);
  return user;
};

const create = (data) => {
  const user = User.create(data);
  return user;
};
module.exports = { list, getById, create };
