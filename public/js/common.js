const weekdayToStr = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
const monthToStr = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];

function interval(intervalDuration, callback) {
    callback();
    setTimeout(function () {
        callback();
        interval(intervalDuration, callback);
    }, intervalDuration);
}
