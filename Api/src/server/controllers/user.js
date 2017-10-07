import User from '../models/user';

/**
 * Get logged in user details
 * @param req
 * @param res
 */
const me = (req, res) => {
    const { emailId } = req.params;
    User.findOne({email: emailId}, (err, user) => {
        if (err) return res.status(401).json(err);
        if (!user) return res.status(200).json({});
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
    const {id} = req.params;
    const {pushToken} = req.body;
    let updatedObj = {};
    if (pushToken) {
        updatedObj.pushToken = pushToken;
    } else {
        updatedObj = req.body;
    }
    User.update({_id: id}, {$set: updatedObj}, (err, user) => {

        console.log("Error >>>>>>>>>>>>", err, user);

        if (err) res.status(401).json(err);
        if (!user) return res.status(404).send("Not found");
        res.json(user);
    });
};

const notification = (req, res) => {
    const {cabId} = req.params;
    if (!cabId || !req.body.title || !req.body.body) {
        return res.status(404).json("CabId not found");
    }
    User.find({cabId}, (err, users) => {
        if (err)
            return res.status(401).json(err);

        if (!users || !users.length)
            return res.status(404).send("Not found");

        users.forEach((user) => {
            if (!user.pushToken) {
                return;
            }
            var options = {
                url: "https://exp.host/--/api/v2/push/send",
                method : "POST",
                headers: {
                    'content-type' : 'application/json',
                },
                body:  JSON.stringify({
                    "to": user.pushToken,
                    "title": req.body.title,
                    "body": req.body.body,
                    "data": req.body.data
                })
            }
            require('request')(options, function (err, response, body) {
                console.log("========", body)
            })
        })

        res.send(200)

    })
}

module.exports = {
    me,
    addUser,
    updateUser,
    notification
};
