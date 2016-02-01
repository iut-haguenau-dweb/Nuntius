var express = require('express');
var browserify = require('browserify');
var bodyParser = require('body-parser');
var React = require('react');
var jsx = require('node-jsx');
// var mongoose   = require('mongoose');
var mysql = require('mysql');
var morgan = require('morgan');
var app = express();
app.use(morgan('combined'));

jsx.install();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATABASE SETUP
// =============================================================================

// var dbURI = 'mongodb://nuntius:nuntius@ds047945.mongolab.com:47945/nuntius'; // connect to  database
//
// var db = mongoose.connection;
//
// db.on('connecting', function() {
//   console.log('connecting to MongoDB...');
// });
//
// db.on('error', function(error) {
//   console.error('Error in MongoDb connection: ' + error);
//   mongoose.disconnect();
// });
// db.on('connected', function() {
//   console.log('MongoDB connected!');
// });
// db.once('open', function() {
//   console.log('MongoDB connection opened!');
// });
// db.on('reconnected', function () {
//   console.log('MongoDB reconnected!');
// });
// db.on('disconnected', function() {
//   console.log('MongoDB disconnected!');
//   mongoose.connect(dbURI, {server:{auto_reconnect:true}});
// });
// mongoose.connect(dbURI, {server:{auto_reconnect:true}});

var connection = mysql.createConnection({
  host     : '0.0.0.0',
  port     : 8889,
  user     : 'root',
  password : 'root',
  database : 'nuntius'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

// var sql    = 'SELECT * FROM users';
// connection.query(sql, function(err, results) {
//   console.log(err);
//   console.log(results);
// });

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

router.route('/contact')

  // create a contact (accessed at POST http://localhost:3000/api/contact)
  .post(function(req, res) {

    var contact = new Contact();      // create a new instance of the contact model
    contact.id = req.body.id;
    contact.name = req.body.name; // set the contact name (comes from the request)
    console.log(contact);
    console.log(contact.save);

    // save the contact and check for errors
    contact.save(function(err) {
      console.log(req.body);
      if (err)
        return res.send(err);

      res.json({ message: 'Contact created!' });
    });

  })

  // get all the contacts (accessed at GET http://localhost:3000/api/contact)
  .get(function(req, res) {
    console.log(req);
    console.log(res);
    var sql = 'SELECT * FROM users';
    connection.query(sql, function(err, results) {
      console.log(err);
      console.log(results);
      res.json(results);
    });
  });


app.use('/api', router);

// SERVER
// =============================================================================

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App en cours d\'éxecution http://%s:%s', host, port);
});
