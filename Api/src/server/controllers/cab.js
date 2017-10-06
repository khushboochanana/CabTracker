import Cab from '../models/cab';
import User from '../models/User';

/**
 * Fetch cab details
 * @param req
 * @param res
 */
const cabDetails = (req, res) => {
  const cabId = req.params.id;
  Cab.findById({ _id: cabId }, (err, cab) => {
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
const addRoster = (req, res) => {
  Cab.create(req.body, (err, cab) => {
    if (err) res.status(401).json(err);
    let ids = [];
    cab.cabMates.forEach(cabMate => { ids.push(cabMate._id) });
    User.update({ _id: { $in:ids } },{ $set: { cabId: cab._id } });
      return res.status(201).json(user);
    });
};

/**
 * Update cab roster
 * @param req
 * @param res
 */
const updateRoster = (req, res) => {
  const { cabId } = req.params;
  const { userId, presence } = req.query;  
  if (presence && userId) {
    Cab.findById({ _id: cabId }, (err, cab) => {
      if (err) res.status(401).json(err);
      if (!cab) return res.status(404).send("Not found");
    })
  }
};

module.exports = {
  addRoster,
  cabDetails,
  updateRoster
};