const jwt = require("jsonwebtoken");

module.exports.home_page = function(req, res) {
  const token = jwt.sign({ name: "testUser" }, "secret_key", {
    expiresIn: "1h"
  });
  res.status(200).json({token : token});
};
