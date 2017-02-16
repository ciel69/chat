/*
var async = require('async');
var util = require('util');

var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    message: {
        type: String,
        unique: false,
        required: true
    },
    user_id: { type: Number, ref: 'User'},
    username: {
        type: String,
        unique: false,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
/!*schema.statics.authorize = function(text, callback) {
    "use strict";
    var Message = this;

};*!/
exports.Message = mongoose.model('Message', schema);*/
