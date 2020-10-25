
<template>
    <div class="message">
        <transition name="fade">
            <span v-if="visible">{{message}}</span>
        </transition>
    </div>
</template>



<script>
import '../css/greeting.css';

export default {
    name: "Greeting",
    data: function() {
        var dateTime = new Date();
        var hours = dateTime.getHours();

        var result = { message: "Goedemorgen", visible: false };
        if (hours >= 12 && hours < 18) {
            result.message = "Goedemiddag";
        } else if (hours >= 18) {
            result.message = "Goedenavond";
        }
        result.visible = true;
        return result;
    },
    mounted: function() {
        const self = this;
        setTimeout(function(){self.visible = false;}, 5000);
    }
}
</script>

