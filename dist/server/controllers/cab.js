'use strict';

var _cab = require('../models/cab');

var _cab2 = _interopRequireDefault(_cab);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fetch cab details
 * @param req
 * @param res
 */
var cabDetails = function cabDetails(req, res) {
  var cabId = req.params.id;
  _cab2.default.findById({ _id: cabId }, function (err, cab) {
    if (err) res.status(401).json(err);
    if (!cab) return res.status(404).send("Not found");
    res.json(cab);
  });
};

/**
 * Add cab roster
 * @param req
 * @param res
 */
var addRoster = function addRoster(req, res) {
  _cab2.default.create(req.body, function (err, cab) {
    if (err) res.status(401).json(err);
    var ids = [];
    cab.cabMates.forEach(function (cabMate) {
      ids.push(cabMate._id);
    });
    _User2.default.update({ _id: { $in: ids } }, { $set: { cabId: cab._id } });
    return res.status(201).json(user);
  });
};

/**
 * Update cab roster
 * @param req
 * @param res
 */
var updateRoster = function updateRoster(req, res) {
  var cabId = req.params.cabId;
  var _req$query = req.query,
      userId = _req$query.userId,
      presence = _req$query.presence;

  if (presence && userId) {
    _cab2.default.findById({ _id: cabId }, function (err, cab) {
      if (err) res.status(401).json(err);
      if (!cab) return res.status(404).send("Not found");
    });
  }
};

module.exports = {
  addRoster: addRoster,
  cabDetails: cabDetails,
  updateRoster: updateRoster
};