const request = require('request');
const rssparser = require('rss-url-parser');
const fs = require('fs');
const log = require('./log');
const component = 'Headlines';

const feeds = [
    {url: 'http://feeds.nos.nl/nosnieuwsalgemeen', source: 'NOS nieuws'},
    {url: 'https://www.google.nl/alerts/feeds/03144870627674081704/7233624637832471839', source: 'Google News - Gezondheid'},
    {url: 'https://news.google.com/news/rss/?ned=nl_nl&gl=NL&hl=nl', source: 'Google News - Algemeen'},
    {url: 'https://news.google.com/news/rss/search/section/q/formule%201/formule%201?hl=nl&gl=NL&ned=nl_nl', source: 'Google News - Formule 1'}
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
        let feedIndex = 0;
        let headlineIndex = 0;

        while (headlines.length < totalNrHeadlines) {
            const feedResult = results[feedIndex];
            if (headlineIndex < feedResult.length) {
                const source = feeds[feedIndex].source;
                const headline = {title: feedResult[headlineIndex].title, source: source}
                headlines.push(headline);
            }

            feedIndex++;
            if (feedIndex == nrFeeds)
            {
                feedIndex = 0;
                headlineIndex++;
            }
        }
        var responseBody = JSON.stringify(headlines);
        res.send(responseBody);
    });
}