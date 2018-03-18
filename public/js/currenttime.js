import common from './common';
import '../css/currenttime.css';

export default {
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
            common.interval(60 * 1000, function(){
                var d = new Date();
                self.time = d.getHours() + ":" + d.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
                self.dayofweek = common.weekdayToStr[d.getDay()];
                self.month = common.monthToStr[d.getMonth()];
                self.dayofmonth = d.getDate();
                self.year = d.getFullYear();
            });
        }
    }
}