import express  from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import config from 'config';
import errorhandler from 'errorhandler';
import React    from 'react';
import ReactDom from 'react-dom/server';
import {getHeaders, initialize} from 'redux-oauth';
import {match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import configureStore from './redux/configureStore';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config_w from './../webpack.config';
import checkAuth from './../middleware/checkAuth';
import {checkUser} from "./redux/actions/authActions";
import SocketIo from 'socket.io';

const log = require('lib/log')(module);

const router = express.Router();
const app = express();

const StorageShim = require('node-storage-shim');

let storage = new StorageShim();
const AuthError = require('../models/user').AuthError;

const compiler = webpack(config_w);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config_w.output.publicPath}));
app.use(webpackHotMiddleware(compiler));


// view engine setup
app.set('views', path.join(__dirname, '../views'));
const options = {
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
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(errorhandler());
const MongoStore = require('connect-mongo')(session);

const sessionStore = require('../lib/sessionStore');

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    resave: true,
    saveUninitialized: true,
    cookie: config.get('session:cookie'),
    store: sessionStore
}));

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadUser'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.Router());
// app.use(checkAuth);
/*app.get('/', function(req, res, next) {
 req.session.message = 'Hello World';
 next();
 });*/
require('routes')(app);
// catch 404 and forward to error handler
app.use((req, res) => {
    const store = configureStore();
    // store.dispatch(checkUser(!!req.session.user));
    match({routes: routes(store), location: req.url}, (error, redirectLocation, renderProps) => {
        if (redirectLocation) { // Если необходимо сделать redirect
            return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        }

        if (error) { // Произошла ошибка любого рода
            return res.status(500).send(error.message);
        }

        if (!renderProps) { // мы не определили путь, который бы подошел для URL
            return res.status(404).send('Not found');
        }


        const componentHTML = ReactDom.renderToString(
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        const state = store.getState();

        /* res.cookie('authHeaders', JSON.stringify(getHeaders(store.getState())), { maxAge: Date.now() + 14 * 24 * 3600 * 1000 });*/
        return res.end(renderHTML(componentHTML, state));
    });
});
app.use(function (req, res, next) {
    next(404);
});
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

function renderHTML(componentHTML, initialState) {
    return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="public/assets/styles.css">
          <script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
          <script src="//cdn.auth0.com/js/lock-9.0.min.js"></script>
          <script src="vendor/bower_components/socket.io-client/dist/socket.io.js"></script>
          <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)};
          </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <div id="dev-tools"></div>
        <script type="application/javascript" src="js/bundle.js"></script>
      </body>
    </html>
  `;
}
const server = http.createServer(app);
server.listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});

const io = require('../socket')(server);
app.set('io', io);