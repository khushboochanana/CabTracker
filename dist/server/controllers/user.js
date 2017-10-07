"use strict";

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get logged in user details
 * @param req
 * @param res
 */
var me = function me(req, res) {
  var emailId = req.params.emailId;

  _user2.default.findOne({ emailId: emailId }, function (err, user) {
    if (err) return res.status(401).json(err);
    if (!user) return res.status(404).send("Not found");
    return res.json(user);
  });
};

/**
 * Add user
 * @param req
 * @param res
 */
var addUser = function addUser(req, res) {
  _user2.default.create(req.body, function (err, user) {
    if (err) return res.status(401).json(err);
    return res.status(201).json(user);
  });
};

/**
 * Update user
 * @type {{me: (function()), addUser: (function())}}
 */
var updateUser = function updateUser(req, res) {
  var id = req.params.id;
  var pushToken = req.body.pushToken;

  var updatedObj = {};
  if (pushToken) {
    updatedObj.pushToken = pushToken;
  } else {
    updatedObj = req.body;
  }
  _user2.default.update({ _id: id }, { $set: updatedObj }, function (err, user) {
    if (err) res.status(401).json(err);
    if (!user) return res.status(404).send("Not found");
    res.json(user);
  });
};

module.exports = {
  me: me,
  addUser: addUser,
  updateUser: updateUser
};