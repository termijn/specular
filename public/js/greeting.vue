
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
    data() { return { message: "", visible: false }; },
    mounted: function() {
        const self = this;
        window.addEventListener('keyup', function(event) {
            if (event.keyCode === 50) {  // 2 - key
                var dateTime = new Date();
                var hours = dateTime.getHours();

                var message = "Goedemorgen";
                if (hours >= 12 && hours < 18) {
                    message = "Goedemiddag";
                } else if (hours >= 18) {
                    message = "Goedenavond";
                }
                self.message = message;
                self.visible = true;
                setTimeout(function(){self.visible = false;}, 5000);
            }
        });
    }
}
</script>