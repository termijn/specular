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


    request('http://api.openweathermap.org/data/2.5/forecast?q=Olland,NL&units=metric&lang=nl&APPID=af4e90c5fa4b97bc975f49656739adaf', 
    function(error, response, body){
        
        var jsonBody;
        try{
            jsonBody = JSON.parse(body);
        } catch (ex) {
            res.send("");
        }

        console.log("getWeatherForecast request for " + jsonBody.city.name);

        weatherTodayResult = jsonBody.list;
        res.send(JSON.stringify(weatherTodayResult));
    });
}

//api.openweathermap.org/data/2.5/forecast?q={city name},{country code}
