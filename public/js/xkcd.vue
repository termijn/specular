<template>
    <div class="xkcd">
        <img v-bind:src="imgurl">
    </div>
</template>


<script>
    import axios from '../../node_modules/axios/dist/axios';
    import '../css/xkcd.css';

    export default {
        name: "Xkcd",
        duration: 30 * 1000,
        data: function() {
            return { imgurl: '', alt: ''};
        },
        mounted: function() {
            const self = this;
            axios.get('/getXkcd')
                    .then(function(response){
                    self.imgurl = response.data.img;
                    self.alt = response.data.alt;
                    });
        }
    }
</script>