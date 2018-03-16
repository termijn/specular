import '../dependencies/skeleton-css/css/normalize.css';
import './general.css';

import weatherToday from './weathertoday';
import weatherForecast from './weatherforecast';
import currentTime from './currenttime';
import greeting from './greeting';
import formula1 from './formula1';
import headlines from './headlines';
import xkcd from './xkcd';
import vue from '../dependencies/vue/dist/vue';

var app = new vue({

    el: '#SpeculumApp',
    components: {
        'weather-today': weatherToday,
        'weather-forecast': weatherForecast,
        'current-time': currentTime,
        'greeting': greeting,
        'formula1': formula1,
        'headlines': headlines,
        'xkcd': xkcd
    }

});