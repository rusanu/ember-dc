App.StackableChartComponent = Ember.Component.extend({
  classNames: ['stackable-chart'],
  didInsertElement: function() {
    var stackableChart = dc.stableChart(this);
  }
});