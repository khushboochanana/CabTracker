'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _findIndex = require('lodash/findIndex');

var _cab = require('../models/cab');

var _cab2 = _interopRequireDefault(_cab);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fetch cab details
 * @param req
 * @param res
 */
var cabDetails = function cabDetails(req, res) {
  var id = req.params.id;

  _cab2.default.findById({ _id: id }, function (err, cab) {
    if (err) return res.status(401).json(err);
    if (!cab) return res.status(404).send("Not found");
    return res.json(cab);
  });
};

/**
 * Add cab roster
 * @param req
 * @param res
 */
var addRoster = function addRoster(req, res) {
  _cab2.default.create(req.body, function (err, cab) {
    if (err) return res.status(401).json(err);
    var ids = [];
    cab.cabMates.forEach(function (cabMate) {
      ids.push(cabMate._id);
    });
    _user2.default.update({ _id: { $in: ids } }, { $set: { cabId: cab._id } }, function (err, user) {
      if (err) return res.status(401).json(err);
      return res.status(201).json(cab);
    });
  });
};

/**
 * Update cab roster
 * @param req
 * @param res
 */
var updateRoster = function updateRoster(req, res) {
  var id = req.params.id;
  var _req$body = req.body,
      userId = _req$body.userId,
      presence = _req$body.presence,
      arrivalTime = _req$body.arrivalTime,
      driver = _req$body.driver,
      name = _req$body.name,
      cabMates = _req$body.cabMates;

  var updatedObj = {};
  _cab2.default.findById({ _id: id }).lean().exec(function (err, cab) {
    if (err) return res.status(401).json(err);
    if (!cab) return res.status(404).send("Not found");
    if (presence && userId) {
      var _cabMates = cab.cabMates;
      var mateIndex = _cabMates.findIndex(function (cabMate) {
        return cabMate.id === userId;
      });
      if (mateIndex !== -1) {
        _cabMates[mateIndex] = _extends({}, _cabMates[mateIndex], { presence: presence });
      }
      updatedObj.cabMates = _cabMates;
    }
    if (arrivalTime) {
      updatedObj.arrivalTime = arrivalTime;
    }
    if (driver) {
      updatedObj.driver = driver;
    }
    if (name) {
      updatedObj.name = name;
    }
    if (cabMates) {
      updatedObj.cabMates = cabMates;
    }
    _cab2.default.update({ _id: id }, { $set: updatedObj }, function (err, cab) {
      if (err) return res.status(401).json(err);
      if (!cab) return res.status(404).send("Not found");
      return res.status(201).json(cab);
    });
  });
};

module.exports = {
  addRoster: addRoster,
  cabDetails: cabDetails,
  updateRoster: updateRoster
};