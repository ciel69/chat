var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var log = require('lib/log')(module);
var mongoose = require('lib/mongoose');
var config = require('config');
var errorhandler = require('errorhandler');
var HttpError = require('error').HttpError;

var index = require('./routes/index');
var users = require('./routes/users');
var user = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
var options = {
    beautify: true,
    jsx: {harmony: true},
    presets: ['react', 'es2015']
};
app.engine('jsx', require('express-react-views').createEngine(options));
app.set('view engine', 'jsx');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(errorhandler());
var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.Router());

require('routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(404);
});

// error handler
app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }

    if (err instanceof HttpError) {
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development') {
            errorhandler()(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(res.status(err.status || 500));
            res.sendHttpError(err);
        }
    }
});

module.exports = app;
