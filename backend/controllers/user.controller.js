const User = require("../models/user");
const Joi = require("joi");

module.exports.user_list_get = function(req, res) {
  const searchSchema = {
    searchTerm: Joi.string()
      .trim()
      .regex(/^[A-Za-z]+$/)
  };
  //Implemented Joi to validate request param
  Joi.validate({ searchTerm: req.params.name }, searchSchema, function(
    error,
    value
  ) {
    if (error) {
      res.status(400).send(error);
    } else if (value) {
      let userList = [];
      User.find(
        { name: { $regex: "^" + req.params.name, $options: "i" } },
        function(err, user) {
          if (err) {
            res.status(500).json(error);
            return;
          }
          user.forEach(element => {
            userList.push(element);
          });
          res.status(200).json(userList);
        }
      );
    }
  });
};

module.exports.all_user_list_get = function(req, res) {
  let userList = [];
  User.find(function(err, user) {
    if (err) {
      res.status(500).json(error);
      return;
    }
    user.forEach(element => {
      userList.push(element);
    });
    res.status(200).json(userList);
  });
};
