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

                // <img src=\"http://foksuk.nl/content/formfield_files/formcartoon_13893_0019baebd1898d63c6b953d5642c25ec2b27e803.jpg\" alt=\"comic of the day\" />

                items.push(item);
            });        
        });
    
        var responseBody = JSON.stringify(items);  
        res.send(responseBody);
    });
}