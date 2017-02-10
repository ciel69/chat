var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

    app.get('/', require('./frontpage').get);
    app.get('/users', require('./users').get);
    app.get('/user/:id', require('./user').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.post('/logout', require('./logout').post);

    // app.get('/chat', require('./chat').get);
    app.get('/chat', checkAuth, require('./chat').get);

};