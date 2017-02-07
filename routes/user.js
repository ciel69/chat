var express = require('express');
var User = require('models/user').User;
var HttpError = require('error').HttpError;
var ObjectID = require('mongodb').ObjectID;
exports.get = function(req, res) {
    try {
        var id = new ObjectID(req.params.id);
    } catch (e) {
        next(new HttpError(404, "User id not found"));
        return;
    }

    User.findById(id, function (err, user) {
        if (err) return next(err);
        if(!user){
            return next(new HttpError(404, "User not found"));
        }
        res.json(user);
    });
};