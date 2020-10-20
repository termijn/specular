const request = require('request');
const rssparser = require('rss-url-parser');
const fs = require('fs');

const feeds = [
    {url: 'https://rss.xiffy.nl//foksuk.php', source: 'Fokke en Sukke'},
];

exports.get = function(req, res) {

    let promises = [];

    feeds.forEach(feed => {
        let promise = rssparser(feed.url);
        promises.push(promise);
    });

    Promise.all(promises).then(results => {
        let items = [];
        
        results.forEach(data => { 
            data.forEach(item => {
                var item = {
                    title: item.title,
                    image: item.description.replace('<img src=\"', '').replace('" alt="comic of the day" />', '')
                };
                items.push(item);
            });        
        });
    
        var responseBody = JSON.stringify(items);  
        res.send(responseBody);
    });
}