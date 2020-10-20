<template>
    <div class="solaredge">
      <div class="solaredgelogo"><img src="../images/solaredge.svg" /></div>
      <div><span class="powerdescription">Levert nu</span> <i>{{ powerNow }}</i> <span class="powerdescription">W</span> </div>
      <div><span class="powerdescription">Vandaag </span> <i>{{ powerDay }}</i> <span class="powerdescription">kWh</span></div>
      <div><span class="powerdescription">Dit jaar </span> <i>{{ powerYear }}</i> <span class="powerdescription">kWh</span></div>
    </div>
</template>

<style src="../css/solaredge.css"></style>

<script>
    import common from './common'
    import axios from '../../node_modules/axios/dist/axios';

    export default {
        name: "SolarEdge",
        data: function() {
            return {
                powerNow: '',
                powerYear: '',
                powerDay: '',
                lastUpdate: ''
            };
        },
        mounted : function() {        
            this.update();
        },
        methods: {
            update: function() {
                const self = this;
                common.interval(5 * 1000, function() {
                    axios.get('/getSolarEdge')
                    .then(function(response){
                        const powerYear = response.data.sitesOverviews.siteEnergyList[0].siteOverview.lastYearData.energy / 1000;
                        self.powerYear = parseFloat(Math.round(powerYear * 100) / 100).toFixed(2);

                        const powerNow = response.data.sitesOverviews.siteEnergyList[0].siteOverview.currentPower.power;
                        self.powerNow = parseFloat(Math.round(powerNow * 100) / 100).toFixed(0);

                        const powerDay = response.data.sitesOverviews.siteEnergyList[0].siteOverview.lastDayData.energy / 1000;
                        self.powerDay = parseFloat(Math.round(powerDay * 100) / 100).toFixed(2);
                    });
                });
            }
        }
    };
</script>