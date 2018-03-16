export default {
     weekdayToStr: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
     monthToStr: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],

     interval: function(intervalDuration, callback) {
        const self = this;
        callback();
        setTimeout(function () {
            callback();
            self.interval(intervalDuration, callback);
        }, intervalDuration);
    }
}