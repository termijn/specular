import common from './common';
import axios from '../../node_modules/axios/dist/axios';

import '../css/headlines.css';

export default {

    template: 
        '<div class="headlines"><transition name="fade">'+
        '<div v-if="visible"><span class="dimmed">{{ currentheadline.source }}</span> <br/> <span> {{ currentheadline.title }} </span>  </div></transition></div>',
    data: function() {
        return { visible: true, currentheadline: '', index: 0, headlines: [] }
    },
    mounted : function() {
        this.update();
    },
    methods: {
        update: function() {
            const self = this;
            common.interval(10 * 60 * 1000, function() {
                axios.get('/getHeadlines')
                .then(function(response){
                    self.headlines = response.data;
                    self.index = -1;
                    self.updateCurrent();
                });
            });
            common.interval(10 * 1000, function() {
                self.updateCurrent();
            })
        },
        updateCurrent: function() {
            if (this.headlines.length == 0) return;

            self = this;
            this.visible = false;
            this.index = (this.index + 1) % this.headlines.length;
            this.currentheadline = this.headlines[this.index];
            setTimeout(() => {
                self.visible = true;
            }, 800);
        }
    }
}