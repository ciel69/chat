exports.get = function(req, res) {
    res.render('frontpage',{
        title: 'Привет ≥︺‿︺≤',
        name: 'Всем привет',
        user: req.user
    });
};