const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.lib");
const createError = require("http-errors");

const list = () => {
  const user = User.find();
  return user;
};

const getById = (id) => {
  const user = User.findById(id);
  return user;
};

const create = async (data) => {
  const saltRounds = 10;
  data.password = await bcrypt.hash(data.password, saltRounds);
  const user = User.create(data);
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

const update = async (id, data, authorization) => {
  const user = await User.findById(id);
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != user._id)
    throw createError(403, "No tienes permiso de editar a este usuario");
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!updatedUser) throw createError(404, "User not found");
  return updatedUser;
};

const deleteById = async (id, authorization) => {
  const user = await User.findById(id);
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != user._id)
    throw createError(403, "No tienes permiso de eliminar a este usuario");
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) throw createError(404, "Usuario no encontrado");
  return deletedUser;
};

module.exports = { list, getById, create, update, deleteById, login };
