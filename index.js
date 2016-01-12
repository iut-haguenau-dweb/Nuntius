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
app.use(express.static('public'));



// Nouvelle discution
app.post('/games', function(req, res) {
    if(pendingGames.length > 0){
        pendingGames[0].playersOnline.push("o");
        var game = pendingGames.shift();
        game.player = "o";
        activeGames.push(game);
        res.send(game);
    }
    else{
        game = {
            id: parseInt(Math.random(1)*1000000),
            table: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            playersOnline: ['x'],
            player: 'x',
            turn: 'x',
            win: false
        };
        pendingGames.push(game);
        res.send(game);
    }
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
