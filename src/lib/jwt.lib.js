const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

// Funcion para hacer el token
const sign = (payload = {}) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
};

// Funcion para verificar el token
const verify = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

const getTokenData = (token) => {
  let data = null;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("error al obtener data del token");
    } else {
      data = decoded;
    }
  });
  return data;
};

module.exports = { sign, verify, getTokenData };
