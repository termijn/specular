import '../css/greeting.css';

import vue from '../../node_modules/vue/dist/vue';
import common from './common';
import eyecandy from './eyecandy';
import formula1 from './formula1';
import xkcd from './xkcd';
import photos from './photos';

export default {
    template: '<div class="slider"><transition name="fade"><component v-if="visible" v-bind:is="currentcomponent"></component></transition></div>',
    data: function() {         
        let result = {
            currentindex: 0,
            components: [photos, eyecandy, formula1, xkcd],
            currentcomponent: null, 
            visible: true 
        };
        return result;
    },
    mounted: function() {
        const self = this;
        common.interval(10 * 1000, function() {
            self.visible = false;
            self.currentcomponent = self.components[self.currentindex];
            self.currentindex = (self.currentindex + 1) % self.components.length;
            setTimeout(function() {self.visible = true;}, 2000)
        });
    }
}