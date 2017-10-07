import { findIndex } from 'lodash/findIndex';

import Cab from '../models/cab';
import User from '../models/user';

/**
 * Fetch cab details
 * @param req
 * @param res
 */
const cabDetails = (req, res) => {
  const { id } = req.params;
  Cab.findById({ _id: id }, (err, cab) => {
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
const addRoster = (req, res) => {
  Cab.create(req.body, (err, cab) => {
    if (err) return res.status(401).json(err);
    let ids = [];
    cab.cabMates.forEach(cabMate => { ids.push(cabMate._id) });
    User.update({ _id: { $in: ids } },{ $set: { cabId: cab._id } }, (err, user) => {
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
const updateRoster = (req, res) => {
  const { id } = req.params;
  const { userId, presence, arrivalTime, driver, name, cabMates } = req.body;
  let updatedObj = {};
  Cab.findById({ _id: id }).lean().exec((err, cab) => {
    if (err) return res.status(401).json(err);
    if (!cab) return res.status(404).send("Not found");
    if (presence && userId) {
      const cabMates = cab.cabMates;
      const mateIndex = cabMates.findIndex(cabMate => cabMate.id === userId);
      if (mateIndex !== -1) {
        cabMates[mateIndex] = { ... cabMates[mateIndex], presence };
      }
      updatedObj.cabMates = cabMates;
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
    Cab.update({ _id: id }, { $set: updatedObj }, (err, cab) => {
      if (err) return res.status(401).json(err);
      if (!cab) return res.status(404).send("Not found");
      return res.status(201).json(cab);
    })
  })
};

module.exports = {
  addRoster,
  cabDetails,
  updateRoster,
};
