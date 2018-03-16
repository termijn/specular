const express = require('express');
const http = require('http');
const app = express();

const weathertoday = require('./weathertoday');
const weatherforecast = require('./weatherforecast');
const headlines = require('./headlines');
const xkcd = require('./xkcd');
const formula1 = require('./formula1');

app.use(express.static('public'));
app.get('/getWeatherToday', weathertoday.get);
app.get('/getWeatherForecast', weatherforecast.get);
app.get('/getHeadlines', headlines.get);
app.get('/getXkcd', xkcd.get);
app.get('/getFormula1Schedule', formula1.getSchedule);
app.get('/getFormula1DriverStandings', formula1.getDriverStandings);

const port = 8095;
app.listen(port, () => console.log('Speculum Smart Mirror server listening on port ' + port));