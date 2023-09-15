require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const databaseURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("We are connected to our database");
  })
  .catch((err) => {
    console.log("We have an error", err);
  });
