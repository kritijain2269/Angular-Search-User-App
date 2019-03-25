const express = require("express");
const app = express();
const databse = require("./database");
const userRouter = require("./routes/user");
const indexRouter = require("./routes/index");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(indexRouter);
app.use(userRouter);

module.exports = app;
