const express = require("express");
const app = express();
const cors = require("cors");

//Rutas
const routerUser = require("./routes/user.route");
const routerAuth = require("./routes/auth.route");
const routerComments = require("./routes/comment.route");

//Middlewares para toda la api
app.use(cors());
app.use(express.json());

//Middlewares de rutas
app.use("/users", routerUser);
app.use("/auth", routerAuth);
app.use("/comments", routerComments);

//Endpoint de home
app.get("/", (req, res) => {
  res.json("Our api is working");
});

module.exports = app;
