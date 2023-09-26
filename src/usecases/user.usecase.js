const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.lib");
const createError = require("http-errors");

const list = (filter) => {
  const userList = User.find(filter);
  return userList;
};

const getById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw createError(404, "User not found");
  return user;
};

const create = async (data) => {
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);
  data.picture = `https://ui-avatars.com/api/?name=${data.nickname}`;
  const user = await User.create(data);
  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw createError(400, "Invalid data");
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) throw createError(400, "Invalid data");
  const token = jwt.sign({
    id: user._id,
    userType: user.type,
    userImage: user.picture,
    userNickName: user.nickname,
  });
  return token;
};

const update = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!updatedUser) throw createError(404, "User not updated");
  return updatedUser;
};

const deleteById = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw createError(404, "User not deleted");
  return deletedUser;
};

module.exports = { list, getById, create, update, deleteById, login };
