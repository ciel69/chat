const checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

    app.get('/users', require('./users').get);
    app.get('/user/:id', require('./user').get);

    app.get('/message', require('./message').get);

    app.post('/login', require('./login').post);
    app.post('/logout', require('./logout').post);

};