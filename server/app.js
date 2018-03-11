const express = require('express')
const http = require('http');
const request = require('request');
const app = express()

app.use(express.static('public'));
app.get('/getWeatherToday', getWeatherToday);

const port = 8095;
app.listen(port, () => console.log('Speculum Smart Mirror server listening on port ' + port));

var weatherTodayResult = null;

function getWeatherToday(req, res)
{
    /*
    var jsonResult = { 
        temperature: 12, 
        location: "Olland",
        icon: "http://openweathermap.org/img/w/" + "09d" + ".png"
    };
    var responseBody = JSON.stringify(jsonResult);
    res.send(responseBody);

    return;

*/
    if (weatherTodayResult != null) {
        // Todo: Update after > 10 minutes.
        var responseBody = JSON.stringify(weatherTodayResult);
        res.send(responseBody);
        return;
    }

    request('http://api.openweathermap.org/data/2.5/weather?q=Olland,NL&units=metric&lang=nl&APPID=af4e90c5fa4b97bc975f49656739adaf', 
    function(error, response, body){
        console.log("getWeatherToday request " + error + ' - '  + body);
        var jsonBody = JSON.parse(body);
        var temperature = Math.round(jsonBody.main.temp);
        var location = jsonBody.name;
        var iconFileName = jsonBody.weather[0].icon;
        var description = jsonBody.weather[0].description;
        weatherTodayResult = { 
            temperature: temperature, 
            description: description,
            location: location,
            icon: "http://openweathermap.org/img/w/" + iconFileName + ".png"
        };
        var responseBody = JSON.stringify(weatherTodayResult);
        res.send(responseBody);
    });
}