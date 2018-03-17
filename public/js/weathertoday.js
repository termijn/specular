import '../../node_modules/open-weather-icons/dist/css/open-weather-icons.css';
import common from './common'
import axios from '../../node_modules/axios/dist/axios';

export default {
    
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
            common.interval(10 * 60 * 1000, function() {
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