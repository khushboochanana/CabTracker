import User from '../models/user';

const me = (req, res) => {
    const userId = req.user.id;
    User.findById(userId, (err, user) => {
        if (err) res.status(401).json(err);
        if (!user) return res.status(401).send("Unauthorized");
        res.json(user);
    })
};

module.exports = {
  me  
};