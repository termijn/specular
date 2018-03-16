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