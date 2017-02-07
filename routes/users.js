var User = require('models/user').User;

exports.get = function (req, res) {
    User.find({}, function (err, users) {
        if (err) throw err;
        res.json(users);
    });
};
