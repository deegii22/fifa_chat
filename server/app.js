var express = require('express');
var app = express();
var port = 3000;
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var validator = require('express-validator');
var router = express.Router(); 
var jsonParser = express.json();


app.set('json spaces', 3);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());


app.get('/', function(req, res){
    res.json("FIFA chat server");
  
})

app.listen(port, () => console.log("listening 3000 ..."));