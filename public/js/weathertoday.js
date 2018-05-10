import '../../node_modules/open-weather-icons/dist/css/open-weather-icons.css';
import common from './common'
import axios from '../../node_modules/axios/dist/axios';
import '../css/weathertoday.css';

export default {
    
    template: '<div class="weathertoday"><i class="owi" v-bind:class="icon"></i> <span class="temp">{{ temp }}</span>  <div class="description">{{ description }}</div></div>',
    //template: '<div class="weathertoday"><img v-bind:src="iconpng"> <span class="temp">{{ temp }}</span>  <div class="description">{{ description }}</div></div>',
    data: function() {
        return {
            temp: '',
            icon: '',
            iconpng: '',
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
                    self.iconpng = "http://openweathermap.org/img/w/" + response.data.icon + ".png";
                    self.description = response.data.description;
                });
            });
        }
    }
};