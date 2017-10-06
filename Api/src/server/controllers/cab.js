import Cab from '../models/cab';
import User from '../models/User';

const cabDetails = (req, res) => {
  const cabId = req.params.cabId;
  Cab.findById({ _id: cabId }, (err, cab) => {
    if (err) res.status(401).json(err);
    if (!cab) return res.status(404).send("Not found");
    res.json(cab);
  });  
};

const addRoster = (req, res) => {
    Cab.create(req.body, (err, cab) => {
        if (err) res.status(401).json(err);
        let ids = [];
        cab.cabMates.forEach(cabMate => { ids.push(cabMate._id) });
        User.update({ _id: { $in:ids } },{ $set: { cabId: cab._id } });
        return res.status(201).json(user);
    });
};

module.exports = {
  addRoster,
  cabDetails
};