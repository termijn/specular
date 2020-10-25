<template>
    <div class="slider">
        <transition name="fade">
            <keep-alive>
                <component v-if="visible" v-bind:is="currentcomponent"></component>
            </keep-alive>
        </transition>
    </div>
</template>

<script>
    import '../css/slider.css';

    import eyecandy from './eyecandy.vue';
    import formula1 from './formula1.vue';
    import xkcd from './xkcd.vue';
    import foksuk from './foksuk.vue';
    import solaredge from './solaredge.vue';
    import garfield from './garfield.vue';

    export default {
        name: "Slider",
        data: function() {
            let result = {
                currentindex: 0,
                components: [garfield, xkcd, eyecandy, formula1, solaredge],
                currentcomponent: null,
                visible: true
            };
            return result;
        },
        mounted: function() {
            const self = this;
            self.nextWidget();

            window.addEventListener('keyup', function(event) {
                if (event.keyCode === 37) {  // left - key
                    clearTimeout(self.nextTimeOut);
                    self.previousWidget();
                }
                if (event.keyCode === 39) {  // right - key
                    clearTimeout(self.nextTimeOut);
                    self.nextWidget();
                }
            });
        },
        methods: {
            nextWidget: function() {
                const self = this;
                self.visible = true;
                self.showWidget((self.currentindex + 1) % self.components.length);
            },
            previousWidget: function() {
                const self = this;
                self.visible = true;
                var newIndex = self.currentindex - 1;
                if (newIndex < 0) {
                    newIndex = self.components.length -1;
                }
                self.showWidget(newIndex);
            },
            showWidget: function(index) {
                const self = this;
                self.currentindex = index;
                self.currentcomponent = self.components[self.currentindex];
                const duration = typeof self.currentcomponent.duration !== 'undefined' ? self.currentcomponent.duration : 10 * 1000;

                self.nextTimeOut = setTimeout(function() {
                    self.nextWidget();
                }, duration);
            }
        }
    }
</script>