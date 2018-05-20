import '../css/photos.css';

export default {
    template: '<div class="photos"><transition name="fade"><span v-if="visible"><img v-bind:src="imgurl"></span></transition></div>',
    data: function() {
        var result = { imgurl: "http://www.vangeloof.com/wp-content/uploads/2018/04/MvG-0754-HDRweb_LUT-1024x683.jpg", visible: true };
        result.visible = true;
        return result;
    },
    mounted: function() {
        const self = this;
        //setTimeout(function(){self.visible = true;}, 100);
    }
}