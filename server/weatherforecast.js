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

    fs.readFile('server/config/openweathermap.json', function (err, content) {
        if (err) {
            console.log('Error loading solaredge config file: ' + err);
            return;
        }
        var config = JSON.parse(content);        
        var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + config.location + '&units=metric&lang=nl&APPID=' + config.appId; 

        request(url, 
            function(error, response, body){
                
                if (error) return;
                var jsonBody;
                try{
                    jsonBody = JSON.parse(body);
                } catch (ex) {
                    res.send("");
                }

                const daily = parse(jsonBody);
                res.send(JSON.stringify(daily));

                weatherTodayResult = daily;
                latestWeatherUpdate = new Date();
            }
        );
    });

}

function parse(data) {
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
