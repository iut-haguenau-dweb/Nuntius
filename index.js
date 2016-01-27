var express = require('express');
var browserify = require('browserify');
var bodyParser = require('body-parser');
var React = require('react');
var jsx = require('node-jsx');
var mongoose   = require('mongoose');
var app = express();

jsx.install();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATABASE SETUP
// =============================================================================

var dbURI = 'mongodb://nuntius:nuntius@ds047945.mongolab.com:47945/nuntius'; // connect to  database

var db = mongoose.connection;

  db.on('connecting', function() {
    console.log('connecting to MongoDB...');
  });

  db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
  });
  db.on('connected', function() {
    console.log('MongoDB connected!');
  });
  db.once('open', function() {
    console.log('MongoDB connection opened!');
  });
  db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
  });
  db.on('disconnected', function() {
    console.log('MongoDB disconnected!');
    mongoose.connect(dbURI, {server:{auto_reconnect:true}});
  });
  mongoose.connect(dbURI, {server:{auto_reconnect:true}});

// ROUTES
// =============================================================================

app.get('public/', function (req, res) {
  res.send('Hello World!');
});
app.use(express.static('public'));

// API ROUTES
// =============================================================================

var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: 'Bienvenue sur l\'api de Nuntius' });
});

app.use('/api', router);
// SERVER
// =============================================================================

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
