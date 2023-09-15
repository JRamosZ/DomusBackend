const express = require("express");
const app = express();

//Rutas
const routerUser = require("./routes/user.route");

//Middlewares para toda la api
app.use(express.json());

//Middlewares de rutas
app.use("/users", routerUser);

//Endpoint de home
app.get("/", (req, res) => {
  res.json("Our api is working");
});

module.exports = app;
