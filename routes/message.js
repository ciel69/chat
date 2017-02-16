// var Message = require('models/message').Message;
var User = require('models/user').User;
var Message = require('models/user').Message;
var newMessages;
exports.get = function (req, res) {
    Message.find({}, function (err, messages) {
        if (err) throw err;
        res.json(messages);
    }).limit(100).populate("user_id");
};