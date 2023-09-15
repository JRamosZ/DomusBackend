require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./src/server");

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const databaseURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("We are connected to our database");
    app.listen(8080, () => {
      console.log("Our Domus server is turned on");
    });
  })
  .catch((err) => {
    console.log("We have an error", err);
  });
