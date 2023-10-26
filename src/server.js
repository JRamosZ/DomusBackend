const express = require("express");
const app = express();
const cors = require("cors");

//Rutas
const routerUser = require("./routes/user.route");
const routerAuth = require("./routes/auth.route");
const routerPet = require("./routes/pet.route");
const routerComments = require("./routes/comment.route");
const routerAccommodation = require("./routes/accommodation.route");
const routerReview = require("./routes/review.route");
const routerReservation = require("./routes/reservation.route");
const routerPayment = require("./routes/payment.route");
const routerBucket = require("./routes/bucket.route");
const routerMailNotifications = require("./routes/mailNotifications.route");

//Middlewares para toda la api
app.use(cors());
app.use(express.json());

//file static for EMAIL
app.use(express.static(__dirname + "public"));

//Middlewares de rutas
app.use("/users", routerUser);
app.use("/auth", routerAuth);
app.use("/pets", routerPet);
app.use("/comments", routerComments);
app.use("/accommodation", routerAccommodation);
app.use("/reviews", routerReview);
app.use("/reservations", routerReservation);
app.use("/create-payment-intent", routerPayment);
app.use("/payment", routerPayment);
app.use("/bucket", routerBucket);
app.use("/mailNotifications", routerMailNotifications);

//Endpoint de home
app.get("/", (req, res) => {
  res.json("Our api is working");
});

module.exports = app;
