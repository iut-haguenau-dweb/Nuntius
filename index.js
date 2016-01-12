var express = require('express');
var browserify = require('browserify');
var bodyParser = require('body-parser');  
var React = require('react');
var jsx = require('node-jsx');
var app = express();

jsx.install();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
