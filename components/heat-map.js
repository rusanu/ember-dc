App.HeatMapComponent = App.BaseChartComponent.extend({
  classNames: ['heat-map'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.heatMap('#'+this.$().context.id);

    this.chart.render();

    this.responsive();

  }.on('didInsertElement').observes('group')

});