const request = require('request');

exports.get = function(req, res) {
    request('http://xkcd.com/info.0.json', function(error, response, body) {
        res.send(body);
    });
}