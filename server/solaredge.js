const request = require('request');
const fs = require('fs');
const log = require('./log');

var initialized = false;
var lastrequesttime = new Date();
var lastresponse = '';
const component = 'Solar Edge';

exports.get = function(req, res) {

    fs.readFile('server/config/solaredge.json', function (err, content) {
        if (err) {
            log.info(component, 'Error loading solaredge config file: ' + err);
            return;
        }
        var config = JSON.parse(content);
        const url = 'https://monitoringapi.solaredge.com/sites/' + config.siteId + '/overview?api_key=' + config.apiKey;
    
        var now = new Date();
        var elapsedSeconds = (now.getTime() - lastrequesttime.getTime()) / 1000;
        if (initialized && (elapsedSeconds < 5 * 60))
        {
            res.send(lastresponse);
        }
        else
        {
            log.info(component, 'Data is refreshed');
            lastrequesttime = now;
            request(url, function(error, response, body) {
                log.info(component, 'Response received');
                initialized = true;
                lastresponse = body;
                res.send(body);
            });
        }    
    });
}