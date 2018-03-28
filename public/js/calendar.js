import common from './common';
import axios from '../../node_modules/axios/dist/axios';
import moment from '../../node_modules/moment/moment';

import '../css/calendar.css';

export default {
    
    template: 
        '<div class="calendar">'+
            '<transition name="fade">'+
                '<div v-if="visible">'+
                '<div v-for="event in events">'+
                '   <div v-bind:style="{opacity: event.opacity}" class="leftaligned eventsummary">{{ event.summary}} </div>' +
                '   <div v-bind:style="{opacity: event.opacity * 0.5}" class="leftaligned eventdate">{{ event.date }}</div>' +
                '</div>'+
                '</div>'+
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
                let promise = axios.get('/getCalendar');
                promise.catch(function(err) { console.log("No calendar events"); });
                promise.then(function(response) {
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