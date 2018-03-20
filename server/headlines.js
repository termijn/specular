const request = require('request');
const rssparser = require('rss-url-parser');
const fs = require('fs');

const feeds = [
    {url: 'http://feeds.nos.nl/nosnieuwsalgemeen', source: 'NOS nieuws'},
    {url: 'http://www.rtlnieuws.nl/service/rss/nederland/index.xml', source: 'RTL nieuws'}
];

exports.get = function(req, res) {

    let promises = [];

    feeds.forEach(feed => {
        let promise = rssparser(feed.url);
        promises.push(promise);
    });

    Promise.all(promises).then(results => {
        let headlines = [];

        let totalNrHeadlines = 0;
        results.forEach(data => { totalNrHeadlines += data.length; });

        const nrFeeds = results.length;
        console.log('%d feeds', nrFeeds);
        let feedIndex = 0;
        let headlineIndex = 0;

        while (headlines.length < totalNrHeadlines) {
            //console.log('feed %d, headline %d', feedIndex, headlineIndex);

            const feedResult = results[feedIndex];
            if (headlineIndex < feedResult.length) {
                const headline = {title: feedResult[headlineIndex].title, source: feedResult[headlineIndex].meta.title}
                console.log(JSON.stringify(headline));
                headlines.push(headline);
            }            

            feedIndex++;
            if (feedIndex == nrFeeds)
            {
                feedIndex = 0;
                headlineIndex++;
            }
        }

        /*
        results.forEach(data => {
            data.forEach(element => {                
                headlines.push({title: element.title, source: element.meta.title});
            });
        });
*/
        var responseBody = JSON.stringify(headlines);
        res.send(responseBody);
    });
}