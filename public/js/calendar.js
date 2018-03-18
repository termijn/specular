import common from './common';
import axios from '../../node_modules/axios/dist/axios';
import moment from '../../node_modules/moment/moment';

export default {
    
    template: 
        '<div class="calendar">'+
            '<transition name="fade">'+
                '<table v-if="visible">'+
                '<tr v-for="event in events">'+
                '   <td class="leftaligned">{{ event.summary}} </td>' +
                '   <td class="rightaligned dimmed">{{ event.date }}</td>' +
                '</tr>'+
                '</table>'+
            '</transition>'+
        '</div>',
    data: function() {
        return {
            events: [], // { summary, dateTime }
            visible: false
        };
    },
    mounted : function() {
        this.update();
    },
    methods: {
        update: function() {
            const self = this;
            common.interval(0.5 * 60 * 1000, function() {
                axios.get('/getCalendar')
                .then(function(response) {
                    const eventsList = response.data;
                    self.events = [];
                    eventsList.forEach(element => {
                        var date = moment(element.start.dateTime);
                        var now = moment();

                        var dateIndication = 
                            common.weekdayToStr[date.day()] + ', '   +
                            date.date() + ' ' +
                            common.monthToStr[date.month()]

                        var tomorrow = now.clone().add(1, 'days');
                        if (date.startOf('day') == tomorrow.startOf('day'))
                        {
                            dateIndication = "Morgen";
                        } 
                        const event = { 
                            date: dateIndication,
                            summary: element.summary
                        }
                        self.events.push(event)
                    });
                    self.visible = true;
                });
            });
        }        
    }
};