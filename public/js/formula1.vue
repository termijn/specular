<template>
    <div class="formula1">
    <table>
        <tr v-for="standing in standings" v-bind:key="standing.position">
            <td >{{ standing.position}}. </td>
            <td >{{ standing.Driver.givenName}} {{standing.Driver.familyName}}</td>
            <td class="dimmed" ><i> {{ standing.Constructors[0].name}} </i></td>
            <td >{{ standing.points}}</td>
        </tr>
    </table>
    <div v-if="visible">Nog {{duration}} dagen tot <i>{{name}}</i></div>
    </div>
</template>

<script>
    import common from './common';
    import axios from '../../node_modules/axios/dist/axios';

    import '../css/formula1.css';

    export default {
        name: "Formula1",
        data: function() {
            return {
                date: '',
                location: '',
                duration: '',
                name: '',
                standings: [],
                visible: false
            };
        },
        mounted : function() {
            this.update();
        },
        methods: {
            update: function() {
                const self = this;
                common.interval(60 * 60 * 1000, function() {
                    axios.get('/getFormula1Schedule')
                    .then(function(response) {
                        self.parseSchedule(response.data)
                    });
                });

                common.interval(60 * 60 * 1000, function() {
                    axios.get('/getFormula1DriverStandings')
                    .then(function(response) {
                        self.parseDriverStandings(response.data)
                    });
                });
            },
            parseDriverStandings: function(response) {
                this.standings = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;            
                this.standings = this.standings.slice(0, 6);
            },
            parseSchedule: function(response) {
                const self = this;
                const races = response.MRData.RaceTable.Races;
                var now = new Date();
                var nextRace = races.find(race => {
                    const date = self.parseDate(race.date);
                    const isLater = date >= now;
                    return isLater;
                });

                if (nextRace !== undefined)
                {
                    var nextRaceDate = self.parseDate(nextRace.date);
                    var nextRaceDuration = new Date(nextRaceDate - now);
        
                    self.name = nextRace.raceName;
                    self.date = nextRaceDate.getDate() + '-' + nextRaceDate.getMonth() + '-' + nextRaceDate.getFullYear();
                    // duration in days
                    self.duration = Math.ceil(nextRaceDuration / 1000 / 60 / 60 / 24);
                    self.visible = true;
                }
                this.visible = false;
            },
            parseDate(str) {
                var tokens = str.split("-");
                return new Date(tokens[0], tokens[1] -1, tokens[2]);
            }
        }
    };
</script>