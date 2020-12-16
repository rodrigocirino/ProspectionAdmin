var express = require('express');
var bodyParser = require('body-parser')
var consign = require('consign');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");//CORS POLICY
    res.header("Access-Control-Allow-Headers", "*");//CORS POLICY
    res.header("Access-Control-Allow-Methods", "*");//CORS POLICY
    next();
});



//Run all controllers in npm run start
consign()
    .include('controllers')
    .into(app);

//start a server
var port = 5000;
app.listen(port, function () {
    console.log('Servidor rodando na portas ' + port);
});


