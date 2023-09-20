const express = require("express");
const app = express();
const cors = require("cors");

//Rutas
const routerUser = require("./routes/user.route");
const routerAuth = require("./routes/auth.route");

//Middlewares para toda la api
app.use(cors());
app.use(express.json());

//Middlewares de rutas
app.use("/users", routerUser);
app.use("/auth", routerAuth);

//Endpoint de home
app.get("/", (req, res) => {
  res.json("Our api is working");
});

module.exports = app;
