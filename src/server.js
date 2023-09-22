const express = require("express");
const app = express();
const cors = require("cors");

//Rutas
const routerUser = require("./routes/user.route");
const routerAuth = require("./routes/auth.route");
const routerPet = require("./routes/pet.route");
const routerComments = require("./routes/comment.route");
const routerAccommodation = require("./routes/accommodation.route");
const routerReservation = require("./routes/reservation.route")

//Middlewares para toda la api
app.use(cors());
app.use(express.json());

//Middlewares de rutas
app.use("/users", routerUser);
app.use("/auth", routerAuth);
app.use("/pet", routerPet);
app.use("/comments", routerComments);
app.use("/accommodation", routerAccommodation);
app.use("/reservations", routerReservation)

//Endpoint de home
app.get("/", (req, res) => {
  res.json("Our api is working");
});

module.exports = app;
