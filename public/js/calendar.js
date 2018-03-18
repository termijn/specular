import common from './common';
import axios from '../../node_modules/axios/dist/axios';
import moment from '../../node_modules/moment/moment';

import '../css/calendar.css';

export default {
    
    template: 
        '<div class="calendar">'+
            '<transition name="fade">'+
                '<table v-if="visible">'+
                '<tr v-for="event in events">'+
                '   <td v-bind:style="{opacity: event.opacity}" class="leftaligned">{{ event.summary}} </td>' +
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
                    var opacity = 1.0;
                    eventsList.forEach(element => {
                        var date;
                        const hasStartTime = element.start.dateTime !== undefined;
                        if (hasStartTime)
                            date = moment(element.start.dateTime);
                        else
                            date = moment(element.start.date);

                        var now = moment();

                        var dateIndication = 
                            common.weekdayToStr[date.day()] + ', '   +
                            date.date() + ' ' +
                            common.monthToStr[date.month()]

                        var tomorrow = now.clone().add(1, 'days');
                        var startOfDate = date.clone().startOf('day');
                        if (startOfDate.toISOString() === tomorrow.startOf('day').toISOString()) {
                            dateIndication = "Morgen";
                        }
                        else if (startOfDate.toISOString() === now.startOf('day').toISOString()) {
                            dateIndication = "Vandaag";
                        }

                        if (hasStartTime) {
                            dateIndication = 
                                dateIndication + 
                                ' om ' + 
                                date.hour() + 
                                ':' + 
                                date.minute().toLocaleString(undefined, {minimumIntegerDigits: 2});
                        }

                        const event = { 
                            date: dateIndication,
                            summary: element.summary,
                            opacity: opacity
                        }
                        opacity -= 0.15;
                        self.events.push(event)
                    });
                    self.visible = true;
                });
            });
        }        
    }
};