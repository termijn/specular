import '../../node_modules/skeleton-css/css/normalize.css';
import '../css/app.css';

import vue from '../../node_modules/vue/dist/vue';

import weatherToday from './weathertoday.vue';
import weatherForecast from './weatherforecast.vue';
import currentTime from './currenttime.vue';
import greeting from './greeting.vue';
import formula1 from './formula1.vue';
import headlines from './headlines.vue';
import xkcd from './xkcd.vue';
import eyecandy from './eyecandy.vue';
import calendar from './calendar.vue';
import photos from './photos.vue';
import slider from './slider.vue';
import solaredge from './solaredge.vue';
import motion from './motion.vue';
import foksuk from './foksuk.vue';
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