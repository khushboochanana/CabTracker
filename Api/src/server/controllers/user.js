import User from '../models/user';

/**
 * Get logged in user details
 * @param req
 * @param res
 */
const me = (req, res) => {
  const { emailId } = req.params;
  User.findOne({ emailId }, (err, user) => {
    if (err) return res.status(401).json(err);
    if (!user) return res.status(404).send("Not found");
    return res.json(user);
  })
};

/**
 * Add user
 * @param req
 * @param res
 */
const addUser = (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.status(401).json(err);
    return res.status(201).json(user);
  });
};

/**
 * Update user
 * @type {{me: (function()), addUser: (function())}}
 */
const updateUser = (req, res) => {
  const { id } = req.params;
  const { pushToken } = req.body;
  let updatedObj = {};
  if (pushToken) {
    updatedObj.pushToken = pushToken;
  } else {
    updatedObj = req.body;
  }
  User.update({ _id: id }, { $set: updatedObj } , (err, user) => {
    if (err) res.status(401).json(err);
    if (!user) return res.status(404).send("Not found");
    res.json(user);
  });
};

module.exports = {
  me,
  addUser,
  updateUser,
};