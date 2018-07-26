var express = require('express');
var app = express();
var db = require('./db');
var cors = require('cors');
var LibraryController = require('./controllers/librarycontroller');
/* allows me to hook into the instance. access the routing. */



app.use(cors());
app.use('/Library', LibraryController);

module.exports = app;
// console.log(module.exports);
