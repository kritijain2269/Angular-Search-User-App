const express = require("express");
const app = express();
const bodyParser = require("body-parser");

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
  const users = [
    { id: 1, name: "Kriti Jain" },
    { id: 2, name: "Harlan Holmquist" },
    { id: 3, name: "Mariana Bolt" },
    { id: 4, name: "Letty Culver" },
    { id: 5, name: "Lillian Ocon" },
    { id: 6, name: "Nicolle Velez" },
    { id: 7, name: "Tom Harris" },
    { id: 8, name: "Andy James" },
    { id: 9, name: "Ben Geller" },
    { id: 10, name: "Ross Geller" }
  ];
  if (req.query.searchText) {
    const regex = new RegExp('^' + req.query.searchText, 'i')
    userList = users.filter(x => {
      if (regex.test(x.name)) {
        return x;
      }
    });
  } else {
    userList = users;
  }
  res.status(200).json(userList);
});


module.exports = app;
