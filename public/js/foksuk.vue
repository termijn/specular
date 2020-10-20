<template>
    <div class="xkcd">
        <img v-bind:src="imgurl">    
    </div>
</template>

<script>
    import axios from '../../node_modules/axios/dist/axios';
    import '../css/xkcd.css';

    export default {
        name: "FokSuk",
        duration: 15 * 1000,
        data: function() {
            return { imgurl: '', alt: ''};
        },
        mounted: function() {
            const self = this;
            axios.get('/getFokSuk')
                    .then(function(response) {
                        self.imgurl = response.data[0].image;
                        self.alt = response.data[0].title;
                    });
        }
    }
</script>