var http = require('http');
var app = require('./app.js');
var hostname = '127.0.0.1';
var port = process.env.PORT || 3002;

var server = app.listen(port, function() { /* use this app as the point of entry using the port. */
  console.log('Express server listening on port ' + port);
  
});
