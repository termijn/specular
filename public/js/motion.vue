<template>
    <div class="motion">
        <transition name="fade" duration="50">
            <div class="motioncontent" v-if="visible">
                <span v-html="message"></span>
            </div>
        </transition>
    </div>    
</template>

<script>
    export default {
        name: "Motion",
        data: function() {        
            var result = { message: "", visible: true  };
            return result;
        },
        mounted: function() {
            const self = this;
            self.timeout = setTimeout(function(){self.visible = false;}, 1000);
            window.addEventListener('keyup', function(event) {
                if (event.keyCode === 49) {  // 1 - key
                    self.keyHandler();
                }

                if (event.keyCode === 38) {  // up - key
                    self.upHandler();
                }
                if (event.keyCode === 40) {  // down - key
                    self.downHandler();
                }
                if (event.keyCode === 37) {  // left - key
                    self.leftHandler();
                }
                if (event.keyCode === 39) {  // right - key
                    self.rightHandler();
                }
            });
        },
        methods: {
            resetTimeout: function() {
                const self = this;
                clearTimeout(self.timeout);
                self.timeout = setTimeout(function(){self.visible = false;}, 1000);
            },
            upHandler: function() {
                const self = this;
                self.visible = true;
                self.message = "&uarr;";
                self.resetTimeout();
            },
            downHandler: function() {
                const self = this;
                self.visible = true;
                self.message = "&darr;";
                self.resetTimeout();
            },
            leftHandler: function() {
                const self = this;
                self.visible = true;
                self.message = "&larr;";
                self.resetTimeout();
            },
            rightHandler: function() {
                const self = this;
                self.visible = true;
                self.message = "&rarr;";
                self.resetTimeout();
            },
            keyHandler: function() {
                const self = this;
                self.visible = true;
                self.message = "O";
                self.resetTimeout();
            }
        }    
    }

</script>

<style src="../css/motion.css"></style>