// Create Application
window.App = App = Ember.Application.create();

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    d3.csv("ufo_awesome.csv", function(error, json) {
      if (error) return console.log(error);
      console.log(json);
      controller.set('content', json);
    });
  }
});