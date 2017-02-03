var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

// Connection URL
var url = 'mongodb://localhost:27017/chat';

MongoClient.connect(url, function (err, db) {
    var collection = db.collection('test_insert');
    collection.remove({}, function (err, affected) {
        if (err) throw err;

        collection.insert({a: 2}, function (err, count) {
            console.log(format("count = %s", count))
        });
        var cursor = collection.find({a: 2});
        cursor.toArray(function (err, results) {
            console.dir(results);
            db.close();
        });
    });
});