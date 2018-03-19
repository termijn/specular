import common from './common';
import axios from '../../node_modules/axios/dist/axios';

import '../css/headlines.css';

export default {

    template: 
        '<div class="headlines"><transition name="fade">'+
        '<div v-if="visible"> <span> {{ currentheadline.title }} </span> <span class="dimmed">{{ currentheadline.source }}</span> </div></transition></div>',
    data: function() {
        return { visible: true, currentheadline: '', index: 0, headlines: [] }
    },
    mounted : function() {
        this.update();
    },
    methods: {
        update: function() {
            const self = this;
            common.interval(1000 * 60, function() {
                axios.get('/getHeadlines')
                .then(function(response){
                    self.headlines = response.data;
                    self.index = 0;
                    self.updateCurrent();
                });
            });
            common.interval(6000, function() {
                self.updateCurrent();
            })
        },
        updateCurrent: function() {
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