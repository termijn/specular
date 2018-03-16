
var formula1 =  {
    
    template: 
        '<div class="formula1">'+
        '<table>'+
        '<tr v-for="standing in standings">'+
        '   <td >{{ standing.position}}. </td>' +
        '   <td >{{ standing.Driver.givenName}} {{standing.Driver.familyName}}</td>' +
        '   <td class="dimmed" ><i> {{ standing.Constructors[0].name}} </i></td>' +
        '   <td >{{ standing.points}}</td>' +        
        '</tr>'+
        '</table>'+
        '<transition name="fade"><span v-if="visible">Nog {{duration}} dagen tot <i>{{name}}</i></span></transition>'+
        '</div>',
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
            interval(60 * 60 * 1000, function() {
                axios.get('/getFormula1Schedule')
                .then(function(response) {
                    self.parseSchedule(response.data)
                });
            });

            interval(60 * 60 * 1000, function() {
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
            
            var nextRaceDate = self.parseDate(nextRace.date);
            var nextRaceDuration = new Date(nextRaceDate - now);

            this.name = nextRace.raceName;
            this.date = nextRaceDate.getDate() + '-' + nextRaceDate.getMonth() + '-' + nextRaceDate.getFullYear();
            // duration in days
            this.duration = Math.ceil(nextRaceDuration / 1000 / 60 / 60 / 24);
            this.visible = true;
        },
        parseDate(str) {
            var tokens = str.split("-");
            return new Date(tokens[0], tokens[1] -1, tokens[2]);
        }
    }
};