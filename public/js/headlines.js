var headlines = {

    template: '<div class="headlines"><transition name="fade"><span v-if="visible"> {{ currentheadline }} </span></transition></div>',
    data: function() {
        return { visible: true, currentheadline: '', index: 0, headlines: [] }
    },
    mounted : function() {
        this.update();
    },
    methods: {
        update: function() {
            const self = this;
            interval(1000 * 60, function() {
                axios.get('/getHeadlines')
                .then(function(response){
                    self.headlines = response.data.headlines;
                    self.index = 0;
                    self.updateCurrent();
                });
            });
            interval(6000, function() {
                self.updateCurrent();
            })
        },
        updateCurrent: function() {
            self = this;
            this.visible = false;
            this.index = (this.index + 1) % this.headlines.length;
            this.currentheadline = this.headlines[this.index];
            setTimeout(() => {
                self.visible = true;
            }, 800);
        }

    }
}