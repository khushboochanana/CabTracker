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

    _user2.default.findOne({ email: emailId }, function (err, user) {
        if (err) return res.status(401).json(err);
        if (!user) return res.status(200).json({});
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

        console.log("Error >>>>>>>>>>>>", err, user);

        if (err) res.status(401).json(err);
        if (!user) return res.status(404).send("Not found");
        res.json(user);
    });
};

var notification = function notification(req, res) {
    var cabId = req.params.cabId;

    if (!cabId || !req.body.title || !req.body.body) {
        return res.status(404).json("CabId not found");
    }
    _user2.default.find({ cabId: cabId }, function (err, users) {
        if (err) return res.status(401).json(err);

        if (!users || !users.length) return res.status(404).send("Not found");

        users.forEach(function (user) {
            if (!user.pushToken) {
                return;
            }
            var options = {
                url: "https://exp.host/--/api/v2/push/send",
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "to": user.pushToken,
                    "title": req.body.title,
                    "body": req.body.body,
                    "data": req.body.data
                })
            };
            require('request')(options, function (err, response, body) {
                console.log("========", body);
            });
        });

        res.send(200, {});
    });
};

module.exports = {
    me: me,
    addUser: addUser,
    updateUser: updateUser,
    notification: notification
};