<template>
    <div class="atagone">
        <div>
            <div class="atagonelogo"><img src="../images/atagone.png" /></div>
            <div><span class="powerdescription">Ingesteld </span> <i>{{ setTemp }}&deg;</i> </div>
            <div><span class="powerdescription">Kamertemperatuur </span> <i>{{ roomTemp }}&deg;</i> </div>
        </div>
    </div>
</template>

<script>
    import axios from '../../node_modules/axios/dist/axios';
    import common from './common';
    import '../css/atagone.css';

    export default {
        name: "AtagOne",
        duration: 15 * 1000,
        data: function() {
            return { setTemp: '', roomTemp: ''};
        },
        mounted: function() {
            const self = this;
            this.update();
        }, 
        methods: {
            update: function()
            {
                const self = this;
                common.interval(5 * 1000, function()
                {
                    axios.get('/getAtagOne')
                    .then(function(response) {
                        self.setTemp = response.data.retrieve_reply.report.shown_set_temp;
                        self.roomTemp = response.data.retrieve_reply.report.room_temp;
                    });
                });
            }
        }
    }
</script>