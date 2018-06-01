import '../css/photos.css';

export default {
    template: '<div class="photos"><transition name="fade"><span v-if="visible"><img v-bind:src="imgurl"></span></transition></div>',
    data: function() {
        var result = { imgurl: "https://farm2.staticflickr.com/1493/25974631521_760481a47e_o_d.jpg", visible: true };
        result.visible = true;
        return result;
    },
    mounted: function() {
        const self = this;
        //setTimeout(function(){self.visible = true;}, 100);
    }
}