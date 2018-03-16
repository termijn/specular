(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
    
    const greeting = require('./greeting.js');
    
    const weekdayToStr = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
    const monthToStr = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
    
    var weatherForecast =
    {
        template: 
            '<div class="weatherforecast-container">'+
            '<table>'+
            '<tr v-for="line in lines">'+
            '   <td v-bind:style="{opacity: line.opacity}">{{ line.when }}</td>' +
            '   <td v-bind:style="{opacity: line.opacity}"><i class="owi" v-bind:class="line.icon"></i></td>' +
            '   <td v-bind:style="{opacity: line.opacity}">{{ line.temp }}&deg;</td>' +
            '</tr>'+
            '</table>'+
            '</div>',
        data: function() {
            return { lines: [] }
        },
        mounted: function() {
            this.update();
        },
        methods: {
            update: function() {
                const self = this;
                interval(10 * 60 * 1000, function() {
                    axios.get('/getWeatherForecast')
                    .then(function(response){                    
                        self.parse(response.data);
                    });
                });
            },
            parse: function(days) {
                const self = this;
    
                // lines = [ { when, icon, temp } ];
                var today = days[0];
                var opacity = 1;
                today.forecasts.forEach(function(forecast) {                
                    var dateTime = new Date(forecast.dateTime);
                    var hours = dateTime.getHours();
                    var minutes = dateTime.getMinutes();
                    var line = { opacity: opacity, when: hours + ':' + minutes.toLocaleString(undefined, {minimumIntegerDigits: 2}), icon: 'owi-'+forecast.icon, temp: Math.round(forecast.temp) };
                    self.lines.push(line);
                });
    
                days.forEach(function(day) {
                    console.log(JSON.stringify(day));
                    if (day.forecasts.length > 4) {
                        var dateTime = new Date(day.date);
                        opacity -= 0.15;
                        if (opacity < 0.0) opacity = 0;
                        var line = { opacity: opacity, when: weekdayToStr[dateTime.getDay()], icon: 'owi-'+day.forecasts[4].icon, temp: Math.round(day.forecasts[4].temp) };
                        self.lines.push(line);
                    }
                });
            }
        }    
    };
    
    var weatherToday =  
    {
        template: '<div class="weathertoday"><i class="owi" v-bind:class="icon"></i> <span>{{ temp }}</span>  <div class="description">{{ description }}</div></div>',
        data: function() {
            return {
                temp: '',
                icon: '',
                description: ''
            };
        },
        mounted : function() {
            this.update();
        },
        methods: {
            update: function() {
                const self = this;
                interval(10 * 60 * 1000, function() {
                    axios.get('/getWeatherToday')
                    .then(function(response){
                        self.temp = 
                            response.data.temperature + 
                            String.fromCharCode(176);
                        self.icon = "owi-" + response.data.icon;
                        self.description = response.data.description;
                    });
                });
            }
        }
    };
    
    var currentTime = {
        template: '<div class="date">'+
                  '  <div>{{dayofweek}}, {{dayofmonth}} {{month}} {{year}}</div>'+
                  '  <div class="time">{{time}}</div>'+
                  '</div>',
        data: function() {
            return {
                time: '', 
                dayofweek: '', 
                dayofmonth: '', 
                month: '',
                year: ''
            };
        },
        mounted: function() {
            this.update();
        },
        methods: {
            update: function()
            {
                const self = this;
                interval(60 * 1000, function(){
                    var d = new Date();
                    self.time = d.getHours() + ":" + d.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
                    self.dayofweek = weekdayToStr[d.getDay()];
                    self.month = monthToStr[d.getMonth()];
                    self.dayofmonth = d.getDate();
                    self.year = d.getFullYear();
                });
            }
        }
    }

/*    
        
    var greeting = {
        template: '<div class="message"><transition name="fade"><span v-if="visible">{{message}}</span></transition></div>',
        data: function() {
            var dateTime = new Date();
            var hours = dateTime.getHours();
    
            var result = { message: "Goedemorgen", visible: false };
            if (hours >= 12 && hours < 18) {
                result.message = "Goedemiddag";
            } else if (hours >= 18) {
                result.message = "Goedenavond";
            }
            return result;
        },
        mounted: function() {
            const self = this;
            setTimeout(function(){self.visible = true;}, 100);
            setTimeout(function(){self.visible = false;}, 5000);
        }
    }
  */  
    
    var headlines = {
        template: '<div class="headlines"><span> {{ currentheadline }} </span></div>',
        data: function() {
            return { headlines: [], currentheadline: '', index: 0 }
        },
        mounted : function() {
            this.update();
        },
        methods: {
            update: function() {
                const self = this;
                interval(1000 * 60, function() {
                    axios.get('/getHeadlines')
                    .then(function(response){
                        self.headlines = response.data.headlines;
                        self.index = 0;
                        self.updateCurrent();
                    });
                });
                interval(5000, function() {
                    self.updateCurrent();
                })
            },
            updateCurrent: function() {
                this.index = (this.index + 1) % this.headlines.length;
                this.currentheadline = this.headlines[this.index];
            }
    
        }
    }
    
    var xkcd = {
        template: '<div class="xkcd"><img v-bind:src="imgurl"></div>',
        data: function() {
            return { imgurl: '' };
        },
        mounted: function() {
            const self = this;
            axios.get('/getXkcd')
                    .then(function(response){
                       self.imgurl = response.data.img;
                    });
        }
    }
    
    var app = new Vue({
        el: '#SpeculumApp',
        data: {
            show: true,
        },
        components: {
            'weather-today': weatherToday,
            'weather-forecast': weatherForecast,
            'current-time': currentTime,
            'greeting': greeting,
            'headlines': headlines,
            'xkcd': xkcd
        }
    });
    
    
    function interval(intervalDuration, callback)
    {
        callback();
        setTimeout(function () {
            callback();
            interval(intervalDuration, callback);
        }, intervalDuration);
    }

},{"./greeting.js":2}],2:[function(require,module,exports){
module.exports = {
    template: '<div class="message"><transition name="fade"><span v-if="visible">{{message}}</span></transition></div>',
    data: function() {
        var dateTime = new Date();
        var hours = dateTime.getHours();

        var result = { message: "Goedemorgen", visible: false };
        if (hours >= 12 && hours < 18) {
            result.message = "Goedemiddag";
        } else if (hours >= 18) {
            result.message = "Goedenavond";
        }
        return result;
    },
    mounted: function() {
        const self = this;
        setTimeout(function(){self.visible = true;}, 100);
        setTimeout(function(){self.visible = false;}, 5000);
    }
};
},{}]},{},[1]);
