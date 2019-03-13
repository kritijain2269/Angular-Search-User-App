const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
mongoose
  .connect(
    "mongodb+srv://testUser123:ENqy5mBCNcqCv9mb@cluster0-qwolp.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(database => {
    console.log("Connected to database successfully.");
  })
  .catch(() => {
    console.log("Connection to database failed");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/users", (req, res, next) => {
  let userList = [];

  if (req.query.searchText) {
    User.find(
      { name: { $regex: "^" + req.query.searchText, $options: "i" } },
      function(err, user) {
        if (err) {
          error();
        }
        user.forEach(element => {
          userList.push(element);
        });
        res.status(200).json(userList);
      }
    );
  } else {
    User.find(function(err, user) {
      if (err) {
        error();
      }
      user.forEach(element => {
        userList.push(element);
      });
      res.status(200).json(userList);
    });
  }
});

function error() {
  return res.status(500).send(err.message);
}

module.exports = app;
