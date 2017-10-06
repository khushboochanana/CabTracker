"use strict";

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var me = function me(req, res) {
  console.log("inside me");
};

module.exports = {
  me: me
};