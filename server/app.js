var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var http = require('http');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);
var index = require('./routes/index');
var users = require('./routes/users');

const cdb = {
  host : 'localhost',
  port : '27017',
  db : 'PostsDB'
};

mongoose.connect("mongodb://"+cdb.host+":"+cdb.port+"/"+cdb.db, function(err, res) {
  if(err) throw err;
  console.log('Successful connection to database PostsDB');
});
io.on('connect', function(socket) {
	console.log('Un cliente se ha conectado');
  socket.on('editing', function(data) {
        console.log('editing SOCKET');
        socket.emit("customEmit", {connect:true});
        socket.emit('connect');
  });
  socket.on('disconnect', function(){
          console.log(' has disconnected'); //disconnecting automatically removes the socket from the room.
  });
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors({origin:true,credentials: true}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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
