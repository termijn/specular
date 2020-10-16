const express = require('express');
const http = require('http');
const app = express();

const weathertoday = require('./weathertoday');
const weatherforecast = require('./weatherforecast');
const headlines = require('./headlines');
const xkcd = require('./xkcd');
const formula1 = require('./formula1');
const calendar = require('./calendar');
const solarEdge = require('./solaredge');
const foksuk = require('./foksuk');
const atagOne = require('./atagone');

app.use(express.static('dist'));
app.get('/getWeatherToday', weathertoday.get);
app.get('/getWeatherForecast', weatherforecast.get);
app.get('/getHeadlines', headlines.get);
app.get('/getXkcd', xkcd.get);
app.get('/getFormula1Schedule', formula1.getSchedule);
app.get('/getFormula1DriverStandings', formula1.getDriverStandings);
app.get('/getCalendar', calendar.get);
app.get('/getSolarEdge', solarEdge.get);
app.get('/getFokSuk', foksuk.get);
app.get('/getAtagOne', atagOne.get);

const port = 8095;
app.listen(port, () => console.log('Specular Smart Mirror server listening on port ' + port));