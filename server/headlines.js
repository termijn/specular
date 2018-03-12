const request = require('request');
const rssparser = require('rss-url-parser');

exports.get = function(req, res) {    
    var result = { headlines: [] } ;
    rssparser('http://feeds.nos.nl/nosnieuwsalgemeen').then((data) => {
        data.forEach(element => {            
            result.headlines.push(element.title);
        });    
        var responseBody = JSON.stringify(result);
        res.send(responseBody);
    });
}
