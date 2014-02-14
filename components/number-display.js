App.NumberDisplayComponent = Ember.Component.extend({
  classNames: ['number-display'],
  didInsertElement: function() {
    var numberDisplay = dc.numberDisplay(this);
  }
});