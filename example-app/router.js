App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {

  //Landing Routes
  this.route("index", { path: '/' });
  this.route("stocks");

});