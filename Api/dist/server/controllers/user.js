"use strict";

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var me = function me(req, res) {
    var userId = req.user.id;
    _user2.default.findById(userId, function (err, user) {
        if (err) res.status(401).json(err);
        if (!user) return res.status(401).send("Unauthorized");
        res.json(user);
    });
};

module.exports = {
    me: me
};