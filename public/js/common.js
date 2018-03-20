export default {
    weekdayToStr: ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'],
    monthToStr: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],

    interval: function(intervalDuration, callback) {
        const self = this;
        callback();
        this.nextInterval(intervalDuration, callback);
    },
    nextInterval: function(intervalDuration, callback) {
        const self = this;
        setTimeout(function () {
            callback();
            self.nextInterval(intervalDuration, callback);
        }, intervalDuration);
    }
}