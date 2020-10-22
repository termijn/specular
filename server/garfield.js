const request = require('request');
const rssparser = require('rss-url-parser');
const fs = require('fs');
const log = require('./log');
const component = 'Garfield';

exports.get = function(req, res) {

    log.info(component, "request sent");
    let promise = rssparser('http://www.hoodcomputing.com/garfield.php');

    promise.then(results => {
        var responseBody = JSON.stringify(results);
        res.send(responseBody);
    }).catch(function(reason) {
        log.info(component, reason);
    });
}