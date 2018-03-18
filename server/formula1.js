const request = require('request');

exports.getSchedule = function(req, res) {

    var options = {
        uri: 'http://ergast.com/api/f1/2018.json',
        json: true
    }

    request(options, 
    function(error, response, body){
        if (error) return;
        res.send(body);
    });
}

exports.getDriverStandings = function(req, res) {
    var options = {
        uri: 'http://ergast.com/api/f1/current/driverStandings.json',
        json: true
    }

    request(options, 
    function(error, response, body){
        //console.log("f1 getDriverStandings request " + error + ' - '  + JSON.stringify(body));

        if (error) return;
        res.send(body);
    });
}