var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/', index);

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://172.16.0.5');
client.on('connect', function(state){
    client.subscribe('/door/outer');
    client.subscribe('/door/outer/doorbell');
});

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(topic.toString());
    console.log(message.toString());
    console.log("=======");

    switch (topic) {
        case 'door/outer/doorbell':

        case 'door/outer':

        case 'door/test/doorbell':

        default:
          console.log("Unknown handler")
    }

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
