const request = require('request');
const fs = require('fs');

var initialized = false;
var lastrequesttime = Date.now();
var lastresponse = "";

exports.get = function(req, res) {

    fs.readFile('server/solaredge.json', function (err, content) {
        if (err) {
            console.log('Error loading solaredge config file: ' + err);
            return;
        }
        var config = JSON.parse(content);
        const url = 'https://monitoringapi.solaredge.com/sites/' + config.siteId + '/overview?api_key=' + config.apiKey;
    
        var now = Date.now();
        var elapsedSeconds = (lastrequesttime - now) / 1000;
        if (initialized && (elapsedSeconds < 5 * 60))
        {
            res.send(lastresponse);
        }
        else
        {
            lastrequesttime = now;
            request(url, function(error, response, body) {
                initialized = true;
                lastresponse = body;
                res.send(body);
            });
        }    
    });
}