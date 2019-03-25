const mongoose = require("mongoose");

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
