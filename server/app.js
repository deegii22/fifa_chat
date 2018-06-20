var express = require('express');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var cors = require('cors');
var passport = require('passport');
require('./auth/models/db');
require('./auth/config/passport');

var authRoute = require('./auth/routes/index');

var app = express();
var port = 3000;
var router = express.Router();
var jsonParser = express.json();

app.set('json spaces', 3);
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(cors());
app.use(passport.initialize());

app.use('/auth', authRoute);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

app.get('/', function (req, res) {
    res.json("FIFA chat server");

})

var server = app.listen(port, () => console.log("listening 3000 ..."));
// https://github.com/socketio/socket.io/issues/2075
var io = require('socket.io').listen(server);
require("./chat/chat.js")(app, io);