const jwt = require("../lib/jwt.lib");
const createError = require("http-errors");

const auth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    const isVerified = jwt.verify(token);
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

const userChange = (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const token = authorization.replace("Bearer ", "");
    const isVerified = jwt.verify(token);
    if (isVerified.id !== req.params.id)
      throw createError(
        401,
        "You are not allowed to make changes on this user"
      );
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { auth, userChange };
