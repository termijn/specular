var xkcd = {
    template: '<div class="xkcd"><img v-bind:src="imgurl"></div>',
    data: function() {
        return { imgurl: '' };
    },
    mounted: function() {
        const self = this;
        axios.get('/getXkcd')
                .then(function(response){
                   self.imgurl = response.data.img;
                });
    }
}