const request = require('request');
const fs = require('fs');

var weatherTodayResult = null;
var latestWeatherUpdate = Date();

exports.get = function(req, res) {
    var elapsedSinceLatestWeatherUpdate = new Date(Date() - latestWeatherUpdate);

    if (weatherTodayResult != null && elapsedSinceLatestWeatherUpdate.getMinutes() < 10) {
        var responseBody = JSON.stringify(weatherTodayResult);
        res.send(responseBody);
        return;
    }

    fs.readFile('server/openweathermap.json', function (err, content) {
        if (err) {
            console.log('Error loading solaredge config file: ' + err);
            return;
        }
        var config = JSON.parse(content);        
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + config.location + '&units=metric&lang=nl&APPID=' + config.appId;
        request(url, 
            function(error, response, body){        
                if (error) return;
        
                var jsonBody;
                try{
                    jsonBody = JSON.parse(body);
                } catch (ex) {
                    res.send("");
                }
                
                var temperature = Math.round(jsonBody.main.temp);
                var location = jsonBody.name;
                var iconFileName = jsonBody.weather[0].icon;
                var description = jsonBody.weather[0].description;
                weatherTodayResult = { 
                    temperature: temperature, 
                    description: description,
                    location: location,
                    icon: iconFileName
                };
                var responseBody = JSON.stringify(weatherTodayResult);
                res.send(responseBody);
                latestWeatherUpdate = Date();
            }
        );

    });    
}