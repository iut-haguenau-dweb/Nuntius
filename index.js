var express = require('express');
var browserify = require('browserify');
var bodyParser = require('body-parser');
var React = require('react');
var jsx = require('node-jsx');
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

// ROUTES
// =============================================================================

app.get('public/', function (req, res) {
  res.send('Hello World!');
});



app.use(express.static('public'));

// API ROUTES
// =============================================================================

var router = express.Router(); // get an instance of the express Router

router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the Nuntius API!' });
});

//liste des utilisateurs connectés
// ----------------------------------------------------

var listCo = [];

router.route('/connected')

.post(function(req, res) {
    if(this.state.people != ''){
      var man = this.state.people;
      var date = now();
      var connectionInfo = [man,date];
      listCo.push(connectionInfo);
    }
  res.send('Hello connected!');
})

// on routes that end in /contact
// ----------------------------------------------------


router.route('/contact')

  // create a contact (accessed at POST http://localhost:3000/api/contact)
  .post(function(req, res) {
    var username = req.body.username;
    var sql = 'INSERT INTO users (username) VALUES (' + connection.escape(username) +')';
    connection.query(sql, function(err, results) {
      res.json({ message: 'Contact created!' });
    });
  })

  // get all the contacts (accessed at GET http://localhost:3000/api/contact)
  .get(function(req, res) {
    var sql = 'SELECT * FROM users';
    connection.query(sql, function(err, results) {
      res.json(results);
    });
  })

// on routes that end in /contact/:user_id
// ----------------------------------------------------
router.route('/contact/:user_id')

  // get a specific contact (accessed at GET http://localhost:3000/api/contact/:user_id)
  .get(function(req, res){
    var id = req.params.user_id;
    var sql = 'SELECT * FROM users WHERE user_id = ' + connection.escape(id);
    connection.query(sql, function(err, results) {
      res.json(results);
    });
  })

  // update a specific contact (accessed at PUT http://localhost:3000/api/contact/:user_id)
  .put(function(req, res){
    var id = req.params.user_id;
    var username = req.body.username;
    var sql = 'UPDATE users SET username = ' + connection.escape(username) +' WHERE user_id = ' + connection.escape(id);
    connection.query(sql, function(err, results) {
      res.json('Your username has been successfully modified!');
    });
  })

  // delete a specific contact (accessed at DELETE http://localhost:3000/api/contact/:user_id)
  .delete(function(req, res){
    var id = req.params.user_id;
    var sql = 'DELETE * FROM users WHERE user_id = '+ connection.escape(id);
    connection.query(sql, function(err, results) {
      res.json('Your username has been successfully deleted!');
    });
  })

// on routes that end in /conversation
// ----------------------------------------------------
router.route('/conversation')

  // create a new conversation (accessed at POST http://localhost:3000/api/conversation)
  .post(function(req, res) {
    var user_one= req.body.user_one;
    var user_two= req.body.user_two;
    var sql = 'INSERT INTO conversation (user_one, user_two, time) VALUES (' + connection.escape(user_one) +', '+ connection.escape(user_two) +', NOW())';
    connection.query(sql, function(err, results) {
      res.json({ message: 'Conversation created!' });
    });
  })

// on routes that end in /conversation/:user_id
// ----------------------------------------------------
router.route('/conversation/:user_id')

  // get all conversations from a contact (accessed at GET http://localhost:3000/api/conversation/:user_id)
  .get(function(req, res){
    var id = req.params.user_id;
    var sql = 'SELECT * FROM conversation WHERE user_one = ' + connection.escape(id) +' OR user_two= ' + connection.escape(id);
    connection.query(sql, function(err, results) {
      res.json(results);
    });
  });

// on routes that end in /message/:c_id_fk
// ----------------------------------------------------
router.route('/message/:c_id_fk')

  // get all messages from a conversation (accessed at GET http://localhost:3000/api/message/:c_id_fk)
  .get(function(req, res){
    var id = req.params.c_id_fk;
    var sql = 'SELECT * FROM conversation_reply WHERE c_id_fk = '+ connection.escape(id);
    connection.query(sql, function(err, results) {
      res.json(results);
    });
  })

  // post a message in a conversation (accessed at POST http://localhost:3000/api/message/:c_id_fk)
  .post(function(req, res){
    var reply = req.body.reply;
    var user_id_fk = req.body.user_id_fk;
    var id = req.params.c_id_fk;
    var sql = 'INSERT INTO conversation_reply (reply, user_id_fk, time, c_id_fk) VALUES (' + connection.escape(reply) +', '+ connection.escape(user_id_fk) +', NOW(), '+ connection.escape(id) +')';
    connection.query(sql, function(err, results) {
      res.json({ message: 'Message created!' });
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
