<template>
    <div class="date">
        <div>{{dayofweek}}, {{dayofmonth}} {{month}} {{year}}</div>
        <div class="time">{{hours}}<span v-hide="timeSeparatorHidden">:</span>{{minutes}}</div>
    </div>
</template>

<script>
    import vue from '../../node_modules/vue/dist/vue';
    import common from './common';
    import '../css/currenttime.css';

    export default {
        name: "CurrentTime",
        data: function() {
            return {
                time: '',
                dayofweek: '',
                dayofmonth: '',
                month: '',
                year: '',
                hours: '',
                minutes: '',
                timeSeparatorHidden: true
            };
        },
        mounted: function() {
            this.update();
        },
        methods: {
            update: function()
            {
                const self = this;
                common.interval(60 * 1000, function(){
                    var d = new Date();
                    self.hours = d.getHours();
                    self.minutes = d.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
                    self.dayofweek = common.weekdayToStr[d.getDay()];
                    self.month = common.monthToStr[d.getMonth()];
                    self.dayofmonth = d.getDate();
                    self.year = d.getFullYear();
                });

                common.interval(500, function(){
                    self.timeSeparatorHidden = !self.timeSeparatorHidden;
                });
            }
        }
    }

        vue.directive('hide', {
        bind: function (el,binding) {
            el.style.visibility = (binding.value) ? "hidden" : "";
        },
        update: function(el, binding) {
            el.style.visibility = (binding.value) ? "hidden" : "";
        }
    });
</script>