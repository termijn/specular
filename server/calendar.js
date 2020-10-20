var fs = require('fs');
var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var moment = require('moment');
var log = require('./log');

const component = 'Calendar';

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs.json';

exports.get = function(req, res) {
    fs.readFile('server/config/client_secret.json', function processClientSecrets(err, content) {
      if (err) {
          log.info(component, 'Error loading client secret file: ' + err);
          return;
      }
      authorize(JSON.parse(content), function(auth) { listEvents(auth, res); });
    });
}

function authorize(credentials, callback) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        getNewToken(oauth2Client, callback);
      } else {
        oauth2Client.credentials = JSON.parse(token);
        callback(oauth2Client);
      }
    });
  }
  
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   *
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized
   *     client.
   */
  function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    log.info(component, 'Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          log.info(component, 'Error while trying to retrieve access token ' + err);
          return;
        }
        oauth2Client.credentials = token;
        storeToken(token);
        callback(oauth2Client);
      });
    });
  }
  
  /**
   * Store token to disk be used in later program executions.
   *
   * @param {Object} token The token to store to disk.
   */
  function storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code != 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    log.info(component, 'Token stored to ' + TOKEN_PATH);
  }

  function getColors(auth) {
    return new Promise(function(resolve, reject) {
      let calendar = google.calendar('v3');

      calendar.colors.get( {auth: auth} , function(err, response) {
        if (err)
          resolve({});
        else
          resolve(response.calendar);
      });
    });
  }

  function getEvents(auth, calendarId)
  {
    return new Promise(function(resolve, reject) {
      let calendar = google.calendar('v3');

      calendar.events.list({
          auth: auth,
          calendarId: calendarId,
          timeMin: (new Date()).toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
          maxResults: 6
        },         
        function(err, response) {

          if (err) {
            log.info(component, 'The API returned an error: ' + err);
            resolve([]);
            return;
          }

          // log.info(component, 'getEvents response  ' + JSON.stringify(response.data, null, 4));  
          var events = response.data.items;
          if (events.length == 0) {
            log.info(component, 'No upcoming events found.');
            resolve([]);
          } else {        
            resolve(events);
          }
        }
      );
    }); 
  }

  function getDate(item)
  {
    const hasStartTime = item.start.dateTime !== undefined;
    if (hasStartTime)
        return moment(item.start.dateTime);
    else
        return moment(item.start.date);
  }

  function sortEvents(items)
  {
    items.sort(function(a, b) { 
      return getDate(a) - getDate(b);
    });    
  }

  /**
   * Lists the next 10 events on the user's primary calendar.
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  function listEvents(auth, res) {
    let promises = [
      getEvents(auth, 'primary'),
      getEvents(auth, 'nl.dutch#holiday@group.v.calendar.google.com')
    ];

    let colorPalette = 
    {
      '1': {background: '#A4BDFC'},
      '2': {background: '#7AE7BF'},
      '3': {background: '#DBADFF'},
      '4': {background: '#FF887C'},
      '5': {background: '#FBD75B'},
      '6': {background: '#FFB878'},
      '7': {background: '#46D6DB'},
      '8': {background: '#E1E1E1'},
      '9': {background: '#5484ED'},
      '10': {background: '#51B749'},
      '11': {background: '#DC2127'},
    }

    Promise.all(promises).then(function(result){
      var allEvents = flatten(result);
      sortEvents(allEvents);
      var upcomingEvents = allEvents.slice(0, 6);

      allEvents.forEach(event => {
        if (event.colorId)
          event.color = colorPalette[event.colorId];
        else
          event.color = colorPalette['1'];
      });

      res.send(JSON.stringify(upcomingEvents));
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
  }