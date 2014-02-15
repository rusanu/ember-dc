App.CoordinateGridChartComponent = App.BaseChartComponent.extend({
  classNames: ['coordinate-grid-chart'],

  createChart: function() {

    if(this.get('group') == null){
        return false;
    }

    this.chart = dc.coordinateGridChart('#'+this.$().context.id);

    this.chart.render();

    this.responsive();

  }.on('didInsertElement').observes('group')

});