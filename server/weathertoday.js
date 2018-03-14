const request = require('request');

var weatherTodayResult = null;
var latestWeatherUpdate = Date();

exports.get = function(req, res) {
    var elapsedSinceLatestWeatherUpdate = new Date(Date() - latestWeatherUpdate);

    if (weatherTodayResult != null || elapsedSinceLatestWeatherUpdate.getMinutes() > 10) {
        var responseBody = JSON.stringify(weatherTodayResult);
        res.send(responseBody);
        return;
    }

    request('http://api.openweathermap.org/data/2.5/weather?q=Olland,NL&units=metric&lang=nl&APPID=af4e90c5fa4b97bc975f49656739adaf', 
    function(error, response, body){
        console.log("getWeatherToday request " + error + ' - '  + body);

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
    });
}