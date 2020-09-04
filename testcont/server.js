var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:8080
app.use(express.static(__dirname + '/site'));
app.use(express.static(__dirname + '/node_modules/web3/dist'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/site/index.html'));
});

app.listen(8080);