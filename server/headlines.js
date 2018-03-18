const request = require('request');
const rssparser = require('rss-url-parser');

const feeds = [
    {url: 'http://feeds.nos.nl/nosnieuwsalgemeen', source: 'NOS nieuws'},
    {url: 'http://www.rtlnieuws.nl/service/rss/nederland/index.xml', source: 'RTL nieuws'}
];

var headlines = [];

exports.get = function(req, res) {
    feeds.forEach(feed => {
        rssparser(feed.url).then((data) => {
            data.forEach(element => {                
                headlines.push({title: element.title, source: element.author});
            });
        });
    });

    var responseBody = JSON.stringify(headlines);
    res.send(responseBody);
}