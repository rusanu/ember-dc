var express = require('express'),
    util    = require('util'),
    http    = require('http'),
    path    = require('path'),
    app     = express(),
    server  = require('http').createServer(app);

app.set('port', 3001);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.configure(function() {
  app.use(express.static(__dirname));
  app.use(app.router);
});

app.get('*', function (req, res) { res.sendfile(path.join(__dirname, 'index.html')); });

server.listen(app.get('port'), function(){
  console.log('Example Server listening on port ' + app.get('port'));
});
