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
        
        if (error) return;
        var jsonBody;
        try{
            jsonBody = JSON.parse(body);
        } catch (ex) {
            res.send("");
        }

        console.log("getWeatherForecast request for " + jsonBody.city.name);

        const daily = parse(jsonBody);
        res.send(JSON.stringify(daily));

        weatherTodayResult = daily;
        latestWeatherUpdate = new Date();
    });
}

function parse(data) {
    // days = { date: date, forecasts: [{ dateTime: dateTime, temp: item.main.temp }] };
    var days = [];
    
    data.list.forEach(function(item) {

        var dateTime = new Date(item.dt * 1000);

        var time = dateTime.getTime();
        var date = new Date(dateTime.setHours(0,0,0,0)).getTime();

        var forecast = { dateTime: time, temp: item.main.temp, icon: item.weather[0].icon };
        var day = getDay(date, days);
        
        if (day == undefined) {
            days.push({ date: date, forecasts: [forecast] });
        } 
        else {
            day.forecasts.push(forecast);
        }
    });

    return days;
}

function getDay(date, days)
{
    return days.find(function(day) {
        return day.date === date;
    });
}
