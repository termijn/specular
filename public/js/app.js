
var weatherToday =  
{
    template: '<div class="weathertoday"><span>{{ temp }}</span> <i class="wi wi-day-sunny"></i></div>',
    data: function() {
        return {temp: 25 + String.fromCharCode(176)};
    }
};

var app = new Vue({
    el: '#weatherapp',
    data: {
        time: "6:56",
        show: true,
        message: 'Goedemorgen',
        appointments: [
                { title: "Feestje Kasper", date: "25 augustus" },
                { title: "Tim spelen", date: "25 augustus" },
                { title: "Bo breien", date: "25 augustus" }
            ],
        days: [
            { name: 'Maandag', temp: "12" + String.fromCharCode(176) },
            { name: 'Dinsdag', temp: "12" + String.fromCharCode(176) },
            { name: 'Woensdag', temp: "12" + String.fromCharCode(176) }
        ]          
    },
    components: {
        'weather-today': weatherToday
    }
});

updateTime();
nextTime();

function nextTime() {
    setTimeout(function () {
        updateTime();
        nextTime();
    }, 30000);
}

function updateTime()
{
    var d = new Date();
    app.time = d.getHours() + ":" + d.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
}

