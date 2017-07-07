const User = require('models/user').User;
const HttpError = require('error').HttpError;
const AuthError = require('../models/user').AuthError;
// const async = require('async');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

exports.get = function(req, res) {
    res.render('./login');
};

function createToken(user) {
    return jwt.sign(_.omit(user, 'password'), 'ngEurope rocks!', { expiresIn: 60*5 });
}

exports.post = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;

        res.json({
            id_token: createToken(user)
        });
        // res.json(user);
        // res.send();

    });

};