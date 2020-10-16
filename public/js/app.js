import '../../node_modules/skeleton-css/css/normalize.css';
import '../css/app.css';

import vue from '../../node_modules/vue/dist/vue';

import weatherToday from './weathertoday';
import weatherForecast from './weatherforecast';
import currentTime from './currenttime.vue';
import greeting from './greeting';
import formula1 from './formula1';
import headlines from './headlines';
import xkcd from './xkcd';
import eyecandy from './eyecandy.vue';
import calendar from './calendar.vue';
import photos from './photos';
import slider from './slider';
import solaredge from './solaredge';
import motion from './motion.vue';
import foksuk from './foksuk';
import atagone from './atagone.vue';

var app = new vue({
    el: '#SpecularApp',
    components: {
        'weather-today': weatherToday,
        'weather-forecast': weatherForecast,
        'current-time': currentTime,
        'greeting': greeting,
        'formula1': formula1,
        'headlines': headlines,
        'xkcd': xkcd,
        'calendar': calendar,
        'eyecandy': eyecandy,
        'slider': slider,
        'photos': photos,
        'solaredge': solaredge,
        'motion': motion,
        'foksuk': foksuk,
        'atagone': atagone
    }

});