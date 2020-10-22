<template>
    <div class="comic">
        <img v-bind:src="imgurl">    
    </div>
</template>

<script>
    import axios from '../../node_modules/axios/dist/axios';
    import common from './common.js';
    import '../css/comic.css';

    export default {
        name: "Garfield",
        duration: 15 * 1000,
        data: function() {
            return { imgurl: '', alt: ''};
        },
        mounted: function() {
            const self = this;
            self.update();
        },
        methods: {
            update: function() {
                const self = this;
                common.interval(60 * 60 * 1000, function() {
                    axios.get('/getGarfield')
                        .then(function(response) {
                            self.imgurl = response.data[0].link;
                            self.alt = response.data[0].title;
                        });
                });
            }
        }
    }
</script>