<template>
    <div class="photos">
        <transition name="fade">
            <span v-if="visible">
                <img v-bind:src="imgurl">
            </span>
        </transition>
    </div>
</template>

<script>
    import '../css/photos.css';
    import common from './common';
    import axios from '../../node_modules/axios/dist/axios';

    export default {
        name: "Photos",
        data: function() {
            var result = {
                currentIndex: -1,
                photos: [],
                imgurl: "",
                visible: false };
            return result;
        },
        mounted: function() {
            const self = this;
            common.interval(10 * 60 * 1000, function() {
                axios.get('https://api.flickr.com/services/rest',
                    {
                        params: {
                            format: 'json',
                            nojsoncallback: 'true',
                            api_key: '9c4db8d38c44b97e095f64d268dcd821',
                            method: 'flickr.people.getPublicPhotos',
                            user_id: '53855857@N05'
                        }
                    })
                    .then(function(response) {
                        self.currentIndex = -1;
                        self.photos = response.data.photos.photo;
                        console.log(JSON.stringify( response.data.photos.photo) );

                        common.interval(120 * 1000, function() {
                            self.updateCurrent();
                        });
                    });
            });
        },
        methods: {
            updateCurrent: function() {
                const self = this;
                self.visible = false;

                let index = Math.floor(Math.random() * self.photos.length);
                let currentPhoto = self.photos[index];

                axios.get('https://api.flickr.com/services/rest',
                {
                    params: {
                        format: 'json',
                        nojsoncallback: 'true',
                        api_key: '9c4db8d38c44b97e095f64d268dcd821',
                        method: 'flickr.photos.getSizes',
                        photo_id: currentPhoto.id
                    }
                })
                .then(function(response) {
                    console.log(JSON.stringify(response.data.sizes.size) );
                    response.data.sizes.size.forEach(function(size){
                        if (size.label === "Original"){

                            let url = size.source;
                            self.imgurl = url;
                            setTimeout(function(){self.visible = true}, 60 * 1000);
                        }
                    });
                });
            }
        }
    }
</script>